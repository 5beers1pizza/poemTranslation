const languages = ["french", "english", "german", "italian", "portuguese", "spanish", "romanian", "arabic", "ukrainian"];
//autofill suggestions for language joke input
const languagesInput = document.querySelector(".joke input");
let stateOfAutoList = 0;
let currentFocus = -1;
let keyEnterCount = 0;
const autoList = (arr) => {
    //execute a function when someone writes in the text field:
    languagesInput.addEventListener("keydown", () => {
        let key = event.key.toLowerCase();
        if (key === 'arrowdown') {
            stateOfAutoList = 1;
            currentFocus++;
            currentFocus >= 8 ? currentFocus = 8 : null;
            keyEnterCount = 1;
        } else if (key === 'arrowup') {
            stateOfAutoList = 1;
            currentFocus <= 0 ? currentFocus = 0 : currentFocus--;
            keyEnterCount = 1;
        } else if (key === 'enter') {
            keyEnterCount++;
            currentFocus === -1 ? currentFocus = 0 : null;
            stateOfAutoList = 1;
            event.preventDefault()
        } else {
            keyEnterCount = 0;
        }
        keyEnterCount >= 3 ? langSwitch(languagesInput.value) : null;
        //close any already open lists of autocompleted values:
        closeList();
        //create a div that will contain the suggestions:
        let autoCompleteList = document.createElement("div");
        autoCompleteList.setAttribute("class", "autocomplete-items");
        //append the element as a to autocomplete container:
        languagesInput.parentNode.appendChild(autoCompleteList);
        //autocomplete suggestions field only when input passed one of languages:
        if (stateOfAutoList && !languagesInput.value) {
            arr.forEach(elem => {
                let autoCompleteItems = document.createElement("div");
                autoCompleteItems.innerHTML = `<p>${elem}</p>`;
                autoCompleteItems.innerHTML += `<input type='hidden' value='${elem}'>`;
                autoCompleteList.appendChild(autoCompleteItems);
                autoCompleteItems.addEventListener('click', () => {
                    languagesInput.value = event.target.innerHTML;
                    closeList();
                });
            });
            const p =  autoCompleteList.getElementsByTagName('p');          
            p[currentFocus].style = "background-color: rgb(248, 242, 238)";
            key === 'enter' && keyEnterCount >= 2 ? languagesInput.value = p[currentFocus].innerHTML : null;
            autoCompleteList.addEventListener('mouseover', () => {
                p[currentFocus].style = ""
            });
        } else if (!languagesInput.value) {
            arr.forEach(elem => {
                if (elem.substring(0, key.length).toLowerCase() === key) {
                    let autoCompleteItems = document.createElement("div");
                    autoCompleteItems.innerHTML = `<p>${elem}</p>`;
                    autoCompleteItems.innerHTML += `<input type='hidden' value='${elem}'>`;
                    //append autocomplete container with suggestions:
                    autoCompleteList.appendChild(autoCompleteItems);
                    autoCompleteItems.addEventListener('click', () => {
                        languagesInput.value = event.target.innerHTML;
                        closeList();
                    });
                }
            });
        } else {
            arr.forEach(elem => {
                if (elem.substring(0, languagesInput.value.length).toLowerCase() === languagesInput.value.toLowerCase()) {
                    let autoCompleteItems = document.createElement("div");
                    autoCompleteItems.innerHTML = `<p>${elem}</p>`;
                    autoCompleteItems.innerHTML += `<input type='hidden' value='${elem}'>`;
                    //append autocomplete container with suggestions:
                    autoCompleteList.appendChild(autoCompleteItems);
                    autoCompleteItems.addEventListener('click', () => {
                        languagesInput.value = event.target.innerHTML;
                        closeList();
                    });
                }
            });
        }
    });
    //execute the function presses a key on the keyboard:
    //execute a function when someone clicks in the document:
    document.addEventListener("click", function (e) {
        closeList(e.target);
    });
}
languagesInput.addEventListener("keyup", () => {
    let key = event.key.toLowerCase();
    if (!(key === 'arrowdown' || key === 'arrowup' || key === 'enter')) {
    stateOfAutoList = 0;
    currentFocus = -1;
    }
});

autoList(languages);
function closeList(node) {
    //close all autocomplete lists in the document
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
        if (node != x[i] && node != languagesInput) {
            x[i].parentNode.removeChild(x[i]);
        }
    };
}
//random cat pics:
const imgAreYouCool = document.querySelector("img.are-you-cool");
imgAreYouCool.src = `./assets/cat-${Math.floor(Math.random() * 4 + 1)}.png`;
//language switcher:
//from the joke:
let poem;
function langSwitch(input) {
    if (poem) {poem.style.removeProperty("--hidden-poem")}
    const className = `.${input}-version.poem-container`;
    poem = document.querySelector(className);
    const joke = document.querySelector(".joke");
    joke.style.setProperty("--hidden-joke", `hidden`);   
    poem.style.setProperty("--hidden-poem", `visible`);   
}
//from navigation:
const navigation = document.querySelector('nav');
navigation.addEventListener('click', ()=> {
    const currentBtn = event.target;
    if (currentBtn.tagName.toLowerCase() !== "button") {return false}
    langSwitch(currentBtn.parentNode.className);
})