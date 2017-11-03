$('body').click(() => console.log('hello')) //hooked up and working

$(document).ready(() => {
  fetchInventory();
})

const fetchInventory = () => {
  fetch('/api/v1/')
    .then(response => response.json())
    .then(response => console.log(response[0].price))
    .catch(error => console.log(error))
}
