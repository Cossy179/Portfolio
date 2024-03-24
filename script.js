window.onload = function() {
    var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'].reverse();
    const welcome = document.querySelector('.welcome');

    colors.forEach(function(color, index) {
        var reveal = document.createElement('div');
        reveal.className = 'reveal';
        reveal.style.backgroundColor = color;
        reveal.style.animationDelay = `${index * .3}s`; // value of animation delay
        reveal.style.zIndex = colors.length - index; // adjust the z-index property
        document.body.appendChild(reveal);
        setTimeout(function() {
            document.body.removeChild(reveal);
        }, 5800 + index * 300); // speed adjustment
    });

    const loading = document.querySelector('.loading');
    let count = 0;
    let intervalId = setInterval(function() {
        if (count < 3) {
            loading.textContent += '.';
            count++;
        } else {
            loading.textContent = 'Loading';
            count = 0;
        }
    }, 500);

    setTimeout(function() {
        clearInterval(intervalId);
        document.body.removeChild(loading);
        document.body.removeChild(welcome);
    }, 5000);

    // Add an animation to the welcome and loading message that fades it out after 3 seconds
    welcome.style.animation = 'fade-out 1s forwards';
    welcome.style.animationDelay = '3s';
    loading.style.animation = 'fade-out 1s forwards';
    loading.style.animationDelay = '3s';
}