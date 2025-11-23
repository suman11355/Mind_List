// --- 1. THEME ENGINE ---
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  htmlEl.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateIcon(newTheme);
});

function updateIcon(theme) {
  themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
}

// --- 2. LIVE DATE TIME ---
function updateDateTime() {
  const now = new Date();
  document.getElementById('liveDateTime').textContent = 
    now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) + 
    " | " + 
    now.toLocaleTimeString('en-US');
}
setInterval(updateDateTime, 1000); updateDateTime();

// --- 3. SOUND ENGINE ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playAlarm() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.5);
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);
  osc.start(); osc.stop(audioCtx.currentTime + 1);
}

// --- 4. POMODORO TIMER ---
let timerInterval, totalSeconds = 0, initialSeconds = 0, isRunning = false;
const display = document.getElementById('timerDisplay');
const pBar = document.getElementById('progressBar');
const inputs = { h: document.getElementById('hours'), m: document.getElementById('minutes'), s: document.getElementById('seconds') };

function format(s) {
  return [Math.floor(s/3600), Math.floor((s%3600)/60), s%60]
    .map(v => String(v).padStart(2,'0')).join(':');
}

function tick() {
  if(totalSeconds > 0) {
    totalSeconds--;
    display.textContent = format(totalSeconds);
    pBar.style.width = ((initialSeconds - totalSeconds) / initialSeconds * 100) + "%";
  } else {
    stop(); playAlarm(); display.textContent = "DONE!";
    document.body.style.opacity = "0.5"; 
    setTimeout(() => document.body.style.opacity = "1", 500);
  }
}

function start() {
  if(isRunning) return;
  if(audioCtx.state === 'suspended') audioCtx.resume();
  
  if(!totalSeconds) {
    totalSeconds = (parseInt(inputs.h.value)||0)*3600 + (parseInt(inputs.m.value)||0)*60 + (parseInt(inputs.s.value)||0);
    initialSeconds = totalSeconds;
  }
  if(totalSeconds > 0) {
      isRunning = true;
      timerInterval = setInterval(tick, 1000);
  }
}

function stop() { isRunning = false; clearInterval(timerInterval); }

function reset() {
  stop();
  totalSeconds = 0;
  display.textContent = format((parseInt(inputs.h.value)||0)*3600 + (parseInt(inputs.m.value)||0)*60 + (parseInt(inputs.s.value)||0));
  pBar.style.width = "0%";
}

document.querySelector('.btn-start').addEventListener('click', start);
document.querySelector('.btn-pause').addEventListener('click', stop);
document.querySelector('.btn-reset').addEventListener('click', reset);

// Update display on input change
[inputs.h, inputs.m, inputs.s].forEach(i => i.addEventListener('change', () => {
    if(!isRunning) reset();
}));

// --- 5. TO-DO LIST ---
const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(Array.from(todoList.children).map(li => li.firstChild.textContent.trim())));
}

function addTask(text) {
  if(!text) return;
  const li = document.createElement('li');
  // Note: saveTasks must be globally accessible for this inline onclick to work
  li.innerHTML = `${text} <button onclick="this.parentElement.remove(); saveTasks()">Del</button>`;
  todoList.appendChild(li);
  saveTasks();
}

document.querySelector('.add-task').addEventListener('click', () => { addTask(todoInput.value); todoInput.value=''; });
JSON.parse(localStorage.getItem('tasks')||'[]').forEach(t => addTask(t));

// --- 6. QUOTES & NOTES ---
const quotes = ["Keep going.", "Focus on the good.", "One step at a time.", "You got this.", "Stay hungry."];
document.querySelector('.new-quote').addEventListener('click', () => {
  document.getElementById('quoteBox').textContent = quotes[Math.floor(Math.random()*quotes.length)];
});

const noteInput = document.getElementById('notesInput');
noteInput.value = localStorage.getItem('notes') || "";
noteInput.addEventListener('input', () => localStorage.setItem('notes', noteInput.value));