

var key="hello";
const login_error_message=document.getElementById('login-error-message');
const register_error_message=document.getElementById('register-error-message');
var loginform=document.getElementById('login');
var registerform=document.getElementById('register');

var registerbutton=document.getElementById('register-button');
var signinbutton=document.getElementById('signin-button');
var loginusername=document.getElementById('loginusername');
var loginpassword=document.getElementById('loginpassword');
var registerusername=document.getElementById('registerusername');
var registerpassword=document.getElementById('registerpassword');
var registerconfirmpassword=document.getElementById('registerconfirmpassword');



var data={}

function encryptpassword(pwd){
    var encrypted="";
    for (let i = 0; i < pwd.length; i++) {
        const charCode = pwd.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        encrypted += String.fromCharCode(charCode);
      }
      return encrypted;

}

function opensignin(){
    loginform.style.visibility='visible';
    loginusername.setAttribute('required','');
    loginpassword.setAttribute('required','');
    registerform.style.visibility='hidden';
    registerusername.removeAttribute('required');
    registerpassword.removeAttribute('required');
    registerconfirmpassword.removeAttribute('required');
}

function openregister(){
    loginform.style.visibility='hidden';
    loginusername.removeAttribute('required');
    loginpassword.removeAttribute('required');
    
    registerform.style.visibility='visible';
    registerusername.setAttribute('required','');
    registerpassword.setAttribute('required','');
    registerconfirmpassword.setAttribute('required','');

}




function checkuser(event){
    var keys=Object.keys(data);
    event.preventDefault();
    var errormessage="";

    var loc=window.location.href;
    var index=loc.lastIndexOf('/');
    var address=loc.slice(0,index);

    var username=document.forms['loginform']['username'];
    var password=document.forms['loginform']['password'];

    var passwordvalue=password.value;


    if(keys.includes(username.value)){
        var encryptedpassword=encryptpassword((passwordvalue));
        if(encryptedpassword==data[username.value]){
            window.location.href=address+'/profile.html';

        }else{
            errormessage="wrong password";

        }
    }else{
        errormessage="user not found";
    }
   
    login_error_message.textContent=errormessage;


}

function validateuser(event){

    var keys=Object.keys(data);
    event.preventDefault();
    var errormessage="";


    var username=document.forms['registerform']['registerusername'];
    var password=document.forms['registerform']['registerpassword'];
    var confirmpassword=document.forms['registerform']['confirm-password'];


    var passwordvalue=password.value;
    var confirmpasswordvalue=confirmpassword.value;


    if(keys.includes(username.value)){
        errormessage="user already found";
    }else{
        if(passwordvalue>confirmpasswordvalue || passwordvalue<confirmpasswordvalue){
            errormessage="password doesn't match";
        }else{

            var encryptedpassword=encryptpassword((passwordvalue));
            console.log(encryptedpassword);
            data[username.value]=encryptedpassword;
            errormessage="succesfully registered";
            opensignin();
        }
    }
    register_error_message.textContent=errormessage;

}