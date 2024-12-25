var EmployeeExams = EmployeeExams || [];

let examListContainer = document.querySelector('.content-area .main-frame .exam-list-container');
let quizId = -1;
let ansList = [];
let marks = 0;
let markdPerQuiz = 5;

window.addEventListener("load", ()=>{
    getExamsById('../../php/employee/employee-exam.php', Portal.Employee_Id, empExamCallback);
});


function createExamItems()
{
    if(EmployeeExams.length == 0)
       return;

       EmployeeExams.forEach(exam => {

        let examItem = document.createElement("div");
        examItem.classList.add("exam-item");
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

        let isExamAvailable = isCurrentTimeBetween(exam.StartDateTime, exam.EndDateTime);
        

        let button = document.createElement("button");
        button.id = `bt-${exam.ExamId}`;
        button.textContent = "Attempt Exam";
        
        getExamAttemptStatus('../../php/employee/get-attempt-status.php', exam.ExamId, Portal.Employee_Id, getAttemptExamCallback);

        
        if(!isExamAvailable)
            button.classList.add("deactivate");
        else
            button.classList.remove("deactivate");
   

        button.addEventListener('click', function(event) {
            if(button.textContent === 'Submitted')
               return;

                quizId = -1;
                OpenExamSessionModal(exam);
            });

        examItem.appendChild(button);
        examListContainer.appendChild(examItem);
            
       });
    
}

function OpenExamSessionModal(exam)
{

    let examSessionModal = document.querySelector('.modal');
    examSessionModal.style.display = 'block';
    let examSessionModalContent = examSessionModal.querySelector('.modal-content');

    //Remove If has previous content previous
    if(examSessionModal.querySelector('.exam-container'))
       examSessionModal.querySelector('.exam-container').remove();
    

    let examContainer = document.createElement('div');
    examContainer.classList.add("exam-container");
    examContainer.classList.add('preserve-space');
    examSessionModalContent.appendChild(examContainer);

    examSessionModalContent.appendChild(examContainer);

    if(quizId === -1)
    {
        let quizTitle = document.createElement('h2');
        quizTitle.textContent = exam.Title;
        quizTitle.classList.add('emp-form');
        quizTitle.classList.add('form-heading');
        examContainer.appendChild(quizTitle);

        let quizDescription = document.createElement('h4');
        quizDescription.textContent = exam.Description;
        quizDescription.classList.add('emp-form');
        quizDescription.classList.add('form-description');
        examContainer.appendChild(quizDescription);

        
        let quizDuration = document.createElement('h4');
        let  timeDifference = getTimeDifference(exam.StartDateTime, exam.EndDateTime);
        quizDuration.textContent = 'Duration: ';
        quizDuration.textContent += (timeDifference.hours > 0) ? (timeDifference.minutes > 0 ? `${timeDifference.hours} hours and ${timeDifference.minutes} minutes` : `${timeDifference.hours} hours`) : `${timeDifference.minutes} minutes`;
        quizDuration.classList.add('emp-form');
        quizDuration.classList.add('form-description');
        examContainer.appendChild(quizDuration);

        let startButton = document.createElement('button');
        startButton.classList.add('emp-form');
        startButton.classList.add('form-button');
        startButton.classList.add('button-start');
        startButton.textContent = 'Start';

        startButton.addEventListener('click', function(){
            quizId = 0;
            OpenExamSessionModal(exam);
        });

        examContainer.appendChild(startButton);
    }
    else
    {
        let quizEl = document.createElement('h2');
        quizEl.textContent =  `${quizId+1}) ${exam.QuizData[quizId].quiz}`;
        quizEl.classList.add('emp-form');
        quizEl.classList.add('form-quiz');
        examContainer.appendChild(quizEl);
        

        exam.QuizData[quizId].answers.forEach(element =>{

            let answer1radioEl = document.createElement('input');
            answer1radioEl.type = "radio";
            answer1radioEl.name = `Quiz-${quizId+1}`;
            answer1radioEl.classList.add('emp-form');
            answer1radioEl.classList.add('form-radio');
            answer1radioEl.id = `q${quizId+1}ans${element.id}-radio`;
            examContainer.appendChild(answer1radioEl);

            let answer1LabelEl =  document.createElement('label');
            answer1LabelEl.classList.add('emp-form');
            answer1LabelEl.classList.add('form-label');
            answer1LabelEl.appendChild(document.createTextNode(`${element.text}`));
            examContainer.appendChild(answer1LabelEl);

            let lineBreak = document.createElement('br');
            examContainer.appendChild(lineBreak);
        })


        let nextButton = document.createElement('button');
        nextButton.classList.add('emp-form');
        nextButton.classList.add('form-button');
        nextButton.classList.add('button-next');

        if(quizId === exam.QuizData.length-1)
           nextButton.textContent = 'Submit';
        else
           nextButton.textContent = 'Next';

        nextButton.addEventListener('click', ()=>{

            let answer = null;

            if(quizId < exam.QuizData.length)
            {

                exam.QuizData[quizId].answers.forEach(element =>{

                    if(document.getElementById(`q${quizId+1}ans${element.id}-radio`).checked)
                    {

                        answer = element.id;
                        const keyExists = ansList.some(obj => `quiz${quizId+1}` in obj);
                        
                        if(!keyExists)
                            ansList.push({[`quiz${quizId+1}`]: answer});
                        else
                        {
                            const answerObj = ansList.find(obj => `quiz${quizId+1}` in obj);
                            answerObj[`quiz${quizId+1}`] = answer;
                        }
                    }

                });

                if(!answer)
                    return;

                if(exam.QuizData[quizId].correctId === answer)
                   marks += markdPerQuiz;


               if(quizId+1 < exam.QuizData.length)
               {
                    quizId++;
                    OpenExamSessionModal(exam);
               }
               else
               {
                const totalMarks = exam.QuizData.length * markdPerQuiz;
                const finalMarks = Math.floor((marks/totalMarks) * 100);
                let grade = '';
                if(finalMarks < 45) grade = 'F';
                if(finalMarks >= 45 && finalMarks <= 55) grade = 'S';
                if(finalMarks >= 55 && finalMarks <= 65) grade = 'C';
                if(finalMarks >= 65 && finalMarks <= 75) grade = 'B';
                if(finalMarks > 75) grade = 'A';

                    submitExam('../../php/employee/submit-exam.php', exam.ExamId, Portal.Employee_Id, finalMarks, grade, submitExamCallback);
                    CloseExamSessionModal();
               }
                  

                
            }

        });
        examContainer.appendChild(nextButton);

    }

}

function CloseExamSessionModal()
{
    let examSessionModal = document.querySelector(".modal");
    examSessionModal.style.display = "none";
    isIntro = false;
}

//Callback functions
function empExamCallback(error, result)
{
    if(error){
        console.log(error);
    }
    else
    {
        EmployeeExams = result.data.map((exam)=>{
            return{
                ...exam,
                QuizData: JSON.parse(exam.QuizData)
            }
        });
        
    }

    createExamItems();
}

function submitExamCallback(error, result)
{
    if(error){
        console.log(error);
    }
    else
    {
        location.reload();
    }
}

function getAttemptExamCallback(error, result)
{
    if(error){
        console.log(error);
    }
    else
    {
       
        if(result.message === 'exam found')
        {
            let attemptButton = document.getElementById(`bt-${result.data.ExamId}`);
            attemptButton.textContent = 'Submitted';
            attemptButton.style.backgroundColor = '#808080';
            if(attemptButton.classList.contains("deactivate"))
               attemptButton.classList.remove("deactivate");
        }
        
    }
}