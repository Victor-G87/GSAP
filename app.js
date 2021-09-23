const words = ["Victor.", "A Developer.", "How Can I help you?", "Welcome To my site"]

let cursor = gsap.to('.cursor', {opacity:0, ease: "power2.inOut", repeat:-1})
let masterTl = gsap.timeline({repeat: -1}).pause()
let boxTl = gsap.timeline()

boxTl.to('.box', {duration:2, width:"17vw", delay: 0.5, ease: "power4.inOut"})
    .from('.hi', {duration:2, y:"7vw", ease: "power3.out"})
    .to('.box', {duration:2, height:"7vw", ease: "elastic.out", onComplete: () => masterTl.play() })
    .to('.box', {duration:2, autoAlpha:0.7, yoyo: true, repeat: -1, ease:"rough({ template: none.out, strength:  1, points: 20, taper: 'none', randomize: true, clamp: false})"})
words.forEach(word => {
    let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay:1})
    tl.to('.text', {duration: 1, text: word})
    masterTl.add(tl)
})

tl = new TimelineMax({repeat: -1});
tl.fromTo(".circle", 1, {drawSVG:"0%"}, {drawSVG:"100%", immediateRender:false, ease:Power1.easeInOut, rotation:360, transformOrigin:"50% 50%", stroke:"#29B6F6"})
    .fromTo(".circle", 1.5, {drawSVG:"100%"}, {drawSVG:"0%", immediateRender:false, ease:Power1.easeInOut, rotation:-720, transformOrigin:"50% 50%", stroke:"#FF4081"})



console.clear();

const html = document.documentElement;
const toggle = document.getElementById("toggle");
const circle = document.getElementById("bg-circle");
const circleWidth = circle.clientWidth;

// Math calcul to get Height, Width, Diagonal and Circle Radius

const getVpdr = () => {
    const vph = Math.pow(html.offsetHeight, 2); // Height
    const vpw = Math.pow(html.offsetWidth, 2); // Width
    const vpd = Math.sqrt(vph + vpw); // Diagonal
    return (vpd * 2) / circleWidth; // Circle radius
};

const openNavbar = () => {
    const openTimeline = new TimelineMax();
    openTimeline.to(".navbar", 0, { display: "flex" });
    openTimeline.to("#bg-circle", 1.5, {
        scale: getVpdr(),
        ease: Expo.easeInOut
    });
    openTimeline.staggerFromTo(
        ".navbar ul li",
        0.5,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1 },
        0.1,
        1
    );
};

const closeNavbar = () => {
    const closeTimeline = new TimelineMax();
    closeTimeline.staggerFromTo(
        ".navbar ul li",
        0.5,
        { y: 0, opacity: 1, delay: 0.5 },
        { y: 25, opacity: 0 },
        -0.1
    );
    closeTimeline.to("#bg-circle", 1, {
        scale: 0,
        ease: Expo.easeInOut,
        delay: -0.5
    });
    closeTimeline.to(".navbar", 0, { display: "none" });
};

let isOpen = false;

toggle.onclick = function () {
    if (isOpen) {
        this.classList.remove("active");
        closeNavbar();
    } else {
        this.classList.add("active");
        openNavbar();
    }
    isOpen = !isOpen;
};

// On windows resize, recalcule circle radius and update

window.onresize = () => {
    if (isOpen) {
        gsap.to("#bg-circle", 1, { scale: getVpdr(), ease: Expo.easeInOut });
    }
};
