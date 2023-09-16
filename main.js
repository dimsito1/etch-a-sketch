let container = document.querySelector(".container");
let startButton = document.querySelector(".button-19");
let wrapper = document.querySelector(".wrapper");
let slider = document.querySelector(".slider");

let colorOptionsButton = document.createElement("button");
let sliderNumberDiv = document.createElement("div");
let rightContainer = document.createElement("div");
let leftContainer = document.createElement("div");
let newGridButton = document.createElement("button");
let closeGridButton = document.createElement("button");

let isGridFilled = false;
let isClosing = false;
let isNewGridActive = false;
let isSliderActive = false;
let isDragging = false;

let leftContainerTimeout;
let sliderNumberTimeout;
let sliderTimeout;
let rightContainerTimeout;
let closingBtnTimeout;

let gridSize = 16;

function fillGridElements(newGridSize, newPixelSize) {
  gridSize = newGridSize;

  if (isGridFilled) {
    let gridElements = document.querySelectorAll(".grid-element");
    gridElements.forEach(element => {
        element.remove();
    });
  }

  for (let index = 0; index < newGridSize * newGridSize; index++) {
    let gridElement = document.createElement("div");

    gridElement.classList.add("grid-element");
    gridElement.style.height = newPixelSize + 'px';
    gridElement.style.width = newPixelSize + 'px';
    
    container.appendChild(gridElement);
  }
  
  isGridFilled = true;
}

container.addEventListener('mousedown', function(e) {
    if (e.target.classList.contains('grid-element') &&
        e.target.classList.contains('active')) {
        isDragging = true;
        e.target.style.backgroundColor = "black";
    }
});

container.addEventListener('mouseover', function(e) {
    if (isDragging && e.target.classList.contains('grid-element')) {
        e.target.style.backgroundColor = "purple";
    }
});

document.addEventListener('mouseup', function() {
    isDragging = false;
});

function setupSliderNumber() {
  sliderNumberDiv.classList.add("slider-number");
  sliderNumberDiv.innerText = "16 x 16";
  sliderNumberDiv.style.opacity = '0';
}

function setupNewGridButton() {
  newGridButton.classList.add("rainbow-button-style");
  newGridButton.classList.add("button-new-grid-pos");
  newGridButton.innerText = "New Grid";
}

function setupCloseButton() {
  closeGridButton.classList.add("close-button-style");
  closeGridButton.classList.add("close-button-pos");
  closeGridButton.innerText = "X";
}

function setupColorOptionsButton() {
  colorOptionsButton.classList.add("rainbow-button-style");
  colorOptionsButton.classList.add("color-options-button-pos");
  colorOptionsButton.innerText = "Color Options";
}

function setupRightContainer() {
  rightContainer.classList.add("right-container-pos");
  rightContainer.classList.add("container-style");
  rightContainer.style.animation = "expandRightRectangle 1s forwards";
}

function setupLeftContainer() {
  leftContainer.classList.add("left-container-pos");
  leftContainer.classList.add("container-style");
  leftContainer.style.animation = "expandLeftRectangle 1s forwards";
}

// function addPaintingMode(gridElements, index) {
//   gridElements[index].classList.add("painting-mode");
// }

// function addPaintingMode(gridElements) {
//   gridElements.forEach(element => {
//     element.classList.add("painting-mode");
//   });
// }

function gridAnimation(gridSize, delay) {
  let gridElements = document.querySelectorAll(".grid-element");
  
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
  
  setupColorOptionsButton();
  setupNewGridButton();
  
  sliderNumberDiv.style.opacity = '0';
  wrapper.appendChild(newGridButton);
  wrapper.appendChild(colorOptionsButton);
  setTimeout(() => {
    colorOptionsButton.style.opacity = "1";
    newGridButton.style.opacity = "1";
  }, 300);
});

newGridButton.addEventListener('click', () => {
  if (isClosing) {
    return;
  }
  
  if (!isNewGridActive && !isSliderActive) {
    slider.value = 16;
    slider.style.display = "block";
  
    newGridButton.innerText = "Set Size";
    newGridButton.classList.toggle("common-button-style");
    newGridButton.classList.toggle("rainbow-button-style");
    
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
    
    isNewGridActive = true;
  }
  else {
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
  setupLeftContainer();
  wrapper.appendChild(leftContainer);
  leftContainerTimeout = setTimeout(() => {
    leftContainer.style.opacity = "1";
  }, 300)
})

closeGridButton.addEventListener('click', () => {
  clearTimeout(sliderNumberDiv);
  clearTimeout(closingBtnTimeout);
  clearTimeout(rightContainerTimeout);
  clearTimeout(sliderTimeout);

  isSliderActive = false;
  isClosing = true;
  isNewGridActive = false;
  
  newGridButton.innerText = "New Grid";
  newGridButton.classList.toggle("common-button-style");
  newGridButton.classList.toggle("rainbow-button-style");

  rightContainer.style.animation = "shrinkRightRectangle 1s backwards";
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
    sliderNumberDiv.innerText = `${slider.value}\xA0 x ${slider.value}`;
  } else {
    sliderNumberDiv.innerText = `${slider.value} x ${slider.value}`;
  }
});

