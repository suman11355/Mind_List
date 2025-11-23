 # Goal-Quick 🚀

**Stay focused, stay productive!**

Goal-Quick is a lightweight, all-in-one personal productivity dashboard designed to help you manage tasks, track time, and stay motivated. Built with pure HTML, CSS, and JavaScript, it features a robust theme engine, data persistence, and a custom sound engine for the timer.

## ✨ Features

### 1. 🌗 Smart Theme Engine
- **Dark/Light Mode:** Toggles between a sleek dark interface (default) and a crisp light mode.
- **Persistence:** Remembers your theme preference using `localStorage` so it's ready next time you visit.
- **CSS Variables:** Built using modern CSS variables for seamless color transitions.

### 2. 🍅 Customizable Pomodoro Timer
- **Flexible Inputs:** Set custom Hours, Minutes, and Seconds (defaults to 25 minutes).
- **Visual Progress:** A dynamic progress bar tracks the remaining time.
- **Audio Alarm:** Uses the **Web Audio API** to generate a beep sound without requiring external audio files.
- **Controls:** Start, Pause, and Reset functionality.

### 3. 📝 To-Do List
- **Task Management:** Quickly add and delete tasks.
- **Auto-Save:** Tasks are saved immediately to `localStorage`, ensuring your list is never lost on refresh.

### 4. 🗒️ Quick Notes
- A persistent text area to jot down random thoughts or meeting notes.
- Content is auto-saved locally.

### 5. 💡 Motivation & Utilities
- **Live Clock:** Displays the current date and time (Day | Month | Date | Time).
- **Quote Generator:** Get a fresh motivational quote with a single click.

---

## 🛠️ Tech Stack

* **HTML5:** Semantic structure.
* **CSS3:** Flexbox, CSS Variables, Animations, and responsive design.
* **JavaScript (ES6+):** DOM manipulation, LocalStorage logic, and Web Audio API implementation.
* **Fonts:** Google Fonts (Quicksand).

---

## 🚀 How to Run

Since Goal-Quick requires no backend or external libraries, running it is very simple:

1.  **Clone or Download** this repository.
2.  Navigate to the folder containing the files.
3.  Open `index.html` directly in your web browser.

> **Tip:** For the best experience, use the "Live Server" extension in VS Code, though it works perfectly fine as a static file.

---

## 📂 Project Structure

```text
Goal-Quick/
│
├── index.html      # Main structure and layout
├── style.css       # Styling, theme variables, and responsive rules
├── script.js       # Logic for timer, storage, sound, and UI updates
└── README.md       # Project documentation
