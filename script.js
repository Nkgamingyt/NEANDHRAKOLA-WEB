const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const volumeSlider = document.getElementById("volumeSlider");

const enterBtn = document.getElementById("enterBtn");
const enterScreen = document.getElementById("enterScreen");

/* ENTER SCREEN */

if (enterBtn) {

    enterBtn.addEventListener("click", () => {

        if (music) {
            music.play().catch(err => console.log(err));
        }

        enterScreen.style.opacity = "0";

        setTimeout(() => {
            enterScreen.style.display = "none";
        }, 500);

    });

}

/* MUSIC */

if (music) {

    const savedVolume =
        localStorage.getItem("musicVolume") || 30;

    music.volume = savedVolume / 100;

    if (volumeSlider) {
        volumeSlider.value = savedVolume;
    }

}

/* PLAY PAUSE */

if (musicBtn) {

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

/* VOLUME */

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

/* PREMIUM PLAN BUTTON */

function selectReason(reason) {

    document.getElementById("reason").value =
        reason;

    document.getElementById("ticket")
        .scrollIntoView({
            behavior: "smooth"
        });

}

window.selectReason = selectReason;

/* TICKET SYSTEM */

const ticketForm =
    document.getElementById("ticketForm");

if (ticketForm) {

    ticketForm.addEventListener(
        "submit",
        async function (e) {

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

        }
    );

}
