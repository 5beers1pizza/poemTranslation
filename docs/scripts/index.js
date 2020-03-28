let stateOfAutoList = 0;
let currentFocus = -1;
let keyEnterCount,
    keyUpLeftCount,
    keyDownRightCount = 0;
const autoList = (mainNode, arr) => {
    mainNode.addEventListener("keydown", () => {
        let key = event.key.toLowerCase();
        if (key === 'arrowdown' || key === 'arrowright') {
            stateOfAutoList = 1;
            currentFocus >= (languages.length - 1) ? currentFocus = (languages.length - 1) : currentFocus++;;
            keyEnterCount = 1;
            keyUpLeftCount = 0;
            keyDownRightCount++;
        } else if (key === 'arrowup' || key === 'arrowleft') {
            stateOfAutoList = 1;
            currentFocus <= 0 ? currentFocus = 0 : currentFocus--;
            keyEnterCount = 1;
            keyUpLeftCount++;
            keyDownRightCount = 0;
        } else if (key === 'enter') {
            keyEnterCount++;
            currentFocus === -1 ? currentFocus = 0 : null;
            stateOfAutoList = 1;
            event.preventDefault()
        } else {
            keyEnterCount = 0;
            keyUpLeftCount = 0;
            keyDownRightCount = 0;
        }
        keyEnterCount >= 3 ? langSwitch(mainNode.value) : null;
        closeList();
        let autoCompleteList = document.createElement("div");
        autoCompleteList.setAttribute("class", "autocomplete-items");
        mainNode.parentNode.appendChild(autoCompleteList);
        if (stateOfAutoList) {
            arr.forEach(elem => {
                let autoCompleteItems = document.createElement("div");
                autoCompleteItems.innerHTML = `<p>${elem}</p>`;
                autoCompleteItems.innerHTML += `<input type='hidden' value='${elem}'>`;
                autoCompleteList.appendChild(autoCompleteItems);
                autoCompleteItems.addEventListener('click', () => {
                    mainNode.value = event.target.innerHTML;
                    closeList();
                    setTimeout(() => langSwitch(mainNode.value), 500);
                });
            });
            const p = autoCompleteList.getElementsByTagName('p');
            if (mainNode.value) {
                console.log("====" + keyUpLeftCount + " " + keyDownRightCount);
                if ((keyUpLeftCount === 1 && keyDownRightCount === 0) || (keyUpLeftCount === 0 && keyDownRightCount === 1)) {
                    console.log(88888)
                    languages.forEach(elem => {
                        if (elem.substring(0, mainNode.value.length).toLowerCase() === mainNode.value.toLowerCase()) {
                            currentFocus = languages.indexOf(elem);
                        }
                    });
                }
                if (keyUpLeftCount > 1) {
                    currentFocus;
                } else if (keyDownRightCount > 1) {
                    currentFocus;
                }
            }
            p[currentFocus].style = "background-color: rgb(248, 242, 238)";
            key === 'enter' && keyEnterCount >= 2 ? mainNode.value = p[currentFocus].innerHTML : null;
            p ? autoCompleteList.addEventListener('mouseover', () => {
                p[currentFocus].style = ""
            }) : null;
        } else if (!mainNode.value) {
            arr.forEach(elem => {
                if (elem.substring(0, key.length).toLowerCase() === key) {
                    let autoCompleteItems = document.createElement("div");
                    autoCompleteItems.innerHTML = `<p>${elem}</p>`;
                    autoCompleteItems.innerHTML += `<input type='hidden' value='${elem}'>`;
                    autoCompleteList.appendChild(autoCompleteItems);
                    autoCompleteItems.addEventListener('click', () => {
                        mainNode.value = event.target.innerHTML;
                        closeList(languagesInput);
                        setTimeout(() => langSwitch(mainNode.value), 500);
                    });
                }
            });
        } else {
            arr.forEach(elem => {
                if (elem.substring(0, mainNode.value.length).toLowerCase() === mainNode.value.toLowerCase()) {
                    let autoCompleteItems = document.createElement("div");
                    autoCompleteItems.innerHTML = `<p>${elem}</p>`;
                    autoCompleteItems.innerHTML += `<input type='hidden' value='${elem}'>`;
                    autoCompleteList.appendChild(autoCompleteItems);
                    autoCompleteItems.addEventListener('click', () => {
                        mainNode.value = event.target.innerHTML;
                        closeList(languagesInput);
                        setTimeout(() => langSwitch(mainNode.value), 500);
                    });
                }
            });
        }
    });
    document.addEventListener("click", () => closeList(languagesInput));
}
const clearKeyStatus = (mainNode) => {
    mainNode.addEventListener("keyup", () => {
        let key = event.key.toLowerCase();
        if (!(key === 'arrowdown' || key === 'arrowup' || key === 'enter' || key === 'arrowleft' || key === 'arrowright')) {
            stateOfAutoList = 0;
            currentFocus = -1;
        }
    });
}
function closeList(mainNode) {
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
        if (event.target != x[i] && event.target != mainNode) {
            x[i].parentNode.removeChild(x[i]);
        }
    };
}
const languages = ["french", "english", "german", "italian", "portuguese", "spanish", "romanian", "arabic", "ukrainian"];
const languagesInput = document.querySelector(".joke input");
autoList(languagesInput, languages);
clearKeyStatus(languagesInput);

const imgAreYouCool = document.querySelector("img.are-you-cool");
imgAreYouCool.src = `./assets/cat-${Math.floor(Math.random() * 4 + 1)}.png`;
let poem;

function langSwitch(input) {
    if (poem) {
        poem.style.removeProperty("--hidden-poem")
    }
    const className = `.${input}-version.poem-container`;
    poem = document.querySelector(className);
    const joke = document.querySelector(".joke");
    joke.style.setProperty("--hidden-joke", `hidden`);
    poem.style.setProperty("--hidden-poem", `visible`);
}
const navigation = document.querySelector('nav');
navigation.addEventListener('click', () => {
    const currentBtn = event.target;
    if (currentBtn.tagName.toLowerCase() !== "button") {
        return false
    }
    langSwitch(currentBtn.parentNode.className);
})