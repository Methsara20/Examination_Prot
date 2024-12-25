function getExamsById(url, empId, callback)
{
    const finalUrl = `${url}?empId=${encodeURIComponent(empId)}`;

    fetch(finalUrl, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success)
            callback(null, data);
        else
            callback(data.error);
    })
    .catch(error => {
        console.log('Error: ', error);
    });
}

function getAllExams(url, callback)
{
    fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success)
            callback(null, data);
        else
            callback(data.error);
    })
    .catch(error => {
        console.log('Error: ', error);
    });
}

function updateExamAccess(url, examId, empList, callback)
{
    fetch(url, {

        method: 'POST',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 },
        body: `examId=${encodeURIComponent(examId)}&empList=${encodeURIComponent(empList)}`

    }).then(response => response.json())
      .then(data =>{
           if(data.success)
              callback(null, data);
            else
              callback(data.error);
    })
    .catch(error =>{
        console.log('Error: ', error);
    });
}


function createNewExam(url, examId, examTitle, examDes, quizData, startTime, endTime, callback)
{
    fetch(url, {

        method: 'POST',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 },
        body: `examId=${encodeURIComponent(examId)}&title=${encodeURIComponent(examTitle)}&description=${encodeURIComponent(examDes)}&quizData=${encodeURIComponent(quizData)}&startDateTime=${encodeURIComponent(startTime)}&endDateTime=${encodeURIComponent(endTime)}`

    }).then(response => response.json())
      .then(data =>{
           if(data.success)
              callback(null, data);
            else
              callback(data.error);
    })
    .catch(error =>{
        console.log('Error: ', error);
    });
}

function updateExam(url, examId, examTitle, examDes, quizData, startTime, endTime, callback)
{
    fetch(url, {

        method: 'POST',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 },
        body: `examId=${encodeURIComponent(examId)}&title=${encodeURIComponent(examTitle)}&description=${encodeURIComponent(examDes)}&quizData=${encodeURIComponent(quizData)}&startDateTime=${encodeURIComponent(startTime)}&endDateTime=${encodeURIComponent(endTime)}`

    }).then(response => response.json())
      .then(data =>{
           if(data.success)
              callback(null, data);
            else
              callback(data.error);
    })
    .catch(error =>{
        console.log('Error: ', error);
    });
}

function deleteExam(url, examId, callback)
{
    fetch(url, {

        method: 'POST',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 },
        body: `examId=${encodeURIComponent(examId)}`

    }).then(response => response.json())
      .then(data =>{
           if(data.success)
              callback(null, data);
            else
              callback(data.error);
    })
    .catch(error =>{
        console.log('Error: ', error);
    });
}


function submitExam(url, examId, empId, score, grade, callback)
{
    fetch(url, {

        method: 'POST',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 },
        body: `examId=${encodeURIComponent(examId)}&empId=${encodeURIComponent(empId)}&score=${encodeURIComponent(score)}&grade=${encodeURIComponent(grade)}`

    }).then(response => response.json())
      .then(data =>{
           if(data.success)
              callback(null, data);
            else
              callback(data.error);
    })
    .catch(error =>{
        console.log('Error: ', error);
    });
}


function getExamAttemptStatus(url, examId, empId, callback)
{
    fetch(url, {

        method: 'POST',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 },
        body: `examId=${encodeURIComponent(examId)}&empId=${encodeURIComponent(empId)}`

    }).then(response => response.json())
      .then(data =>{
           if(data.success)
              callback(null, data);
            else
              callback(data.error);
    })
    .catch(error =>{
        console.log('Error: ', error);
    });
}