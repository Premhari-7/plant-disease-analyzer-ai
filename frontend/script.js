/* ================= CONFIGURATION ================= */
// ⚠️ IMPORTANT: Replace these URLs with your actual Render deployment URLs once deployed!
// For local testing, use the 127.0.0.1 URLs instead.
const API_URL_PYTHON = "https://your-python-api-url.onrender.com"; 
const API_URL_NODE = "https://your-node-api-url.onrender.com";

/* ================= IMAGE ANALYSIS (DO NOT CHANGE) ================= */
function analyzeImage() {
    const input = document.getElementById("imageInput");
    const result = document.getElementById("result");

    if (!input || !input.files.length) {
        alert("Please select an image");
        return;
    }

    const formData = new FormData();
    formData.append("file", input.files[0]);

    result.innerHTML = "Analyzing... ⏳";

    fetch(`${API_URL_PYTHON}/predict`, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        result.innerHTML = `
            <b>Disease:</b> ${data.disease}<br>
            <b>Confidence:</b> ${data.confidence}%<br>
            <b>Cure:</b> ${data.cure}
        `;
    })
    .catch(() => {
        result.innerHTML = "❌ Server error";
    });
}


/* ================= FORMAT AI RESPONSE ================= */

function formatBotReply(text) {

    // Remove ** and convert headings
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Convert lines starting with - into bullet points
    const lines = text.split("\n");
    let formatted = "";
    let inList = false;

    lines.forEach(line => {

        if (line.trim().startsWith("-")) {
            if (!inList) {
                formatted += "<ul>";
                inList = true;
            }
            formatted += `<li>${line.replace("-", "").trim()}</li>`;
        } else {
            if (inList) {
                formatted += "</ul>";
                inList = false;
            }
            formatted += line + "<br>";
        }

    });

    if (inList) formatted += "</ul>";

    return formatted;
}


/* ================= AI CHATBOT ================= */

function sendChat() {
    const input = document.getElementById("pdUserInput");
    const chatBox = document.getElementById("pdChatBox");

    if (!input || !chatBox) return;

    const message = input.value.trim();
    if (message === "") return;

    // USER MESSAGE
    const userDiv = document.createElement("div");
    userDiv.className = "user-msg";
    userDiv.innerText = message;
    chatBox.appendChild(userDiv);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // LOADING
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "bot-msg";
    loadingDiv.innerText = "Thinking... 🤖";
    chatBox.appendChild(loadingDiv);

    fetch(`${API_URL_NODE}/chatbot-ai`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    })
    .then(res => res.json())
    .then(data => {

        loadingDiv.remove();

        const botDiv = document.createElement("div");
        botDiv.className = "bot-msg";

        // ⭐ FORMATTED OUTPUT
        botDiv.innerHTML = formatBotReply(data.reply);

        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

    })
    .catch(() => {
        loadingDiv.innerText = "❌ AI Server not responding";
    });
}


/* ================= ENTER KEY SUPPORT ================= */

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("pdUserInput");
    if (input) {
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") sendChat();
        });
    }
});