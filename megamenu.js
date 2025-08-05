// نمایش/مخفی باکس
document.querySelector("#toggleBoxBtn").addEventListener("click", function () {
  document.querySelector("#box").classList.toggle("hidden");
});

// فعال‌سازی حالت تاریک
document.querySelector("#darkModeBtn").addEventListener("click", function () {
  document.body.classList.toggle("dark");
});

// آکاردئون
document.querySelectorAll(".accordion").forEach(function (title, index) {
  title.addEventListener("click", function () {
    const panel = document.querySelectorAll(".panel")[index];
    panel.classList.toggle("open");
  });
});


let selectedProduct = "";

function openOrderModal(productName) {
  console.log("x");
  
  selectedProduct = productName;
  document.getElementById("productName").innerText = productName;
  document.getElementById("orderModal").classList.remove("hidden");
}

function closeOrderModal() {
  document.getElementById("orderModal").classList.add("hidden");
}

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const order = {
    product: selectedProduct,
    phone: document.getElementById("phone").value,
    amount: document.getElementById("amount").value,
    deliveryDate: document.getElementById("deliveryDate").value,
    notes: document.getElementById("notes").value,
    trackingCode: "TMN" + Date.now()
  };

  localStorage.setItem(order.trackingCode, JSON.stringify(order));

  document.getElementById("trackingCodeDisplay").innerText = order.trackingCode;
  document.getElementById("orderModal").classList.add("hidden");
  document.getElementById("trackingResult").classList.remove("hidden");

  // جایگزین با EmailJS یا سرویس پیامک در مرحله بعدی
});



function openTrackingModal() {
  document.getElementById("trackingModal").classList.remove("hidden");
}

function closeTrackingModal() {
  document.getElementById("trackingModal").classList.add("hidden");
}

function closeOrderDetails() {
  document.getElementById("orderDetails").classList.add("hidden");
}
function trackOrder() {
  const code = document.getElementById("trackingInput").value;
  const data = localStorage.getItem(code);

  if (!data) {
    alert("سفارشی با این کد پیدا نشد.");
    return;
  }

  const order = JSON.parse(data);

  const infoHtml = `
    <p><strong>محصول:</strong> ${order.product}</p>
    <p><strong>شماره تماس:</strong> ${order.phone}</p>
    <p><strong>مقدار:</strong> ${order.amount}</p>
    <p><strong>تاریخ تحویل:</strong> ${order.deliveryDate}</p>
    <p><strong>توضیحات:</strong> ${order.notes}</p>
    <p><strong>کد رهگیری:</strong> ${order.trackingCode}</p>
  `;

  document.getElementById("orderInfo").innerHTML = infoHtml;
  document.getElementById("trackingModal").classList.add("hidden");
  document.getElementById("orderDetails").classList.remove("hidden");
}


function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/* اسلایدشو دستی*/
/*
let slideIndex = 1;
showSlides(slideIndex);

function showSlides() {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
*/
/* اسلاید شو خودکار */

let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("mySlides fade");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000); // تغییر هر ۳ ثانیه
}