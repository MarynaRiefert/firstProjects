var intervalHandle;
var secondsRemaining;

function errorHide() {
    document.getElementById("errorMessage").style.display = "none";
}

function resetPage() {
    document.getElementById("inputArea").style.display = "block";
    document.getElementById("pauseArea").style.display = "none";
    document.getElementById("resumeArea").style.display = "none";
    document.getElementById("refresh").style.display = "none";
    document.getElementById("minutes").value = "";
    setTimeout(errorHide, 5000);
}

function resumeCountdown() {
    tick();
    intervalHandle = setInterval(tick, 1000);

    document.getElementById("resumeArea").style.display = "none";
    document.getElementById("pauseArea").style.display = "block";
}

function pauseCountdown() {
    clearInterval(intervalHandle);
    document.getElementById("pauseArea").style.display = "none";
    document.getElementById("resumeArea").style.display = "block";
}

function tick() {
    var timeDisplay = document.getElementById("time");

    var min = Math.floor(secondsRemaining / 60);
    var sec = secondsRemaining - (min * 60);

    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    var message = min + ":" + sec;
    timeDisplay.innerHTML = message;

    if (secondsRemaining === 0) {
        document.getElementById("errorMessage").innerHTML = "<strong>Time's up!</strong>";
        document.getElementById("errorMessage").setAttribute("class", "alert alert-success text-center");
        clearInterval(intervalHandle);
        resetPage();
    }
    secondsRemaining--;
}

function startCountdown() {
    var minutes = document.getElementById("minutes").value;

    if (isNaN(minutes) || minutes === "") {
        document.getElementById("errorMessage").innerHTML = "Hey! It's not a number! <strong>TRY AGAIN</strong>";
        document.getElementById("errorMessage").setAttribute("class", "alert alert-danger text-center");

        setTimeout(errorHide, 5000);
        resetPage();
        return;
    }

    secondsRemaining = minutes * 60;

    intervalHandle = setInterval(tick, 1000);

    document.getElementById("inputArea").style.display = "none";
    document.getElementById("pauseArea").style.display = "block";
    document.getElementById("refresh").style.display = "block";
}

document.getElementById("refresh").onclick = function() {
    clearInterval(intervalHandle);
    document.getElementById("time").innerHTML = "00:00";
    document.getElementById("minutes").value = "";
    resetPage();
};

window.onload = function() {
    var startButton = document.getElementById("breakBtn");
    startButton.onclick = startCountdown;

    var pauseButton = document.getElementById("pauseBtn");
    pauseButton.onclick = pauseCountdown;

    var resumeButton = document.getElementById("resumeBtn");
    resumeButton.onclick = resumeCountdown;

    document.getElementById("pauseArea").style.display = "none";
    document.getElementById("resumeArea").style.display = "none";
    document.getElementById("refresh").style.display = "none";
};

