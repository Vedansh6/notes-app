
let newBtn = document.querySelector('#new');
let text = document.querySelector('#textarea');
let newNotes = document.querySelector('#notes');

let deleteBtn = document.querySelector('#delete');
let logOutBtn = document.querySelector('#logOut');
let searchBtn = document.querySelector('#searchBtn');
let fontBtn = document.querySelector('#fontBtn');
let searchText = document.querySelector('#search');
let dateBtn = document.querySelector('#date');
let dateDis = document.querySelector('#dateDis');
let mess = document.querySelector('#mess')
newBtn.hidden = true;

dateBtn.hidden = true;
deleteBtn.hidden = true;

searchBtn.hidden = true;
let placeHolder = "New Note";
let notesArr = [];
let dateArr = [];
let c = 0;
let dataId;
let id;





auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.uid);
        id = user.uid;
        newBtn.hidden = false;
        db.collection('note1').where('uid', '==', id).orderBy('date').get().then((snapshot) => {
            snapshot.docs
                .forEach((doc) => {
                    console.log(user.uid);
                    let newDiv = document.createElement('div');
                    newDiv.innerText = doc.data().notes;
                    let dateInput = doc.data().date;
                    newNotes.prepend(newDiv);
                    newDiv.setAttribute('data-id', doc.id);
                    dateArr.push(dateInput);
                    notesArr.push(newDiv);
                    newDiv.addEventListener('click', function () {


                        text.hidden = false;
                        deleteBtn.hidden = false;
                        dateBtn.hidden = false;
                        mess.hidden = true;
                        text.value = newDiv.innerText;
                        c = notesArr.indexOf(newDiv)
                        dateDis.innerText = `Created: ${dateArr[c]}`;

                    })


                });
        })
        if (notesArr.length == 0)
            text.hidden = true;
        else
            text.hidden = false;
    } else {
        window.location.href = 'login.html';
    }
});




newBtn.addEventListener('click', function (e) {
    e.preventDefault();
    text.hidden = false;
    dateBtn.hidden = false;
    deleteBtn.hidden = false;
    mess.hidden = true;
    let inputText = "";
    let dateNow = date();

    let newDiv = document.createElement('div');

    newDiv.innerText = inputText;
    newDiv.placeholder = "New Note";


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
    c = notesArr.length - 1;
    dateDis.innerText = `Created: ${dateArr[c]}`;
    newDiv.addEventListener('click', function () {

        text.hidden = false;
        deleteBtn.hidden = false;
        dateBtn.hidden = false;
        mess.hidden = true;
        text.value = newDiv.innerText;
        c = notesArr.indexOf(newDiv)
        dateDis.innerText = `Created: ${dateArr[c]}`;

    })


    text.value = "";
})







deleteBtn.addEventListener('click', function (ev) {
    ev.preventDefault();

    notesArr[c].remove();
    let d = notesArr[c].getAttribute('data-id');
    db.collection('note1').doc(d).delete();


    dateBtn.hidden = true;

    deleteBtn.hidden = true;
    dateBtn.hidden = true;
    text.value = "";
    text.hidden = true;
    mess.hidden = false;


})

logOutBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
    auth.signOut();

})

dateBtn.addEventListener('click', function (ev) {
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
searchBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
})
searchText.addEventListener('input', function (ev) {

    ev.preventDefault();

    notesArr.forEach((note) => {

        note.hidden = false;

    })
    let searchValue = searchText.value;
    notesArr.forEach((note) => {
        if (note.innerText.search(searchValue) == -1)
            note.hidden = true;

    })
})

text.addEventListener('input', function (ev) {
    ev.preventDefault();
    notesArr[c].innerText = text.value;
    let d = notesArr[c].getAttribute('data-id');
    db.collection('note1').doc(d).update({
        notes: text.value
    });



})
