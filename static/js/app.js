// Variables globales pour le jeu
let score = 0;
let timeLeft = 10;
let gameActive = false;
let timer;

// Récupération des éléments HTML
const target = document.getElementById('target');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const startBtn = document.getElementById('startBtn');

/**
 * Crée des particules animées quand on clique sur la cible
 * @param {number} x - Position X de la cible
 * @param {number} y - Position Y de la cible
 */
function createParticles(x, y) {
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Couleurs aléatoires pour les particules
    const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Style des particules
    particle.style.background = color;
    particle.style.width = `${Math.random() * 20 + 5}px`;
    particle.style.height = particle.style.width;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // Ajout au body
    document.body.appendChild(particle);

    // Animation de la particule
    animateParticle(particle);
  }
}

/**
 * Anime une particule individuelle
 * @param {HTMLElement} particle - L'élément particule à animer
 */
function animateParticle(particle) {
  // Direction et vitesse aléatoires
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 100 + 50;
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;

  let startTime = null;

  function animationLoop(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;

    // Déplacement et disparition progressive
    particle.style.transform = `translate(${vx * progress / 1000}px, ${vy * progress / 1000}px)`;
    particle.style.opacity = 1 - progress / 1000;

    // Continuer l'animation ou supprimer la particule
    if (progress < 1000) {
      requestAnimationFrame(animationLoop);
    } else {
      particle.remove();
    }
  }

  // Démarrer l'animation
  requestAnimationFrame(animationLoop);
}

/**
 * Gère le clic sur la cible
 */
function handleTargetClick() {
  if (!gameActive) return;

  // Augmenter le score
  score++;
  scoreElement.textContent = score;

  // Animation de la cible
  target.style.transform = 'translate(-50%, -50%) scale(0.9)';
  setTimeout(() => {
    target.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 100);

  // Créer des particules
  const rect = target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  createParticles(x, y);

  // Changement de couleur temporaire
  document.body.style.background = 'linear-gradient(135deg, #4A00E0, #8E2DE2)';
  setTimeout(() => {
    document.body.style.background = 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)';
  }, 100);
}

/**
 * Démarre une nouvelle partie
 */
function startGame() {
  // Réinitialisation des variables
  score = 0;
  timeLeft = 10;
  gameActive = true;

  // Mise à jour de l'interface
  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;
  startBtn.disabled = true;

  // Démarrer le timer
  timer = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;

    // Fin du jeu quand le temps est écoulé
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

/**
 * Termine la partie en cours
 */
function endGame() {
  gameActive = false;
  clearInterval(timer);
  startBtn.disabled = false;

  // Afficher le score final
  setTimeout(() => {
    alert(`Temps écoulé! Votre score: ${score} clics!`);
  }, 500);
}

// Événements
target.addEventListener('click', handleTargetClick);
startBtn.addEventListener('click', startGame);

// Message de confirmation quand la page est chargée
window.addEventListener('load', () => {
  console.log('Jeu de Clic Rapide chargé!');
});
