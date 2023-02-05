const products = [
  {
    id: 1,
    choco_name: "Dary mora",
    choco_price: 2.62,
    img: "images/dary_mora.jpg",
    inStock: 20,
  },

  {
    id: 2,
    choco_name: "Orechové srdiečko",
    choco_price: 2.49,
    img: "images/orechove_srdiecko.jpg",
    inStock: 20,
  },

  {
    id: 3,
    choco_name: "Diamant",
    choco_price: 2.82,
    img: "images/diamant.jpg",
    inStock: 20,
  },

  {
    id: 4,
    choco_name: "Hroch",
    choco_price: 4.15,
    img: "images/hroch.jpg",
    inStock: 20,
  },

  {
    id: 5,
    choco_name: "Motorka",
    choco_price: 3.65,
    img: "images/motorka.jpg",
    inStock: 20,
  },

  {
    id: 6,
    choco_name: "Panda",
    choco_price: 10.79,
    img: "images/panda.jpg",
    inStock: 5,
  },

  {
    id: 7,
    choco_name: "čokoládový mix",
    choco_price: 1.96,
    img: "images/cokoladovy_mix.jpg",
    inStock: 10,
  },

  {
    id: 8,
    choco_name: "črievička",
    choco_price: 6.8,
    img: "images/crievicka.jpg",
    inStock: 10,
  },
];

// hiding Elements function :

function hideEl(element) {
  element.classList.add("hidden");
}

// Show Elements function :

function showEl(element) {
  element.classList.remove("hidden");
}

// starting condition function
function startingConditions() {
  hideEl(sendOrderBtn);
  hideEl(cartHead);
  hideEl(clearCartBtn);
  hideEl(totalPriceDiv);
  hideEl(cartEl);
}

function showingElOnClicking() {
  showEl(sendOrderBtn);
  showEl(cartHead);
  showEl(clearCartBtn);
  showEl(totalPriceDiv);
  showEl(cartEl);
}

// 0. Selecting Elements :

const productEl = document.querySelector(".products-container");
const cartEl = document.querySelector(".cart-el");
const cartHead = document.querySelector(".cart-head");
const clearCartBtn = document.querySelector(".clear-cart");
const sendOrderBtn = document.querySelector(".send-your-order");
const cartEmpty = document.querySelector(".empty");
const totalPriceDiv = document.querySelector(".total-price-div");
const subtotal = document.querySelector(".subtotal");
const cartRemove = document.querySelector(".removeCartEl");

// 1.Starting conditions :
startingConditions();

// 2.rendering Choco elements dynamically

function renderProductEl() {
  for (let i = 0; i < products.length; i++) {
    productEl.innerHTML += `
      <section>
      <div class="top-section">
      <h6 class="product-name">${products[i].choco_name}</h6>
      <img src="${products[i].img}" alt="${products[i].choco_name}" />
      </div>
      
      <div class="bottom-section">
      <p class="product-price">${products[i].choco_price} &#8364;</p>
      <button onclick="addToCart(${products[i].id})">pridaj do košíka</button>
      </div>
      </section>
    `;
  }
}

renderProductEl();

// 3. Adding our items to the cart :

// a. create an empty array to store our objects :
let cart = [];

// b. create an add to cart function :

function addToCart(id) {
  // diplaying cart El
  showingElOnClicking();
  hideEl(cartEmpty);
  // check if item already exist in cart
  if (cart.some((element) => element.id === id)) {
    changeCountNumber("add", id);
  } else {
    let item = products.find((product) => product.id === id);
    cart.push({ ...item, count: 1 });
  }

  console.log(cart);
  updateCart();
}

// 4. set an update cart function which will controll our cart content whenever an event happen

function updateCart() {
  renderCartEl();
  subTotal();
}

// 5. rendering/displaying items in our cart :

function renderCartEl() {
  cartEl.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    cartEl.innerHTML += `
      <div class="items-elements">
      <div class="remove-Cart-El">
      <img class="cart-img" src="${cart[i].img}" />
      </div>
      
      <div>
        <p class="price">&#8364;${cart[i].choco_price}</p>
      </div>

      <div class="numberOfItems">
        <div class="btn" onclick="changeCountNumber('add', ${cart[i].id})">+</div>
        <p class="number-of-pieces">${cart[i].count}</p>
        <div class="btn removeCartEl" onclick="changeCountNumber('subtract', ${cart[i].id})">-</div>
      </div>
      </div>
    `;
  }
}

// 6. change count number  :

function changeCountNumber(action, id) {
  cart = cart.map((item) => {
    let countUnits = item.count;

    if (item.id === id) {
      if (action === "subtract" && countUnits > 1) {
        countUnits--;
      } else if (action === "add" && countUnits < item.inStock) {
        countUnits++;
      }
    }

    return { ...item, count: countUnits };
  });

  updateCart();
}

// 7. Calculate and display Sub total value :

function subTotal() {
  let totalPrice = 0;

  for (let i = 0; cart.length > i; i++) {
    totalPrice += cart[i].choco_price * cart[i].count;
  }

  subtotal.innerHTML = `&#8364;${totalPrice.toFixed(2)}`;
}

// 8. Clear Cart Button

clearCartBtn.addEventListener("click", function () {
  startingConditions();
  showEl(cartEmpty);
  cart = [];
  updateCart();
});

///
