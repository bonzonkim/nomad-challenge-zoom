const messageList = document.querySelector("ul")
const messageForm = document.querySelector("#message")
const nickForm = document.querySelector("#nickname")
const socket = new WebSocket(`ws://${window.location.host}`)

function makeJson(type, data) {
    const msg = { type, data }
    return JSON.stringify(msg);
}
socket.addEventListener("open", () => {
    console.log("connected to server!");
})

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
})

socket.addEventListener("close", () => {
    console.log("disconnected from server!")
})



function messageSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input")
    socket.send(makeJson("message", input.value));
    input.value = "";
}
function nickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeJson("nickname", input.value))
}

messageForm.addEventListener("submit", messageSubmit)
nickForm.addEventListener("submit", nickSubmit)
