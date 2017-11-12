const fetch = require('node-fetch');

const baseUrl = require('../config').base_url;

const search = search => fetch(`${baseUrl}/sites/MLA/search?q=${search}`).then(res => res.json());

const item = itemId => fetch(`${baseUrl}/items/${itemId}`).then(res => res.json());

const itemDescription = itemId => fetch(`${baseUrl}/items/${itemId}/description`).then(res => res.json());

module.exports = {
  search,
  item,
  itemDescription
};