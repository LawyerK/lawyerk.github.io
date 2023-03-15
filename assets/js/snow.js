const content = document.querySelector('#snow-container');

for (let i = 0; i < 200; i++) {
    const snow = document.createElement('div');
    snow.className = 'snow';
    content.append(snow);
}
