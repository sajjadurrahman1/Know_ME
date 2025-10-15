document.getElementById("year").textContent = new Date().getFullYear();

/* ===== HERO Animation ===== */
window.addEventListener("load", () => {
  const heroLine1 = document.querySelector(".hero-line1");
  const heroName = document.querySelector(".hero-name");
  const heroTagline = document.getElementById("hero-tagline");
  const socialIcons = document.querySelectorAll(".link-icons-1 a");
  const taglines = [
    "Building data-driven solutions that empower people.",
    "Transforming data into intelligent insights.",
    "Turning curiosity into code and creativity into automation.",
    "Learning, building, and innovating through AI."
  ];
  let taglineIndex = 0;

  setTimeout(()=>heroLine1.classList.add("hero-active"),200);
  setTimeout(()=>heroName.classList.add("hero-active"),600);
  setTimeout(()=>heroTagline.classList.add("hero-active"),1000);
  setTimeout(()=>{
    socialIcons.forEach((icon,i)=>
      setTimeout(()=>icon.classList.add("visible"),i*150)
    );
  },1300);

  setInterval(()=>{
    heroTagline.style.opacity=0;
    setTimeout(()=>{
      taglineIndex=(taglineIndex+1)%taglines.length;
      heroTagline.textContent=taglines[taglineIndex];
      heroTagline.style.opacity=1;
    },800);
  },4000);
});

/* Parallax for Hero Image */
const heroImg=document.querySelector(".hero-img");
document.addEventListener("mousemove",e=>{
  const x=(window.innerWidth/2 - e.pageX)/50;
  const y=(window.innerHeight/2 - e.pageY)/50;
  heroImg.style.transform=`translate(${x}px,${y}px) scale(1.05)`;
});

/* Floating Glow Orbs in Hero */
function createHeroGlows(){
  const header=document.querySelector(".heady");
  for(let i=0;i<3;i++){
    const glow=document.createElement("div");
    glow.classList.add("hero-glow");
    glow.style.left=`${Math.random()*80+10}%`;
    glow.style.top=`${Math.random()*80+10}%`;
    glow.style.animationDuration=`${15+Math.random()*10}s`;
    header.appendChild(glow);
  }
}
createHeroGlows();

/* ===== Scroll reveal + progress animation ===== */
const revealEls=document.querySelectorAll(".reveal-up");
const bars=document.querySelectorAll(".progress-bar");
const directions=["up","left","right"];
revealEls.forEach(el=>{
  const dir=directions[Math.floor(Math.random()*directions.length)];
  if(dir==="left")el.style.transform="translateX(-40px)";
  else if(dir==="right")el.style.transform="translateX(40px)";
  else el.style.transform="translateY(40px)";
  el.style.opacity=0;
});
const io=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el=entry.target;
      const delay=Math.random()*0.4+0.1;
      el.style.transition=`all 0.8s ${delay}s cubic-bezier(0.2,0.6,0.3,1)`;
      el.style.opacity=1;
      el.style.transform="translate(0,0)";
      if(el.classList.contains("progress-bar"))
        el.style.width=el.getAttribute("data-width");
      io.unobserve(el);
    }
  });
},{threshold:0.25});
revealEls.forEach(el=>io.observe(el));
bars.forEach(b=>{b.style.width="0";io.observe(b);});

/* ===== Navbar scroll glow ===== */
const navbar=document.getElementById("navbar");
window.addEventListener("scroll",()=>{
  if(window.scrollY>50){
    navbar.style.background="rgba(0,0,0,0.6)";
    navbar.style.boxShadow="0 0 18px rgba(255,221,0,0.25)";
    navbar.style.padding="6px 1rem";
  }else{
    navbar.style.background="rgba(0,0,0,0.38)";
    navbar.style.boxShadow="none";
    navbar.style.padding="12px 1rem";
  }
});

/* ===== Lightbox ===== */
const lightbox=document.getElementById("lightbox");
const lbImg=document.getElementById("lightbox-img");
const lbCap=document.getElementById("lightbox-cap");
document.querySelectorAll(".photo-grid .photo-card").forEach(card=>{
  const img=card.querySelector("img");
  const cap=card.querySelector("figcaption")?.textContent||"";
  card.addEventListener("click",()=>{
    lbImg.src=img.src;
    lbCap.textContent=cap;
    lightbox.style.display="grid";
    lbImg.style.transform="scale(0.8)";
    lbImg.style.opacity="0";
    requestAnimationFrame(()=>{
      lbImg.style.transition="all .4s ease";
      lbImg.style.transform="scale(1)";
      lbImg.style.opacity="1";
    });
  });
});
lightbox.addEventListener("click",()=>{
  lbImg.style.transition="all .3s ease";
  lbImg.style.opacity="0";lbImg.style.transform="scale(0.8)";
  setTimeout(()=>{lightbox.style.display="none";lbImg.src="";},300);
});

/* ===== Dynamic Floating Glow Background ===== */
const backgroundLayer = document.getElementById("leaf-layer");
backgroundLayer.innerHTML = ""; // clear existing

function createGlowOrb() {
  const orb = document.createElement("div");
  orb.classList.add("glow-orb");

  const size = 120 + Math.random() * 180;
  orb.style.width = `${size}px`;
  orb.style.height = `${size}px`;
  orb.style.left = `${Math.random() * 100}%`;
  orb.style.top = `${Math.random() * 100}%`;
  orb.style.background = `radial-gradient(circle, rgba(255,221,0,0.12) 0%, transparent 70%)`;
  orb.style.position = "absolute";
  orb.style.borderRadius = "50%";
  orb.style.filter = "blur(60px)";
  orb.style.zIndex = 0;
  orb.style.pointerEvents = "none";
  orb.style.animation = `floatOrb ${15 + Math.random() * 10}s ease-in-out infinite alternate`;

  backgroundLayer.appendChild(orb);
}

for (let i = 0; i < 6; i++) createGlowOrb();



/* ===== Parallax for Education photo ===== */
const eduPhoto=document.querySelector("[data-parallax] img");
if(eduPhoto){
  window.addEventListener("scroll",()=>{
    const rect=eduPhoto.getBoundingClientRect();
    if(rect.top<window.innerHeight && rect.bottom>0){
      const ratio=rect.top/window.innerHeight;
      eduPhoto.style.transform=`translateY(${ratio*-15}px) scale(1.02)`;
    }
  });
}

/* ===== Smooth Scroll ===== */
document.querySelectorAll('a.nav-link[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const id=a.getAttribute("href");
    const target=document.querySelector(id);
    if(target){
      e.preventDefault();
      window.scrollTo({top:target.offsetTop-70,behavior:"smooth"});
    }
  });
});

/* ===== Active Nav Highlight ===== */
const sections=[...document.querySelectorAll("section, header")];
const navLinks=[...document.querySelectorAll(".nav-link")];
function setActive(){
  const pos=window.scrollY+120;
  let current=sections[0].id;
  sections.forEach(sec=>{if(sec.offsetTop<=pos)current=sec.id||current;});
  navLinks.forEach(a=>{
    const href=a.getAttribute("href").replace("#","");
    a.classList.toggle("active",href===current);
  });
}
window.addEventListener("scroll",setActive);
setActive();
/* ===== Subtle Parallax on the fixed site background ===== */
(() => {
  const bg = document.getElementById("site-bg");
  if (!bg) return;

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY * 0.12;              // parallax intensity
      bg.style.transform = `translateY(${y}px) scale(1.06)`; // keep overscan scale
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
/* ===== Toggle "Show More Photos" in Hobbies ===== */
const toggleBtn = document.getElementById("toggle-hobbies");
const moreHobbies = document.getElementById("more-hobbies");

if (toggleBtn && moreHobbies) {
  toggleBtn.addEventListener("click", () => {
    const isHidden = moreHobbies.classList.contains("hidden");
    if (isHidden) {
      moreHobbies.classList.remove("hidden");
      moreHobbies.classList.add("show");
      toggleBtn.textContent = "Show Less Photos";
    } else {
      moreHobbies.classList.add("hidden");
      moreHobbies.classList.remove("show");
      toggleBtn.textContent = "Show More Photos";
    }
  });
}