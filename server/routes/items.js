const express = require('express');
const itemApi = require('../meli/item');
const router = express.Router();

const signature = {
  author: {
    name: 'Sebastián',
    lastname: 'Poliak'
  }
};

const itemMapper = item => {
  return {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: Math.floor(item.price),
      decimals: Math.floor((item.price - Math.floor(item.price)) * 100)
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping
  };
};

const pathMapper = pathFromRoot => pathFromRoot.name;

router.get('/', function (req, res, next) {
  const searchQuery = req.query.q;

  itemApi.search(searchQuery).then(({ results, filters}) => {
    let categories = [];
    
    if (filters.length > 0) { // this check prevents that the query doesn't have any filter, so I can't populate the categories array
      categories = filters
        .find(filter => filter.id = 'category')
        .values[0] // weird but subsaned with that if
        .path_from_root
        .map(pathMapper);
    }

    const items = results.slice(0, 4).map(itemMapper); // get first four items from result array

    res.json(Object.assign({}, signature, {items}, {categories}));
  });
});

router.get('/:id', function (req, res, next) {
  const itemId = req.params.id;

  Promise.all([itemApi.item(itemId), itemApi.itemDescription(itemId)]).then(([item, description]) => {
    // this request is to get the category of the item and make the item bradcrumb
    itemApi.itemCategory(item.category_id).then(category => {
      const categories = category.path_from_root.map(pathMapper); // we use the same mapper as from items
      
      res.json(Object.assign({},
        signature,
        {
          item: Object.assign({}, itemMapper(item), {
            description: description.text,
            sold_quantity: item.sold_quantity
          })
        },
        { categories }
      ));
    });
  });
});

module.exports = router;