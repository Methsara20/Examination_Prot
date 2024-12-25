var NonAdminEmployees = NonAdminEmployees || [];

let examContainer = document.querySelector('.content-area .main-frame .exam-access-container');
let currentExam = null;

document.addEventListener('onLoadExamList', function(event){

    if(event.detail.status === 'success')
       loadHrExams();
});


function loadHrExams()
{
    if(ExamList.length == 0)
       return;

      ExamList.forEach(exam => {
        let examItem = document.createElement("div");
        examItem.classList.add("exam-access-item");
        examItem.id = exam.ExamId;

        let examTitle = document.createElement("h3");
        examTitle.textContent = exam.Title;
        examItem.appendChild(examTitle);

        let startDate = document.createElement("label");
        startDate.classList.add("start-date");
        startDate.textContent = `Date: ${getDate(exam.StartDateTime)}`;
        examItem.appendChild(startDate);

        examItem.appendChild(document.createElement("br"));

        let startTime = document.createElement("label");
        startTime.classList.add("start-time");
        startTime.textContent = `Time: ${getTimeIn12HourFormat(exam.StartDateTime)}`;
        examItem.appendChild(startTime);

        examItem.appendChild(document.createElement("br"));

        let timeDifference = getTimeDifference(exam.StartDateTime, exam.EndDateTime);
        let duration = document.createElement("label");
        duration.classList.add("duration");
        duration.textContent = 'Duration: ';
        duration.textContent += (timeDifference.hours > 0) ? (timeDifference.minutes > 0 ? `${timeDifference.hours} hours and ${timeDifference.minutes} minutes` : `${timeDifference.hours} hours`) : `${timeDifference.minutes} minutes`;
        examItem.appendChild(duration);

        examItem.appendChild(document.createElement("br"));

        let button = document.createElement("button");
        button.textContent = "Control Access";
        examItem.appendChild(button);

        examContainer.appendChild(examItem);
         
    });

    getAllNonAdminEmployees('../../php/hr/hr-employee-list.php', hrEmployeesCallback);
   
}

function AddUIEvents()
{
    let examAccessItems = document.querySelectorAll('.content-area .main-frame .exam-access-container .exam-access-item');

    examAccessItems.forEach(function(item) {
        let buttonInsideItem = item.querySelector("button");
       
        if (buttonInsideItem)
        {
            buttonInsideItem.addEventListener('click', function(event) {
               OpenControlAccessModal(item.id);
            });
        }
    });
}

function OpenControlAccessModal(examId)
{
    currentExam = ExamList.find(exam => exam.ExamId === examId);
    let controlAccessModal = document.querySelector(".modal");
        controlAccessModal.style.display = "block";

    let empContainer = controlAccessModal.querySelector(".emp-container");
    let checkboxes =  empContainer.querySelectorAll(".cb-emp");
    let labels =  empContainer.querySelectorAll(".cb-emp-label");
    let brs = empContainer.querySelectorAll("br");

    if(checkboxes.length != 0)
    {
        checkboxes.forEach(checkbox => {
            checkbox.remove();
        });
    }

    if(labels.length != 0)
    {
        labels.forEach(label => {
            label.remove();
        });
    }

    if(brs.length != 0)
    {
        brs.forEach(br => {
            br.remove();
        });
    }

    let modalTitle = controlAccessModal.querySelector("h2");
    modalTitle.textContent = currentExam.Title;

    const items = NonAdminEmployees.map(employee => employee.EmpId);

    items.forEach((item, index) => {
        const checkbox = document.createElement('input');
        checkbox.classList.add("cb-emp");
        checkbox.type = 'checkbox';
        checkbox.id = 'checkbox' + index;
        checkbox.name = item;

        if(currentExam.EmpList.includes(item))
           checkbox.checked = true;
        
        const label = document.createElement('label');
        label.classList.add("cb-emp-label");
        label.htmlFor = 'checkbox' + index;
        label.appendChild(document.createTextNode(item));

        empContainer.appendChild(checkbox);
        empContainer.appendChild(label);
        empContainer.appendChild(document.createElement('br'));
    });
}

function ApplyAccessControl()
{
    let controlAccessModal = document.querySelector(".modal");
    let empContainer = controlAccessModal.querySelector(".emp-container");
    let checkboxes =  empContainer.querySelectorAll(".cb-emp");

    let validEmployIds = [];

    if(checkboxes.length != 0)
    {
        checkboxes.forEach(checkbox => {
            if(checkbox.checked)
               validEmployIds.push(checkbox.name);       
        });
    }

    
    if(validEmployIds.length !== 0)
    {
        const empList = validEmployIds.join(",");
        updateExamAccess('../../php/hr/hr-update-access.php', currentExam.ExamId, empList, hrUpdateExamCallback);
    }
    else
    {
        updateExamAccess('../../php/hr/hr-update-access.php', currentExam.ExamId, '', hrUpdateExamCallback);
    }
}

function CloseControlAccessModal()
{
    let controlAccessModal = document.querySelector(".modal");
    controlAccessModal.style.display = "none";
}




//Callback functions
function hrEmployeesCallback(error, result)
{
    if(error){
        console.log(error);
    }
    else
    {
        
        NonAdminEmployees = result.data;
        AddUIEvents();
    }
}

function hrUpdateExamCallback(error, result)
{
    if(error){
        console.log(error);
    }
    else
    {
        CloseControlAccessModal();
    }

    location.reload(); 
}
