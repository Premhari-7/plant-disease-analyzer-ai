function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const message = input.value.trim();

  if (!message) return;

  // User bubble
  const userDiv = document.createElement("div");
  userDiv.className = "user-msg";
  userDiv.innerText = message;
  chatBox.appendChild(userDiv);

  input.value = "";

  fetch("http://127.0.0.1:5000/chatbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  })
    .then(res => res.json())
    .then(data => {
      const botDiv = document.createElement("div");
      botDiv.className = "bot-msg";
      botDiv.innerText = data.reply;
      chatBox.appendChild(botDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    });
}
