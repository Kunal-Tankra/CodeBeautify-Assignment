const setHour = document.querySelectorAll(".setHour");
const setMin = document.querySelectorAll(".setMin");
const totalOfRows = document.querySelectorAll(".totalOfRow");
const totalHours = document.querySelector("#totalHours");

const startTimes = document.getElementsByClassName("startTime")
const endTimes = document.getElementsByClassName("endTime")
const breakDeductions = document.getElementsByClassName("breakDeduction")


// caculate function event.......
const clickCalculate=(e)=>{
    e.preventDefault()

    for (let ind = 0; ind<startTimes.length; ind++) {
        const startTime = startTimes[ind].children
        const endTime = endTimes[ind].children
        const breakDeduction = breakDeductions[ind].children
        const totalOfRow = totalOfRows[ind]
        
        // start time
        let startHour = parseInt(startTime[0].value);
        let startMin = parseInt(startTime[1].value);
        let start_AM_PM = startTime[2].value;
        
        // end time
        let endHour = parseInt(endTime[0].value);
        let endMin = parseInt(endTime[1].value);
        let end_AM_PM = endTime[2].value;
        
        // break deduction
        let breakHour = parseInt(breakDeduction[0].value);
        let breakMin = parseInt(breakDeduction[1].value);

        if(start_AM_PM == "PM"){
            startHour += 12;
        }

        if(end_AM_PM == "PM"){
            endHour += 12;
        }


        let resHour;
        let resMin;
        let calC
        if(start_AM_PM == "PM" && end_AM_PM == "AM"){
            calC = calCTime(endHour, endMin,startHour, startMin);
            resHour= calC[0];
            resMin = calC[1];

            calC = calCTime(resHour,resMin,24,0);
            resHour = calC[0];
            resMin = calC[1];
            
        }
        else{
            calC = calCTime(startHour, startMin, endHour, endMin);
            resHour = calC[0];
            resMin = calC[1];
            
        }
        
        calC = calCTime(breakHour, breakMin, resHour, resMin);
        resHour = calC[0];
        resMin = calC[1];

        console.log(resHour, resMin)
    }
}

// calculate the time
const calCTime = (stHour,stMin,endHour,endMin)=>{  
    let hour,min; 
    if(stMin > endMin){
        hour = endHour-stHour-1;
        min = 60 - (stMin - endMin);
    }
    else{
        hour = endHour-stHour;
        min = endMin - stMin;
    }

    return [hour, min];
}


// clear function event.........
const clickClearAll=(e)=>{
    e.preventDefault()

    // set 0
    for (const idx in setHour) {
        setHour[idx].value = "";
        setMin[idx].value = "";
    }

    for (const elem of totalOfRows) {
        elem.innerHTML = "- -"
    }

    totalHours.innerText = "- -"
}



