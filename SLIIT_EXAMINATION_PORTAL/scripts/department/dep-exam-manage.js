

window.addEventListener("load", ()=>{
    CreateItems();
    AddUIEvents();
 });

function CreateItems()
{
    let examManageContainer = document.querySelector('.content-area .main-frame .exam-manage-container');
    let itemTypes = ['create', 'edit', 'delete'];

    itemTypes.forEach(type =>{
        let examItem = document.createElement("div");
        examItem.classList.add("exam-manage-item");
        examItem.id = type === 'create' ? 'create-exam' : (type === 'edit' ? 'edit-exam' : 'delete-exam');

        let examTitle = document.createElement("h3");
        examTitle.textContent = type === 'create' ? 'Create Exam' : (type === 'edit' ? 'Edit Exam' : 'Delete Exam');
        examItem.appendChild(examTitle);

        examItem.appendChild(document.createElement("br"));

        let iconSpan = document.createElement("span");
        iconSpan.classList.add("icon");
        let image = document.createElement("img");
        const svgIcon = type === 'create' ? 'create.svg' : (type === 'edit' ? 'hammer.svg' : 'trash-bin.svg');
        image.src = `../../assets/svg/${svgIcon}`;
        iconSpan.appendChild(image);
        examItem.appendChild(iconSpan);

        examItem.appendChild(document.createElement("br"));

        let button = document.createElement("button");
        button.classList.add(type === 'create' ? 'create' : (type === 'edit' ? 'edit' : 'delete'));
        button.textContent = type === 'create' ? 'Create' : (type === 'edit' ? 'Edit' : 'Delete');
        examItem.appendChild(button);


        examManageContainer.appendChild(examItem);
    });
}

function AddUIEvents()
{
    let examManageItems = document.querySelectorAll('.content-area .main-frame .exam-manage-container .exam-manage-item');

    examManageItems.forEach(function(item) {
        let buttonInsideItem = item.querySelector("button");
       
        if (buttonInsideItem)
        {
            buttonInsideItem.addEventListener('click', function(event) {
                ClearAll();
                OpenExamManageModal(buttonInsideItem.className);
                
            });
        }
    });
}

function OpenExamManageModal(mode)
{
    let examManageModal = document.querySelector(".modal");
        examManageModal.style.display = "block";

    let examContainer = examManageModal.querySelector(".exam-container");

    let modalTitle = examManageModal.querySelector("h2");
        modalTitle.textContent = mode === 'create' ? 'Create New Exam' : (mode === 'edit' ? 'Edit Exam' : 'Delete Exam');


    //Remove previous DOM elements
    let mainExamDiv = examManageModal.querySelector('.modal-content .main-exam-detail');
    if(mainExamDiv)
       mainExamDiv.remove();
    //End of remove previous DOM elements


    let mainExamDivElement = document.createElement('div');
    mainExamDivElement.classList.add('main-exam-detail');
    mainExamDivElement.classList.add('preserve-space');


    if(mode !== 'create')
    {   

        let selectElement = document.createElement('select');
        selectElement.classList.add("exam-form");
        selectElement.classList.add("form-sel");
        selectElement.id = 'examSelect';

        let labelElement = document.createElement('label');
        labelElement.classList.add("exam-form");
        labelElement.classList.add("form-label");
        labelElement.htmlFor = 'examSelect';
        labelElement.appendChild(document.createTextNode('Select the Exam: '));

        if(ExamList.length !== 0)
        {
            ExamList.forEach(exam =>{
                let optionElement = document.createElement('option');
                optionElement.value = exam.ExamId;
                optionElement.textContent = exam.ExamId;
                selectElement.appendChild(optionElement);
            });
    
        }
        else
        {
            let nullOptionElement = document.createElement('option');
                nullOptionElement.value = ''; // Generally, the value of a null option is an empty string
                nullOptionElement.textContent = 'No exams available'; // Display text indicating no options
                nullOptionElement.disabled = true; // Making the option unselectable
                nullOptionElement.selected = true; // Making this option selected by default
                selectElement.appendChild(nullOptionElement);
        }
       
        selectElement.addEventListener('change', function(event) {
            ClearQuizes();
            LoadExamData();
        });

        mainExamDivElement.appendChild(labelElement);
        mainExamDivElement.appendChild(selectElement);
    }
    else
    {

        let titleLabelElement = document.createElement('label');
        titleLabelElement.classList.add("exam-form");
        titleLabelElement.classList.add("form-label");
        titleLabelElement.htmlFor = 'examID';  
        titleLabelElement.appendChild(document.createTextNode('Exam ID               : '));

        let titleInputElement = document.createElement('input');
        titleInputElement.classList.add("exam-form");
        titleInputElement.classList.add("form-input-normal");
        titleInputElement.type = 'text';
        titleInputElement.id = 'examID';

        mainExamDivElement.appendChild(titleLabelElement);
        mainExamDivElement.appendChild(titleInputElement);
    }

        //Exam Name
        let brTag = document.createElement('br');
        mainExamDivElement.appendChild(brTag);

        let nameLabelElement = document.createElement('label');
        nameLabelElement.classList.add("exam-form");
        nameLabelElement.classList.add("form-label");
        nameLabelElement.htmlFor = 'examName';  
        nameLabelElement.appendChild(document.createTextNode('Exam Name       : '));

        let nameInputElement = document.createElement('input');
        nameInputElement.classList.add("exam-form");
        nameInputElement.classList.add("form-input-normal");
        nameInputElement.type = 'text';
        nameInputElement.id = 'examName';

        mainExamDivElement.appendChild(nameLabelElement);
        mainExamDivElement.appendChild(nameInputElement);


        //Exam Description
        let brTag2 = document.createElement('br');
        mainExamDivElement.appendChild(brTag2);

        let desLabelElement = document.createElement('label');
        desLabelElement.classList.add("exam-form");
        desLabelElement.classList.add("form-label");
        desLabelElement.htmlFor = 'examDes';  
        desLabelElement.appendChild(document.createTextNode('Description         : '));

        let desInputElement = document.createElement('textarea');
        desInputElement.classList.add("exam-form");
        desInputElement.classList.add("form-input-large");
        desInputElement.id = 'examDes';

        mainExamDivElement.appendChild(desLabelElement);
        mainExamDivElement.appendChild(desInputElement);

        examContainer.parentNode.insertBefore(mainExamDivElement, examContainer);

        //Exam StartTime
        let startDTLabelElement = document.createElement('label');
        startDTLabelElement.classList.add("exam-form");
        startDTLabelElement.classList.add("form-label");
        startDTLabelElement.htmlFor = 'exam-start-time';  
        startDTLabelElement.appendChild(document.createTextNode('Start Time           : '));

        let startDTInputElement = document.createElement('input');
        startDTInputElement.setAttribute('type', 'datetime-local');
        startDTInputElement.setAttribute('name', 'my-datetime');
        startDTInputElement.setAttribute('id', 'my-datetime');
        startDTInputElement.setAttribute('value', getFormattedCurrentDate());
        startDTInputElement.classList.add("exam-form");
        startDTInputElement.classList.add("form-input-date");
        startDTInputElement.id = 'exam-start-time';

        mainExamDivElement.appendChild(startDTLabelElement);
        mainExamDivElement.appendChild(startDTInputElement);

        //Exam EndTime
        let endDTLabelElement = document.createElement('label');
        endDTLabelElement.classList.add("exam-form");
        endDTLabelElement.classList.add("form-label");
        endDTLabelElement.htmlFor = 'exam-end-time';  
        endDTLabelElement.appendChild(document.createTextNode('End Time             : '));

        let endDTInputElement = document.createElement('input');
        endDTInputElement.setAttribute('type', 'datetime-local');
        endDTInputElement.setAttribute('name', 'my-datetime');
        endDTInputElement.setAttribute('id', 'my-datetime');
        endDTInputElement.setAttribute('value', getFormattedCurrentDate());
        endDTInputElement.classList.add("exam-form");
        endDTInputElement.classList.add("form-input-date");
        endDTInputElement.id = 'exam-end-time';

        mainExamDivElement.appendChild(endDTLabelElement);
        mainExamDivElement.appendChild(endDTInputElement);


        examContainer.parentNode.insertBefore(mainExamDivElement, examContainer);


    if(mode !== 'delete')
    {
        //Add Exam Button
        let brTag3 = document.createElement('br');
        mainExamDivElement.appendChild(brTag3);

        let addQuizElement = document.createElement('button');
        addQuizElement.classList.add("exam-form");
        addQuizElement.classList.add("form-button");
        addQuizElement.classList.add(mode === "create" ? "button-add" : "button-edit");
        addQuizElement.textContent = 'Add Quiz';

        addQuizElement.addEventListener('click', function(){
            if(mode === 'create')
            {
                HandleQuizes(null);
            }
            else
            {
                if(ExamList.length !== 0)
                   HandleQuizes(null);
            }
            
        });

        mainExamDivElement.appendChild(addQuizElement);
        examContainer.parentNode.insertBefore(mainExamDivElement, examContainer);
 
    }
    else
    {
         //Delete Exam Button
         let brTag3 = document.createElement('br');
         mainExamDivElement.appendChild(brTag3);
 
         let deleteQuizElement = document.createElement('button');
         deleteQuizElement.classList.add("exam-form");
         deleteQuizElement.classList.add("form-button");
         deleteQuizElement.classList.add("button-delete");
         deleteQuizElement.textContent = 'Delete Quiz';

         deleteQuizElement.addEventListener('click', function(){
           DeleteQuiz();
        });

 
         mainExamDivElement.appendChild(deleteQuizElement);
         examContainer.parentNode.insertBefore(mainExamDivElement, examContainer);
    }


    //Add final Submit button
    if(mode !== 'delete')
    {

        let modalContentDiv = examManageModal.querySelector('.modal-content');

        let submitButton = modalContentDiv.querySelector('button-submit');
       
        if(!submitButton)
        {
            let submitQuizElement = document.createElement('button');
            submitQuizElement.classList.add('modal-button');
            submitQuizElement.classList.add('button-submit');
            submitQuizElement.textContent = 'Submit Quiz Form';
   
            submitQuizElement.addEventListener('click', function() {
               SubmitQuizes(mode);
           });
   
            modalContentDiv.appendChild(submitQuizElement);
        }

         
    }

    //Load Selected Exams
    if(mode !== 'create')
    {
        LoadExamData()
    }


}

function CloseExamManageModal()
{
    let examManageModal = document.querySelector(".modal");
    examManageModal.style.display = "none";
}

function ClearAll()
{
    ClearQuizes();
    let examManageModal = document.querySelector(".modal");
    let modalContentDiv = examManageModal.querySelector('.modal-content');
    let submitButton = modalContentDiv.querySelector('.button-submit');

    if(submitButton)
       submitButton.remove();

}

function ClearQuizes()
{
    let examManageModal = document.querySelector(".modal");
    let examContainer = examManageModal.querySelector(".exam-container");
    let quizes =  examContainer.querySelectorAll(".quiz-form");

    if(quizes.length != 0)
    {
        quizes.forEach(quiz => {
            quiz.remove();
        });
    }
}

function RenameAllQuizes()
{
    let examManageModal = document.querySelector(".modal");
    let examContainer = examManageModal.querySelector(".exam-container");
    let quizes =  examContainer.querySelectorAll(".quiz-form");

    if(quizes.length != 0)
    {
        for(let i = 0; i < quizes.length; i++)
        {
            let quizNum = quizes[i].querySelector(".quiz-label");
            quizNum.textContent = `${i+1})`;
        }
    }
}

function LoadExamData()
{
  
    if(ExamList.length === 0)
       return;

    const examID = document.getElementById('examSelect').value;
    const examData = ExamList.find(exam => exam.ExamId == examID);
    
    const examName = document.getElementById('examName');
    const examDes = document.getElementById('examDes');
    const startTime = document.getElementById('exam-start-time');
    const endTime = document.getElementById('exam-end-time');

    examName.value = examData.Title;
    examDes.value = examData.Description;
    startTime.value = examData.StartDateTime;
    endTime.value = examData.EndDateTime;

    examData.QuizData.forEach(quiz =>{
        HandleQuizes(quiz);
    });
    
}


function HandleQuizes(quizData = null)
{
    let examManageModal = document.querySelector(".modal");
    let examContainer = examManageModal.querySelector(".exam-container");

    let quiz;
    if(quizData)
       quiz = CreateQuizElement(quizData);
    else
       quiz = CreateQuizElement();

    examContainer.appendChild(quiz);
}

function DeleteQuiz()
{
    if(ExamList.length === 0)
        return;

    const examID = document.getElementById('examSelect').value;
    deleteExam('../../php/department/delete-exam.php', examID, DeleteExamCallback);

}

function CreateQuizElement(quizData = null)
{
   
    //Get previous quizes
    let examManageModal = document.querySelector(".modal");
    let examContainer = examManageModal.querySelector(".exam-container");
    let quizes =  examContainer.querySelectorAll(".quiz-form");
    let currentQuizId = quizes.length + 1;

    let quizDiv = document.createElement('div');
    quizDiv.classList.add('quiz-form');
    quizDiv.classList.add('preserve-space');
    quizDiv.id = `quiz-form-${currentQuizId}`;


    //Qestion

    let qestionLabelEl = document.createElement('label');
    qestionLabelEl.classList.add("quiz-label");
    qestionLabelEl.id = currentQuizId;
    qestionLabelEl.appendChild(document.createTextNode(`${currentQuizId})`));
    quizDiv.appendChild(qestionLabelEl);

    let qestionInputEl = document.createElement('textarea');
    qestionInputEl.classList.add("quiz-textarea");
    qestionInputEl.type = 'text';
    qestionInputEl.id = 'quiz-textarea';
    qestionInputEl.addEventListener('blur', function() {
        this.scrollTop = 0;
    });
    //Load question If available
    if(quizData)
       qestionInputEl.value = quizData.quiz;

    quizDiv.appendChild(qestionInputEl);
    

    //Answer - 1
    let answer1radioEl = document.createElement('input');
    answer1radioEl.type = "radio";
    answer1radioEl.name = `Quiz-${currentQuizId}`;
    answer1radioEl.classList.add("quiz-radio");
    answer1radioEl.id = 'ans1-radio';
    quizDiv.appendChild(answer1radioEl);

    let answer1InputEl = document.createElement('textarea');
    answer1InputEl.classList.add("quiz-textarea");
    answer1InputEl.id = 'ans1-textarea';
    answer1InputEl.type = 'text';
    answer1InputEl.addEventListener('blur', function() {
        this.scrollTop = 0;
    });
    //Load Answer1 If available
    if(quizData)
    {
        answer1InputEl.value = quizData.answers[0].text;
        if(quizData.correctId === 1)
           answer1radioEl.checked = true;
    }
       
    quizDiv.appendChild(answer1InputEl);
 

    //Answer - 2
    let answer2radioEl = document.createElement('input');
    answer2radioEl.type = "radio";
    answer2radioEl.name = `Quiz-${currentQuizId}`;
    answer2radioEl.classList.add("quiz-radio");
    answer2radioEl.id = 'ans2-radio';
    quizDiv.appendChild(answer2radioEl);

    let answer2InputEl = document.createElement('textarea');
    answer2InputEl.classList.add("quiz-textarea");
    answer2InputEl.id = 'ans2-textarea';
    answer2InputEl.type = 'text';
    answer2InputEl.addEventListener('blur', function() {
        this.scrollTop = 0;
    });
    //Load Answer1 If available
    if(quizData)
    {
        answer2InputEl.value = quizData.answers[1].text;
        if(quizData.correctId === 2)
           answer2radioEl.checked = true;
    }
        

    quizDiv.appendChild(answer2InputEl);
    

    //Answer - 3
    let answer3radioEl = document.createElement('input');
    answer3radioEl.type = "radio";
    answer3radioEl.name = `Quiz-${currentQuizId}`;
    answer3radioEl.classList.add("quiz-radio");
    answer3radioEl.id = 'ans3-radio';
    quizDiv.appendChild(answer3radioEl);

    let answer3InputEl = document.createElement('textarea');
    answer3InputEl.classList.add("quiz-textarea");
    answer3InputEl.id = 'ans3-textarea';
    answer3InputEl.type = 'text';
    answer3InputEl.addEventListener('blur', function() {
        this.scrollTop = 0;
    });
     //Load Answer1 If available
     if(quizData)
     {
        answer3InputEl.value = quizData.answers[2].text;
        if(quizData.correctId === 3)
           answer3radioEl.checked = true;
     }
        

    quizDiv.appendChild(answer3InputEl);
   
    
    //Answer - 4
    let answer4radioEl = document.createElement('input');
    answer4radioEl.type = "radio";
    answer4radioEl.name = `Quiz-${currentQuizId}`;
    answer4radioEl.classList.add("quiz-radio");
    answer4radioEl.id = 'ans4-radio';
    quizDiv.appendChild(answer4radioEl);

    let answer4InputEl = document.createElement('textarea');
    answer4InputEl.classList.add("quiz-textarea");
    answer4InputEl.id = 'ans4-textarea';
    answer4InputEl.type = 'text';
    answer4InputEl.addEventListener('blur', function() {
        this.scrollTop = 0;
    });
    //Load Answer1 If available
    if(quizData)
    {
        answer4InputEl.value = quizData.answers[3].text;
        if(quizData.correctId === 4)
           answer4radioEl.checked = true;
    }
       
    
    quizDiv.appendChild(answer4InputEl);
    

    let deleteQuizButton = document.createElement('button');
    deleteQuizButton.classList.add("quiz-button");
    deleteQuizButton.classList.add("button-delete");
    deleteQuizButton.textContent = 'Delete Quiz';

    deleteQuizButton.addEventListener('click', function(){

        let el = document.getElementById(`quiz-form-${currentQuizId}`);
        el.remove();
        RenameAllQuizes()
    });

    quizDiv.appendChild(deleteQuizButton);

    return quizDiv;
}

function SubmitQuizes(mode)
{
    let examManageModal = document.querySelector(".modal");
    let examContainer = examManageModal.querySelector(".exam-container");
    let quizes =  examContainer.querySelectorAll(".quiz-form");

    let examID
    let examName = document.getElementById('examName').value;
    let examDes = document.getElementById('examDes').value;
    let startTime = document.getElementById('exam-start-time').value;
    let endTime = document.getElementById('exam-end-time').value;

    
    if(mode === 'create')
       examID = document.getElementById('examID').value;
    else
       examID = document.getElementById('examSelect').value;

    if(quizes.length != 0)
    {
        if(examID !== "" && examName !== "" && examDes !== "")
        {
            let quizData = [];

            quizes.forEach(item =>{
                

                const quiz = item.querySelector('#quiz-textarea').value;

                const anz1 = item.querySelector('#ans1-textarea').value;
                const anz1Status = item.querySelector('#ans1-radio').checked;

                const anz2 = item.querySelector('#ans2-textarea').value;
                const anz2Status = item.querySelector('#ans2-radio').checked;

                const anz3 = item.querySelector('#ans3-textarea').value;
                const anz3Status = item.querySelector('#ans3-radio').checked;

                const anz4 = item.querySelector('#ans4-textarea').value;
                const anz4Status = item.querySelector('#ans4-radio').checked;

                let correctAnswer;

                if(anz1Status)correctAnswer = 1;
                if(anz2Status)correctAnswer = 2;
                if(anz3Status)correctAnswer = 3;
                if(anz4Status)correctAnswer = 4;


                const tempQuiz = {
                    quiz: quiz,
                    answers: [{id: 1, text: anz1}, {id: 2, text: anz2}, {id: 3, text: anz3}, {id: 4, text: anz4}],
                    correctId: correctAnswer
                }

                quizData.push(tempQuiz);
                
            });
            console.log(mode)
            //Save Exam Data
           if(mode === 'create')
              createNewExam('../../php/department/create-exam.php', examID, examName, examDes, JSON.stringify(quizData), startTime, endTime, CreateExamCallback);
           else
              updateExam('../../php/department/update-exam.php', examID, examName, examDes, JSON.stringify(quizData), startTime, endTime, UpdateExamCallback);

        }
        else
        {
            console.error('Please fill neccesary exam info');
        }
    }
    else
    {
        console.error('Not found any quiz');
    }
}

function CreateExamCallback(error, result)
{
   
    if(error){
        console.log(error);
    }
    else
    {
        console.log(result);
        location.reload();

    }
}

function UpdateExamCallback(error, result)
{
   
    if(error){
        console.log(error);
    }
    else
    {
        console.log(result);
        location.reload();

    }
}

function DeleteExamCallback(error, result)
{
   
    if(error){
        console.log(error);
    }
    else
    {
        console.log(result);
        location.reload();

    }
}



