let complainListContainer = document.querySelector('.content-area .main-frame .complain-list-container');
let itOfficers = [];

window.addEventListener("load", ()=>{
    getAllITOfficers('../../php/complain/get-it-officers.php', getAllItOfficersCallback);
});


document.addEventListener('onLoadComplainList', function(event){

    if(event.detail.status === 'success')
       createComplainItems();
});



function createComplainItems()
{

    if(ComplainList.length == 0)
       return;

       ComplainList.forEach(complain => {
        // console.log(complain)

        let currentStatus;
        if(!complain.AssignerId) 
            currentStatus = 'Not Assign';
        else
            currentStatus = complain.Status;

        let complainItem = document.createElement("div");
        complainItem.classList.add("complain-item");
        complainItem.id = `complain-${complain.ComplainId}`;
        
        let complainTitle = document.createElement("h3");
        complainTitle.textContent = complain.Title;
        complainItem.appendChild(complainTitle);

        let employId = document.createElement("label");
        employId.classList.add("content");
        employId.textContent = `Employ ID : ${complain.EmpId}`;
        complainItem.appendChild(employId);

        complainItem.appendChild(document.createElement("br"));

        let userName = document.createElement("label");
        userName.classList.add("content");
        userName.textContent = `Name : ${complain.UserName}`;
        complainItem.appendChild(userName);

        complainItem.appendChild(document.createElement("br"));

        let statusLabel = document.createElement("label");
        statusLabel.classList.add("content");
        statusLabel.textContent = 'Status : ';
        complainItem.appendChild(statusLabel);


        let status = document.createElement("label");
        status.classList.add("content");
        status.textContent = currentStatus;
        status.style.borderRadius = '15px';
        status.style.padding = '5px';
        status.style.fontSize = '12px';
        status.style.fontWeight = 'bold';
        status.style.width = '100px';  
        status.style.display = 'inline-block'; 

        if(currentStatus === 'Not Assign')
        {
            status.style.background = 'gray';
            status.style.color = 'white';
        }
        if(currentStatus === 'Pending')
        {
            status.style.background = 'orange';
            status.style.color = 'red';
        }
        if(currentStatus === 'Done')
        {
            status.style.background = 'green';
            status.style.color = 'white';
        }

        complainItem.appendChild(status);

        complainItem.appendChild(document.createElement("br"));

        let button = document.createElement("button");
        button.id = `bt-${complain.ComplainId}`;
        button.textContent =  (currentStatus === 'Done' ? 'Close Complain' : 'Open Complain');

        if(currentStatus === 'Done')
           button.classList.add('done-button');
        else
           button.classList.add('normal-button');

        button.addEventListener('click', function(event) {
            if(currentStatus !== 'Done')
               OpenComplainSessionModal(complain);
            else
               DeleteComplain(complain);
        });
         
        complainItem.appendChild(button);


        complainListContainer.appendChild(complainItem);

       });
    
}


function OpenComplainSessionModal(complain)
{
console.log(complain)
    let complainSessionModal = document.querySelector('.modal');
    complainSessionModal.style.display = 'block';
    let complainSessionModalContent = complainSessionModal.querySelector('.modal-content');

    //Remove If has previous content previous
    if(complainSessionModal.querySelector('.complain-container'))
       complainSessionModal.querySelector('.complain-container').remove();

    let complainContainer = document.createElement('div');
    complainContainer.classList.add("complain-container");
    complainContainer.classList.add('preserve-space');
    complainSessionModalContent.appendChild(complainContainer);


    let complainTitle = document.createElement('h2');
    complainTitle.textContent = complain.Title;
    complainTitle.classList.add('complain-form');
    complainTitle.classList.add('form-heading');
    complainContainer.appendChild(complainTitle);

    complainContainer.appendChild(document.createElement("br"));

    let complainDescription = document.createElement('h4');
    complainDescription.textContent = complain.Description;
    complainDescription.classList.add('complain-form');
    complainDescription.classList.add('form-description');
    complainContainer.appendChild(complainDescription);

    complainContainer.appendChild(document.createElement("br"));

    let complainId = document.createElement('h4');
    complainId.textContent = `Employ ID : ${complain.EmpId}`;
    complainId.classList.add('complain-form');
    complainId.classList.add('form-description');
    complainContainer.appendChild(complainId);

    let userName = document.createElement('h4');
    userName.textContent = `Name : ${complain.UserName}`;
    userName.classList.add('complain-form');
    userName.classList.add('form-description');
    complainContainer.appendChild(userName);

    complainContainer.appendChild(document.createElement("br"));

    let selectElement = document.createElement('select');
    selectElement.classList.add("complain-form");
    selectElement.classList.add("form-sel");
    selectElement.id = 'assignerSelect';

    let labelElement = document.createElement('label');
    labelElement.classList.add("complain-form");
    labelElement.classList.add("form-label");
    labelElement.htmlFor = 'assignerSelect';
    labelElement.appendChild(document.createTextNode('Assign To: '));

    let nullOptionElement = document.createElement('option');
    nullOptionElement.value = null;
    nullOptionElement.textContent = 'Select an IT Officer';
    selectElement.appendChild(nullOptionElement);

    if(itOfficers.length !== 0)
    {
        itOfficers.forEach(itOfficer =>{
            let optionElement = document.createElement('option');
            optionElement.value = itOfficer.EmpId;
            optionElement.textContent = `${itOfficer.EmpId} - ${itOfficer.UserName}`;
            selectElement.appendChild(optionElement);
        });

        if(complain.AssignerId)
           selectElement.value = complain.AssignerId;
        
    }
    else
    {
        let nullOptionElement = document.createElement('option');
        nullOptionElement.value = ''; 
        nullOptionElement.textContent = 'Not found any IT officer'; 
        nullOptionElement.disabled = true; 
        nullOptionElement.selected = true; 
        selectElement.appendChild(nullOptionElement);
    }

    let containerDiv = document.createElement('div');
    containerDiv.classList.add("center-container"); 

    containerDiv.appendChild(labelElement);
    containerDiv.appendChild(selectElement);
    complainContainer.appendChild(containerDiv);

    complainContainer.appendChild(document.createElement("br"));

    let assignButton = document.createElement('button');
    assignButton.classList.add('complain-form');
    assignButton.classList.add('form-button');
    assignButton.textContent = 'Assign';

    assignButton.addEventListener('click', function(){
        if(itOfficers.length == 0)
           return;

        AssignComplain(complain, selectElement.value);
    });

    complainContainer.appendChild(assignButton);


}

function AssignComplain(complain, assignerId)
{
    updateComplainAssigner('../../php/complain/update-complain-assigner.php', complain.ComplainId, assignerId, updateComplainAssignerCallback);
}

function DeleteComplain(complain)
{
    deleteComplain('../../php/complain/delete-complain.php', complain.ComplainId, deleteComplainCallback);
}

function CloseComplainSessionModal()
{
    let complainSessionModal = document.querySelector(".modal");
    complainSessionModal.style.display = "none";
}


//Callback functions
function deleteComplainCallback(error, result)
{
    if(error){
        console.log(error);
    }
    else
    {
      console.log(result)
      location.reload(); 
    }
}

function updateComplainAssignerCallback(error, result)
{
    if(error){
        console.log(error);
    }
    else
    {
      console.log(result)
      location.reload(); 
    }
}


function getAllItOfficersCallback(error, result)
{
    if(error){
        console.log(error);
    }
    else
    {
      
      itOfficers = result.data;
      console.log(itOfficers);
    }
}


