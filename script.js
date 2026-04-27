let expression = "";
let history = [];
let darkMode = true;

function append(value) {
  expression += value;
  document.getElementById("expression").innerText = expression;
}

function calculate() {
  try {
    const result = math.evaluate(expression);

    document.getElementById("result").innerText = result;

    history.unshift({
      exp: expression,
      ans: result
    });

    updateHistory();

    expression = result.toString();

  } catch {
    document.getElementById("result").innerText = "Error";
  }
}

function backspace() {
  expression = expression.slice(0, -1);
  document.getElementById("expression").innerText = expression;
}

function clearHistory() {
  history = [];
  updateHistory();
}

function updateHistory() {
  const historyList = document.getElementById("historyList");

  historyList.innerHTML = "";

  history.forEach(item => {
    historyList.innerHTML += `
      <div class="history-item">
        <p>${item.exp}</p>
        <h3>= ${item.ans}</h3>
      </div>
    `;
  });
}

function toggleHistory() {
  const panel = document.getElementById("historyPanel");

  if (panel.style.display === "none") {
    panel.style.display = "block";
  } else {
    panel.style.display = "none";
  }
}

function toggleTheme() {
  const calculator = document.querySelector(".calculator");
  const historyPanel = document.querySelector(".history-panel");

  darkMode = !darkMode;

  if (darkMode) {
    calculator.style.background =
      "linear-gradient(145deg, #050505, #101010)";

    historyPanel.style.background = "#0f0f0f";
  } else {
    calculator.style.background =
      "linear-gradient(145deg, #0a1a35, #102850)";

    historyPanel.style.background = "#102040";
  }
}

function startVoice() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.onresult = function(event) {
    const text = event.results[0][0].transcript;

    expression += text;
    document.getElementById("expression").innerText = expression;
  };

  recognition.start();
}

function openGraph() {
  window.open("https://www.desmos.com/calculator", "_blank");
}
