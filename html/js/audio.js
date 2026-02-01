document.getElementById("overlay").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "none";
    var audio = new Audio('/assets/eh.mp3');
    audio.volume = 0.2;
    audio.play();
});