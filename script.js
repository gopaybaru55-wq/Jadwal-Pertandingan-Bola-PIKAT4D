const matchBody = document.getElementById("matchBody");
const refreshBtn = document.getElementById("refreshBtn");
const lastUpdate = document.getElementById("lastUpdate");

// ================================
// DATA PERTANDINGAN (EDIT DI SINI)
// ================================
const matches = [
  {
    time: "18:00",
    home: "Bayern Munchen",
    away: "Dortmund",
    league: "Bundesliga"
  },
  {
    time: "20:00",
    home: "Real Madrid",
    away: "Barcelona",
    league: "La Liga"
  },
  {
    time: "22:00",
    home: "Manchester United",
    away: "Liverpool",
    league: "Premier League"
  },
  {
    time: "00:00",
    home: "PSG",
    away: "Marseille",
    league: "Ligue 1"
  },
  {
    time: "02:00",
    home: "Chelsea",
    away: "Arsenal",
    league: "Premier League"
  },
  {
    time: "03:00",
    home: "Inter Milan",
    away: "Juventus",
    league: "Serie A"
  }
];

// ================================
// CEK STATUS BERDASARKAN JAM
// ================================
function getMatchStatus(matchTime) {
  const now = new Date();
  const [hour, minute] = matchTime.split(":").map(Number);

  const matchDate = new Date();
  matchDate.setHours(hour, minute, 0, 0);

  const diffMinutes = (now - matchDate) / (1000 * 60);

  if (diffMinutes >= 0 && diffMinutes <= 120) {
    return {
      text: "SEDANG MAIN",
      className: "live-badge"
    };
  } else if (diffMinutes > 120) {
    return {
      text: "SELESAI",
      className: "finished-badge"
    };
  } else {
    return {
      text: "AKAN MAIN",
      className: "soon-badge"
    };
  }
}

// ================================
// POWER TEAM (FAKE AI STYLE)
// ================================
function getTeamStrength(team) {
  const bigTeams = [
    "Real Madrid", "Barcelona", "Manchester City", "Liverpool",
    "Arsenal", "Bayern Munchen", "PSG", "Inter Milan",
    "Juventus", "Chelsea", "Manchester United"
  ];

  let strength = 50 + Math.floor(Math.random() * 20);

  if (bigTeams.includes(team)) {
    strength += 15;
  }

  strength += team.length % 10;

  return strength;
}

// ================================
// PREDIKSI SKOR CERDAS
// ================================
function generatePrediction(home, away) {
  const homePower = getTeamStrength(home);
  const awayPower = getTeamStrength(away);

  let homeGoals = 1;
  let awayGoals = 1;

  const diff = homePower - awayPower;

  if (diff >= 15) {
    homeGoals = 2 + Math.floor(Math.random() * 2);
    awayGoals = Math.floor(Math.random() * 2);
  } else if (diff <= -15) {
    homeGoals = Math.floor(Math.random() * 2);
    awayGoals = 2 + Math.floor(Math.random() * 2);
  } else if (diff >= 5) {
    homeGoals = 2;
    awayGoals = 1;
  } else if (diff <= -5) {
    homeGoals = 1;
    awayGoals = 2;
  } else {
    homeGoals = 1 + Math.floor(Math.random() * 2);
    awayGoals = 1 + Math.floor(Math.random() * 2);
  }

  const total = homePower + awayPower;
  const homeRate = Math.round((homePower / total) * 100);
  const awayRate = 100 - homeRate;

  let winRate = "";

  if (homeGoals > awayGoals) {
    winRate = `${homeRate}% ${home}`;
  } else if (awayGoals > homeGoals) {
    winRate = `${awayRate}% ${away}`;
  } else {
    winRate = `50% Draw`;
  }

  return {
    score: `${homeGoals} - ${awayGoals}`,
    winRate
  };
}

// ================================
// RENDER TABEL
// ================================
function renderMatches() {
  matchBody.innerHTML = "";

  matches.forEach(match => {
    const status = getMatchStatus(match.time);
    const prediksi = generatePrediction(match.home, match.away);

    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="time">${match.time}</td>
      <td class="match">${match.home}<br>vs<br>${match.away}</td>
      <td class="league">${match.league}</td>
      <td><span class="status-badge ${status.className}">${status.text}</span></td>
      <td class="prediction">${prediksi.score}</td>
      <td class="winrate">${prediksi.winRate}</td>
    `;

    matchBody.appendChild(row);
  });

  updateTimestamp();
}

// ================================
// UPDATE JAM
// ================================
function updateTimestamp() {
  const now = new Date();
  lastUpdate.textContent = `Update: ${now.toLocaleTimeString("id-ID")}`;
}

// ================================
// REFRESH
// ================================
refreshBtn.addEventListener("click", renderMatches);

// auto refresh setiap 60 detik
setInterval(renderMatches, 60000);

// load awal
renderMatches();
