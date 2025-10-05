// 1. Typing Animation for Hero Section
const roles = ["Emerging Tech Enthusiast", "B.Tech Student", "Frontend Developer", "Backend Developer"];
let roleIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const pauseTime = 2000;

const typedText = document.querySelector(".intro h3");

function type() {
    if(charIndex < roles[roleIndex].length) {
        typedText.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, pauseTime);
    }
}

function erase() {
    if(charIndex > 0) {
        typedText.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingSpeed);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, typingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", type);

// 2. Scroll-Triggered Progress Bars
const progressBars = document.querySelectorAll(".progress-bar");
window.addEventListener("scroll", () => {
    progressBars.forEach(bar => {
        const sectionTop = bar.closest("section").offsetTop;
        if(window.scrollY + window.innerHeight > sectionTop + 100) {
            bar.style.width = bar.getAttribute("data-width");
        }
    });
});

// Set initial widths to 0 for animation
progressBars.forEach(bar => bar.style.width = "0");

// 3. Projects Modal Popup
const projectImages = document.querySelectorAll(".carousel-item img");
projectImages.forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
        // Create modal dynamically
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = 0;
        modal.style.left = 0;
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.background = "rgba(0,0,0,0.8)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = 9999;

        const modalContent = document.createElement("img");
        modalContent.src = img.src;
        modalContent.style.maxWidth = "80%";
        modalContent.style.maxHeight = "80%";
        modalContent.style.borderRadius = "15px";
        modalContent.style.boxShadow = "0 0 20px #FFDD00";

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        modal.addEventListener("click", () => document.body.removeChild(modal));
    });
});

// 4. Floating Maple Leaf Animation
function createLeaf() {
    const leaf = document.createElement("div");
    leaf.innerHTML = "🍁";
    leaf.style.position = "fixed";
    leaf.style.top = "-50px";
    leaf.style.left = Math.random() * window.innerWidth + "px";
    leaf.style.fontSize = (20 + Math.random() * 20) + "px";
    leaf.style.opacity = Math.random();
    leaf.style.zIndex = 0;
    leaf.style.pointerEvents = "none";
    document.body.appendChild(leaf);

    let speedY = 1 + Math.random() * 3;
    let speedX = Math.random() * 2 - 1;

    function fall() {
        let top = parseFloat(leaf.style.top);
        let left = parseFloat(leaf.style.left);
        if(top < window.innerHeight) {
            leaf.style.top = top + speedY + "px";
            leaf.style.left = left + speedX + "px";
            requestAnimationFrame(fall);
        } else {
            document.body.removeChild(leaf);
        }
    }
    fall();
}

// Create multiple leaves at intervals
setInterval(createLeaf, 500);
