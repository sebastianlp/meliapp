const searchItems = searchQuery => {
  return fetch(`/api/items${searchQuery}`)
    .then(res => res.json())
    .catch(err => new Error('Error obteniendo listado de items'))
  ;
};

const searchItem = itemId => {
  return fetch(`/api/items/${itemId}`)
    .then(res => res.json())
    .catch(err => new Error('Error obteniendo la informacion del item'))
  ;
};

export default {
  searchItems,
  searchItem
}