let input = document.querySelector('#add');
let text = document.querySelector('#textarea');
let newNotes = document.querySelector('#notes');
let updateBtn = document.querySelector('#update');
updateBtn.hidden = true;
let notesArr = [];
let c;


input.addEventListener('click', function (e) {
    e.preventDefault();
    let inputText = text.value;
    let newDiv = document.createElement('div');
    newDiv.innerText = inputText;
    newNotes.append(newDiv);
    newNotes.append(document.createElement('hr'));
    notesArr.push(newDiv);
    newDiv.addEventListener('click', function () {
        updateBtn.hidden = false;
        text.value = newDiv.innerText;
        c = notesArr.indexOf(newDiv)

    })
    text.value = "";
})



updateBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
    notesArr[c].innerText = text.value;
    text.value = "";
    updateBtn.hidden = true;
})