const signup = document.querySelector('#signupForm');

function myFunction() {
    var x = document.getElementById("inputPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  function land(){
    window.location.href = 'landingPage.html';
  }

signup.addEventListener('submit', (e) =>{

    e.preventDefault();
    const email = signup['inputEmail'].value;
    const password = signup['inputPassword'].value;
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        window.location.href = 'homePage.html';
        
    })
    
    
});