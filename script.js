/* Volume */

const savedVolume =
localStorage.getItem("musicVolume") || 30;

if(volumeSlider){
    volumeSlider.value = savedVolume;
}

music.volume = savedVolume / 100;

/* Play / Pause Button */

if(musicBtn){

    musicBtn.textContent = "▶ Play Music";

    musicBtn.addEventListener("click", () => {

        if(music.paused){

            music.play()
            .then(() => {

                musicBtn.textContent =
                "⏸ Pause Music";

            });

        }else{

            music.pause();

            musicBtn.textContent =
            "▶ Play Music";

        }

    });

}

/* Volume Slider */

if(volumeSlider){

    volumeSlider.addEventListener("input", () => {

        const volume =
        volumeSlider.value / 100;

        music.volume = volume;

        localStorage.setItem(
        "musicVolume",
        volumeSlider.value
        );

    });

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

const enterBtn = document.getElementById("enterBtn");
const enterScreen = document.getElementById("enterScreen");
const music = document.getElementById("bgMusic");

if (enterBtn) {
    enterBtn.addEventListener("click", () => {

        music.play().catch(err => console.log(err));

        if (enterScreen) {
            enterScreen.style.display = "none";
        }

    });
}
