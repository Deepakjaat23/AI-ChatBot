document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;  // Prevent sending empty messages

    displayUserMessage(userInput);
    document.getElementById("userInput").value = ""; // Clear the input box

    // Show typing indicator
    document.getElementById("typingIndicator").style.display = "block";

    // Send the message to the server
    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Hide typing indicator
        document.getElementById("typingIndicator").style.display = "none";

        // Display bot's reply
        displayBotMessage(data.reply);
    })
    .catch(error => {
        document.getElementById("typingIndicator").style.display = "none";
        displayBotMessage("Sorry, something went wrong.");
    });
}

function displayUserMessage(message) {
    const chatBox = document.getElementById("chatBox");
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("message", "user-msg");
    userMessageDiv.innerHTML = `<p>${message}</p><img class="avatar" src="user-avatar.png" alt="User">`;
    chatBox.appendChild(userMessageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function displayBotMessage(message) {
    const chatBox = document.getElementById("chatBox");
    const botMessageDiv = document.createElement("div");
    botMessageDiv.classList.add("message", "bot-msg");
    botMessageDiv.innerHTML = `<img class="avatar" src="bot-avatar.png" alt="Bot"><p>${message}</p>`;
    chatBox.appendChild(botMessageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Toggle dark and light mode
document.getElementById("toggleMode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    const currentMode = document.body.classList.contains("dark-mode") ? "🌙" : "🌞";
    document.getElementById("toggleMode").textContent = currentMode;
});
