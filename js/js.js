let test = false;
const politica = document.querySelector("#politca > a");
const guide = document.querySelector("#guide > a");
const navGuide = document.querySelector("#navigation_guide");
const closeGuide = document.querySelector("#close_guide");
guide.addEventListener("click", async () => {
    navGuide.style.display = "flex";
    await asyncLoopPositive((_) => getComputedStyle(navGuide).display === "flex");
    navGuide.style.opacity = "1";
});

closeGuide.addEventListener("click", async () => {
        navGuide.style.opacity = "0";
        await asyncLoopPositive((_) => getComputedStyle(navGuide).opacity === "0");
        navGuide.style.display = "none";    
});
