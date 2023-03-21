const container = document.querySelector('#snow-container');

for (let i = 0; i < 200; i++) {
    const snow = document.createElement('div');
    snow.className = 'snow';
    container.append(snow);
}

/* there's probably a pure-css fix but this is so much easier lol
 * edit: except oof it go zoom zoom */
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body,
        html = document.documentElement;

    const height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    const height_max = height / innerHeight * 100;

    container.style.setProperty('--height-max', `${height_max}vh`);
    console.log(height_max);
});