let d = new Date();
let months = {
    1:'Jan',
    2:'Feb',
    3:'Mar',
    4:'Apr',
    5:'May',
    6:'Jun',
    7:'Jul',
    8:'Aug',
    9:'Sep',
    10:'Oct',
    11:'Nov',
    12:'Dec'
};

let days = {
    1:'Mon',
    2:'Tue',
    3:'Wed',
    4:'Thu',
    5:'Fri',
    6:'Sat',
    7:'Sun',
}

let date = new Date();
let currentMonth = date.getMonth() + 1;
let currentYear = date.getFullYear();
let currentDay = date.getDay();
let currentDate = date.getDate();
// console.log(currentMonth,currentYear,currentDate,currentDay);

let dateSpan = document.getElementById('date');
let monthSpan = document.getElementById('month');
let yearSpan = document.getElementById('year');

dateSpan.textContent = currentDate;
monthSpan.textContent = months[currentMonth];
yearSpan.textContent = currentYear;

let dates = generateDatesArray(currentYear,currentMonth);
display(dates);

// handling clicks
let left_arrow = document.getElementById('left_arrow');
let right_arrow = document.getElementById('right_arrow');
let state = 0;
left_arrow.addEventListener('click',()=>{
    state = -1;
    dates = getMonthlyDateData(state);
    display(dates);
});
right_arrow.addEventListener('click',()=>{
    state = 1;
    dates = getMonthlyDateData(state);
    display(dates);
});


// handling event clicks
let date_spans = document.querySelectorAll('.date');
let fullPageForm = document.getElementById('fullPageForm');
let formSubmitBtn = document.getElementById('submit');
let addMoreBtn = document.getElementById('more');
let eventInput = document.getElementById('event');
let eventFormDiv = document.getElementById('eventForm');
let close = document.getElementById('close');
let event_data = {};

for(let i = 0;i<date_spans.length;i++){
  date_spans[i].addEventListener('click',e=>{
      e.preventDefault();
      if(e.target.textContent !== ""){
        fullPageForm.style.display = "flex";
        let textarea = document.getElementById('textarea');
        if(textarea){
            textarea.style.display = "none";
            addMoreBtn.style.display = "";
        }
      }
  });
}

// adding a textarea upon clicking addMoreBtn
addMoreBtn.addEventListener('click',e=>{
    e.preventDefault();
    let textarea = document.createElement('textarea');
    textarea.classList.add('textarea');
    textarea.setAttribute('id','textarea');
    eventFormDiv.insertBefore(textarea,eventFormDiv[1]);
    addMoreBtn.style.display = "none";
});

// getting the event data upon clicking submit
formSubmitBtn.addEventListener('click',e=>{
    e.preventDefault();
    let importantEvent = document.getElementById('event');
    let moreEvent = document.getElementById('textarea');
    event_data.importantEvent = importantEvent.value;
    if(moreEvent){
        event_data.moreEvents = moreEvent.value;
        // if(importantEvent.value.length === 0 && moreEvent.value === 0){
            // console.log(importantEvent.value.length);
        //     fullPageForm.style.display = "none";
        //     event_data = {};
        // }
    }else{
        event_data.moreEvents = "";
        fullPageForm.style.display = "none";
    }
    

    // console.log(event_data);
    document.getElementById('eventForm').reset();
    // we send the data from here to the server to store in the database

}); 

// closing the fullPageForm
close.addEventListener('click',e=>{
    e.preventDefault();
    fullPageForm.style.display = "none";
});




// let dates = generateDatesArray(currentYear,currentMonth);
// console.log(dates);
function display(dates){
    let dateSpans = document.querySelectorAll('.date');
    for(let i = 0;i<dateSpans.length;i++){
        dateSpans[i].textContent = dates[i];
        dateSpans[i].style.border = "none";
    }
}


function generateDatesArray(year,month){
    let dates = [
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','','']
    ];
    let data = [];
    let firstDay = new Date(year,month-1, 1).toDateString().substring(0,3);
    // console.log(typeof(firstDay));
    let daysList = Object.keys(days);
    let noOfDays = getNoOfDays(year,month);
    let count = 1;
    for(let i = 0;i<daysList.length;i++){
        if(days[daysList[i]] === firstDay){
            // console.log(daysList[i]);
            for(let j = 0;j<dates.length;j++){
                if(j==0){
                    for(let k = daysList[i]-1;k<7;k++){
                        dates[j][k] = count;
                        count++;
                    }
                }else{
                        for(let k=0;k<7;k++){
                            if(count<noOfDays+1){
                                dates[j][k] = count;
                                count++;
                            }
                    }
                }
            }
        }
    }
    if(count<noOfDays){
        remainingDays = noOfDays-count;
        for(let i = 0;i<remainingDays+1;i++){
            dates[0][i] = count;
            count++;
        }
    }

    for(let i = 0;i<5;i++){
        for(let j = 0;j<7;j++){
            data.push(dates[i][j]);
        }
    }
    // console.log(dates);
    return data;
}

function getNoOfDays(year,month){
    let noOfDays = new Date(year, month, 0).getDate();
    return noOfDays;
}
let starting_point_month = document.getElementById('month').textContent;
let year_starting_point = parseInt(document.getElementById('year').textContent);
let starting_point_index = 0;
for(let i = 0;i<Object.keys(months).length;i++){
    if(months[i+1] == starting_point_month){
        starting_point_index = i+1;
    }
}


function getKey(value){
    let keys = Object.keys(months);
    let valueOp = "";
    for(let i = 0;i<keys.length;i++){
        if(months[keys[i]] == value){
            valueOp = i+1;
        }
    }
    return valueOp;
}


function getMonthlyDateData(state){
    document.getElementById('date').textContent = "1";
    if(state == -1){
        starting_point_index -= 1;
        if(starting_point_index < 1){
            starting_point_index = 12;
        }
        document.getElementById('month').textContent = months[starting_point_index];
        // console.log(starting_point_index);
        if(starting_point_index == 12){
            year_starting_point -= 1;
        }
        document.getElementById('year').textContent = year_starting_point;
    }else if(state == 1){
        starting_point_index += 1;
        starting_point_index = starting_point_index%12;
        if(starting_point_index == 0){
            starting_point_index = 12;
        }
        document.getElementById('month').textContent = months[starting_point_index];
        if(starting_point_index == 1){
            year_starting_point += 1;
        }
        document.getElementById('year').textContent = year_starting_point;
    }


    let currentMonthInHeader = document.getElementById('month').textContent;
    let currentYearInHeader  = document.getElementById('year').textContent;
    let fianlDates = generateDatesArray(currentYearInHeader,getKey(currentMonthInHeader));
    return fianlDates;
}
