const openAddCard = document.querySelector(".add-btn");
const mainContent = document.querySelector(".main__content");
const originalInput = document.querySelector(".original-input");
const translateInput = document.querySelector(".translate-input");
const form = document.querySelector("form");

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
  });
  return deleteBtn;
};

const createTranslatedCard = function (card) {
  const translatedCard = document.createElement("div");
  translatedCard.classList.add("flash-card_translated");
  translatedCard.innerText = translateInput.value;
  card.addEventListener("click", (e) => {
    translatedCard.classList.toggle("visible");
  });
  return translatedCard;
};

const createCard = function () {
  const card = document.createElement("div");
  card.classList.add("flash-card");
  const html = `<h2 class="card__title">Original word</h2>
    <p class="card__text">${originalInput.value}</p>`;
  card.insertAdjacentHTML("beforeend", html);
  const deleteBtn = createDeleteBtn(card);
  card.appendChild(deleteBtn);
  const translatedCard = createTranslatedCard(card);
  card.appendChild(translatedCard);

  mainContent.appendChild(card);
};

const clearInputs = function () {
  originalInput.value = "";
  translateInput.value = "";
};

// Event listeners

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createCard();
  clearInputs();
  closeModal();
});

openAddCard.addEventListener("click", openModal);
