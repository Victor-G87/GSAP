const grid = document.querySelector('.grid');
const dotSize = 1;
const padding = 60;
const sizes = [0, 0, 0, 0, 1.5, 1.5, 1.5, 1.5, 3, 4, 10];
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



const tiltEffectSettings = {
    max: 15, // max tilt rotation (degrees (deg))
    perspective: 10000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
    scale: 1, // transform scale - 2 = 200%, 1.5 = 150%, etc..
    speed: 1500, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
    easing: "cubic-bezier(.03,.98,.52,.99)" // easing (transition-timing-function) of the enter/exit transition
};

const cards = document.querySelectorAll(".japan");

cards.forEach(card => {
    card.addEventListener("mouseenter", cardMouseEnter);
    card.addEventListener("mousemove", cardMouseMove);
    card.addEventListener("mouseleave", cardMouseLeave);
});

function cardMouseEnter(event) {
    setTransition(event);
}

function cardMouseMove(event) {
    const card = event.currentTarget;
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const centerX = card.offsetLeft + cardWidth/2;
    const centerY = card.offsetTop + cardHeight/2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const rotateXUncapped = (+1)*tiltEffectSettings.max*mouseY/(cardHeight/2);
    const rotateYUncapped = (-1)*tiltEffectSettings.max*mouseX/(cardWidth/2);
    const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max :
        (rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
    const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max :
        (rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);

    card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                          scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
}

function cardMouseLeave(event) {
    event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setTransition(event);
}

function setTransition(event) {
    const card = event.currentTarget;
    clearTimeout(card.transitionTimeoutId);
    card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
    card.transitionTimeoutId = setTimeout(() => {
        card.style.transition = "";
    }, tiltEffectSettings.speed);
}




/////////// typewriter /////////////////////

const words = ["Welcome...", "to", "The Collective Unconscious", "/kəˈlektiv ˌənˈkänSHəs/"]


let cursor = gsap.to('.cursor', {opacity:0, ease: "power2.inOut", repeat:-1})
let masterTl = gsap.timeline({repeat: -1}).pause()
let boxTl = gsap.timeline()

boxTl.to('.box', {duration:1, width:"17vw", delay: 0.5, ease: "power4.inOut"})
    .from('.hi', {duration:1, y:"-101vw", ease: "power3.out"})
    .to('.box', {duration:1, height:"7vw", ease: "elastic.out", onComplete: () => masterTl.play() })
    .to('.box', {duration:2, autoAlpha:0.7, yoyo: true, repeat: -1, ease:"rough({ template: none.out, strength:  1, points: 20, taper: 'none', randomize: true, clamp: false})"})
words.forEach(word => {
    let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay:1})
    tl.to('.text', {duration: 1, text: word})
    masterTl.add(tl)


})

    const wordsTwo = ["集 合 的 無 意 識"]

    wordsTwo.forEach(word => {
        let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay: 1})
        tl.to('.center', {duration: 1, text: word})
        masterTl.add(tl)

    })




//////////////// NOISE////////////

const noise = () => {
    let canvas, ctx;

    let wWidth, wHeight;

    let noiseData = [];
    let frame = 0;

    let loopTimeout;


    // Create Noise
    const createNoise = () => {
        const idata = ctx.createImageData(wWidth, wHeight);
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;

        for (let i = 0; i < len; i++) {
            if (Math.random() < 0.5) {
                buffer32[i] = 0xff000000;
            }
        }

        noiseData.push(idata);
    };


    // Play Noise
    const paintNoise = () => {
        if (frame === 9) {
            frame = 0;
        } else {
            frame++;
        }

        ctx.putImageData(noiseData[frame], 0, 0);
    };


    // Loop
    const loop = () => {
        paintNoise(frame);

        loopTimeout = window.setTimeout(() => {
            window.requestAnimationFrame(loop);
        }, (1000 / 25));
    };


    // Setup
    const setup = () => {
        wWidth = window.innerWidth;
        wHeight = window.innerHeight;

        canvas.width = wWidth;
        canvas.height = wHeight;

        for (let i = 0; i < 10; i++) {
            createNoise();
        }

        loop();
    };


    // Reset
    let resizeThrottle;
    const reset = () => {
        window.addEventListener('resize', () => {
            window.clearTimeout(resizeThrottle);

            resizeThrottle = window.setTimeout(() => {
                window.clearTimeout(loopTimeout);
                setup();
            }, 200);
        }, false);
    };


    // Init
    const init = (() => {
        canvas = document.getElementById('noise');
        ctx = canvas.getContext('2d');

        setup();
    })();
};

noise();






