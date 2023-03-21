const canvas = document.getElementById('game'),
    context = canvas.getContext('2d');

let grid = 16,
    score = 0,
    max = 0,
    lk, ivl;

const snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

const food = {
    x: 320,
    y: 320
};

const comp_cksum = (x) => (Math.imul(x ^ 0xDEADBEEF, 0xCAFEBABE) ^ 0xDEADC0DE) >>> 0;
const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const wrap = (n, m) => (n % m + m) % m;

function set_score(new_score) {
    score = new_score;

    document.getElementById('score').innerHTML = `&nbsp;${score}`;

    clearInterval(ivl);
    const speed = Math.min(300, 100 + 2 * score);
    ivl = setInterval(loop, 10000 / speed);
}

function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (lk === 'w' && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (lk === 'a' && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (lk === 's' && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    } else if (lk === 'd' && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }

    snake.x = wrap(snake.x + snake.dx, canvas.width);
    snake.y = wrap(snake.y + snake.dy, canvas.height);

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells)
        snake.cells.pop();

    context.shadowBlur = 20;
    context.shadowColor = '#eeeeee33';

    context.fillStyle = 'white';
    context.fillRect(food.x, food.y, grid - 1, grid - 1);

    context.fillStyle = '#E43F5A';

    snake.cells.forEach((cell, index) => {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === food.x && cell.y === food.y) {
            food.x = rand(0, 25) * grid;
            food.y = rand(0, 25) * grid;

            set_score(score + 1);
            snake.maxCells++;
        }

        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                max = Math.max(score, max);
                document.getElementById('high').innerHTML = '&nbsp;' + max;
                set_score(0);

                localStorage.setItem('high_score', max);
                localStorage.setItem('cksum', comp_cksum(max));

                food.x = rand(0, 25) * grid;
                food.y = rand(0, 25) * grid;
                snake.x = 160;
                snake.y = 160;
                snake.cells.length = 0;
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
            }
        }
    });
}

let leet = ['1', '3', '3', '7'], teel = 0;

document.addEventListener('keydown', e => {
    let k = e.key;
    lk = k;

    if (k == leet[teel]) {
        if (++teel == leet.length) {
            alert('HACKER!');
            snake.maxCells = Math.max(snake.maxCells, 25);
            set_score(Math.round((score + 1337) / 1337) * 1337);
            teel = 0;
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    max = localStorage.getItem('high_score') || 0;
    let cksum = localStorage.getItem('cksum');

    if (comp_cksum(max) != cksum) {
        localStorage.removeItem('high_score');
        localStorage.removeItem('cksum');
        cksum = 0;
        max = 0;
    }

    document.getElementById('high').innerHTML = '&nbsp;' + max;
});

ivl = setInterval(loop, 1000 / 10);
console.log('set ivl', ivl);
