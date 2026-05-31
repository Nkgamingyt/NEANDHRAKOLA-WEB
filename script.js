const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let playing = true;

musicBtn.addEventListener("click", () => {

if(!playing){
music.play();
musicBtn.innerHTML = "⏸ Stop Music";
playing = true;
}else{
music.pause();
musicBtn.innerHTML = "🎵 Music";
playing = false;
}

});
function selectReason(reason){

document.getElementById("reason").value = reason;

document.getElementById("ticket")
.scrollIntoView({
behavior:"smooth"
});

}

document.getElementById("ticketForm")
.addEventListener("submit", async function(e){

e.preventDefault();

const username =
document.getElementById("username").value;

const reason =
document.getElementById("reason").value;

const details =
document.getElementById("details").value;

/*
Replace WEBHOOK_URL below
with your Discord Webhook
*/

const WEBHOOK_URL = "https://discord.com/api/webhooks/1510729009753755790/sXY9qt6Fb36lzm1TZhp7s8hvLbFqHgtEekDOW4Z-_C_mC4Y7h_B09I6bVgGx-mMLdk_b";

const data = {
content:
`🎫 NEW TICKET

👤 User: ${username}

📌 Reason: ${reason}

📝 Details:
${details}

🕒 Time:
${new Date().toLocaleString()}
`
};

try{

await fetch(
WEBHOOK_URL,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
}
);

document.getElementById("status").innerHTML =
"✅ Ticket Sent Successfully";

}catch{

document.getElementById("status").innerHTML =
"❌ Webhook Error";

}

});
