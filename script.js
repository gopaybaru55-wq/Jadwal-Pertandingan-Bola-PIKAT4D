// DATA MATCH (TETAP SAMA)
const data = [
  {
    league: "UEFA Champions League",
    matches: [
      { home:"Real Madrid", homeLogo:"https://i.imgur.com/7XGqSJm.png", away:"Bayern Munchen", awayLogo:"https://i.imgur.com/Cs02sRw.jpeg", score:"3-1", time:"02:00" },
      { home:"Sporting CP", homeLogo:"https://i.imgur.com/y94fPYS.png", away:"Arsenal", awayLogo:"https://i.imgur.com/Fu3O1Sc.png", score:"0-2", time:"02:00" }
    ]
  }
];

function render(){
  let html = "";
  data.forEach(l => {
    html += `<h2>${l.league}</h2>`;
    l.matches.forEach(m => {
      html += `
      <div class="card">
        <div class="teams">
          <div class="team"><img src="${m.homeLogo}"><span>${m.home}</span></div>
          <div class="vs">VS</div>
          <div class="team"><img src="${m.awayLogo}"><span>${m.away}</span></div>
        </div>
        <div class="score">${m.score}</div>
        <div class="time">${m.time} WIB</div>
        <a href="https://pikatsodap.com" target="_blank" class="card-btn">Main Sekarang</a>
      </div>`;
    });
  });
  document.getElementById("matches").innerHTML = html;
}
render();

// BURGER MENU
const burger = document.getElementById("burger");
const dropdownCard = document.getElementById("dropdownCard");
burger.addEventListener("click", () => {
  dropdownCard.style.display = dropdownCard.style.display === "flex" ? "none" : "flex";
  dropdownCard.style.flexDirection = "column";
});

// LOGIKA BANNER SLIDER
let slideIndex = 0;
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dotsContainer');

// Buat Dots
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => { showSlide(i); resetTimer(); });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slideIndex = index;
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[slideIndex].classList.add('active');
}

// Navigasi Panah
document.getElementById('nextBtn').addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
    resetTimer();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
    resetTimer();
});

// Auto-Slide 3 Detik
let timer = setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}, 3000);

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }, 3000);
}
