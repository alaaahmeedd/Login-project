// signup js

var userNameInput = document.getElementById('userNameInput');
var userEmailInput = document.getElementById('userEmailInput');
var userPasswordInput = document.getElementById('userPasswordInput');
var userNameAlert = document.getElementById('userNameAlert');
var userEmailAlert = document.getElementById('userEmailAlert');
var userPasswordAlert = document.getElementById('userPasswordAlert');
var successMsg = document.getElementById('successMsg');
var signIn = document.getElementById('signIn');
var tryAgainMsg = document.getElementById('tryAgainMsg');
var accountExist = document.getElementById('accountExist');

var userInfo;

if( localStorage.getItem('users') == null ){ // awl mara ysgel
    userInfo = [];
}
else{
    userInfo = JSON.parse(localStorage.getItem('users'));
}

function signUpUser(){
    userInputsValidation();
    isExist();

    if(userInputsValidation() == true && isExist() == false ){
        var user={
            name: userNameInput.value,
            email: userEmailInput.value,
            password: userPasswordInput.value
        }
        userInfo.push(user); // array of object
        localStorage.setItem('users',JSON.stringify(userInfo));
        successMsg.classList.replace('d-none','d-block');
        signIn.classList.replace('d-none','d-block');

    }else{
        tryAgainMsg.classList.replace('d-none','d-block')
    }


}

function userNameValidation(){
    var regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;

    if(regex.test(userNameInput.value) == true && userNameInput.value != '' ){
        userNameInput.classList.add('is-valid');
        userNameInput.classList.remove('is-invalid');
        userNameAlert.classList.replace('d-block' , 'd-none');
        return true;
    }else{
        userNameInput.classList.add('is-invalid');
        userNameInput.classList.remove('is-valid');
        userNameAlert.classList.replace('d-none' , 'd-block');
        return false;
    }

}

function userEmailValidation(){
    var regex = /@[a-z]{5,10}(\.com)$/;
    if(regex.test(userEmailInput.value)== true && userEmailInput.value != '' ){
        userEmailInput.classList.add('is-valid');
        userEmailInput.classList.remove('is-invalid');
        userEmailAlert.classList.replace('d-block' , 'd-none'); // validation done
        return true;
    }else{
        userEmailInput.classList.add('is-invalid');
        userEmailInput.classList.remove('is-valid');
        userEmailAlert.classList.replace('d-none' , 'd-block'); // validation not done
        return false;
    }
}

function userPasswordValidation(){
    var regex = /^.{5,15}$/;
    if(regex.test(userPasswordInput.value)== true && userPasswordInput.value != '' ){
        userPasswordInput.classList.add('is-valid');
        userPasswordInput.classList.remove('is-invalid');
        userPasswordAlert.classList.replace('d-block' , 'd-none'); // validation done
        return true;
    }else{
        userPasswordInput.classList.add('is-invalid');
        userPasswordInput.classList.remove('is-valid');
        userPasswordAlert.classList.replace('d-none' , 'd-block'); // validation not done
        return false;
    }
}

function userInputsValidation(){
    userNameValidation();
    userEmailValidation();
    userPasswordValidation();

    if( (userNameValidation() == true && userEmailValidation() == true
        && userPasswordValidation() == true)){
            return true;
        }else{
            return false;
        }
}

function isExist(){

    for(var i = 0; i < userInfo.length ; i++){

        if(userInfo[i].name.toLowerCase() == userNameInput.value.toLowerCase() ||
           userInfo[i].email.toLowerCase() == userEmailInput.value.toLowerCase()){

           accountExist.classList.replace('d-none','d-block');
           userNameInput.classList.remove('is-valid');
           userEmailInput.classList.remove('is-valid');
           userPasswordInput.classList.remove('is-valid');

           return true; // mwgood abl kda 
        }
    }
    return false; // msh mwgood awl mara ysgl
    }



// login js

function logIn() {
    var loginEmail = document.getElementById('loginEmail');
    var loginPassword = document.getElementById('loginPassword');
    var fillMsg = document.getElementById('fillMsg');
    var wrongMsg = document.getElementById('wrongMsg');
    var loginBtn = document.getElementById('loginBtn');
    var signUp = document.getElementById('signUp');

    if( loginEmail.value == "" || loginPassword.value == ""){
        fillMsg.classList.replace('d-none', 'd-block'); //empty inputs
        return false;
    }

    for(var i=0 ; i< userInfo.length ; i++){
        if(userInfo[i].email.toLowerCase() == loginEmail.value.toLowerCase()
        && userInfo[i].password.toLowerCase() == loginPassword.value.toLowerCase()){

        localStorage.setItem('sessionUserName', JSON.stringify(userInfo[i].name));
        window.location.href = './welcome.html'; // Redirect to welcome page
        return true;
    }
}

   // If no match found in userInfo array, show 'Incorrect email or password' message
   wrongMsg.classList.remove('d-none');
   fillMsg.classList.add('d-none');
   return false;
}

// welcome js

function displayWelcomeUser(){
    var userName = JSON.parse(localStorage.getItem('sessionUserName'));
    
    var userNameWelcome = document.getElementById('userNameWelcome')
    userNameWelcome.innerHTML = 'Welcome ' +userName;

}

function logout(){
    localStorage.removeItem('sessionUserName');
    window.location.href = './index.html'; // replace 'index.html' with the path to your login page
    
}
