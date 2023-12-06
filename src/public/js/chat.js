console.log("Chat init");

const user = prompt("Insert email");
const socket = io();

const sendMessage = (message) => {
  socket.emit("message", { user, message });
};

document.getElementById("chatInput").addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.currentTarget.value.trim().length > 0) {
    sendMessage(e.currentTarget.value);
    e.currentTarget.value = "";
  }
});

socket.on("logs", (messages) => {
  const box = document.getElementById("chatBox");
  let html = "";

  messages.reverse().forEach((message) => {
    html += `<p><i>${message.user}:</i> ${message.message}</p>`;
  });

  box.innerHTML = html;
  console.log(messages);
});