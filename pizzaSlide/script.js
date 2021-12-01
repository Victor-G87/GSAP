document.addEventListener("DOMContentLoaded", function() {

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);
  gsap.registerPlugin(EasePack);

////////////////////////////////////////////////////// MARQUEE

// "to" tween (animate to provided values)
// gsap.to(".marquee__part", { // selector text, Array, or object
//   x: 100, // any properties (not limited to CSS)
//   backgroundColor: "red", // camelCase
//   duration: 1, // seconds
//   delay: 0.5,
//   ease: "power2.inOut",
//   stagger: 0.1, // stagger start times
//   paused: true, // default is false
//   overwrite: "auto", // default is false
//   repeat: 2, // number of repeats (-1 for infinite)
//   repeatDelay: 1, // seconds between repeats
//   repeatRefresh: true, // invalidates on each repeat
//   yoyo: true, // if true > A-B-B-A, if false > A-B-A-B
//   yoyoEase: true, // or ease like "power2"
//   immediateRender: false,
//   onComplete: myFunc,
//   // other callbacks:
//   // onStart, onUpdate, onRepeat, onReverseComplete
//   // Each callback has a params property as well
//   // i.e. onUpdateParams (Array)
// });



  ///////////////////////////////////////// NEW SCROLL


  const sections = document.querySelectorAll("section");

// this scrolling object just allows us to conveniently call scrolling.enable(), scrolling.disable(), and check if scrolling.enabled is true.
// some browsers (like iOS Safari) handle scrolling on a separate thread and can cause things to get out of sync (jitter/jumpy), so when we're animating the scroll position, force an update of GSAP tweens when there's a scroll event in order to maintain synchronization)
  const scrolling = {
    enabled: true,
    events: "scroll,wheel,touchmove,pointermove".split(","),
    prevent: e => e.preventDefault(),
    disable() {
      if (scrolling.enabled) {
        scrolling.enabled = false;
        window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
        scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
      }
    },
    enable() {
      if (!scrolling.enabled) {
        scrolling.enabled = true;
        window.removeEventListener("scroll", gsap.ticker.tick);
        scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
      }
    }
  };


  function goToSection(section, anim, i) {
    if (scrolling.enabled) { // skip if a scroll tween is in progress
      scrolling.disable();
      gsap.to(window, {
        scrollTo: {y: section, autoKill: false},
        onComplete: scrolling.enable,
        ease: "power2.inOut",
        duration: 1.4

      });

      anim && anim.restart();
    }
  }

  sections.forEach((section, i) => {
    const intoAnim = gsap.from(section.querySelector(".left-col"), {yPercent: 100, duration: 0.8, paused: true});

    ScrollTrigger.create({
      trigger: section,
      start: "top bottom-=1",
      end: "bottom top+=1",
      onEnter: () => goToSection(section, intoAnim),
      onEnterBack: () => goToSection(section)


    });

  });



  gsap.to(".marquee__part", {
    scrollTrigger: {
      trigger: sections,
      toggleActions: "restart none none none"
    },
    xPercent: -100,
    repeat: -1,
    duration: 220,
    immediateRender: false,
    start: "top bottom-=1",
    end: "bottom top+=1",
    ease: "none"});




  gsap.to(".marquee__part1", {
    scrollTrigger: {
      trigger: sections,
      toggleActions: "restart none none none"
    },
    xPercent: 100,
    repeat: -1,
    duration: 240,
    immediateRender: false,
    start: "top bottom-=1",
    end: "bottom top+=1",
    ease: "none",
  });

});

/////////////// BUTTON SLIDE////////////////


$(document).ready(function(){
  $('.left-to-right-effect').css({
    'background-color': '#de5b3b',
  });

});
// //
// //
$(document).ready(function() {
  $(".button").click(function() {
    $(this).addClass('clicked');
  }).focusout(function() {
    $(".button.on-click-effect").removeClass('clicked').css({
      'background-color': '#ffffff',
      // 'color': '#ffffff',

    });
  });
});

//
// $(document).ready(function() {
//   $(".button.on-click-effect").click(function() {
//     $(this).addClass('clicked');
//   }).focusout(function() {
//     $(".button").removeClass('clicked');
//   });
// });

// $(".left-to-right-effect").click(
//     function() {
//       $(".white-text").toggleClass("gray-text");
//
//       // $(".cross-btn").toggleClass("enCross");
//       //
//       // $('.menu-panel').toggleClass('showPanel');
//     }
// );
$(document).ready(function(){
  $(".right-to-left-effect").click(function(){
    $(".left-to-right-effect").toggleClass("gray-text");
  });
});


$(document).ready(function(){
  $(".right-to-left-effect").click(function(){
    $(".left-to-right-effect").toggleClass("gray-text");

  });
});

$('.right-to-left-effect').click(function(){

  $('pizza-wrap').attr('class',$(this).attr('class').split(' ')[1]);
});











// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.








// gsap.to(".marquee__part", {
//   xPercent: -100,
//   repeat: -1,
//   duration: 100,
//   immediateRender: true,
//   ease: "none"}).totalProgress(0.5);
//
//
//
// gsap.to(".marquee__part1", {
//   xPercent: 100,
//   repeat: -1,
//   duration: 120,
//   immediateRender: true,
//   ease: "none"}).totalProgress(0.5);





// let tween = gsap.to(".marquee__part", {xPercent: -100, repeat: -1, duration: 100, ease: "linear"}).totalProgress(0.5);
// let tweenOne = gsap.to(".marquee__part1", {xPercent: 100, repeat: -1, duration: 120, ease: "linear"}).totalProgress(0.5);



//
// gsap.set(".marquee__inner", {xPercent: 50});
//
// window.addEventListener("scroll", function(){
//
//
//
//
//
//
//   if ( window.pageYOffset > currentScroll ) {
//     isScrollingDown = true;
//   } else {
//     isScrollingDown = false;
//   }
//
//   gsap.to(tweenOne, {
//     timeScale: isScrollingDown ? -1 : 1
//   });
//
//   gsap.to(tween, {
//     timeScale: isScrollingDown ? 1 : -1
//   });
//
//   currentScroll = window.pageYOffset
// });


// let bgHead = document.getElementById('bgHead');
// let btn1 = document.getElementById('btn1');
// let btn2 = document.getElementById('btn2');
//
// let btn3 = document.getElementById('marqueewrap');
//
//
//
// btn1.addEventListener('click', function() {
//   bgHead.style.backgroundColor = "#de5b3b";
//   btn3.style.webkitTextStrokeColor = "#de5b3b";
//
// });
//
// btn2.addEventListener('click', function() {
//   bgHead.style.backgroundColor = "#44C7C5";
//   btn3.style.webkitTextStrokeColor = "#44C7C5";
// });


$(document).ready(function () {

  $("#btn1").click(function(){
    $("main").css("background-color", "#de5b3b");
    $(".marqueewrap").css("webkitTextStrokeColor","#de5b3b");
    $(".teal-button").css("background-color","#44C7C5");
  });

  $("#btn2").click(function(){
    $("#bgHead").css("background-color", "#44C7C5");
    $(".marqueewrap").css("webkitTextStrokeColor","#44C7C5");
    $(".teal-button").css("background-color","#de5b3b");
  });

});








