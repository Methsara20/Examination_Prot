var Portal = Portal || {};

window.addEventListener("load", ()=>{
    
    UpdateCommonUI();
    
});



Portal = {
    Employee_Id:  JSON.parse(localStorage.getItem('loginInfo'))?.EmpId,
    Employee_Name: JSON.parse(localStorage.getItem('loginInfo'))?.Name,
    Employee_Designation: JSON.parse(localStorage.getItem('loginInfo'))?.Designation,
    Sidebar_Items: [],
}


function UpdateCommonUI()
{
    let pageLogo = document.getElementById('company-logo');
    pageLogo.textContent = 'DIGITAL NEST';
}