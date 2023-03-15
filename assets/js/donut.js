/* very rough easter egg, I had fun with this */

const donuts = ['blue', 'choco', 'orange', 'blue-filled', 'choco-filled', 'orange-filled'];

donuts.forEach(donut => {
    const x = document.createElement('div');
    x.className = 'x';
    x.draggable = true;

    const y = document.createElement('img');
    y.classList = 'y';
    y.alt = donut;
    y.src = `assets/images/secret/donut/${donut}.png`;

    x.appendChild(y);
    document.body.appendChild(x);

    x.style.setProperty('--x-speed', `${(Math.random() * 5 + 2).toFixed(2)}s`);
    x.style.setProperty('--y-speed', `${(Math.random() * 5 + 2).toFixed(2)}s`);
})