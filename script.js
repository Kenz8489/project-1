// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });

function locomotiveAnimatioins() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function navAnimation() {
    gsap.to("#nav-part1 svg", {
        y: "-100%",
        // scrollTrigger: {
        //     trigger: "#page1",
        //     scroller: "#main",
        //     // markers: true,
        //     start: "top 0",
        //     end: "top -5%",
        //     scrub: true
        // }
    })
    
    gsap.to("#nav-part2 #links", {
        y: "35px"
        
        // scrollTrigger: {
        //     trigger: "#page1",
        //     scroller: "#main",
        //     // markers: true,
        //     start: "top 0",
        //     end: "top -5%",
        //     scrub: true
        // }
    })
    gsap.to("#nav-part2 #icons", {
        x:"-10vw"
    })
}


function loadingAnime() {
    gsap.from("#page1 h1", {
        y: 100,
        opacity: 0,
        delay: 0.3,
        duration: 0.3,
        stagger: 0.25
    })
}

function videoLoadingAnime() {
    gsap.from("#page1 #vid-container", {
        scale: 0.9,
        opacity: 0,
        delay: 1,
        duration: 0.5,
    })
}

function vidPlayfn() {
    var vidCont = document.querySelector("#vid-container")
    var play = document.querySelector("#play")

    vidCont.addEventListener("mouseenter", function () {
        gsap.to(play, {
            scale: 1,

        })

    })
    vidCont.addEventListener("mouseleave", function () {
        gsap.to(play, {
            scale: 0
        })
    })
    document.addEventListener("mousemove", function (dets) {
        gsap.to(play, {
            left: dets.x - 70,
            top: dets.y - 70
        })
    })
}

function cursorfn() {
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            left: dets.x - 60,
            top: dets.y - 60
        })
    })
}

function child1Fn() {
    document.querySelectorAll(".child").forEach(function (i) {
        i.addEventListener("mouseenter", function () {
            gsap.to("#cursor", {
                scale: 1
            })
        })
        i.addEventListener("mouseleave", function () {
            gsap.to("#cursor", {
                scale: 0
            })
        })
    })
}


function detsTextFn() {
    gsap.to("#elem1 .dets h5", {
        opacity: 0,
        y: 100
    })
    document.querySelector("#elem1 .dets").addEventListener("mouseenter", function () {
        var h5 = document.querySelector("#elem1 .dets h5")
        gsap.to("#elem1 .dets h4", {
            y: -100
        })
        gsap.to("#elem1 .dets h5", {
            opacity: 1,
            y: 0
        })
    })
    document.querySelector("#elem1 .dets").addEventListener("mouseleave", function () {
        var h5 = document.querySelector("#elem1 .dets h5")
        gsap.to("#elem1 .dets h4", {
            y: 0
        })
        gsap.to("#elem1 .dets h5", {
            opacity: 0,
            y: 100
        })

    })
}






locomotiveAnimatioins()
navAnimation()
vidPlayfn()
loadingAnime()
videoLoadingAnime()
cursorfn()
child1Fn()
detsTextFn()






