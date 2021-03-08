let input = document.querySelector('#add');
let text = document.querySelector('#textarea');
let newNotes = document.querySelector('#notes');
let updateBtn = document.querySelector('#update');
let deleteBtn = document.querySelector('#delete');
updateBtn.hidden = true;
deleteBtn.hidden = true;
let notesArr = [];
let c;
let dataId;

db.collection('note1').get().then((snapshot) => {
    snapshot.docs
        .forEach((doc) => {
            let newDiv = document.createElement('div');
            newDiv.innerText = doc.data().notes;
            newNotes.append(newDiv);
            newDiv.setAttribute('data-id', doc.id);
            notesArr.push(newDiv);
            newDiv.addEventListener('click', function () {
                updateBtn.hidden = false;
                deleteBtn.hidden = false;
                text.value = newDiv.innerText;
                c = notesArr.indexOf(newDiv)

            })

        });
})

input.addEventListener('click', function (e) {
    e.preventDefault();
    let inputText = text.value;
    
    
    let newDiv = document.createElement('div');
    newDiv.innerText = inputText;
    newNotes.append(newDiv);
    db.collection('note1').add({
        notes : inputText
    })
    .then((doc)=>{
        dataId = doc.id;
        newDiv.setAttribute('data-id', dataId);

    })
    
    notesArr.push(newDiv);
    newDiv.addEventListener('click', function () {
        updateBtn.hidden = false;
        deleteBtn.hidden = false;
        text.value = newDiv.innerText;
        c = notesArr.indexOf(newDiv)

    })
    updateBtn.hidden = true;
    deleteBtn.hidden = true;
    text.value = "";
})



updateBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
    notesArr[c].innerText = text.value;
    let d = notesArr[c].getAttribute('data-id');
    db.collection('note1').doc(d).update({
        notes : text.value
    });
    text.value = "";
    updateBtn.hidden = true;
    deleteBtn.hidden = true;

})

deleteBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
    notesArr[c].remove();
    let d = notesArr[c].getAttribute('data-id');
    db.collection('note1').doc(d).delete();
    deleteBtn.hidden = true;
    updateBtn.hidden = true;
    text.value = "";
})