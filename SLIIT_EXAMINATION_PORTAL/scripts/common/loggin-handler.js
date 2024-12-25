let logoutEvent = new CustomEvent("logout");

function saveLoginInfo(logginData)
{
    localStorage.setItem('loginInfo', JSON.stringify(logginData));
}

function getLoginInfo()
{
    return  JSON.parse(localStorage.getItem('loginInfo'));
}

function removeLoginInfo()
{
    localStorage.removeItem('loginInfo');
}

function logginToPage(url, empId, password, loginCallback)
{
    loggin('./php/common/login.php', empId, password, loginCallback);
}

function logout()
{
    removeLoginInfo();
    window.dispatchEvent(logoutEvent);
    redirectToLoginPage();
}

function redirectToLoginPage()
{
    window.location.href = "../../index.html";
}





