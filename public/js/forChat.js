const socket = io();
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

const appendMessage = (message, color) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.style.color = color;
  messageContainer.append(messageElement);
  messageElement.scrollIntoView(true);
};
const userName = messageContainer.getAttribute("data-user");
appendMessage("You Joined Chat", "green");
socket.emit("new-user", userName);

// socket.auth = { username: 'Bob' }

socket.on("chat-message", (data) => {
  appendMessage(`${data.userName}: ${data.message}`, "black");
});

socket.on("user-connected", (userName) => {
  appendMessage(`${userName} connected`, "green");
});

socket.on("user-disconnected", (userName) => {
  appendMessage(`${userName} disconnected`, "red");
});

function submitOnEnter(event) {
  if (event.which === 13 && !event.shiftKey) {
    event.target.form.dispatchEvent(new Event("submit", { cancelable: true }));
    event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
  }
}

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (message) {
    appendMessage(`You: ${message}`, "blue");
    socket.emit("send-chat-message", message);
    messageInput.value = "";
  }
});

document
  .getElementById("message-input")
  .addEventListener("keypress", submitOnEnter);
