const openAddCard = document.querySelector(".add-btn");
const mainContent = document.querySelector(".main__content");
const originalInput = document.querySelector(".original-input");
const translateInput = document.querySelector(".translate-input");
const form = document.querySelector("form");
const cancelBtn = document.querySelector(".cancel-btn");

const openModal = function () {
  document.querySelector(".add-form").classList.remove("hidden");
};

const closeModal = function () {
  document.querySelector(".add-form").classList.add("hidden");
};

const createDeleteBtn = function (card) {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerText = "Delete card";
  deleteBtn.addEventListener("click", (e) => {
    card.remove();
    updateStorage();
  });
  return deleteBtn;
};

const createTranslatedCard = function (card, translated) {
  const translatedCard = document.createElement("div");
  translatedCard.classList.add("flash-card_translated");
  translatedCard.innerText = translated;
  card.addEventListener("click", (e) => {
    translatedCard.classList.toggle("visible");
  });
  return translatedCard;
};

const createCard = function (cardEl) {
  let originalText = originalInput.value;
  let translateText = translateInput.value;

  if (cardEl) {
    originalText = cardEl.original;
    translateText = cardEl.translated;
  }

  const card = document.createElement("div");
  card.classList.add("flash-card");
  const html = `<h2 class="card__title">Original word</h2>
    <p class="card__text">${originalText}</p>`;
  card.insertAdjacentHTML("beforeend", html);
  const deleteBtn = createDeleteBtn(card);
  card.appendChild(deleteBtn);
  const translatedCard = createTranslatedCard(card, translateText);
  card.appendChild(translatedCard);

  mainContent.appendChild(card);
};

const clearInputs = function () {
  originalInput.value = "";
  translateInput.value = "";
};

const updateStorage = function () {
  const cardEl = document.querySelectorAll(".flash-card");

  const cards = [];
  cardEl.forEach((card) => {
    cards.push({
      original: card.querySelector("p").textContent,
      translated: card.querySelector("div").textContent,
    });
  });

  localStorage.setItem("cards", JSON.stringify(cards));
};

// Event listeners

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createCard();
  clearInputs();
  closeModal();
  updateStorage();
});

openAddCard.addEventListener("click", openModal);

cancelBtn.addEventListener("click", closeModal);

const cards = JSON.parse(localStorage.getItem("cards"));

if (cards) {
  cards.forEach((card) => {
    createCard(card);
  });
}
