Boolean : menuOpen = false;
Boolean : dark = false;

var date;
var day;
var hour;
var min;
var sec;

$(document).ready(function(){
    $(document).on('submit', '#settings', () => {
        setAlarm();
        return false;
    })

    $(document).on('reset', '#settings', () => {
        stopAlarm();
        return false;
    })
})

function startClock(){

    date = new Date();
    day = date.getDay();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();

    var dayText = document.getElementsByClassName('day');
    var am = document.getElementById("am");
    var pm = document.getElementById("pm");
    var displayHour = hour

    if(hour > 12){
        displayHour = hour - 12;
        pm.classList.add("time");
        am.classList.remove("time");
    }
    if(hour >= 0 && hour < 12){
        if(hour == 0){
            displayHour = 12;
        }
        displayHour = hour;
        pm.classList.remove("time");
        am.classList.add("time");
    }

    displayHour = (displayHour < 9 && displayHour >= 0) ? '0' + displayHour : displayHour; 
    min = (min <= 9 && min >= 0) ? '0' + min : min; 
    sec = (sec <= 9 && sec >= 0) ? '0' + sec : sec; 

    for (let i = 0; i < dayText.length; i++) {
        if(i == day){
        dayText[i].classList.add('today');
        }
        else{
        dayText[i].classList.remove('today');
        }
    }

    document.getElementById('time').innerHTML = displayHour + ":" + min + ":" + sec;

    setInterval(() => {
        startClock();
    }, 1000);
}

function openMenu(){
    var settingsBox = document.getElementById("settings");
    var menuBtn = document.getElementById("menu-btn");

    if(!menuOpen){
        menuBtn.classList.add("open");
        settingsBox.classList.add("open");
        menuBtn.style.transform = 'rotate(0deg)';
        menuOpen = true;
    }
    else{
        menuBtn.classList.remove("open");
        settingsBox.classList.remove("open");
        menuBtn.style.transform = 'rotate(180deg)';
        menuOpen = false;
    }
}

function darkMode(){

    if(dark == false){   
        document.getElementById("dark-btn").innerHTML = "Light Mode";
        document.getElementsByTagName('body')[0].classList.add("dark-mode");
        document.getElementById('clock').classList.add("dark-mode");
        dark = true;
    }
    else{
        document.getElementById("dark-btn").innerHTML = "Dark Mode";
        document.getElementsByTagName('body')[0].classList.remove("dark-mode");
        document.getElementById('clock').classList.remove("dark-mode");
        dark = false;
    }
}

function setAlarm(){
    var alarmIcon = document.getElementById('alarm-icon');
    var alarmInput = document.getElementById('alarm-input').value + ":00";
    var time = hour + ":" + min + ":" + sec;

    alarmIcon.classList.add('set');
    if(time < alarmInput){
        setTimeout(function(){
            setAlarm();
        }, 1000);
    }
    else if(time >= alarmInput)
    {
        document.getElementById("alarm-sound").play();
        clearTimeout();
    }

}

function stopAlarm(){
    var alarmIcon = document.getElementById('alarm-icon');
    if(alarmIcon.classList.contains('set')){
        alarmIcon.classList.remove('set');
    }
    document.getElementById("alarm-sound").pause();
    document.getElementById("alarm-sound").currentTime = 0;

}