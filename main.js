let container = document.querySelector(".container");
let startButton = document.createElement("button");

function removeStartButton() {
    startButton.classList.add("start-button");

    container.appendChild(startButton);
}

function fillGridElements() {


    for (var i = 0; i < 256; i++) {
        let gridElement = document.createElement("div");
        gridElement.classList.add("div-element");
        
        container.appendChild(gridElement);
    }

}

fillGridElements();