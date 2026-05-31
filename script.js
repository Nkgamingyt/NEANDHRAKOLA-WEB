// =========================
// MUSIC SYSTEM
// =========================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const volumeSlider = document.getElementById("volumeSlider");

if (music) {

    const savedVolume =
    localStorage.getItem("musicVolume") || 30;

    music.volume = savedVolume / 100;

    if (volumeSlider) {
        volumeSlider.value = savedVolume;
    }

}

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

// =========================
// PREMIUM PLAN BUTTONS
// =========================

function selectReason(reason) {

    const reasonSelect =
    document.getElementById("reason");

    if (reasonSelect) {

        reasonSelect.value = reason;

    }

    const ticketSection =
    document.getElementById("ticket");

    if (ticketSection) {

        ticketSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}

window.selectReason = selectReason;

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

        // PASTE YOUR WEBHOOK URL BELOW

        const WEBHOOK_URL =
        "PASTE_YOUR_WEBHOOK_URL_HERE";

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

            ticketForm.reset();

        } catch (error) {

            document.getElementById(
            "status"
            ).innerHTML =
            "❌ Failed To Send Ticket";

            console.error(error);

        }

    });

}

// =========================
// NAVBAR SCROLL EFFECT
// =========================

window.addEventListener("scroll", () => {

    const nav =
    document.querySelector("nav");

    if (!nav) return;

    if (window.scrollY > 50) {

        nav.classList.add("nav-scroll");

    } else {

        nav.classList.remove("nav-scroll");

    }

});
