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
    let name = item.title;
    let description = item.description;
    let img = item.picture_url;
    let price = JSON.parse(item.price).toFixed(2);

    $('.item-list').append(`<div>
      <h3 class='item-name'>${name}</h3>
      <img src=${img} />
      <p>${description}</p>
      <p class='item-price'>price: $${price}</p>
      <button class="add-to-cart">Add to cart</button>
    </div>`)
  })
}

const addItemToCart = (e) => {
  const itemName = $(e.target).siblings('.item-name').text();
  const price = $(e.target).siblings('.item-price').text();

  $('.shopping-cart').prepend(
    `<div>
      <p>${itemName}</p>
      <p class='cart-item-price'>${price}</p>
    </div>`
  )

cartSubTotal();

}

const cartSubTotal = () => {
  let total = 0;

  $('.cart-item-price').each((i, elem) => {
    total += parseFloat($(elem).text().split('$')[1]);
  })

 $('.total-cart-price').text(`Total Price: $${total.toFixed(2)}`)
 console.log($('.total-cart-price').text().split('$')[1]);
}

// const saveCartLocalStorage = () => {
//
// }

$('.item-list').click('.add-to-cart', addItemToCart)

const saveOrder = () => {
  const orderTotalPrice = parseFloat($('.total-cart-price').text().split('$')[1])

  fetch('/api/v1/order_history', {
    method: 'POST',
    body: JSON.stringify({ order_total: orderTotalPrice }),
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => response.json())
  .then(results => console.log(results))
  .catch(error => console.log({ error }))

  console.log('yay clicked');
}

$('.purchase-btn').on('click', saveOrder)
