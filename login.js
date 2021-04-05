const login = document.querySelector('#loginForm');

login.addEventListener('submit', (e) =>{

    e.preventDefault();
    const email = login['inputEmail'].value;
    const password = login['inputPassword'].value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        window.location.href = 'homePage.html';
        
    })
    
    
});