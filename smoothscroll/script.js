gsap.registerPlugin(ScrollTrigger);



///////////////////////////////////////
// Init Smooth Scroll Bar
///////////////////////////////////////

const myScroller = document.querySelector("#custom-scroll");

// Options
let options = {
	damping: 0.06,
	// offsetTop: 100,
};

// Init Smooth Scroll
const pageScroller = Scrollbar.init(myScroller, options);

///////////////////////////////////////
// Update ScrollTrigger
///////////////////////////////////////

pageScroller.setPosition(0, 0);
pageScroller.track.xAxis.element.remove();

// How to get them to work together
ScrollTrigger.scrollerProxy(document.body, {
	scrollTop(value) {
		if (arguments.length) {
			pageScroller.scrollTop = value;
		}

		return pageScroller.scrollTop;
	},
});

pageScroller.addListener(ScrollTrigger.update);




///////////////////////////////////////
// Test animation
///////////////////////////////////////

function sectionTwo() {
	const section = document.querySelector("#two");

	const tl = gsap.timeline({ id: "tl", defaults: { duration: 0.50, ease: Expo.easeInOut } });
 

	tl.from(section, { yPercent: 101, opacity: 0 });

	ScrollTrigger.create({
		trigger: section,
		start: "top 70%",
		animation: tl,
		toggleActions: "play none none reverse"
	});
	
}

sectionTwo();