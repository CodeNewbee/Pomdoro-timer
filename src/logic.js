//I am very sorry future self. I did try for the first 5mins

let SEC = 0;
let MIN = 0;
let FLOW = "paused";
let BREAK = true;
let BREAKMINS = 5;
let WORKMINS = 25;

function countdown() {

    //if pause button is pressed, stop countdown
    if(FLOW === "paused") {
        return;
    }

    //itereate trough next min after seconds reech 0
    if(SEC === 0 && MIN > 0) {
        MIN--;
        SEC = 60;
    }

    SEC--;

    //while countdown is not 0, recurse
    if(MIN > 0 || SEC > 0) {
        setTimeout(countdown, 1000);
    } else {
        setTime();
        countdown();
        const alertSound = new Audio("alert.wav");
        alertSound.play();
    }

    //format output
    let outputStr = (("0" + MIN).slice(-2) + ":" + ("0" + SEC).slice(-2));
    document.getElementById("countdown").innerHTML = outputStr;
    document.getElementById("title").innerHTML = outputStr;
}

//set time to working or break time session length
function setTime() {

    BREAK = !BREAK;

    if(BREAK) {
        MIN = BREAKMINS;
        document.getElementById("session_name").innerHTML = "Break time countdown";
    } else {
        MIN = WORKMINS;
        document.getElementById("session_name").innerHTML = "Working time countdown";
    }
}

$(document).ready(function() {

    setTime();

    //start or pause countdown
    $("#startbtn").on("click", function() {
        if(FLOW === "started") {
            FLOW = "paused";
            document.getElementById("startbtn").innerHTML = "Start";
        } else {
            FLOW = "started";
            setTimeout(countdown, 1000);
            document.getElementById("startbtn").innerHTML = "Pause";
        }
    });


    //change working and break session lengths
    $("#add_break_time").on("click", function() {
        BREAKMINS++;
        document.getElementById("disp_break_time").innerHTML = BREAKMINS +":00";
    });
    $("#sub_break_time").on("click", function() {
        if(BREAKMINS > 0) {
            BREAKMINS--;
        }
        document.getElementById("disp_break_time").innerHTML = BREAKMINS + ":00";
    });
    $("#add_work_time").on("click", function() {
        WORKMINS++;
        document.getElementById("disp_work_time").innerHTML = WORKMINS + ":00";
    });
    $("#sub_work_time").on("click", function() {
        if(WORKMINS > 0) {
            WORKMINS--;
        }
        document.getElementById("disp_work_time").innerHTML = WORKMINS + ":00";
    });

    //reset the countdown
    $("#resetbtn").on("click", function() {
        SEC = 0;
        if(FLOW === "started") {
            document.getElementById("startbtn").innerHTML = "Start";
        }
        FLOW = "paused";
        BREAK = true;
        setTime();
        let resetval = ("0" + WORKMINS).slice(-2) + ":" + "00";
        document.getElementById("countdown").innerHTML = resetval;
    });

});
