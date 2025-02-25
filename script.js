import Sortable from 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/modular/sortable.esm.js';

document.addEventListener('DOMContentLoaded', () => {
  const blockContainer = document.getElementById('block-container');
  const checkButton = document.getElementById('check-button');
  const resetButton = document.getElementById('reset-button');
  const messageDiv = document.getElementById('message');

  const correctSequence = [
    "1280px-CirrusUncinusWithPlane",
    "Imagem2",
    "Imagem3",
    "Imagem4",
    "Imagem5",
    "Imagem6",
    "Imagem7",
    "Imagem8"
  ];

  let blocks = [...correctSequence];
  shuffleArray(blocks);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let currentSequence = [];

  function createImageElement(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    return img;
  }

  function createBlock(text) {
    const block = document.createElement('div');
    block.classList.add('block');

    switch (text) {
      case "Imagem2":
        block.appendChild(createImageElement("/Imagem2.jpg", "Imagem2"));
        break;
      case "1280px-CirrusUncinusWithPlane":
        block.appendChild(createImageElement("/1280px-CirrusUncinusWithPlane.jpg", "1280px-CirrusUncinusWithPlane"));
        break;
      case "Imagem3":
        block.appendChild(createImageElement("/Imagem3.jpg", "Imagem3"));
        break;
      case "Imagem4":
        block.appendChild(createImageElement("/Imagem4.jpg", "Imagem4"));
        break;
      case "Imagem5":
        block.appendChild(createImageElement("/Imagem5.jpg", "Imagem5"));
        break;
      case "Imagem6":
        block.appendChild(createImageElement("/Imagem6.jpg", "Imagem6"));
        break;
      case "Imagem7":
        block.appendChild(createImageElement("/Imagem7.jpg", "Imagem7"));
        break;
      case "Imagem8":
        block.appendChild(createImageElement("/Imagem8.jpg", "Imagem8"));
        break;
      default:
        block.textContent = text;
    }

    const index = correctSequence.indexOf(text);
    return block;
  }

  function updateDisplay() {
    blockContainer.innerHTML = '';
    blocks.forEach(blockText => {
      blockContainer.appendChild(createBlock(blockText));
    });
  }

  updateDisplay();

  new Sortable(blockContainer, {
    animation: 150,
    ghostClass: 'blue-background-class',
    onEnd: function (evt) {
      const newBlocks = [];
      for (let i = 0; i < blockContainer.children.length; i++) {
        newBlocks.push(blockContainer.children[i].textContent || blockContainer.children[i].querySelector('img').alt);
      }
      blocks = newBlocks;
    },
    draggable: ".block",
  });

  checkButton.addEventListener('click', () => {
    currentSequence = [];
    for (let i = 0; i < blocks.length; i++) {
      currentSequence.push(blocks[i]);
    }

    if (currentSequence.length !== correctSequence.length) {
      messageDiv.textContent = "Ainda não montou a sequência completa!";
      return;
    }

    let isCorrect = true;
    for (let i = 0; i < correctSequence.length; i++) {
      if (currentSequence[i] !== correctSequence[i]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      messageDiv.textContent = "Parabéns! Você montou a sequência corretamente!";
    } else {
      messageDiv.textContent = "Sequência incorreta. Tente novamente.";
    }
  });

  resetButton.addEventListener('click', () => {
    shuffleArray(blocks);
    updateDisplay();
    messageDiv.textContent = "";
  });
});