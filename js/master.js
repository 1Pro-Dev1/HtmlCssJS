
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

