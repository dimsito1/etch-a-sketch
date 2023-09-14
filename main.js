let container = document.querySelector(".container");
let startButton = document.querySelector(".button-19");
let wrapper = document.querySelector(".wrapper");

let rightContainer = document.createElement("div");
let newGridButton = document.createElement("button");
let closeGridButton = document.createElement("button");
// let sliderContainer = document.createElement("div");

let isNewGridActive = false;

const GRID_SIZE = 16;
const DELAY_PER_ELEMENT = 8;

function fillGridElements() {
  for (let index = 0; index < GRID_SIZE * GRID_SIZE; index++) {
    let gridElement = document.createElement("div");
    gridElement.classList.add("div-element");
    container.appendChild(gridElement);
  }
}

function setupNewGridWrapper() {
  newGridButton.classList.add("button-new-grid");
  newGridButton.innerText = "New Grid";
}

function setupCloseButton() {
  closeGridButton.classList.add("close-button");
  closeGridButton.innerText = "X";
}

function openDropdown(element) {
  element.classList.toggle('open');
    document.getElementsByTagName('body')[0].classList.toggle('open');
};

function setupRightContainer() {
  rightContainer.classList.add("right-container");
}

fillGridElements();

startButton.addEventListener('click', () => {
  startButton.style.cursor = "default"; 
  startButton.style.opacity = "0";
  
  setTimeout(() => {
    startButton.style.display = "none";
  }, 1000); 
  
  let gridElements = document.querySelectorAll(".div-element");
  
  for (let index = 0; index < GRID_SIZE * GRID_SIZE; index++) {
    setTimeout(() => {
      gridElements[index].style.backgroundColor = "white";
      gridElements[index].classList.add("active");
    }, DELAY_PER_ELEMENT * index);
  }
  
  setupNewGridWrapper();
  wrapper.appendChild(newGridButton);
  setTimeout(() => {
    newGridButton.style.opacity = "1";
  }, 300);
  
});

newGridButton.addEventListener('click', () => {
  if (!isNewGridActive) {
    isNewGridActive = true;
  }
  else { return; }

  newGridButton.innerText = "Set Size";
  newGridButton.classList.toggle("button-new-grid-change");
  
  setupCloseButton();

 // Re-append the closeGridButton in case it was previously removed
  if (!document.querySelector(".close-button")) {
    wrapper.appendChild(closeGridButton);
  }

  setupRightContainer();
  rightContainer.style.animation = ""; // Resetting the animation

  wrapper.appendChild(closeGridButton);
  setTimeout(() => {
    closeGridButton.style.opacity = "1";
  }, 300);
  setupRightContainer();
  wrapper.appendChild(rightContainer);
  setTimeout(() => {
    rightContainer.style.opacity = "1";
  }, 300);
  
});

closeGridButton.addEventListener('click', () => {
  isNewGridActive = false;
  
  newGridButton.innerText = "New Grid";
  newGridButton.classList.toggle("button-new-grid-change");

  rightContainer.style.animation = "shrinkRectangle 1s backwards";
  closeGridButton.remove();
  closeGridButton.style.opacity = '0';

  setTimeout(() => {
    rightContainer.style.opacity = '0';
  }, 20)
});