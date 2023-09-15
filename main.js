let container = document.querySelector(".container");
let startButton = document.querySelector(".button-19");
let wrapper = document.querySelector(".wrapper");
let slider = document.querySelector(".slider");

let sliderNumberDiv = document.createElement("div");
let rightContainer = document.createElement("div");
let newGridButton = document.createElement("button");
let closeGridButton = document.createElement("button");

let isGridFilled = false;
let isClosing = false;
let isNewGridActive = false;

let sliderNumber = 16;
let realSlideNumber;

let sliderNumberTimeout;
let sliderTimeout;
let rightContainerTimeout;
let closingBtnTimeout;

let gridSize = 16;
const DELAY_PER_ELEMENT = 8;

function fillGridElements(newGridSize, newPixelSize) {
  gridSize = newGridSize;

  if (isGridFilled) {
    let gridElements = document.querySelectorAll(".div-element");
    gridElements.forEach(element => {
        element.remove();
    });
  }
  for (let index = 0; index < newGridSize * newGridSize; index++) {
    let gridElement = document.createElement("div");

    gridElement.classList.add("div-element");
    
    gridElement.style.height = newPixelSize + 'px';
    gridElement.style.width = newPixelSize + 'px';
    
    container.appendChild(gridElement);
  }
  
  isGridFilled = true;
}

function setupSliderNumber() {
  sliderNumberDiv.classList.add("slider-number");
  sliderNumberDiv.innerText = "36 x 36";
  sliderNumberDiv.style.opacity = '0';
}

function setupNewGridWrapper() {
  newGridButton.classList.add("button-new-grid");
  newGridButton.innerText = "New Grid";
}

function setupCloseButton() {
  closeGridButton.classList.add("close-button");
  closeGridButton.innerText = "X";
}

function setupRightContainer() {
  rightContainer.classList.add("right-container");
}

fillGridElements(16, 30);

startButton.addEventListener('click', () => {
  startButton.style.cursor = "default"; 
  startButton.style.opacity = "0";
  
  setTimeout(() => {
    startButton.style.display = "none";
  }, 1000); 
  
  let gridElements = document.querySelectorAll(".div-element");
  
  for (let index = 0; index < gridSize * gridSize; index++) {
    setTimeout(() => {
      gridElements[index].style.backgroundColor = "white";
      gridElements[index].classList.add("active");
    }, DELAY_PER_ELEMENT * index);
  }
  
  setupNewGridWrapper();
  sliderNumberDiv.style.opacity = '0';
  wrapper.appendChild(newGridButton);
  setTimeout(() => {
    newGridButton.style.opacity = "1";
  }, 300);
});

newGridButton.addEventListener('click', () => {
  if (isClosing) {
    return;
  }
  
  if (!isNewGridActive) {
    isNewGridActive = true;
  }
  else { return; }

  slider.value = 36;
  slider.style.display = "block";

  newGridButton.innerText = "Set Size";
  newGridButton.classList.toggle("button-set-size");
  
  if (!document.querySelector(".close-button")) {
    wrapper.appendChild(closeGridButton);
  }
  
  rightContainer.style.animation = "";
  
  setupCloseButton();
  wrapper.appendChild(closeGridButton);
  closingBtnTimeout = setTimeout(() => {
    closeGridButton.style.opacity = "1";
  }, 300);

  setupRightContainer();
  wrapper.appendChild(rightContainer);
  rightContainerTimeout = setTimeout(() => {
    rightContainer.style.opacity = "1";
  }, 300);
  
  sliderTimeout = setTimeout(() => {
    slider.style.visibility = "visible";
    slider.style.opacity = "0.7"; 
  }, 450);

  setupSliderNumber();
  wrapper.appendChild(sliderNumberDiv);
  sliderNumberTimeout = setTimeout(() => {
    sliderNumberDiv.style.opacity = "1";
  }, 450);

  newGridButton.addEventListener('click', function() {
    let sliderNumber = parseInt(slider.value);
    pixelSize = 480 / slider.value;

    console.log(sliderNumber);
    console.log(pixelSize);

    fillGridElements(sliderNumber, pixelSize);
  });

});

closeGridButton.addEventListener('click', () => {
  clearTimeout(sliderNumberDiv);
  clearTimeout(closingBtnTimeout);
  clearTimeout(rightContainerTimeout);
  clearTimeout(sliderTimeout);

  isClosing = true;
  isNewGridActive = false;
  
  newGridButton.innerText = "New Grid";
  newGridButton.classList.toggle("button-set-size");

  rightContainer.style.animation = "shrinkRectangle 1s backwards";
  closeGridButton.remove();
  closeGridButton.style.opacity = '0';

  setTimeout(() => {
    rightContainer.style.opacity = '0';
  }, 20)

  slider.style.display = 'none';
  slider.style.opacity = "0";

  sliderNumberDiv.remove();

  setTimeout(() => {
    isClosing = false;
  }, 20);
});

slider.addEventListener('input', function() {
  if (slider.value < 10) {
    sliderNumberDiv.innerText = `${slider.value}  x ${slider.value}`;
  }
  else {
    sliderNumberDiv.innerText = `${slider.value} x ${slider.value}`;
  }
});

