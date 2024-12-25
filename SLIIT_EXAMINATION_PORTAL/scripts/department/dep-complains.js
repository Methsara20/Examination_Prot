let complainListContainer = document.querySelector('.content-area .main-frame .complain-list-container');

window.addEventListener("load", ()=>{
    
    createComplainCreator();
    
});


function createComplainCreator()
{
    let complainCreator = document.createElement("div");
    complainCreator.classList.add("complain-creator-item");
    complainCreator.id = 'complain-creator';

    let complainCreatorTitle = document.createElement("h3");
    complainCreatorTitle.textContent = 'Create New Complain';
    complainCreator.appendChild(complainCreatorTitle);

    complainCreator.appendChild(document.createElement("br"));

    let iconSpan = document.createElement("span");
    iconSpan.classList.add("icon");
    let image = document.createElement("img");
    const svgIcon = 'create.svg';
    image.src = `../../assets/svg/${svgIcon}`;
    iconSpan.appendChild(image);
    complainCreator.appendChild(iconSpan);

    complainCreator.appendChild(document.createElement("br"));

    let button = document.createElement("button");
    button.textContent = 'Create Complain';

    button.addEventListener('click', function(event) {

        OpenComplainSessionModal();

    });

    complainCreator.appendChild(button);

    complainListContainer.appendChild(complainCreator);
}


function CloseComplainSessionModal()
{
    let complainSessionModal = document.querySelector(".modal");
    complainSessionModal.style.display = "none";
}

function OpenComplainSessionModal()
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
    complainTitle.textContent = 'Create New Complain';
    complainTitle.classList.add('complain-form');
    complainTitle.classList.add('form-heading');
    complainContainer.appendChild(complainTitle);

    complainContainer.appendChild(document.createElement("br"));

    //Complain Name
    let nameLabelElement = document.createElement('label');
    nameLabelElement.classList.add("complain-form");
    nameLabelElement.classList.add("form-label");
    nameLabelElement.htmlFor = 'complainName';  
    nameLabelElement.appendChild(document.createTextNode('Complain Name       : '));

    let nameInputElement = document.createElement('input');
    nameInputElement.classList.add("complain-form");
    nameInputElement.classList.add("form-input-normal");
    nameInputElement.type = 'text';
    nameInputElement.id = 'complainName';

    complainContainer.appendChild(nameLabelElement);
    complainContainer.appendChild(nameInputElement);

    complainContainer.appendChild(document.createElement("br"));

    //Complain Description
    let desLabelElement = document.createElement('label');
    desLabelElement.classList.add("complain-form");
    desLabelElement.classList.add("form-label");
    desLabelElement.htmlFor = 'ComplainDes';  
    desLabelElement.appendChild(document.createTextNode('Description                 : '));

    let desInputElement = document.createElement('textarea');
    desInputElement.classList.add("complain-form");
    desInputElement.classList.add("form-input-large");
    desInputElement.id = 'ComplainDes';

    complainContainer.appendChild(desLabelElement);
    complainContainer.appendChild(desInputElement);

    complainContainer.appendChild(document.createElement("br"));

    let createButton = document.createElement('button');
    createButton.classList.add("complain-form");
    createButton.classList.add("form-button");
    createButton.textContent = 'Create';

    createButton.addEventListener('click', function(){
        CreateComplain(nameInputElement.value, desInputElement.value);
    });

    complainContainer.appendChild(createButton);
}

function CreateComplain(title, description)
{
    if(title === '' || description === '')
       return;

    createNewComplain('../../php/complain/create-complain.php', Portal.Employee_Id, title, description, createComplainCallback);
}


//Callback functions
function createComplainCallback(error, result)
{
    if(error){
        console.log(error);
    }
    else
    {
      console.log(result);
      CloseComplainSessionModal()
    }
}