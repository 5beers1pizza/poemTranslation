const autoList = (inputField, listArr, closeDelay, actionFunc) => {
    let key,
        keyEnterCount = 0,
        currentFocus = -1; //what item will be focused after an action; -1 by default as we will increase at least by one to achieve arr[0]
        keyUpLeftCount = 0,
        keyDownRightCount = 0;
    let autoCompleteList;
    inputField.addEventListener("keydown", () => {
        closeList();
        autoCompleteList = document.createElement("div");
        autoCompleteList.setAttribute("class", "autocomplete-items");
        inputField.parentNode.appendChild(autoCompleteList);
        key = event.key.toLowerCase();
        switch (key) {
            case "arrowdown":
            case "arrowright":
                currentFocus++;
                keyEnterCount = 1;
                keyUpLeftCount = 0;
                keyDownRightCount++;
                break;
            case "arrowup":
            case "arrowleft":
                currentFocus <= 0 ? currentFocus = 0 : currentFocus--;
                keyEnterCount = 1;
                keyUpLeftCount++;
                keyDownRightCount = 0;
                break;
            case "enter":
                event.preventDefault();
                keyEnterCount++;
                currentFocus === -1 ? currentFocus = 0 : null;
                break;
            default:
                keyEnterCount = 0;
                keyUpLeftCount = 0;
                keyDownRightCount = 0;
                currentFocus = -1;
                return;
        }
        let autoCompleteItems;
        listArr.forEach(elem => {
            if (elem.substring(0, inputField.value.length).toLowerCase() === inputField.value.toLowerCase()) {
                autoCompleteItems = document.createElement("div");
                autoCompleteItems.innerHTML = `<p>${elem}</p>`;
                autoCompleteItems.innerHTML += `<input type='hidden' value='${elem}'>`;
                autoCompleteList.appendChild(autoCompleteItems);
            }
        });
        autoCompleteList.addEventListener('click', () => {
            inputField.value = event.target.innerHTML;
            closeList(inputField);
            setTimeout(() => actionFunc(inputField.value), closeDelay);
        });
        const p = autoCompleteList.getElementsByTagName('p');
        if (currentFocus >= (p.length - 1)) {currentFocus = (p.length - 1)}
        p[currentFocus].style = "background-color: rgb(248, 242, 238)";
        if (key === 'enter' && keyEnterCount >= 2) {
            inputField.value = p[currentFocus].innerHTML
        }
        if (p) {
            autoCompleteList.addEventListener('mouseover', () => {
                p[currentFocus].style = ""
            })
        }
        if (keyEnterCount >= 3) {
            actionFunc(inputField.value)
        }
    });
    inputField.addEventListener("input", () => {
        closeList();
        autoCompleteList = document.createElement("div");
        autoCompleteList.setAttribute("class", "autocomplete-items");
        inputField.parentNode.appendChild(autoCompleteList);
        let autoCompleteItems;
        listArr.forEach(elem => {
            if (elem.substring(0, inputField.value.length).toLowerCase() === inputField.value.toLowerCase()) {
                autoCompleteItems = document.createElement("div");
                autoCompleteItems.innerHTML = `<p>${elem}</p>`;
                autoCompleteItems.innerHTML += `<input type='hidden' value='${elem}'>`;
                autoCompleteList.appendChild(autoCompleteItems);
            }
        });
        autoCompleteList.addEventListener('click', () => {
            inputField.value = event.target.innerHTML;
            closeList(inputField);
            setTimeout(() => actionFunc(inputField.value), closeDelay);
        });
        if ((keyUpLeftCount === 1 && keyDownRightCount === 0) || (keyUpLeftCount === 0 && keyDownRightCount === 1)) {
            listArr.forEach(elem => {
                if (elem.substring(0, inputField.value.length).toLowerCase() === inputField.value.toLowerCase()) {
                    currentFocus = listArr.indexOf(elem);
                }
            });
        }
        const p = autoCompleteList.getElementsByTagName('p');
        if (currentFocus >= (p.length - 1)) {currentFocus = (p.length - 1)}
        if (currentFocus > -1 && p) {
            p[currentFocus].style = "background-color: rgb(248, 242, 238)";
            autoCompleteList.addEventListener('mouseover', () => {
                p[currentFocus].style = "";
            })}
        if (key === 'enter' && keyEnterCount >= 2) {
            inputField.value = p[currentFocus].innerHTML
        }
        if (keyEnterCount >= 3) {
            actionFunc(inputField.value)
        }
    });

    function closeList(node) {
        if (autoCompleteList) {
            if (event.target !== autoCompleteList && event.target !== node) {
                autoCompleteList.parentNode.removeChild(autoCompleteList);
            }
        }
    }
    function closeList(node) {
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (event.target != x[i] && event.target != node) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", () => closeList(inputField));
}
const languages = ["french", "english", "german", "italian", "portuguese", "spanish", "romanian", "arabic", "ukrainian"];
const languagesInput = document.querySelector(".joke input");
autoList(languagesInput, languages, 500, langSwitch);
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