// Create falling banana petals
function createBananaPetals() {
  const container = document.getElementById('bananaPetalsContainer');
  if (!container) return;
  const petalCount = 45;
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.classList.add('banana-petal');
    const size = Math.random() * 12 + 8;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${Math.random() * 100}%`;
    const duration = Math.random() * 12 + 7;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${Math.random() * 20}s`;
    petal.style.opacity = Math.random() * 0.5 + 0.2;
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(petal);
  }
}
createBananaPetals();

// MUSIC PLAYER FUNCTIONALITY with Local Asset
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicPlayerBtn');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.innerHTML = '<i class="fas fa-play"></i>';
    musicBtn.classList.remove('playing');
  } else {
    bgMusic.play().catch(e => console.log('Auto-play prevented:', e));
    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    musicBtn.classList.add('playing');
  }
  isPlaying = !isPlaying;
});

// Try to autoplay on user interaction (first click anywhere)
document.body.addEventListener('click', function initAudio() {
  if (!isPlaying) {
    bgMusic.play().catch(e => console.log('Playback failed:', e));
    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    musicBtn.classList.add('playing');
    isPlaying = true;
  }
  document.body.removeEventListener('click', initAudio);
}, { once: true });

// PAGE ROUTING
const pages = {
  home: document.getElementById('homePage'),
  staff: document.getElementById('staffPage'),
  premium: document.getElementById('premiumPage'),
  contact: document.getElementById('contactPage')
};
const navBtns = document.querySelectorAll('.nav-btn');

function switchPage(pageId) {
  Object.values(pages).forEach(page => page.classList.remove('active-page'));
  pages[pageId].classList.add('active-page');
  navBtns.forEach(btn => {
    if(btn.getAttribute('data-page') === pageId) btn.classList.add('active-nav');
    else btn.classList.remove('active-nav');
  });
}

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.getAttribute('data-page');
    if(page) switchPage(page);
  });
});

// Home music demo button
const homeMusicBtn = document.getElementById('homeMusicDemo');
if(homeMusicBtn) homeMusicBtn.addEventListener('click', () => {
  if (!isPlaying) {
    bgMusic.play();
    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    musicBtn.classList.add('playing');
    isPlaying = true;
  }
  alert("🎵 Banana vibes melody playing! 🍌");
});

// Discord stats (static for demo)
document.getElementById('memberCountHome') && (document.getElementById('memberCountHome').innerText = "187");
document.getElementById('onlineCountHome') && (document.getElementById('onlineCountHome').innerText = "112");

// PREMIUM MODAL SYSTEM (NO WEBHOOK)
let currentModal = null;

function showPremiumModal(planName, planPrice, planId) {
  if (currentModal) {
    currentModal.remove();
  }
  
  const upiId = "neandhrakola@okhdfcbank";
  const amtNum = planPrice.replace('₹', '');
  const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=NEANDHRAKOLA&am=${amtNum}&cu=INR&tn=${encodeURIComponent(planName + " Plan")}`;
  
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="premium-modal">
      <button class="modal-close"><i class="fas fa-times"></i></button>
      <h3><i class="fas fa-gem"></i> Complete Your Purchase - ${planName}</h3>
      <div class="qr-flex-modal">
        <div class="qr-box-modal">
          <div id="modalQRCode"></div>
          <p><strong>${planPrice}</strong> • ${planName}</p>
          <p style="font-size:12px; margin-top:8px;"><i class="fas fa-qrcode"></i> Scan with any UPI app</p>
        </div>
        <div class="payment-form-modal" style="flex:1; min-width:260px;">
          <form id="modalPaymentForm">
            <input type="text" id="modalDiscordId" placeholder="Discord ID / Username#1234" required>
            <input type="text" id="modalTransactionId" placeholder="UPI Transaction ID / Reference" required>
            <textarea id="modalNotes" rows="2" placeholder="Any extra info (optional)"></textarea>
            <input type="hidden" id="modalPlanName" value="${planName}">
            <input type="hidden" id="modalPlanPrice" value="${planPrice}">
            <button type="submit" class="btn" style="background:linear-gradient(135deg, #fff064, #ffb347); width:100%;"><i class="fas fa-paper-plane"></i> Submit Payment Proof</button>
            <div id="modalPaymentStatus" style="margin-top:12px; text-align:center;"></div>
          </form>
        </div>
      </div>
      <p style="text-align:center; font-size:12px; margin-top:16px;"><i class="fas fa-clock"></i> Our team verifies payments and assigns roles within 24h.</p>
    </div>
  `;
  
  document.body.appendChild(modalOverlay);
  currentModal = modalOverlay;
  
  // Generate QR code
  const qrContainer = modalOverlay.querySelector('#modalQRCode');
  try {
    new QRCode(qrContainer, { text: upiLink, width: 180, height: 180, colorDark: "#3b2e1e", colorLight: "#ffffff" });
  } catch(e) {
    qrContainer.innerHTML = `<div style="padding:20px;">🍌 QR error, UPI: ${upiId}</div>`;
  }
  
  // Close modal
  const closeBtn = modalOverlay.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => {
    modalOverlay.remove();
    currentModal = null;
  });
  
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.remove();
      currentModal = null;
    }
  });
  
  // Handle form submission (just demo, no webhook)
  const modalForm = modalOverlay.querySelector('#modalPaymentForm');
  const modalStatusDiv = modalOverlay.querySelector('#modalPaymentStatus');
  
  modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const discordId = modalOverlay.querySelector('#modalDiscordId').value.trim();
    const transaction = modalOverlay.querySelector('#modalTransactionId').value.trim();
    
    if(!discordId || !transaction) {
      modalStatusDiv.innerHTML = "❌ Discord ID & Transaction ID required.";
      return;
    }
    
    modalStatusDiv.innerHTML = "✅ Verification submitted successfully! Our team will verify and grant your benefits within 24 hours. Thank you for supporting NEANDHRAKOLA! 🍌";
    modalForm.reset();
    
    setTimeout(() => {
      modalOverlay.remove();
      currentModal = null;
    }, 3000);
  });
}

// Attach plan selection to show modal
document.querySelectorAll('#premiumPlansContainer .plan-card').forEach(card => {
  const selectBtn = card.querySelector('.select-plan-trigger');
  const planName = card.getAttribute('data-plan-name');
  const planPrice = card.getAttribute('data-plan-price');
  const planId = card.getAttribute('data-plan-id');
  
  const showModal = () => {
    showPremiumModal(planName, planPrice, planId);
  };
  
  selectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showModal();
  });
  card.addEventListener('click', (e) => {
    if(e.target.classList.contains('select-plan-trigger')) return;
    showModal();
  });
});

// CONTACT PAGE (demo only, no webhook)
const contactForm = document.getElementById('contactTicketForm');
const contactStatus = document.getElementById('contactStatus');
if(contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('contactUsername').value.trim();
    const reason = document.getElementById('contactReason').value;
    const message = document.getElementById('contactMessage').value.trim();
    if(!username || !message) {
      contactStatus.innerHTML = "❌ Please fill Discord ID and message.";
      return;
    }
    contactStatus.innerHTML = "✅ Your message has been sent! Our team will get back to you on Discord within 24 hours. 🍌";
    contactForm.reset();
    setTimeout(() => {
      contactStatus.innerHTML = "";
    }, 5000);
  });
}

console.log("🍌 NEANDHRAKOLA with Hanami aesthetic — ready! (Local assets: assets/background.mp4, music/melody.mp3)");
