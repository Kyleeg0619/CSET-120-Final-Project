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
// store function - defines username, password, and user role based on username
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
        localStorage.setItem('userRole', 'customer');
        alert('Your account has been created');
    }
}

//checking
function check(event) {
    event.preventDefault(); // Prevent form submission

    const storedName = localStorage.getItem('name');
    const storedPw = localStorage.getItem('pw');
    const storedRole = localStorage.getItem('userRole');

    const userName = document.getElementById('userName').value;
    const userPw = document.getElementById('userPw').value;

    console.log(`stored role: ${storedRole}`);
    
// for manager view log in with user = kylee and password = 333////
    if (userName === "kylee" && userPw === "333") {
        alert('You are logged in as a manager.');
        window.location.href = '../manager.html'; // Redirect to manager's page
    } else if (userName === storedName && userPw === storedPw) {
        alert('You are logged in as a customer.');
        if (storedRole === 'customer') {
            console.log(`User role: ${storedRole}`);
            window.location.href = '../landing.html'; // Correct path to manager's page
            console.log('Navigating to:', window.location.href);
        } else {
            alert('Error on login');
        }
}
}