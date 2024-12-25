let complainListContainer = document.querySelector('.content-area .main-frame .complain-review-list-container');
let assignedComplains = [];

document.addEventListener('onLoadComplainList', function(event){

    if(event.detail.status === 'success')
    {
        assignedComplains = ComplainList.filter((complain) => {
            return complain.AssignerId === Portal.Employee_Id;
        });
        
        createComplainItems();
    }
});

function createComplainItems()
{
    if(assignedComplains.length == 0)
       return;

    assignedComplains.forEach(complain => {

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
        status.textContent = complain.Status;
        status.style.borderRadius = '15px';
        status.style.padding = '5px';
        status.style.fontSize = '12px';
        status.style.fontWeight = 'bold';
        status.style.width = '100px';  
        status.style.display = 'inline-block'; 

        if(complain.Status === 'Pending')
        {
            status.style.background = 'orange';
            status.style.color = 'red';
        }
        if(complain.Status  === 'Done')
        {
            status.style.background = 'green';
            status.style.color = 'white';
        }

        complainItem.appendChild(status);

        complainItem.appendChild(document.createElement("br"));

        let button = document.createElement("button");
        button.id = `bt-${complain.ComplainId}`;
        button.textContent =  'Open Complain';

        if(complain.Status === 'Done')
           button.classList.add('done-button');
        else
           button.classList.add('normal-button');

        button.addEventListener('click', function(event) {
            if(complain.Status !== 'Done')
               OpenComplainSessionModal(complain);
        });

        complainItem.appendChild(button);

        complainListContainer.appendChild(complainItem);
    });
 
}

function OpenComplainSessionModal(complain)
{
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
        selectElement.id = 'statusSelect';

        let labelElement = document.createElement('label');
        labelElement.classList.add("complain-form");
        labelElement.classList.add("form-label");
        labelElement.htmlFor = 'statusSelect';
        labelElement.appendChild(document.createTextNode('Status: '));

        const statusList = ['Pending', 'Done'];

        statusList.forEach(status =>{
            let optionElement = document.createElement('option');
            optionElement.value = status;
            optionElement.textContent = status;
            selectElement.appendChild(optionElement);
        });
          
        selectElement.value = complain.Status;

        let containerDiv = document.createElement('div');
        containerDiv.classList.add("center-container"); 

        containerDiv.appendChild(labelElement);
        containerDiv.appendChild(selectElement);
        complainContainer.appendChild(containerDiv);

        complainContainer.appendChild(document.createElement("br"));

        let changeStatusButton = document.createElement('button');
        changeStatusButton.classList.add('complain-form');
        changeStatusButton.classList.add('form-button');
        changeStatusButton.textContent = 'Change Status';

        changeStatusButton.addEventListener('click', function(){
            ChangeStatus(complain, selectElement.value);
        });

        complainContainer.appendChild(changeStatusButton);
}

function CloseComplainSessionModal()
{
    let complainSessionModal = document.querySelector(".modal");
    complainSessionModal.style.display = "none";
}

function ChangeStatus(complain, status)
{
    updateComplainStatus('../../php/it-support/update-complain-status.php', complain.ComplainId, status, updateComplainStatusCallback);
}

//Callback functions

function updateComplainStatusCallback(error, result)
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