let container = document.querySelector(".container");
let startButton = document.querySelector(".button-19");

const GRID_SIZE = 16;
const DELAY_PER_ELEMENT = 8;

function fillGridElements() {
  for (let index = 0; index < GRID_SIZE * GRID_SIZE; index++) {
    let gridElement = document.createElement("div");
    gridElement.classList.add("div-element");
    container.appendChild(gridElement);
  }
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
});