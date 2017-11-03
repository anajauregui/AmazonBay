$('body').click(() => console.log('hello')) //hooked up and working

$(document).ready(() => {
  fetchInventory();
})

const fetchInventory = () => {
  fetch('/api/v1/inventory')
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
