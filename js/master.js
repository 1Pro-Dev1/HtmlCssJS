
let gear = document.querySelector(".settings .gear i");
let localColor = localStorage.getItem("color")

if (localColor !== null) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color"));

    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active")

        if (element.dataset.color === localColor) {
            element.classList.add("active")
        }
    })
    
};

let settings = document.querySelector(".settings");

gear.onclick = function (){
    this.classList.toggle("fa-spin");

    settings.classList.toggle("open")

    this.parentElement.classList.toggle("open")
}

let closer = document.querySelector(".settings .close");

closer.onclick = function () {
    settings.classList.toggle("open");
    gear.classList.toggle("fa-spin");
    gear.parentElement.classList.toggle("open");
};

const clickSound = new Audio();
clickSound.src = "./media/click.wav"

const colors = document.querySelectorAll(".settings .option-box .colors-list li");


colors.forEach(li => {
    li.addEventListener("click", (e) => {
        clickSound.play();

        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("color", e.target.dataset.color);

        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active")
        })
        e.target.classList.add("active")
    })
})

let backgroundOpt = true;
let bcint;
let backStorage = localStorage.getItem("Background_Randomize")

if (backStorage !== null) {
    console.log("Not Empty")

    if (backStorage === "true") {
        backgroundOpt = true;
    }

    if (backStorage === "false") {
        backgroundOpt = false;
    }

    document.querySelectorAll(".settings .random span").forEach(element =>{
        element.classList.remove("active")
    })

    if (backStorage === "true") {
        document.querySelector(".random .enable").classList.add("active")

    } else {
        document.querySelector(".random .disable").classList.add("active")
    }
}

if(backgroundOpt === true){
    randomFuncion();
}


const randomBackEl = document.querySelectorAll(".settings .random span");

randomBackEl.forEach(span => {
    span.addEventListener("click", (e) => {
        clickSound.play();

        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active")
        })
        e.target.classList.add("active")
        if (e.target.dataset.back === "enable") {
            backgroundOpt = true;
            randomFuncion();
            localStorage.setItem("Background_Randomize", true)
        } else {
            backgroundOpt = false;
            clearInterval(bcint)
            localStorage.setItem("Background_Randomize", false)
        }
    })
})


let landing = document.querySelector(".landing");

let imgs = ["landing1.jpg", "landing2.jpg", "landing3.jpg", "landing4.jpg", "landing5.jpg"];

function randomFuncion() {
    bcint = setInterval(function (){
        let randomNum = Math.floor(Math.random() * imgs.length);
        landing.style.backgroundImage = `url(img/${imgs[randomNum]})`;
    }, 5000)
}




let skills = document.querySelector(".skills");


window.onscroll = function (){

    let scrollOffset = skills.offsetTop;
    let scrollOuter = skills.offsetHeight;
    let winHeight = this.innerHeight;
    let winScrlTop = this.pageYOffset;


    if (winScrlTop > (scrollOffset + scrollOuter - winHeight)) {
        
        let allSkills = document.querySelectorAll(".skills-box .skill-progress span");

        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        })

    }

};



let gallery = document.querySelectorAll(".gallery .imgs-box img");

gallery.forEach(img => {
    img.addEventListener("click", (e) =>{

        let overlay = document.createElement("div");

        overlay.className = "popup-overlay";

        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            let imgHead = document.createElement("h1");
            
            let imgTxt = document.createTextNode(img.alt);

            imgHead.appendChild(imgTxt);

            popupBox.appendChild(imgHead);
        }


        let popupImg = document.createElement("img")

        popupImg.src = img.src;

        popupBox.appendChild(popupImg);
        
        document.body.appendChild(popupBox);

        let closeBtn = document.createElement("span");

        let CloseTxt = document.createTextNode("X");

        closeBtn.appendChild(CloseTxt);

        closeBtn.className = "close-btn";

        popupBox.appendChild(closeBtn);
    })
});

document.addEventListener("click", function (e) {
    
    if (e.target.className == "close-btn") {
        e.target.parentNode.remove()

        document.querySelector(".popup-overlay").remove()
    }

});





const bullets = document.querySelectorAll(".nav-bullets .bullet");


bullets.forEach(bullet =>{
    bullet.addEventListener("click", (e) =>{

        document.querySelector(e.target.dataset.sec).scrollIntoView({
            behavior: "smooth"
        })

    })
});

