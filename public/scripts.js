$(document).ready(() => {
  fetchInventory();
  fetchOrders();
  pullCartFromLocalStorage();
})

const fetchInventory = () => {
  fetch('/api/v1/inventory')
    .then(response => response.json())
    .then(items => displayInventory(items))
    .catch(error => console.log(error))
}

const fetchOrders = () => {
  fetch('/api/v1/order_history')
    .then(response => response.json())
    .then(orders => displayOrderHistory(orders))
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

const displayOrderHistory = (orders) => {
  orders.map(order => {

    const purchaseDate = (order.created_at).slice(0, 10);
    const totalOrderPrice  = parseFloat(order.order_total).toFixed(2);

    $('.order-history').append(
      `<div class='previous-orders'>
      <p>Purchase Date: ${purchaseDate}</p>
      <p>Order Total: $${totalOrderPrice}</p>
    </div>`
    )
  })
}

const updateAddItems = (e) => {
  addItemToCart(e);
  cartSubTotal();
  saveCartLocalStorage(e);
}

const addItemToCart = (e) => {
  const itemName = $(e.target).siblings('.item-name').text();
  const price = $(e.target).siblings('.item-price').text();

  $('.cart').append(
    `<div>
      <p>${itemName}</p>
      <p class='cart-item-price'>${price}</p>
    </div>`
  )
}

const cartSubTotal = () => {
  let total = 0;

  $('.cart-item-price').each((i, elem) => {
    total += (parseFloat($(elem).text().slice(8)) || 0);
  })

 $('.total-cart-price').text(`Total Price: $${total.toFixed(2)}`)
}

const saveCartLocalStorage = (e) => {
  const itemName = $(e.target).siblings('.item-name').text();
  const price = $(e.target).siblings('.item-price').text();
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

  storedCart.push({ itemName, price });

  localStorage.setItem('cart', JSON.stringify(storedCart));
}

const pullCartFromLocalStorage = () => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

  storedCart.forEach(item => {
    $('.cart').prepend(
      `<div>
        <p>${item.itemName}</p>
        <p class='cart-item-price'>${item.price}</p>
      </div>`
    )
    cartSubTotal();
  })
}

const saveOrderToHistory = () => {
  const orderTotalPrice = parseFloat($('.total-cart-price').text().split('$')[1]);

  localStorage.clear();

  fetch('/api/v1/order_history', {
    method: 'POST',
    body: JSON.stringify({ order_total: orderTotalPrice }),
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => response.json())
  .then(order => addSingleOrderToHistory(order[0]))
  .catch(error => console.log({ error }))

  cartRefresh();
}

const addSingleOrderToHistory = (order) => {

  const purchaseDate = (order.created_at).slice(0, 10);
  const totalOrderPrice  = parseFloat(order.order_total).toFixed(2);

  $('.order-history').append(
    `<div class='previous-orders'>
    <p>Purchase Date: ${purchaseDate}</p>
    <p>Order Total: $${totalOrderPrice}</p>
  </div>`
  )
}

const cartRefresh = () => {
  localStorage.clear();
  $('.cart').empty();
  $('.total-cart-price').text('');
}

const toggleOrderHistoryPanel = () => {
  const text =  $('.view-history').text() == 'View Order History' ? 'Hide Order History' : 'View Order History';

  $('.view-history').text(text);
  $('.order-history').toggleClass('show');
}

const toggleCartPanel = () => {
  const text =  $('.view-cart').text() == 'View Cart' ? 'Hide Cart' : 'View Cart';

  $('.view-cart').text(text);
  $('.shopping-cart').toggleClass('show');
}

$('.view-cart').click(toggleCartPanel)
$('.view-history').click(toggleOrderHistoryPanel)
$('.item-list').click('.add-to-cart', updateAddItems)
$('.purchase-btn').click(saveOrderToHistory)
$('.clear-cart-btn').click(cartRefresh)
