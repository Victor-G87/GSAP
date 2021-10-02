const grid = document.querySelector('.grid');
const dotSize = 1;
const padding = 50;
const sizes = [0, 0, 0, 0, 1.5, 1.5, 1.5, 1.5, 3, 4, 13];
let animationReq;
let increment = 0;
let dots = [];
window.addEventListener('resize', createGrid);

createGrid();

function createGrid(event) {
    clearGrid();

    const gridR = grid.getBoundingClientRect();
    const width = (gridR.width - padding * 2) / (padding - dotSize / 2);
    const height = (gridR.height - padding * 2) / (padding - dotSize / 2);
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.top = j * padding + padding + 'px';
            dot.style.left = i * padding + padding + 'px';
            grid.appendChild(dot);
            dots.push(dot);

        }
    }

    animationReq = window.requestAnimationFrame(animateGrid);
}

function clearGrid() {
    window.cancelAnimationFrame(animationReq);
    while (grid.firstChild) {grid.removeChild(grid.firstChild);}
    dots = [];
}


function animateGrid() {


    const dot = dots[Math.floor(Math.random() * dots.length)];

    const scale = sizes[Math.floor(Math.random() * sizes.length)];

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector('.dot').style.background = "#"  + randomColor + scale;
    dot.style.background = "#" + randomColor;


        const timeoutTime = Math.floor(Math.random() * (5000 - 10 + 1)) + 10;


        dot.style.transform = `scale(${scale})`;
        const st1 = setTimeout(() => {
            dot.style.transform = `scale(1)`;
            clearTimeout(st1);
        }, 600);


        animationReq = window.requestAnimationFrame(animateGrid);

        // return dot + randomColor + scale;
    }






