let container = document.querySelector(".container");
let startButton = document.querySelector(".button-19");
let wrapper = document.querySelector(".wrapper");

let newGridButton = document.createElement("button");
let closeGridButton = document.createElement("button");
let sliderContainer = document.createElement("div");

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
  newGridButton.innerText = "Set Size";
  newGridButton.classList.add("button-new-grid-change");
  
  setupCloseButton();
  wrapper.appendChild(closeGridButton);
  setTimeout(() => {
    closeGridButton.style.opacity = "1";
  }, 300);
});