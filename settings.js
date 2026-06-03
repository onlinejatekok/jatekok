// ── Beállítások kezelése ──

const SETTINGS_KEY = 'hangman_settings';

function getSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || { sound: true, theme: 'dark', mobileMode: false };
  } catch(e) {
    return { sound: true, theme: 'dark', mobileMode: false };
  }
}

function saveSettings(s) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

function applyTheme() {
  const s = getSettings();
  document.body.classList.toggle('light', s.theme === 'light');
}

// ── Hang effektek (Web Audio API — nincs szükség fájlokra) ──
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playSound(type) {
  if (!getSettings().sound) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    switch(type) {
      case 'correct':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, ctx.currentTime);       // C5
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
        break;

      case 'wrong':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.setValueAtTime(150, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
        break;

      case 'win':
        // Felemelkedő dallam
        [523, 659, 784, 1047].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g); g.connect(ctx.destination);
          o.type = 'sine';
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.12);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);
          o.start(ctx.currentTime + i * 0.12);
          o.stop(ctx.currentTime + i * 0.12 + 0.3);
        });
        break;

      case 'lose':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.6);
        break;

      case 'rank':
        // Fanfár
        [392, 523, 659, 784, 1047].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g); g.connect(ctx.destination);
          o.type = 'square';
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.1);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.25);
          o.start(ctx.currentTime + i * 0.1);
          o.stop(ctx.currentTime + i * 0.1 + 0.25);
        });
        break;

      case 'click':
        osc.type = 'sine';
        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.05);
        break;

      case 'bonus':
        // Csengő hang
        [880, 1108, 1318].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g); g.connect(ctx.destination);
          o.type = 'triangle';
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.4);
          o.start(ctx.currentTime + i * 0.08);
          o.stop(ctx.currentTime + i * 0.08 + 0.4);
        });
        break;
    }
  } catch(e) {}
}

// ── Beállítások modal ──
function openSettings() {
  // Ha már van modal, töröljük
  const existing = document.getElementById('settings-modal');
  if (existing) existing.remove();

  const s = getSettings();

  const modal = document.createElement('div');
  modal.id = 'settings-modal';
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(13,13,26,0.85);
    display:flex;align-items:center;justify-content:center;z-index:999;
    animation:fadeIn .25s ease;
  `;

  modal.innerHTML = `
    <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius);
      padding:32px;max-width:380px;width:90%;box-shadow:var(--shadow);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
        <h2 style="font-size:1.3rem;font-weight:800;">⚙️ Beállítások</h2>
        <button onclick="closeSettings()" style="background:none;border:none;color:var(--muted);font-size:1.4rem;cursor:pointer;">✕</button>
      </div>

      <!-- Mobilos mód -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--border);">
        <div>
          <div style="font-weight:600;">📱 Mobilos beviteli mód</div>
          <div style="font-size:.82rem;color:var(--muted);">Telefon saját billentyűzetét használja</div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" id="mobile-toggle" ${s.mobileMode ? 'checked' : ''} onchange="toggleMobileMode(this.checked)">
          <span class="toggle-slider"></span>
        </label>
      </div>

      <!-- Hang -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--border);">
        <div>
          <div style="font-weight:600;">🔊 Hangeffektek</div>
          <div style="font-size:.82rem;color:var(--muted);">Helyes/rossz tipp, nyerés, rangléptés</div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" id="sound-toggle" ${s.sound ? 'checked' : ''} onchange="toggleSound(this.checked)">
          <span class="toggle-slider"></span>
        </label>
      </div>

      <!-- Téma -->
      <div style="padding:14px 0;border-bottom:1px solid var(--border);">
        <div style="font-weight:600;margin-bottom:12px;">🎨 Téma</div>
        <div style="display:flex;gap:10px;">
          <button onclick="setTheme('dark')" id="theme-dark-btn"
            style="flex:1;padding:10px;border-radius:8px;cursor:pointer;font-family:inherit;font-weight:600;font-size:.9rem;
            background:${s.theme==='dark'?'var(--accent)':'var(--bg2)'};
            border:2px solid ${s.theme==='dark'?'var(--accent)':'var(--border)'};
            color:${s.theme==='dark'?'#fff':'var(--muted)'};">
            🌙 Sötét
          </button>
          <button onclick="setTheme('light')" id="theme-light-btn"
            style="flex:1;padding:10px;border-radius:8px;cursor:pointer;font-family:inherit;font-weight:600;font-size:.9rem;
            background:${s.theme==='light'?'var(--accent)':'var(--bg2)'};
            border:2px solid ${s.theme==='light'?'var(--accent)':'var(--border)'};
            color:${s.theme==='light'?'#fff':'var(--muted)'};">
            ☀️ Világos
          </button>
        </div>
      </div>

      <div style="margin-top:20px;text-align:center;">
        <button onclick="closeSettings()" class="btn btn-primary" style="width:100%;">Mentés és bezárás</button>
      </div>
    </div>
  `;

  // Kattintás a háttérre → bezár
  modal.addEventListener('click', e => { if (e.target === modal) closeSettings(); });
  document.body.appendChild(modal);
}

function closeSettings() {
  const modal = document.getElementById('settings-modal');
  if (modal) modal.remove();
  playSound('click');
}

function toggleSound(on) {
  const s = getSettings();
  s.sound = on;
  saveSettings(s);
  if (on) playSound('click');
}

function toggleMobileMode(on) {
  const s = getSettings();
  s.mobileMode = on;
  saveSettings(s);
  // Ha a játék fut, frissíti a beviteli módot
  if (typeof applyInputMode === 'function') applyInputMode();
  playSound('click');
}

function setTheme(theme) {
  const s = getSettings();
  s.theme = theme;
  saveSettings(s);
  applyTheme();

  // Gombok frissítése
  const darkBtn = document.getElementById('theme-dark-btn');
  const lightBtn = document.getElementById('theme-light-btn');
  if (darkBtn) {
    darkBtn.style.background = theme === 'dark' ? 'var(--accent)' : 'var(--bg2)';
    darkBtn.style.borderColor = theme === 'dark' ? 'var(--accent)' : 'var(--border)';
    darkBtn.style.color = theme === 'dark' ? '#fff' : 'var(--muted)';
  }
  if (lightBtn) {
    lightBtn.style.background = theme === 'light' ? 'var(--accent)' : 'var(--bg2)';
    lightBtn.style.borderColor = theme === 'light' ? 'var(--accent)' : 'var(--border)';
    lightBtn.style.color = theme === 'light' ? '#fff' : 'var(--muted)';
  }
  playSound('click');
}

// Toggle switch CSS injektálása
(function injectToggleCSS() {
  const style = document.createElement('style');
  style.textContent = `
    .toggle-switch { position:relative;display:inline-block;width:48px;height:26px; }
    .toggle-switch input { opacity:0;width:0;height:0; }
    .toggle-slider {
      position:absolute;cursor:pointer;inset:0;
      background:var(--border);border-radius:999px;transition:.3s;
    }
    .toggle-slider:before {
      content:'';position:absolute;width:20px;height:20px;
      left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.3s;
    }
    input:checked + .toggle-slider { background:var(--accent); }
    input:checked + .toggle-slider:before { transform:translateX(22px); }
  `;
  document.head.appendChild(style);
})();

// Oldal betöltésekor téma alkalmazása
document.addEventListener('DOMContentLoaded', applyTheme);
applyTheme();
