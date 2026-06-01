// =========================
// MUSIC SYSTEM
// =========================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const volumeSlider = document.getElementById("volumeSlider");

if (music) {
    music.volume = 0.5;
}

if (musicBtn) {

    musicBtn.addEventListener("click", () => {

        if (music.paused) {

            music.play();

            musicBtn.textContent =
            "⏸ Music";

        } else {

            music.pause();

            musicBtn.textContent =
            "🎵 Music";

        }

    });

}

if (volumeSlider) {

    volumeSlider.addEventListener("input", () => {

        music.volume =
        volumeSlider.value / 100;

    });

}


// =========================
// ENTER SCREEN
// =========================

const enterBtn =
document.getElementById("enterBtn");

const enterScreen =
document.getElementById("enterScreen");

if (enterBtn) {

    enterBtn.addEventListener("click", () => {

        if (music) {

            music.play()
            .catch(() => {});

            if (musicBtn) {
                musicBtn.textContent =
                "⏸ Music";
            }

        }

        enterScreen.style.opacity = "0";

        setTimeout(() => {

            enterScreen.style.display =
            "none";

        }, 500);

    });

}


// =========================
// PREMIUM PLAN AUTO SELECT
// =========================

function selectReason(reason){

    document.getElementById("reason").value =
    reason;

    document.getElementById("ticket")
    .scrollIntoView({
        behavior:"smooth"
    });

}


// =========================
// TICKET SYSTEM
// =========================

const ticketForm =
document.getElementById("ticketForm");

if(ticketForm){

ticketForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const username =
document.getElementById("username").value;

const reason =
document.getElementById("reason").value;

const details =
document.getElementById("details").value;

const WEBHOOK_URL =
"YOUR_WEBHOOK_URL_HERE";

const data = {

content:

`🎫 NEW TICKET

👤 User: ${username}

📌 Reason: ${reason}

📝 Details:
${details}

🕒 Time:
${new Date().toLocaleString()}`

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

document.getElementById("status")
.innerHTML =
"✅ Ticket Sent Successfully";

ticketForm.reset();

}catch{

document.getElementById("status")
.innerHTML =
"❌ Webhook Error";

}

});

}

const SERVER_ID = "1471873618840387750";

fetch(
`https://discord.com/api/guilds/${SERVER_ID}/widget.json`
)
.then(res => res.json())
.then(data => {

document.getElementById("onlineCount").textContent =
data.presence_count || "0";

document.getElementById("memberCount").textContent =
data.members ? data.members.length : "N/A";

})
.catch(() => {

document.getElementById("onlineCount").textContent =
"Unavailable";

document.getElementById("memberCount").textContent =
"Unavailable";

});
