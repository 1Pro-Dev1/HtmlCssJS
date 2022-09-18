
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

const bulletSpans = document.querySelectorAll('.settings .bullet span');
const bulletsCon = document.querySelector(".nav-bullets");
const bulletStorage = localStorage.getItem("Bullets_Show");

if (bulletStorage !== null) {
    bulletSpans.forEach(span =>{
        span.classList.remove("active");
    });
    if (bulletStorage === "show") {
        bulletsCon.style.display = "block";
        document.querySelector(".bullet .enable").classList.add("active");
        console.log(document.querySelector(".bullet .enable"))
    }
    if (bulletStorage === "hide") {
        bulletsCon.style.display = "none";
        document.querySelector(".bullet .disable").classList.add("active");
    }
}

bulletSpans.forEach(span =>{
    span.addEventListener("click", (e) =>{
        clickSound.play();

        if (span.dataset.display === "show") {
            bulletsCon.style.display = "block";
            localStorage.setItem("Bullets_Show", "show");
        }
        if (span.dataset.display === "hide") {
            bulletsCon.style.display = "none";
            localStorage.setItem("Bullets_Show", "hide");
        }
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active")
        })
        e.target.classList.add("active")
    })
})

const reset = document.querySelector(".reset");

reset.onclick = function (){
    localStorage.clear();
    location.reload();
}


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
const links = document.querySelectorAll(".header a");
console.log(links)

function ScrollFunction(elements) {
    elements.forEach(ele =>{
        ele.addEventListener("click", (e) =>{
    
            document.querySelector(e.target.dataset.sec).scrollIntoView({
                behavior: "smooth"
            })
    
        })
    });
}

ScrollFunction(bullets);
ScrollFunction(links);


const headBtn = document.querySelector(".links-con button");

const navList = document.querySelector(".landing .header ul")


headBtn.onclick= function () {
    navList.classList.toggle("open")
}