let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turno = true;
let count = 0;
const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno) {
            box.innerText = "O";
            box.style.color="green";
            turno = false;
        } else {
            box.innerText = 'X';
            turno = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}!`;
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    for (let pattern of winningPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("Winner:", pos1);
                disableButtons();
                showWinner(pos1);
                return;
            }
        }
    }
    if (count === 9) {
        showDraw();
    }
};

const disableButtons = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableButtons = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const resetGame = () => {
    turno = true;
    count = 0;
    enableButtons();
    msgContainer.classList.add("hide");
};

const showDraw = () => {
    msg.innerText = "Match Drawn! Reset the game or start a new game.";
    msgContainer.classList.remove("hide");
};

newGame.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
