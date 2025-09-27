const gameContainer = document.getElementById('gameContainer');
const message = document.getElementById('message');

// Array of card values (8 pairs)
const cardValues = ['🍎','🍌','🍇','🍉','🍓','🍒','🥝','🍍'];
let cards = [...cardValues, ...cardValues];

// Shuffle function
cards.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Create cards
cards.forEach(value => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = value;
  card.textContent = '';
  gameContainer.appendChild(card);

  card.addEventListener('click', () => {
    if (lockBoard || card === firstCard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.textContent = value;

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lockBoard = true;

    if (firstCard.dataset.value === secondCard.dataset.value) {
      matchedPairs++;
      resetBoard();
      if (matchedPairs === cardValues.length) {
        message.textContent = "🎉 You Win! 🎉";
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
      }, 1000);
    }
  });
});

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
