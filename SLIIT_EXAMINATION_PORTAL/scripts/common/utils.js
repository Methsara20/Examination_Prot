function getDate(dateTimeString)
{

    // Extract the date component
    const datePart = dateTimeString.split(' ')[0];
    // Ensure datePart exists
    if (!datePart)
    {
        throw new Error(`Invalid date format: ${dateTimeString}`);
    }

    // Extract individual date components
    const [year, month, day] = datePart.split('-');

    // Ensure all parts are defined
    if (!year || !month || !day) 
    {
        throw new Error(`Invalid date format: ${dateTimeString}`);
    }

    return `${year}-${month}-${day}`;
}

function getTimeIn12HourFormat(dateTimeString) {
    // Extract the time component
    const timePart = dateTimeString.split(' ')[1];
    
    // Extract hour and minute components
    let [hours, minutes] = timePart.split(':').map(str => parseInt(str, 10));

    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert 24-hour time to 12-hour time
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

function getTimeDifference(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const differenceInMilliseconds = end.getTime() - start.getTime();
    
    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
        hours: hours,
        minutes: minutes
    };
}

function getFormattedCurrentDate() {
    var now = new Date();

    // Date part: pad start with '0' to ensure two digits
    var day = String(now.getDate()).padStart(2, '0');
    var month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
    var year = now.getFullYear();

    // Time part: pad start with '0' to ensure two digits
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');

    // Combine and format the string in YYYY-MM-DDTHH:MM format
    return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
}

function isCurrentTimeBetween(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();

    return now >= start && now <= end;
}