const words = ["Victor.", "A Developer.", "How Can I help you?", "Welcome To my site"]

let cursor = gsap.to('.cursor', {opacity:0, ease: "power2.inOut", repeat:-1})
let masterTl = gsap.timeline({repeat: -1}).pause()
let boxTl = gsap.timeline()

boxTl.to('.box', {duration:1, width:"17vw", delay: 0.5, ease: "power4.inOut"})
    .from('.hi', {duration:1, y:"7vw", ease: "power3.out"})
    .to('.box', {duration:1, height:"7vw", ease: "elastic.out", onComplete: () => masterTl.play() })
    .to('.box', {duration:2, autoAlpha:0.7, yoyo: true, repeat: -1, ease:"rough({ template: none.out, strength:  1, points: 20, taper: 'none', randomize: true, clamp: false})"})
words.forEach(word => {
    let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay:1})
    tl.to('.text', {duration: 1, text: word})
    masterTl.add(tl)
})

tl = new TimelineMax({repeat: -1});
tl.fromTo(".circle", 1, {drawSVG:"0%"}, {drawSVG:"100%", immediateRender:false, ease:Power1.easeInOut, rotation:360, transformOrigin:"50% 50%", stroke:"#29B6F6"})
    .fromTo(".circle", 1.5, {drawSVG:"100%"}, {drawSVG:"0%", immediateRender:false, ease:Power1.easeInOut, rotation:-720, transformOrigin:"50% 50%", stroke:"#FF4081"})