let navbarButton = document.querySelector(".navbar-toggler")
let navbarLogo = document.querySelector(".navbar-brand")
let headerItem = Array.from(document.querySelectorAll(".nav-link"));
let navbarBackground = document.querySelector(".bg-light")
let header = document.querySelector("header")

//for highlighting active header element
headerItem.forEach((item)=>{
    item.addEventListener("click", ()=>{
        let current = document.querySelector(".active");
        current.classList.remove("active")
        
        item.classList.add("active")
    })
})

//changing header background colour on mobile menu button
let headerEvents = () =>{
    navbarButton.addEventListener("click", ()=>{
        if (!(navbarButton.classList.contains("collapsed"))){
            headerItem.forEach((item)=>{
                item.classList.add("navlink-color")
            })
            navbarBackground.classList.add("bglight-color")
            navbarLogo.classList.add("navlink-color")
            header.classList.add("bglight-color")
        }
    
        else if ((navbarButton.classList.contains("collapsed"))){
            console.log("2")
            headerItem.forEach((item)=>{
                item.classList.remove("navlink-color")
            })
    
            navbarBackground.classList.remove("bglight-color")
            navbarLogo.classList.remove("navlink-color")
            header.classList.remove("bglight-color")
        }
    
    })
}


window.addEventListener('resize', ()=>{
    headerEvents()
    if(innerWidth > 990){
        if (navbarBackground.classList.contains("bglight-color")){
            navbarBackground.classList.remove("bglight-color")
            headerItem.forEach((item)=>{
                item.classList.remove("navlink-color")
            })
            navbarLogo.classList.remove("navlink-color")
            header.classList.remove("bglight-color")
        }
    }

    else if(innerWidth < 990){

       headerEvents()
    }
})

window.onbeforeunload = headerEvents()

//slider 
var mySwiper = new Swiper('.swiper-container', {

    pagination: {
      el: '.swiper-pagination',
      clickable:true,
    },

    keyboard: {
        enabled: true,
      },

    
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })