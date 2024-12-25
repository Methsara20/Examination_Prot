
const wrapper = document.querySelector('.login-wrapper');
const btnLoginPopup = document.querySelector('.login');
const iconClose = document.querySelector('.icon-close');
const inputBox = document.querySelector('.input-box input');
const errorMsg = document.querySelector('.error label');
const submitForm = document.querySelector('.loginForm');

// Events

btnLoginPopup.addEventListener('click', ()=>{
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=>{
    Reset();
    wrapper.classList.remove('active-popup');
});

submitForm.addEventListener("submit", (event) =>{
    event.preventDefault();

    let empId, password;

    const inputBoxes = document.querySelectorAll('.input-box input');

    inputBoxes.forEach(element =>{
        if(element.type === 'text') 
           empId = element.value;
        else
           password = element.value;
    });

    logginToPage('././php/common/login.php', empId, password, loginCallback);
});

window.addEventListener("load", ()=>{

    Reset();
    checkLoginStatus();

});

inputBox.addEventListener('input', ()=>{

    if(inputBox.value.trim() !== "")
        inputBox.parentElement.classList.add('has-content');
    else
        inputBox.parentElement.classList.remove('has-content');
    
});

function Reset()
{
    const inputBoxes = document.querySelectorAll('.input-box input');
    inputBoxes.forEach(input => {
        input.value = "";
        input.parentElement.classList.remove('has-content');
    });
    ToggleError("");
}

function ToggleError(error)
{
    if(error !== "")
    {
        errorMsg.parentElement.classList.add('has-error');
        errorMsg.textContent = error;
    }
    else
       errorMsg.parentElement.classList.remove('has-error');
}

//login functions
function checkLoginStatus()
{
    const logginData = getLoginInfo();
    
    if(logginData)
    {
        showDashboard(logginData);
    }
    else
    {
        wrapper.classList.add('active-popup');
    }
}




//call-back functions
function loginCallback(error, result){
    if(error){
        ToggleError(error)
    }
    else
    {
        ToggleError("")
        saveLoginInfo(result.data);
        showDashboard(result.data);
    }
}


