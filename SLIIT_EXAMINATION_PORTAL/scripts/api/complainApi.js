function createNewComplain(url, empId, title, description, callback)
{
    fetch(url, {

        method: 'POST',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 },
        body: `empId=${encodeURIComponent(empId)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&callback=${encodeURIComponent(callback)}`

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

function getAllComplains(url, callback)
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

function deleteComplain(url, complainId, callback)
{
    fetch(url, {

        method: 'POST',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 },
        body: `complainId=${encodeURIComponent(complainId)}`

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


function updateComplainAssigner(url, complainId, assignerId, callback)
{
    fetch(url, {

        method: 'POST',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 },
        body: `complainId=${encodeURIComponent(complainId)}&assignerId=${encodeURIComponent(assignerId)}`

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

function updateComplainStatus(url, complainId, status, callback)
{
    fetch(url, {

        method: 'POST',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 },
        body: `complainId=${encodeURIComponent(complainId)}&status=${encodeURIComponent(status)}`

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


