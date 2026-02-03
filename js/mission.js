const ciphers = [
  { name: "Caesar", shift: 3 },
  { name: "ROT13" },
  { name: "Atbash" }
];

let currentCipher = 0;
let encryptedMessage = "";
const messages = ["I ❤️ JESSA", "BE MY VALENTINE"];
const input = document.getElementById('inputAnswer');
const encryptedSpan = document.getElementById('encrypted');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const kissesSpan = document.getElementById('kisses');
const timerSpan = document.getElementById('timeLeft');

let kisses = localStorage.getItem('kisses') || 0;
kissesSpan.textContent = kisses;

// Utility functions
function caesarEncrypt(str, shift) {
  return str.split('').map(c => {
    let code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) code = ((code - 65 + shift) % 26) + 65;
    else if (code >= 97 && code <= 122) code = ((code - 97 + shift) % 26) + 97;
    return String.fromCharCode(code);
  }).join('');
}

function rot13(str) { return caesarEncrypt(str, 13); }
function atbash(str) {
  return str.split('').map(c => {
    let code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) code = 90 - (code - 65);
    else if (code >= 97 && code <= 122) code = 122 - (code - 97);
    return String.fromCharCode(code);
  }).join('');
}

// Set initial cipher
function setCipher() {
  const message = messages[currentCipher % messages.length];
  const cipher = ciphers[currentCipher % ciphers.length];
  if (cipher.name === "Caesar") encryptedMessage = caesarEncrypt(message, cipher.shift);
  else if (cipher.name === "ROT13") encryptedMessage = rot13(message);
  else if (cipher.name === "Atbash") encryptedMessage = atbash(message);
  encryptedSpan.textContent = encryptedMessage;
  input.value = '';
  yesBtn.disabled = true;
  startTimer(30);
}

function startTimer(seconds) {
  let time = seconds;
  timerSpan.textContent = time;
  const interval = setInterval(() => {
    time--;
    timerSpan.textContent = time;
    if (time <= 0) {
      clearInterval(interval);
      alert("Mission Failed! Try again.");
      setCipher();
    }
  }, 1000);
}

input.addEventListener('input', () => {
  const correct = messages[currentCipher % messages.length].toUpperCase();
  if (input.value.toUpperCase() === correct) y
