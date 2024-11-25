const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

var userRole;

function store(){

    var name = document.getElementById('name');
    var pw = document.getElementById('pw');

    if(name.value.length == 0){
        alert('Please fill in email');

    }else if(pw.value.length == 0){
        alert('Please fill in password');

    }else if(name.value.length == 0 && pw.value.length == 0){
        alert('Please fill in email and password');

    }else if(pw.value.length > 8){
        alert('Max of 8');
    }else{
        localStorage.setItem('name', name.value);
        localStorage.setItem('pw', pw.value);
        if (name === 'kyleeg') {
            userRole = 'manager';
        } else {
            userRole = 'customer';
        }
        alert('Your account has been created');
    }
}

//checking
function check(){
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');

    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');

    if(userName.value == storedName && userPw.value == storedPw){
        alert('You are logged in.');
        if (userRole = 'manager') {
            window.location.href = '../order.html';
            console.log('user role: manager');
        } else {
            window.location.href = '../index.html';
            console.log('user role: customer');
        }
    }else{
        alert('Error on login');
    }
}