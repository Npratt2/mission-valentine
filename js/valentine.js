const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const countdownP = document.getElementById('countdown');
const finalMessage = document.getElementById('finalMessage');
const callMe = document.getElementById('callMe');

// Spawn small hearts where user clicks
function spawnHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  document.body.appendChild(heart);
  let up = 0;
  const move = setInterval(() => {
    up += 2;
    heart.style.top = (y - up) + 'px';
    heart.style.opacity = 1 - up/100;
    if(up > 100) { clearInterval(move); heart.remove(); }
  }, 20);
}

// Heart explosion effect
function heartExplosion(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for(let i = 0; i < 30; i++){
    const heart = document.createElement('div');
    heart.className = 'confetti';
    heart.style.left = centerX + 'px';
    heart.style.top = centerY + 'px';
    document.body.appendChild(heart);

    const angle = Math.random() * 2 * Math.PI;
    const speed = 2 + Math.random()*3;
    let distance = 0;

    const move = setInterval(() => {
      distance += speed;
      heart.style.left = centerX + Math.cos(angle) * distance + 'px';
      heart.style.top = centerY + Math.sin(angle) * distance + 'px';
      heart.style.opacity = 1 - distance/200;
      if(distance > 200){ clearInterval(move); heart.remove(); }
    }, 20);
  }
}

// YES button behavior
yesBtn.addEventListener('click', () => {
  yesBtn.disabled = true;
  setTimeout(() => {
    let timeLeft = 10;
    countdownP.textContent = `This message will self-destruct in ${timeLeft} seconds...`;
    const countdownInterval = setInterval(() => {
      timeLeft--;
      countdownP.textContent = `This message will self-destruct in ${timeLeft} seconds...`;
      if(timeLeft <= 0){
        clearInterval(countdownInterval);
        heartExplosion(countdownP);
        countdownP.remove();
        finalMessage.style.display = 'block';
        callMe.style.display = 'block';
      }
    }, 1000);
  }, 5000); // 5-second delay before countdown starts
});

// NO button avoids cursor
noBtn.addEventListener('mousemove', () => {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
});

// Click anywhere to spawn hearts
document.body.addEventListener('click', (e) => {
  if(e.target !== yesBtn && e.target !== noBtn && e.target !== callMe){
    spawnHeart(e.clientX, e.clientY);
  }
});

// Call me button click
callMe.addEventListener('click', () => {
  alert("📞 Call me! I can't wait to hear your voice ❤️");
});
