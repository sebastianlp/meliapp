const express = require('express');
const itemApi = require('../meli/item');
const router = express.Router();

const basicResult = {
  author: {
    name: 'Sebastián',
    lastname: 'Poliak'
  }
};

router.get('/', function (req, res, next) {
  const searchQuery = req.query.q;

  itemApi.search(searchQuery).then(({ results, filters}) => {
    let result = Object.assign({}, basicResult);
    
    const categories = filters
      .find(filter => filter.id = 'category')
      .values[0] // weird
      .path_from_root
      .map(path => path.name);

    const items = results.slice(0, 4).map(item => { // get first four items from result array
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
    });

    result.categories = categories;
    result.items = items;

    res.json(result);
  });
});

router.get('/:id', function (req, res, next) {
  const itemId = req.params.id;

  Promise.all([itemApi.item(itemId), itemApi.itemDescription(itemId)]).then(result => res.json(result)).catch(err => { console.log(err); res.json(err);});
  
  // res.json({
  //   item_id: itemId
  // });
});

module.exports = router;