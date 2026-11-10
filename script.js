const guestCountEl = document.getElementById("guest-count");
const checkinEl = document.getElementById("checkin");
const checkoutEl = document.getElementById("checkout");
const searchMessageEl = document.getElementById("search-message");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.querySelector(".main-nav");

let guestCount = 2;

function formatDate(date) {
  const offset = date.getTimezoneOffset();
  const adjusted = new Date(date.getTime() - offset * 60000);
  return adjusted.toISOString().split("T")[0];
}

function initDates() {
  const today = new Date();
  const checkin = new Date(today);
  checkin.setDate(today.getDate() + 1);

  const checkout = new Date(today);
  checkout.setDate(today.getDate() + 3);

  checkinEl.min = formatDate(today);
  checkoutEl.min = formatDate(checkin);

  checkinEl.value = formatDate(checkin);
  checkoutEl.value = formatDate(checkout);
}

function updateGuestCount() {
  guestCountEl.textContent = `${guestCount} Guest${guestCount > 1 ? "s" : ""}`;
}

document.getElementById("plus-guest").addEventListener("click", () => {
  guestCount = Math.min(guestCount + 1, 8);
  updateGuestCount();
});

document.getElementById("minus-guest").addEventListener("click", () => {
  guestCount = Math.max(guestCount - 1, 1);
  updateGuestCount();
});

checkinEl.addEventListener("change", () => {
  if (!checkinEl.value) return;
  const nextDay = new Date(checkinEl.value + "T12:00:00");
  nextDay.setDate(nextDay.getDate() + 1);
  checkoutEl.min = formatDate(nextDay);

  if (!checkoutEl.value || new Date(checkoutEl.value) <= new Date(checkinEl.value)) {
    checkoutEl.value = formatDate(nextDay);
  }
});

document.getElementById("booking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const location = document.getElementById("location").value.trim() || "Puri, Odisha";
  searchMessageEl.textContent = `Searching stays in ${location} for ${guestCount} guest${guestCount > 1 ? "s" : ""}...`;
});

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => mainNav.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

initDates();
updateGuestCount();
