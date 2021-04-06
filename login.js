const login = document.querySelector('#loginForm');

login.addEventListener('submit', (e) =>{

    e.preventDefault();
    const email = login['inputEmail'].value;
    const password = login['inputPassword'].value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        window.location.href = 'homePage.html';
        
    })
    
    
});

function land(){
    window.location.href = 'landingPage.html';
  }

function myFunction() {
    var x = document.getElementById("inputPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }