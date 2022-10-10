var sun = document.querySelector(".sun")
var names =document.querySelector("#light-mode");

var flag = 0
names.addEventListener("click",function()
{
   if(flag===0){
    sun.style.color="yellow"
    sun.style.rotate="360deg"
    names.style.backgroundColor="black"
    document.documentElement.style.setProperty('--lightblack','white')
    document.documentElement.style.setProperty('--white','rgb(51, 51, 51)')
    flag=1
   }else{
    sun.style.rotate="-0deg"
    sun.style.color="black"
    names.style.backgroundColor="white"
    document.documentElement.style.setProperty('--lightblack','rgb(51, 51, 51)')
    document.documentElement.style.setProperty('--white','white')
    flag=0
   }
    
})

function loco(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}
loco()




// document.querySelector(".slide").addEventListener("mousemove",function(elem){
// var dim = document.querySelector(".slide").getBoundingClientRect();
// document.querySelector(".slide img:nth-child(2)").style.clipPath = `circle(15% at ${elem.clientX - dim.left}px ${elem.clientY - dim.top}px`;
// })
// document.querySelector(".slide").addEventListener("mouseleave",function(elem){
//     var dim = document.querySelector(".slide").getBoundingClientRect();
//     document.querySelector(".slide img:nth-child(2)").style.clipPath = `circle(0% at ${elem.clientX - dim.left}px ${elem.clientY - dim.top}px`;
//     })

document.querySelectorAll(".slide").forEach(function(slide){
  slide.addEventListener("mousemove",function(elem){
    var dim = slide.getBoundingClientRect();
  this.children[1].style.clipPath = `circle(20% at ${elem.clientX - dim.left}px ${elem.clientY - dim.top}px`;

})

})
  

document.querySelectorAll(".slide").forEach(function(slide){
  slide.addEventListener("mouseleave",function(elem){
    var dim = slide.getBoundingClientRect();
  this.children[1].style.clipPath = `circle(0% at ${elem.clientX - dim.left}px ${elem.clientY - dim.top}px`;

})

})

function skew_maker() {
  var dim1 = document.querySelector(".slide").getBoundingClientRect();
  var prev = dim1.left;


  document.querySelector("#project").addEventListener("scroll", function (elmm) {
      var dim2 = document.querySelector(".slide").getBoundingClientRect();
      var diff = prev - dim2.left;
      document.querySelectorAll(".slide").forEach(function (elm) {
          elm.style.transform = `skew(${diff * .1}deg)`; 
      })
      prev = dim2.left;
      
  })
}
skew_maker()
