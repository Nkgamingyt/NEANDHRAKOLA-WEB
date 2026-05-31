// =========================
// MUSIC SYSTEM
// =========================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const volumeSlider = document.getElementById("volumeSlider");

// Load saved volume

const savedVolume =
localStorage.getItem("musicVolume") || 30;

if (volumeSlider) {
    volumeSlider.value = savedVolume;
}

if (music) {
    music.volume = savedVolume / 100;
}

// Play / Pause Button

if (musicBtn) {

    musicBtn.textContent = "▶ Play Music";

    musicBtn.addEventListener("click", () => {

        if (music.paused) {

            music.play();

            musicBtn.textContent =
            "⏸ Pause Music";

        } else {

            music.pause();

            musicBtn.textContent =
            "▶ Play Music";

        }

    });

}

// Volume Slider

if (volumeSlider) {

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

// =========================
// PREMIUM BUTTON
// =========================

function selectReason(reason) {

    document.getElementById("reason").value = reason;

    document.getElementById("ticket")
    .scrollIntoView({
        behavior: "smooth"
    });

}

// =========================
// TICKET SYSTEM
// =========================

const ticketForm =
document.getElementById("ticketForm");

if (ticketForm) {

    ticketForm.addEventListener(
    "submit",
    async function(e) {

        e.preventDefault();

        const username =
        document.getElementById("username").value;

        const reason =
        document.getElementById("reason").value;

        const details =
        document.getElementById("details").value;

        const WEBHOOK_URL =
        "PASTE_YOUR_WEBHOOK_HERE";

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

        try {

            await fetch(
                WEBHOOK_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                        "application/json"
                    },
                    body:
                    JSON.stringify(data)
                }
            );

            document.getElementById(
            "status"
            ).innerHTML =
            "✅ Ticket Sent Successfully";

        } catch {

            document.getElementById(
            "status"
            ).innerHTML =
            "❌ Webhook Error";

        }

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
            .then(() => {

                if (musicBtn) {
                    musicBtn.textContent =
                    "⏸ Pause Music";
                }

            })
            .catch(err => {
                console.log(err);
            });

        }

        if (enterScreen) {

            enterScreen.style.opacity = "0";

            setTimeout(() => {

                enterScreen.style.display =
                "none";

            }, 500);

        }

    });

}
