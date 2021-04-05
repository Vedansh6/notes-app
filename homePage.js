let input = document.querySelector('#add');
let newBtn = document.querySelector('#new');
let text = document.querySelector('#textarea');
let newNotes = document.querySelector('#notes');
let updateBtn = document.querySelector('#update');
let deleteBtn = document.querySelector('#delete');
let logOutBtn = document.querySelector('#logOut');
let searchBtn = document.querySelector('#searchBtn');
let fontBtn = document.querySelector('#fontBtn');
let searchText = document.querySelector('#search');
let dateBtn = document.querySelector('#date');
let dateDis = document.querySelector('#dateDis');
updateBtn.hidden = true;
deleteBtn.hidden = true;
newBtn.hidden = true;
dateBtn.hidden = true;
input.hidden = false;
searchBtn.hidden = true;
let notesArr = [];
let dateArr = [];
let c=0;
let dataId;
let id;


function font(id)
{
    if(id === 'cursive')
    text.style.fontFamily = 'cursive';
    else if(id === 'monospace')
    text.style.fontFamily = 'monospace';
    else if(id === 'fantasy')
    text.style.fontFamily = 'fantasy';
    else if(id === 'serif')
    text.style.fontFamily = 'serif';
    else if(id === 'sans-serif')
    text.style.fontFamily = 'sans-serif';
}


auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.uid);
        id = user.uid;
        input.hidden = false;
        db.collection('note1').where('uid', '==', id).orderBy('date').get().then((snapshot) => {
            snapshot.docs
                .forEach((doc) => {

                    let newDiv = document.createElement('div');
                    newDiv.innerText = doc.data().notes;
                    let dateInput = doc.data().date;
                    newNotes.prepend(newDiv);
                    newDiv.setAttribute('data-id', doc.id);
                    dateArr.push(dateInput);
                    notesArr.push(newDiv);
                    newDiv.addEventListener('click', function () {
                        updateBtn.hidden = false;
                        deleteBtn.hidden = false;
                        input.hidden = true;
                        newBtn.hidden = false;
                        dateBtn.hidden = false;
                        text.value = newDiv.innerText;
                        c = notesArr.indexOf(newDiv)
                        dateDis.innerText = `Created: ${dateArr[c]}`;

                    })


                });
        })
    } else {
        window.location.href = 'login.html';
    }
});




input.addEventListener('click', function (e) {
    e.preventDefault();
    let inputText = text.value;
    let dateNow = date();

    let newDiv = document.createElement('div');

    newDiv.innerText = inputText;


    newNotes.prepend(newDiv);
    db.collection('note1').add({

        notes: inputText,
        uid: id,
        date: dateNow
    })
        .then((doc) => {
            dataId = doc.id;
            newDiv.setAttribute('data-id', dataId);

        })

    notesArr.push(newDiv);
    dateArr.push(dateNow);
    newDiv.addEventListener('click', function () {
        updateBtn.hidden = false;
        deleteBtn.hidden = false;
        input.hidden = true;
        newBtn.hidden = false;
        dateBtn.hidden = false;
        text.value = newDiv.innerText;
        c = notesArr.indexOf(newDiv)
        dateDis.innerText = `Created: ${dateArr[c]}`;

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
        notes: text.value
    });
    text.value = "";
    updateBtn.hidden = true;
    deleteBtn.hidden = true;
    input.hidden = false;
    newBtn.hidden = true;
    dateBtn.hidden = true;


})

newBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
    
    text.value = "";
    updateBtn.hidden = true;
    deleteBtn.hidden = true;
    newBtn.hidden = true;
    input.hidden = false;
    dateBtn.hidden = true;


})

deleteBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
    notesArr[c].remove();
    let d = notesArr[c].getAttribute('data-id');
    db.collection('note1').doc(d).delete();
    deleteBtn.hidden = true;
    updateBtn.hidden = true;
    input.hidden = false;
    newBtn.hidden = true;
    dateBtn.hidden = true;


    text.value = "";
})

logOutBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
    auth.signOut();

})

dateBtn.addEventListener('click',function (ev){
    ev.preventDefault();
})


function date() {
    let date = new Date();
    let month = addZero(date.getMonth() + 1);
    let year = addZero(date.getFullYear());
    let day = addZero(date.getDate());
    let hour = addZero(date.getHours());
    let min = addZero(date.getMinutes());

    return `${day}/${month}/${year} ${hour}:${min}`;
}
function addZero(date) {
    if (date < 10)
        date = '0' + date;
    return date;

}
searchBtn.addEventListener('click', function(ev){
    ev.preventDefault();
})
searchText.addEventListener('input', function(ev){
    
    ev.preventDefault();
    
    notesArr.forEach((note) => {
        
        note.hidden = false;
    
    })
    let searchValue = searchText.value;
    notesArr.forEach((note) => {
        if(note.innerText.search(searchValue) == -1)
        note.hidden = true;
    
    })
})
