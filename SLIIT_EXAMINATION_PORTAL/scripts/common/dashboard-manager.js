function showDashboard(employeeData)
{
    Portal.Employee_Name = employeeData?.Name;
    Portal.Employee_Designation = employeeData?.Designation;

    switch(employeeData?.Designation)
    {
         case "Department Head":
            window.location.href = "././pages/department/dep-dashboard.html";
            break;
        
        case "HR Manager":
            window.location.href = "././pages/hr/hr-dashboard.html";
            break;
                 
        case "IT Support Officer":
            window.location.href = "././pages/it-support/it-support-dashboard.html";
            break;

        case "Complain Officer":
            window.location.href = "././pages/complain/complain-dashboard.html";
            break;    

        default:
            window.location.href = "././pages/employee/ep-dashboard.html";
            break;
        
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let dashBoardItems = document.querySelectorAll('.content-area .main-frame .dash-container .dash-item');

    dashBoardItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            activatePanelItem(event.currentTarget.id);
        });
    });
   
});