// for hide a san after 5 seconds
$.fn.delayedHide = function (delay) {
    var that = this;
    window.setTimeout(function () {
        that.hide();
    }, delay || 4000);
    return that;
}

//(".disappear").delayedHide(); 
$(".disappear1").delayedHide();

// form validation%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

var nameError = document.getElementById('name-error')
var emailError = document.getElementById('email-error')
var phoneError = document.getElementById('phone-error')
var passwordError = document.getElementById('pw1-error')
var passwordConfirmError = document.getElementById('confirm-error')

var submitError = document.getElementById('submit-error')


// function for validating the input field  
function validateName() {
    var name = document.getElementById('name').value
    if (name.length == 0) {
        nameError.innerHTML = 'Name required'
        return false

    }
    if (!name.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)) {  // condition for checking full name or not 
        nameError.innerHTML = 'Enter Your name'    // assiging the error message to nameError variable
        return false

    }
    nameError.innerHTML = ''
    return true
}

function validateEmail() {
    var email = document.getElementById("email").value;

    if (email.length == 0) {
        emailError.innerHTML = "Email is required"
        return false;
    }
    if (!email.match(/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)) {
        emailError.innerHTML = "Email is invalid"
        return false
    }
    emailError.innerHTML = ''
    return true

}
function validatePhone() {
    var phone = document.getElementById("phone").value
    if (phone.length == 0) {
        phoneError.innerHTML = "Mobile Number is required";
        return false;
    }
    if (!phone.match(/^[7-9][0-9]{9}$/)) {
        phoneError.innerHTML = "Mobile Number is invalid";
        return false
    }
    phoneError.innerHTML = ''
    return true
}
function validatePassword() {
    var pw1 = document.getElementById("password1").value;

    if (pw1 == "") {
        passwordError.innerHTML = "Enter the password please!";
        return false;
    }
    if (pw1.length < 8) {
        passwordError.innerHTML = "Minimum 8 characters";
        return false;
    }
    if (pw1.length > 15) {
        passwordError.innerHTML = "Maximum 15 characters";
        return false;
    }
    passwordError.innerHTML = '';
    return true;
}
function validateConfirmPwd() {
    var pw1 = document.getElementById("password1").value;
    var pw2 = document.getElementById("password2").value;
    if (pw2 == "" || pw2 != pw1 || pw2.length < 8 || pw2.length > 15) {
        passwordConfirmError.innerHTML = "Password did not match!";
        return false;
    }
    passwordConfirmError.innerHTML = ''
    return true;
}

function validateForm() {
    if (!validateConfirmPwd() || !validateName() || !validateEmail() || !validateSubject() || !validateMessage() || !validatePassword() || !validatePhone()) {

        submitError.innerHTML = 'Please fill the form!'
       submitError.style.display = 'block';
       setTimeout(function () { submitError.style.display = 'none'; }, 3000);
        return false
    }
    return true
}

/888888888/

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#pw');
togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye / eye slash icon
    this.classList.toggle('bi-eye');
});

// const togglePassword2 = document.querySelector('#togglePassword2');
// const password2 = document.querySelector('#password2');
// togglePassword2.addEventListener('click', function (e) {
//     // toggle the type attribute
//     const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
//     password.setAttribute('type', type);
//     // toggle the eye / eye slash icon
//     this.classList.toggle('bi-eye');
// });


// function myFunction() {
//     var x = document.getElementById("password1");


//     if (x.type === "password") {
//         x.type = "text";
//     } else {
//         x.type = "password";
//     }
// }

function myFunction() {
    var y = document.getElementById("password1");
    if (y.type === "password") {
        y.type = "text";
    } else {
        y.type = "password";
    }
};
function myFunction2() {
    var x = document.getElementById("pw");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
};
function myFunction3() {
    var a = document.getElementById("yourPassword");
    if (a.type === "password") {
        a.type = "text";
    } else {
        a.type = "password";
    }
};