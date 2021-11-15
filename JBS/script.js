const sections = document.querySelectorAll("section");

function goToSection(section, anim) {
  gsap.to(window, {
    scrollTo: {y: section, autoKill: false},
    duration: 0.4
  });
  
  anim && anim.restart();
}

sections.forEach(section => {
  const intoAnim = gsap.from(section.querySelector(".right-col"), {xPercent: 50, duration: 0.4, paused: true});
  
  ScrollTrigger.create({
    trigger: section,
    start: "top bottom-=1",
    end: "bottom top+=1",
    onEnter: () => goToSection(section, intoAnim),
    onEnterBack: () => goToSection(section, intoAnim)
  });
 
});

sections.forEach(section => {
  const intoAnimL = gsap.from(section.querySelector(".left-col"), {xPercent: -50, duration: 0.4, paused: true});

  ScrollTrigger.create({
    trigger: section,
    start: "top bottom-=1",
    end: "bottom top+=1",
    onEnter: () => goToSection(section, intoAnimL),
    onEnterBack: () => goToSection(section,intoAnimL)
  });

});

gsap.to(".middle-col", {
  xPercent: -100,
  repeat: -1,
  duration: 3,
  immediateRender: true,
  ease: "none"});

// gsap.from(".left-col", {
//   xPercent: -100,
//   repeat: -1,
//   duration: 120,
//   immediateRender: true,
//   ease: "none"});

