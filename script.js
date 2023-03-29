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
    let totalHour = 0,  totalMin = 0;

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

        

        let resHour;
        let resMin;
        let calC
        
        if(startHour == 0 || endHour == 0){
            resHour = "0"
            resMin = "00"
        }
        else{
            if(start_AM_PM == "PM"){
                startHour += 12;
            }
    
            if(end_AM_PM == "PM"){
                endHour += 12;
            }

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
        }

      
        totalOfRow.innerHTML = `${resHour}.${resMin == 0? "00": resMin}`

        totalHour += parseInt(resHour);
        totalMin += parseInt(resMin);
    }

    totalHour += Math.floor(totalMin/60);
    totalMin = totalMin%60;

    totalHours.innerHTML = `${totalHour}.${totalMin == 0? "00": totalMin}`
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
        setHour[idx].value = "0";
        setMin[idx].value = "00";
    }

    for (const elem of totalOfRows) {
        elem.innerHTML = "- -"
    }

    // set am in pm
    for (let ind = 0; ind<startTimes.length; ind++) {
        const startTime = startTimes[ind].children
        const endTime = endTimes[ind].children
        
        // start time
        startTime[2].value = "AM";
        
        // end time
        endTime[2].value = "PM";
        
    }


    totalHours.innerText = "- -"
}



