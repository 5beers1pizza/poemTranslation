//--------we create an autocomplete feature, suggesting user one of [languages] items, based on his <text input> in <joke> section
//through autocreating a <field> under the <input> filled with these suggestions
const languages = ["french", "english", "german", "italian", "portuguese", "spanish", "romanian", "arabic", "ukrainian"];
const languagesInput = document.querySelector(".joke input");
//control variables to get an expected feature behaviour on particular cases:
let stateOfAutoList = 0; //to fire [some] event only when UP, DOWN, LEFT, RIGHT or ENTER are pressed
let currentFocus = -1; //case user doesn't type his language, but choose it with UP/DOWN, we need to highlight desired choice
//the problem - it's impossibru with css rule :focus - as for DOM <text input> is in focus all time
//so we need to simulate hover/focus effect
//we can force focus from <input> to the <field>, but will case to even more work, as we can't after normally get value entered in <inpit>
//checks if ENTER was pressed successively more than N times
let keyEnterCount = 0; //when pressed any key but UP, DOWN or ENTER - N is 0
const autoList = (arr) => {
    //execute the function when someone pressed a key only in <text input>:
    languagesInput.addEventListener("keydown", () => {
        let key = event.key.toLowerCase(); //stores a key was pressed by user
        console.log(key)
        if (key === 'arrowdown' || key === 'arrowright') {
            stateOfAutoList = 1; //"1" only for our "special" keys
            currentFocus++; //intuitively DOWN and RIGHT stand for moving down on the <field> === (in the code) moving further through [languages]
            currentFocus >= 8 ? currentFocus = 8 : null; //set max limit to prevent an error
            keyEnterCount = 1;
        } else if (key === 'arrowup' || key === 'arrowleft') {
            stateOfAutoList = 1;
            currentFocus <= 0 ? currentFocus = 0 : currentFocus--;
            keyEnterCount = 1;
        } else if (key === 'enter') {
            keyEnterCount++; //counts
            currentFocus === -1 ? currentFocus = 0 : null;
            stateOfAutoList = 1;
            event.preventDefault() //prevent ENTER instantly process <form> element (i.e. redirect to other url) as by default
        } else {
            keyEnterCount = 0;
        }
        // 1st only ENTER will open and focus 1st item from [languages]
        // 2nd will fill <input text> with it
        // 3rd will process languages switcher
        keyEnterCount >= 3 ? langSwitch(languagesInput.value) : null;
        //close any already open lists of autocompleted values before creating a new one:
        closeList();
        //create a wrapper for our suggestions:
        let autoCompleteList = document.createElement("div");
        autoCompleteList.setAttribute("class", "autocomplete-items");
        languagesInput.parentNode.appendChild(autoCompleteList);
        //---------starting fill the wrapper with suggestions:
        if (stateOfAutoList && !languagesInput.value) { //fires when user doesn't type his language, but wants to choose it with UP/DOWN/ENTER
            arr.forEach(elem => {
                let autoCompleteItems = document.createElement("div");
                autoCompleteItems.innerHTML = `<p>${elem}</p>`;
                autoCompleteItems.innerHTML += `<input type='hidden' value='${elem}'>`;
                autoCompleteList.appendChild(autoCompleteItems);
                //fill <input> value when user click one of items:
                autoCompleteItems.addEventListener('click', () => {
                    languagesInput.value = event.target.innerHTML;
                    closeList(); //remove open list of suggestions
                });
            });
            //now we simulate a selection of item after user pressed UP/RIGHT/DOWN/LEFT/ENTER and focus effect for it:
            const p =  autoCompleteList.getElementsByTagName('p');          
            p[currentFocus].style = "background-color: rgb(248, 242, 238)";
            //ill <input> value after 2nd ENTER:
            key === 'enter' && keyEnterCount >= 2 ? languagesInput.value = p[currentFocus].innerHTML : null;
            //for better UX we stop simulation of focus effect when true hover happens
            //otherwise user will see weird 2 elements highlighted:
            autoCompleteList.addEventListener('mouseover', () => {
                p[currentFocus].style = ""
            });
            //-------now we fill the <field> only with items match what user has typed:
        } else if (!languagesInput.value) {
            //to add UP/RIGHT/DOWN/LEFT/ENTER feature we needed to fire autoList() by "keydown" event instead of "input" event -
            //as it should be, because what it's really about - about "input"
            //but "input" event has no detecting what key is pressed
            //so, now we have a problem - while "input" fires after the first character was entered in <text input>
            //in the event sequence it fires _after_ "keydown"
            //our autoList() fires on "keydown" ==> "input" will happen after autoList() has been already finished ==>
            //==> on 1st character entered in <text input> for 1st autoList() call JS can't reach <text input> value
            //btw, that will leads to some side effect, but it's nice, I've left it
            arr.forEach(elem => {
                //to solve it, at 1st call we compare key was entered and item from [languages]:
                if (elem.substring(0, key.length).toLowerCase() === key) { 
                    let autoCompleteItems = document.createElement("div");
                    autoCompleteItems.innerHTML = `<p>${elem}</p>`;
                    autoCompleteItems.innerHTML += `<input type='hidden' value='${elem}'>`;
                    autoCompleteList.appendChild(autoCompleteItems);
                    autoCompleteItems.addEventListener('click', () => {
                        languagesInput.value = event.target.innerHTML;
                        closeList();
                    });
                }
            });
        } else {
            arr.forEach(elem => {
                //tnow we can compare <text input> value and item from [languages]:
                if (elem.substring(0, languagesInput.value.length).toLowerCase() === languagesInput.value.toLowerCase()) {
                    let autoCompleteItems = document.createElement("div");
                    autoCompleteItems.innerHTML = `<p>${elem}</p>`;
                    autoCompleteItems.innerHTML += `<input type='hidden' value='${elem}'>`;
                    autoCompleteList.appendChild(autoCompleteItems);
                    autoCompleteItems.addEventListener('click', () => {
                        languagesInput.value = event.target.innerHTML;
                        closeList();
                    });
                }
            });
        }
    });
    //close the <field> when user clicks somewhere else in the document:
    document.addEventListener("click", function (e) {
        closeList(e.target);
    });
}
//set our control variables to default:
languagesInput.addEventListener("keyup", () => {
    let key = event.key.toLowerCase();
    if (!(key === 'arrowdown' || key === 'arrowup' || key === 'enter' || key === 'arrowleft' || key === 'arrowright')) {
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
//----------random cat pics:
const imgAreYouCool = document.querySelector("img.are-you-cool");
imgAreYouCool.src = `./assets/cat-${Math.floor(Math.random() * 4 + 1)}.png`;
//--------language switcher:
//from the joke (through the value of <input>):
//through css variables we set visibility of chosen poem from "hidden" to "visible"
//we had left _poem outside to allow return visibility of previous poem to "hidden";
//"visible" will be only the current one:
let poem;
function langSwitch(input) {
    if (poem) {poem.style.removeProperty("--hidden-poem")}
    const className = `.${input}-version.poem-container`;
    poem = document.querySelector(className);
    const joke = document.querySelector(".joke");
    joke.style.setProperty("--hidden-joke", `hidden`); //hide joke section after the value of <input> was processed
    poem.style.setProperty("--hidden-poem", `visible`);   
}
//from navigation (via a button):
const navigation = document.querySelector('nav');
//addEventListener are heavy for performance, we need to limit where user agent will "listen" for events:
navigation.addEventListener('click', ()=> {
    const currentBtn = event.target;
    //on the reason now we need be sure, that clicked is <button> and not i.e. <ul>
    if (currentBtn.tagName.toLowerCase() !== "button") {return false}
    langSwitch(currentBtn.parentNode.className);
})