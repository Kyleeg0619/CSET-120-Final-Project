// *** Signin & Login Page ***
// buttons for register and login here on signin page
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// change class based on button clicked
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});
signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// establish customer role
var userRole;

// store function - defines username, password, and userrole based on username
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
            localStorage.setItem('userRole', 'manager');
        } else {
            userRole = 'customer';
            localStorage.setItem('userRole', 'customer');
        }
        alert('Your account has been created');
    }
}

//checking
function check(event) {
    event.preventDefault(); // Prevent form submission

    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');
    var storedRole = localStorage.getItem('userRole');

    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');

    console.log(localStorage.getItem('userRole'));
    if (userName.value === storedName && userPw.value === storedPw) {
        alert('You are logged in.');
        if (storedRole === 'manager') {
            console.log(`User role: ${storedRole}`);
            window.location.href = '../order.html'; // Correct path to manager's page
            console.log('Navigating to:', window.location.href);
        } else {
            console.log(`User role: ${storedRole}`);
            window.location.href = '../landing.html'; // Correct path to customer's page
            console.log('Navigating to:', window.location.href);
        }
    } else {
        alert('Error on login');
    }
}