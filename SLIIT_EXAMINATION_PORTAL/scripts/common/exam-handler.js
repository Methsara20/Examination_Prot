var ExamList = ExamList || [];


window.addEventListener("load", ()=>{
    getAllExams('../../php/hr/hr-available-exam.php', examListCallback);
 });


 function examListCallback(error, result)
{
    let callbackEvent;
    if(error){
        console.log(error);
        callbackEvent = new CustomEvent('onLoadExamList', {
            detail:{
                status: 'fail'
            }
        });
    }
    else
    {
        ExamList = result.data.map((exam)=>{
            return{
                ...exam,
                QuizData: JSON.parse(exam.QuizData)
            }
        });    
        callbackEvent = new CustomEvent('onLoadExamList', {
            detail:{
                status: 'success'
            }
        });
    }
    document.dispatchEvent(callbackEvent);
}

