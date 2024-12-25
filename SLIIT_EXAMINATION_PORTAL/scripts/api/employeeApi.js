function getAllNonAdminEmployees(url, callback)
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

function getAllITOfficers(url, callback)
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