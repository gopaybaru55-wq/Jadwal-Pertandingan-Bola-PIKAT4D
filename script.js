// DATA MATCH (TETAP SAMA)
const data = [
  {
    league: "Premier League",
    matches: [
      { home:"Arsenal", homeLogo:"https://i.imgur.com/e4HFaAA.png", away:"Chelsea", awayLogo:"https://i.imgur.com/rRKLxQd.png", score:"2-1", time:"20:00" },
      { home:"Liverpool", homeLogo:"https://i.imgur.com/kufe8Br.png", away:"Manchester City", awayLogo:"https://i.imgur.com/X7oPQOJ.png", score:"1-1", time:"22:00" }
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
        <a href="https://rinjaniman.com/sportsbook" target="_blank" class="card-btn">Main Sekarang</a>
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
