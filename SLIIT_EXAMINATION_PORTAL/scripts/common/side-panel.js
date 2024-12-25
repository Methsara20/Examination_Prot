document.addEventListener('DOMContentLoaded', function() {
    var listItems = document.querySelectorAll('.wrapper .sidebar ul li');
    Portal.Sidebar_Items = listItems;
    removeAllSidePanelClasses();

    let path = window.location.pathname;
    var page = path.split("/").pop();
    var pageWithoutExtension = page.split(".").slice(0, -1).join(".");
    addClassToSidePanelItem(pageWithoutExtension);
   
    listItems.forEach(function(li) {
        li.addEventListener('click', function(event) {
            activatePanelItem(event.currentTarget.id);
        });
    });

    let sidebarHeading = document.getElementById('sidebar-heading');
    sidebarHeading.textContent = 'DASHBOARD';

});




function addClassToSidePanelItem(panelItemId)
{
    document.getElementById(panelItemId).classList.add('active');
}

function removeAllSidePanelClasses()
{
    if(Portal.Sidebar_Items.length == 0)
       return;

    Portal.Sidebar_Items.forEach(function(li) {
        li.classList.remove('active');
    });
}

function activatePanelItem(pageName)
{
    window.location.href = `${pageName}.html`;
}

window.addEventListener("load", ()=>{

    if(!getLoginInfo())
        redirectToLoginPage();

});

window.addEventListener("logout", ()=>{

    removeSidePanelItemClass();

});
