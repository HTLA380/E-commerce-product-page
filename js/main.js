let currentImgNum = 1;
let productCount = 0;
let showcaseImgs = document.querySelectorAll('[data-img="main-img"]');

let thumbnailImgs = document.querySelectorAll('[data-thumbnail-img="main-img-container"]');
thumbnailImgs.forEach((img) => {
  img.addEventListener("click", function (event) {
    changeThumbnailActive(event.target);
    changeShowcaseCurrentImg(event.target);
  });
});

// product counter
let productPlusBtn = document.querySelector(".btn-plus");
let productCountElement = document.querySelector(".product-count");
let productMinusBtn = document.querySelector(".btn-minus");

productPlusBtn.addEventListener("click", increaseProductCount);
productMinusBtn.addEventListener("click", decreaseProductCount);

// add-to-cart btn function
const addToCartBtn = document.querySelector("#add-to-cart-btn");
let cartBody = document.querySelector(".cart-body");

addToCartBtn.addEventListener("click", updateCartItem);


//auto hiding the cart element when user click the main content of the page
document.querySelector(".main").addEventListener("click", () => {
  addClass(".cart-items-container", "d-none");
});

function changeNextShowcaseImg(imgElement) {
  if (currentImgNum >= 4) return;
  currentImgNum++;
  updateShowcaseCurrentImg(imgElement);
}
function changeShowcasePrevImg(imgElement) {
  if (currentImgNum <= 1) return;
  currentImgNum--;
  updateShowcaseCurrentImg(imgElement);
}

// updating current showcase img
function updateShowcaseCurrentImg(mainImg) {
  // checking the mainImg if it's more than one img or not
  if (mainImg.length > 1) {
    mainImg.forEach(
      (img) => (img.src = `images/image-product-${currentImgNum}.jpg`)
    );
  } else {
    mainImg.src = `images/image-product-${currentImgNum}.jpg`;
  }
}

// showing the popup when the current showcase img got click
let showcaseImgContainer = document.querySelector("#current-img-container");
showcaseImgContainer.addEventListener("click", () => {
  // showing the popup
  removeClass(".popup-img-container", "d-none");

  // changing the popup current showcase img
  updateShowcaseCurrentImg(popupCurrentShowcaseImg);
  updateThumbnailCurrentImg(popupThumbNailContainer);
});

// <================================ popup ================================> //
const popupImgControlNextBtn = document.querySelector("#btn-next");
const popupImgControlPrevBtn = document.querySelector("#btn-prev");
const popupCurrentShowcaseImg = document.querySelector("#popup-current-img");
const popupThumbNailContainer = document.querySelectorAll('[data-popup-img="thumbnail-container"]');
const popupCloseBtn = document.querySelector(".close-btn");

popupImgControlNextBtn.addEventListener("click", () => {
  changeNextShowcaseImg(popupCurrentShowcaseImg);
  updateThumbnailCurrentImg(popupThumbNailContainer);
});

popupImgControlPrevBtn.addEventListener("click", () => {
  changeShowcasePrevImg(popupCurrentShowcaseImg);
  updateThumbnailCurrentImg(popupThumbNailContainer);
});

function updateThumbnailCurrentImg(container) {
  container.forEach((thumbnailContainer) => {
    thumbnailContainer.classList.remove("thumbnail-active");
    if (thumbnailContainer.firstElementChild.getAttribute('data-thumbnail-img-num') == currentImgNum) {
      thumbnailContainer.classList.add("thumbnail-active");
    } else return;
  });
}

// for popupClose btn
popupCloseBtn.addEventListener("click", hidePopup);

function hidePopup() {
  toggleClass(".popup-img-container", "d-none");

  // updating the current img and thumbnail img after the popup is hidden
  showcaseImgs.forEach(
    (mainImg) => (mainImg.src = `images/image-product-${currentImgNum}.jpg`)
  );
  updateThumbnailCurrentImg(thumbnailImgs);
}

// <==================== for mobile screen size ====================>
const mobileImgControlPrevBtn = document.querySelector("#mobile-btn-prev");
const mobileImgControlNextBtn = document.querySelector("#mobile-btn-next");

mobileImgControlNextBtn.addEventListener("click", () => {
  changeNextShowcaseImg(showcaseImgs);
});

mobileImgControlPrevBtn.addEventListener("click", () => {
  changeShowcasePrevImg(showcaseImgs);
});

// for mobile menu
const hamburgurMenuBtn = document.querySelector(".hamburgar-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuCloseBtn = document.querySelector(".mobile-menu-close-btn");

hamburgurMenuBtn.addEventListener("click", () => {
  mobileMenu.style.left = "0px";

  // adding black background effect when the mobile menu is showing
  addClass(".mobile-menu-overlay", "mobile-menu-active");
});

mobileMenuCloseBtn.addEventListener("click", () => {
  mobileMenu.style.left = "-300px";

  // removing black background effect when the mobile menu is showing
  removeClass(".mobile-menu-overlay", "mobile-menu-active");
});

// <==================== helper functions ====================> //
function toggleClass(element, className) {
  document.querySelector(`${element}`).classList.toggle(className);
}

function removeClass(element, className) {
  document.querySelector(element).classList.remove(className);
}

function addClass(element, className) {
  document.querySelector(element).classList.add(className);
}
// <==========================================================> //


function changeThumbnailActive(element) {
  thumbnailImgs.forEach((img) => img.classList.remove("thumbnail-active"));
  element.classList.add("thumbnail-active");
}

function changeShowcaseCurrentImg(imgContainer) {
  currentImgNum = imgContainer.children[0].getAttribute('data-thumbnail-img-num');
  updateShowcaseCurrentImg(showcaseImgs);
}


// <================= product count functions ==================> //
function increaseProductCount() {
  if (productCount > 99) return;
  productCount++;
  updateProductCount();
}
function decreaseProductCount() {
  if (productCount <= 0) return;
  productCount--;
  updateProductCount();
}
function updateProductCount() {
  productCountElement.innerText = `${productCount}`;
}
// <==========================================================> //


// <================= update cart functions ==================> //
function updateCartItem() {
  if (productCount > 0) {
    addItemToCart();
    
    updateCartNoti();
    removeClass(".cart-noti", "d-none");
  } else {
    removeItemFromCart();
    addClass(".cart-noti", "d-none");
  }
}

function addItemToCart() {
  cartBody.innerHTML = `
  <div class="cart-product-container">
  <div class="cart-product-text-row">
    <img src="images/image-product-${currentImgNum}-thumbnail.jpg" alt="" />
    <div class="cart-text-container">
      <h4>Fall Limited Edition Sneakers</h4>
      <h4 class="cart-amount-row">
      $125.00 × ${productCount} <span class="total">$${
    125 * productCount
  }.00</span>
    </h4>
    </div>
    <span class="delete-icon" onclick="deleteCart()"
      ><img src="images/icon-delete.svg" alt=""
    /></span>
  </div>
  <button class="add-to-cart-btn desktop-cart-btn cart-btn">
    <img src="images/icon-cart.svg" alt="" />
    Add to cart
  </button>
  <button class="add-to-cart-btn mobile-cart-btn cart-btn">
    Checkout
  </button>
</div>
  `;
}

function removeItemFromCart() {
  cartBody.innerHTML = `
  <h4 class="cart-body__empty">Your cart is empty</h4>
  `;
}

function updateCartNoti() {
  document.querySelector(".cart-noti").innerText =
    productCount === 0 ? "" : productCount;
}

function deleteCart() {
  addClass(".cart-items-container", "d-none");

  cartBody.innerHTML = `
  <h4 class="cart-body__empty">Your cart is empty</h4>
  `;

  productCount = 0;
  updateProductCount();
  updateCartNoti();
}
// <==========================================================> //
