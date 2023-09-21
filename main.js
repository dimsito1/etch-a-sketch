const container = document.querySelector(".container");
const startButton = document.querySelector(".button-19");
const wrapper = document.querySelector(".wrapper");
const slider = document.querySelector(".slider");

const eraser = document.createElement("button");
const colorOptionsButton = document.createElement("button");
const sliderNumberDiv = document.createElement("div");
const rightContainer = document.createElement("div");
const leftContainer = document.createElement("div");
const newGridButton = document.createElement("button");
const closeGridButtonR = document.createElement("button");
const closeGridButtonL = document.createElement("button");
const colorInput = document.createElement("input");
const colorInputWrapper = document.createElement("div");
const rainbowModeButton = document.createElement("div");

let isGridFilled = false;
let isClosingR = false;
let isClosingL = false;
let isNewGridActive = false;
let isSliderActive = false;
let isDragging = false;
let isColorOptionsActive = false;

let currentMode = "color-mode";

let eraserBtnTimeout;
let rainbowBtnTimeout;
let leftContainerTimeout;
let sliderNumberTimeout;
let sliderTimeout;
let rightContainerTimeout;
let closingBtnTimeoutR;
let closingBtnTimeoutL;
let colorInputTimeout;

let gridSize;

function fillGridElements(newGridSize, newPixelSize) {
  gridSize = newGridSize;
  
  if (isGridFilled) {
    const gridElements = document.querySelectorAll(".grid-element");
    gridElements.forEach(element => {
      element.remove();
    });
  }
  
  for (let index = 0; index < newGridSize * newGridSize; index++) {
    const gridElement = document.createElement("div");
    
    gridElement.classList.add("grid-element");
    gridElement.style.height = newPixelSize + 'px';
    gridElement.style.width = newPixelSize + 'px';
    
    container.appendChild(gridElement);
  }
  
  isGridFilled = true;
}

container.addEventListener('mousedown', function (e) {
  if (e.target.classList.contains('grid-element') &&
  e.target.classList.contains('active')) {
    isDragging = true;
    e.target.style.backgroundColor = "black";
  }
});

container.addEventListener('mouseover', function (e) {
  if (isDragging && e.target.classList.contains('grid-element')) {
    e.target.style.backgroundColor = "purple";
  }
});

document.addEventListener('mouseup', function () {
  isDragging = false;
});


function setupColorInput() {
  colorInputWrapper.classList.add("color-input-wrapper");
  colorInput.classList.add("color-input-pos");
  colorInput.setAttribute('type', 'color');
  colorInput.setAttribute('id', 'colorPicker');
  colorInput.setAttribute('value', '#d3a0d6');
  
  colorInputWrapper.appendChild(colorInput);
  wrapper.appendChild(colorInputWrapper);
  colorInput.style.zIndex = '3';
  colorInputTimeout = setTimeout(() => {
    colorInputWrapper.style.opacity = "1";
  }, 300);
}

function setupSliderNumber() {
  sliderNumberDiv.classList.add("slider-number");
  sliderNumberDiv.innerText = "16 x 16";
  sliderNumberDiv.style.opacity = '0';
  wrapper.appendChild(sliderNumberDiv);
  sliderNumberTimeout = setTimeout(() => {
    sliderNumberDiv.style.opacity = "1";
  }, 450);
}

function setupRainbowModeButton() {
  rainbowModeButton.classList.add("common-button-style");
  rainbowModeButton.classList.add("rainbow-mode-button-pos");
  rainbowModeButton.classList.add("buttons-modes");
  rainbowModeButton.dataset.mode = "rainbow-mode";
  rainbowModeButton.innerText = "Rainbow Mode";
  wrapper.appendChild(rainbowModeButton);
  
  rainbowBtnTimeout = setTimeout(() => {
    rainbowModeButton.style.opacity = "1";
  }, 300);
}

function setupEraserButton() {
 eraser.classList.add("common-button-style");
 eraser.classList.add("eraser-pos");
 eraser.classList.add("buttons-modes");
 eraser.dataset.mode = "eraser";
 eraser.innerText = "Eraser";
 wrapper.appendChild(eraser);

  eraserBtnTimeout = setTimeout(() => {
   eraser.style.opacity = "1";
  }, 300);
}

function setupNewGridButton() {
  newGridButton.classList.add("rainbow-button-style");
  newGridButton.classList.add("button-new-grid-pos");
  newGridButton.innerText = "New Grid";
  wrapper.appendChild(newGridButton);
  setTimeout(() => {
    newGridButton.style.opacity = "1";
  }, 300);
}

function setupCloseButtonR() {
  closeGridButtonR.classList.add("close-button-style");
  closeGridButtonR.classList.add("close-button-pos-r");
  closeGridButtonR.innerText = "X";
  wrapper.appendChild(closeGridButtonR);
  closingBtnTimeoutR = setTimeout(() => {
    closeGridButtonR.style.opacity = "1";
  }, 300);
}

function setupCloseButtonL() {
  closeGridButtonL.classList.add("close-button-style");
  closeGridButtonL.classList.add("close-button-pos-l");
  closeGridButtonL.innerText = "X";
  wrapper.appendChild(closeGridButtonL);
  closingBtnTimeoutL = setTimeout(() => {
    closeGridButtonL.style.opacity = "1";
  }, 300);
}

function setupColorOptionsButton() {
  colorOptionsButton.classList.add("rainbow-button-style");
  colorOptionsButton.classList.add("color-options-button-pos");
  colorOptionsButton.innerText = "Color Options";
  wrapper.appendChild(colorOptionsButton);
  setTimeout(() => {
    colorOptionsButton.style.opacity = "1";
  }, 300);
}

function setupRightContainer() {
  rightContainer.classList.add("right-container-pos");
  rightContainer.classList.add("container-style");
  rightContainer.style.animation = "expandRightRectangle 1s forwards";
  wrapper.appendChild(rightContainer);
  rightContainerTimeout = setTimeout(() => {
    rightContainer.style.opacity = "1";
  }, 300);
}

function setupLeftContainer() {
  leftContainer.classList.add("left-container-pos");
  leftContainer.classList.add("container-style");
  leftContainer.style.animation = "expandLeftRectangle 1s forwards";
  wrapper.appendChild(leftContainer);
  leftContainerTimeout = setTimeout(() => {
    leftContainer.style.opacity = "1";
  }, 300)
}

function gridAnimation(gridSize, delay) {
  const gridElements = document.querySelectorAll(".grid-element");
  
  for (let index = 0; index < gridSize * gridSize; index++) {
    setTimeout(() => {
      gridElements[index].classList.add("active");
      
      setTimeout(() => {
        gridElements[index].classList.add("painting-mode");
      }, 100);
    }, delay * index);
  }
}

fillGridElements(16, 30);

startButton.addEventListener('click', () => {
  startButton.style.cursor = "default";
  startButton.style.opacity = "0";
  
  setTimeout(() => {
    startButton.style.display = "none";
  }, 1000);
  
  gridAnimation(gridSize, 8);
  
  sliderNumberDiv.style.opacity = '0';
  
  setupColorOptionsButton();
  setupNewGridButton();
});

newGridButton.addEventListener('click', () => {
  if (isClosingR) {
    return;
  }
  
  if (!isNewGridActive && !isSliderActive) {
    //click new grid
    slider.value = 16;
    slider.style.display = "block";
    
    newGridButton.innerText = "Set Size";
    newGridButton.classList.toggle("common-button-style");
    newGridButton.classList.toggle("rainbow-button-style");
    
    if (!document.querySelector(".close-button")) {
      wrapper.appendChild(closeGridButtonR);
    }
    
    rightContainer.style.animation = "";
    
    setupCloseButtonR();
    setupRightContainer();
    
    sliderTimeout = setTimeout(() => {
      slider.style.visibility = "visible";
      slider.style.opacity = "0.7";
    }, 450);
    
    setupSliderNumber();
    
    isNewGridActive = true;
  }
  else {
    // click set size
    let sliderNumber = parseInt(slider.value);
    container.style.gridTemplateColumns = `repeat(${sliderNumber}, 1fr)`;
    
    let dleayPerElement = 2048 / (sliderNumber * sliderNumber);
    pixelSize = Math.floor(480 / slider.value);
    
    let totalSize = pixelSize * slider.value;
    container.style.width = `${totalSize}px`;
    container.style.height = `${totalSize}px`;
    
    
    console.log("slider-number: " + sliderNumber);
    console.log("pixel-size: " + pixelSize);
    console.log("delay-per-element: " + dleayPerElement);
    
    fillGridElements(sliderNumber, pixelSize);
    gridAnimation(sliderNumber, dleayPerElement);
    
    isNewGridActive = false;
    isSliderActive = true;
  }
});

colorOptionsButton.addEventListener('click', () => {
  if (isClosingL) {
    return;
  }
  
  if (!isColorOptionsActive) {
    colorOptionsButton.innerText = "Color Mode";
    colorOptionsButton.classList.toggle("rainbow-button-style");
    colorOptionsButton.classList.toggle("common-button-style");
    colorOptionsButton.classList.toggle("common-button-clicked-style");
    colorOptionsButton.classList.add("buttons-modes");
    colorOptionsButton.dataset.mode = "color-mode";
    
    setupCloseButtonL();
    
    setupLeftContainer();
    
    //ISSUE IN COLOR INPUT ERROR 404
    // setupColorInput();
    
    setupRainbowModeButton();
    
    setupEraserButton();

    const buttonsModes = document.querySelectorAll(".buttons-modes");

    buttonsModes.forEach(btn => {
      btn.addEventListener('click', function () {
        buttonsModes.forEach(innerBtn => {
          innerBtn.classList.remove("common-button-clicked-style");
        });
        this.classList.add("common-button-clicked-style")
    
        switch(this.dataset.mode) {
          case "color-mode":
            currentMode = "color-mode";
            break;
          case "rainbow-mode":
            currentMode = "rainbow-mode";
            break;
          case "eraser":
            currentMode = "eraser";
            break;
        }
        console.log(currentMode);
      });
    });

    isColorOptionsActive = true;
  }
  // else {
    
    
    //   isColorOptionsActive = false;
    // }
  });
  

closeGridButtonL.addEventListener('click', () => {
  clearTimeout(rainbowBtnTimeout);
  clearTimeout(closingBtnTimeoutL);
  clearTimeout(leftContainerTimeout);
  clearTimeout(eraserBtnTimeout);

  isClosingL = true;
  isColorOptionsActive = false;

  colorOptionsButton.innerText = "Color Options";
  colorOptionsButton.classList.toggle("common-button-clicked-style");
  colorOptionsButton.classList.toggle("common-button-style");
  colorOptionsButton.classList.toggle("rainbow-button-style");

  leftContainer.style.animation = "shrinkLeftRectangle 1s backwards";
  closeGridButtonL.remove();
  closeGridButtonL.style.opacity = '0';

  rainbowModeButton.remove();
  rainbowModeButton.style.opacity = '0';

  eraser.remove();
  eraser.style.opacity = '0';

  setTimeout(() => {
    leftContainer.style.opacity = '0';
  }, 20);

  setTimeout(() => {
    isClosingL = false;
  }, 20);
});

closeGridButtonR.addEventListener('click', () => {
  clearTimeout(sliderNumberDiv);
  clearTimeout(closingBtnTimeoutR);
  clearTimeout(rightContainerTimeout);
  clearTimeout(sliderTimeout);

  isSliderActive = false;
  isClosingR = true;
  isNewGridActive = false;

  newGridButton.innerText = "New Grid";
  newGridButton.classList.toggle("common-button-style");
  newGridButton.classList.toggle("rainbow-button-style");

  rightContainer.style.animation = "shrinkRightRectangle 1s backwards";
  closeGridButtonR.remove();
  closeGridButtonR.style.opacity = '0';

  setTimeout(() => {
    rightContainer.style.opacity = '0';
  }, 20)

  slider.style.display = 'none';
  slider.style.opacity = "0";

  sliderNumberDiv.remove();

  setTimeout(() => {
    isClosingR = false;
  }, 20);
});

slider.addEventListener('input', function () {
  if (slider.value < 10) {
    sliderNumberDiv.innerText = `${slider.value}\xA0 x ${slider.value}`;
  } else {
    sliderNumberDiv.innerText = `${slider.value} x ${slider.value}`;
  }
});

