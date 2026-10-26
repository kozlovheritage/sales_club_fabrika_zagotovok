(() => {
  const deadline = Date.parse('2026-10-26T23:59:59+03:00');
  const holder = document.querySelector('#hero + .container');
  if (!holder) return;
  const style = document.createElement('style');
  style.textContent = `
    .price-countdown{position:relative;max-width:620px;margin:0 auto 36px;padding:24px 20px;text-align:center;border:1px solid var(--pink-light);border-radius:var(--r);background:var(--warm-white)}
    .price-countdown[hidden]{display:none}
    .price-countdown .btn{margin-top:20px;width:100%;max-width:340px}
    .price-countdown h3{font-size:1.12rem;margin:0 0 8px}
    .price-countdown p{font-size:.85rem;color:var(--text-mid);margin:0}
    .price-countdown-digits{display:flex;justify-content:center;gap:12px;margin:18px 0}
    .price-countdown-unit{min-width:64px}
    .price-countdown-unit b{display:block;padding:10px 8px;border-radius:12px;background:#fff0f4;color:var(--pink-dark);font-size:1.8rem;line-height:1.2;font-variant-numeric:tabular-nums}
    .price-countdown-unit span{display:block;margin-top:6px;font-size:.72rem;color:var(--text-mid)}
    @media(max-width:500px){.price-countdown{padding:22px 16px}.price-countdown-digits{gap:8px}.price-countdown-unit{min-width:54px}.price-countdown-unit b{font-size:1.6rem}}
  `;
  document.head.append(style);
  const panel = document.createElement('aside');
  panel.id = 'price-countdown';
  panel.className = 'price-countdown';
  panel.hidden = true;
  panel.setAttribute('aria-labelledby', 'price-countdown-title');
  panel.innerHTML = `
    <h3 id="price-countdown-title">До закрытия продаж</h3>
    <p>Продажи закроются <time datetime="2026-10-26T23:59:59+03:00">26 октября в 23:59:59 МСК</time></p>
    <div class="price-countdown-digits" role="timer" aria-live="off" aria-label="Осталось до закрытия продаж">
      <div class="price-countdown-unit"><b data-countdown="days">00</b><span>дней</span></div>
      <div class="price-countdown-unit"><b data-countdown="hours">00</b><span>часов</span></div>
      <div class="price-countdown-unit"><b data-countdown="minutes">00</b><span>минут</span></div>
      <div class="price-countdown-unit"><b data-countdown="seconds">00</b><span>секунд</span></div>
    </div>
    <p>Успейте вступить в клуб до закрытия продаж</p>
    <a class="btn" href="#pricing">ВСТУПИТЬ В КЛУБ</a>
  `;
  holder.append(panel);
  let timeout;
  function refresh() {
    window.clearTimeout(timeout);
    const remaining = deadline - Date.now();
    panel.hidden = !Number.isFinite(remaining) || remaining <= 0;
    if (panel.hidden) return;
    const total = Math.ceil(remaining / 1000);
    const values = {
      days: Math.floor(total / 86400),
      hours: Math.floor(total / 3600) % 24,
      minutes: Math.floor(total / 60) % 60,
      seconds: total % 60
    };
    Object.entries(values).forEach(([key, value]) => {
      panel.querySelector('[data-countdown="' + key + '"]').textContent = String(value).padStart(2, '0');
    });
    timeout = window.setTimeout(refresh, Math.min(1000, remaining));
  }
  document.addEventListener('visibilitychange', refresh);
  window.addEventListener('pageshow', refresh);
  refresh();
})();
