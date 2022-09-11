/*
let landing = document.querySelector(".landing");

let imgs = ["landing1.jpg", "landing2.jpg", "landing3.jpg", "landing4.jpg", "landing5.jpg"];


setInterval(function (){
    let randomNum = Math.floor(Math.random() * imgs.length);
    console.log(randomNum)
    landing.style.backgroundImage = `url(img/${imgs[randomNum]})`;
}, 3000)
*/


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

gear.onclick = function (){
    this.classList.toggle("fa-spin");

    let settings = document.querySelector(".settings");

    settings.classList.toggle("open")
}

const colors = document.querySelectorAll(".settings .option-box .colors-list li");


colors.forEach(li => {
    li.addEventListener("click", (e) => {
        console.log(e.target.dataset.color);

        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("color", e.target.dataset.color);

        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active")
        })
        e.target.classList.add("active")
    })
})