$('body').click(() => console.log('hello')) //hooked up and working

$(document).ready(() => {
  fetchInventory();
})

const fetchInventory = () => {
  fetch('/api/v1/inventory')
    .then(response => response.json())
    .then(response => displayInventory(response))
    .catch(error => console.log(error))
}

const displayInventory = (items) => {
  items.map(item => {
    console.log(item);
    let name = item.title;
    let description = item.description;
    let img = item.picture_url;
    let price = JSON.parse(item.price).toFixed(2);

    $('.item-list').append(`<div>
      <h3>${name}</h3>
      <img src=${img} />
      <p>${description}</p>
      <p>price: $${price}</p>
    </div>`)
  })

}
