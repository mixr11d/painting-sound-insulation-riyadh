// ========================================================
// 1. إعدادات تتبع إعلانات قوقل المركزية واستثناء المطور
// ========================================================
var G_ID = 'AW-XXXXXXXXXXX';
var C_L  = 'XXXXXXXXXXXXXXXXXX';
var W_L  = 'XXXXXXXXXXXXXXXXXX';
var F_L  = 'XXXXXXXXXXXXXXXXXX';
var DEV_NUMS = ['0578539687', '966578539687'];

window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', G_ID);

(function() {
  var gScript = document.createElement('script');
  gScript.async = true;
  gScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + G_ID;
  (document.head || document.documentElement).appendChild(gScript);
})();

// تنظيف أي Service Worker قديم لمنع الشاشة البيضاء في Cloudflare
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(regs) {
    regs.forEach(function(r) { r.unregister(); });
  });
}

// مستشعر النقرات الشامل للاتصال والواتساب مع استثناء المطور برمجياً
document.addEventListener('click', function(e) {
  var target = e.target.closest('a');
  if (!target) return;
  var href = target.getAttribute('href') || '';

  // التحقق من استثناء رقم المطور لمنع هدر الميزانية
  var isDev = DEV_NUMS.some(function(num) { return href.includes(num); });
  if (isDev) return;

  if (href.startsWith('tel:') || (target.getAttribute('href') && target.getAttribute('href').startsWith('tel:'))) {
    gtag('event', 'conversion', { 'send_to': G_ID + '/' + C_L });
  } else if (href.includes('wa.me') || href.includes('whatsapp.com')) {
    gtag('event', 'conversion', { 'send_to': G_ID + '/' + W_L });
  }
}, true);

// ========================================================
// 2. حقن تنسيقات الهيدر والـ Drawer والفوتر إجبارياً
// ========================================================
(function injectHeaderFooterStyles() {
  var style = document.createElement('style');
  style.id = 'unified-layout-css';
  style.innerHTML = `
    #site-header, header {
      position: sticky !important;
      top: 0 !important;
      background: #ffffff !important;
      box-shadow: 0 2px 12px rgba(11,19,41,0.08) !important;
      z-index: 1000 !important;
      width: 100% !important;
      border-bottom: 1px solid #e2e8f0 !important;
    }
    .custom-navbar {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      height: 65px !important;
      padding: 0 1.25rem !important;
      max-width: 1200px !important;
      margin: 0 auto !important;
      box-sizing: border-box !important;
    }
    .custom-brand {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      text-decoration: none !important;
      white-space: nowrap !important;
    }
    .custom-brand img {
      width: 42px !important;
      height: 42px !important;
      object-fit: contain !important;
      border-radius: 8px !important;
    }
    .custom-brand span {
      font-size: 1.05rem !important;
      font-weight: 800 !important;
      color: #0b1329 !important;
    }
    .custom-burger-btn {
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-items: center !important;
      gap: 5px !important;
      width: 44px !important;
      height: 44px !important;
      background: #f1f5f9 !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 8px !important;
      cursor: pointer !important;
      padding: 0 !important;
    }
    .custom-burger-btn span {
      display: block !important;
      width: 22px !important;
      height: 2.8px !important;
      background-color: #0b1329 !important;
      border-radius: 2px !important;
    }

    #luxuryDrawerBackdrop {
      display: none;
      position: fixed !important;
      inset: 0 !important;
      background: rgba(11, 19, 41, 0.78) !important;
      backdrop-filter: blur(4px) !important;
      z-index: 99998 !important;
    }
    #luxuryDrawerBackdrop.active {
      display: block !important;
    }

    #luxurySideDrawer {
      position: fixed !important;
      top: 0 !important;
      right: -320px !important;
      width: 75% !important;
      max-width: 290px !important;
      height: 100vh !important;
      background: #ffffff !important;
      z-index: 99999 !important;
      box-shadow: -8px 0 25px rgba(0,0,0,0.3) !important;
      padding: 1.25rem !important;
      transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      overflow-y: auto !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      box-sizing: border-box !important;
      direction: rtl !important;
      text-align: right !important;
    }
    #luxurySideDrawer.active {
      right: 0 !important;
    }

    .drawer-top-bar {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      border-bottom: 2px solid #f1f5f9 !important;
      padding-bottom: 0.8rem !important;
      margin-bottom: 1rem !important;
    }
    .drawer-brand-text {
      font-size: 1rem !important;
      font-weight: 800 !important;
      color: #0b1329 !important;
    }
    .drawer-close-x {
      background: #f1f5f9 !important;
      border: 1px solid #cbd5e1 !important;
      font-size: 1.4rem !important;
      width: 36px !important;
      height: 36px !important;
      border-radius: 50% !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      color: #0b1329 !important;
    }

    .drawer-nav-items {
      list-style: none !important;
      padding: 0 !important;
      margin: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 0.35rem !important;
    }
    .drawer-nav-items a, .services-accordion-trigger {
      font-size: 0.95rem !important;
      font-weight: 700 !important;
      color: #0f172a !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding: 0.7rem 0.8rem !important;
      border-radius: 8px !important;
      text-decoration: none !important;
      background: transparent !important;
      border: none !important;
      width: 100% !important;
      cursor: pointer !important;
      box-sizing: border-box !important;
    }
    .drawer-nav-items a:hover, .services-accordion-trigger:hover {
      background: #f1f5f9 !important;
      color: #1d4ed8 !important;
    }

    #servicesNestedMenu {
      display: none;
      flex-direction: column !important;
      gap: 0.25rem !important;
      padding-right: 1.25rem !important;
      margin: 0.3rem 0 !important;
      border-right: 3px solid #1d4ed8 !important;
    }
    #servicesNestedMenu.open {
      display: flex !important;
    }
    #servicesNestedMenu a {
      font-size: 0.9rem !important;
      font-weight: 600 !important;
      color: #475569 !important;
      padding: 0.45rem 0.6rem !important;
    }
    .accordion-arrow {
      font-size: 0.75rem !important;
      transition: transform 0.25s ease !important;
    }
    .accordion-arrow.open {
      transform: rotate(180deg) !important;
    }

    .drawer-action-btns {
      margin-top: 1.5rem !important;
      padding-top: 1rem !important;
      border-top: 1px solid #e2e8f0 !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 0.6rem !important;
    }
    .drawer-btn {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 0.5rem !important;
      padding: 0.75rem !important;
      border-radius: 8px !important;
      color: #ffffff !important;
      font-weight: 700 !important;
      font-size: 0.92rem !important;
      text-decoration: none !important;
    }
    .drawer-btn-call { background: #0284c7 !important; }
    .drawer-btn-wa { background: #25d366 !important; }

    /* تنسيقات الفوتر الموحد */
    footer {
      background: #0b1329 !important;
      color: #e2e8f0 !important;
      padding: 3.5rem 0 1.5rem !important;
      margin-top: 3rem !important;
      border-top: 3px solid #1d4ed8 !important;
    }
    .footer-grid {
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)) !important;
      gap: 2rem !important;
      margin-bottom: 2.5rem !important;
    }
    .footer-col h4 {
      color: #ffffff !important;
      font-size: 1.15rem !important;
      font-weight: 800 !important;
      margin-bottom: 1rem !important;
      border-bottom: 2px solid #1d4ed8 !important;
      display: inline-block !important;
      padding-bottom: 0.3rem !important;
    }
    .footer-col p {
      font-size: 0.92rem !important;
      color: #94a3b8 !important;
      line-height: 1.7 !important;
    }
    .footer-col ul {
      list-style: none !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    .footer-col ul li {
      margin-bottom: 0.6rem !important;
    }
    .footer-col ul li a {
      color: #cbd5e1 !important;
      font-size: 0.92rem !important;
      transition: color 0.2s !important;
      text-decoration: none !important;
    }
    .footer-col ul li a:hover {
      color: #38bdf8 !important;
    }
    .footer-gold-phone {
      color: #fbbf24 !important;
      font-size: 1.1rem !important;
      font-weight: 800 !important;
      letter-spacing: 0.5px !important;
      direction: ltr !important;
      display: inline-block !important;
      padding: 0.2rem 0.6rem !important;
      background: rgba(251, 191, 36, 0.12) !important;
      border: 1px solid rgba(251, 191, 36, 0.35) !important;
      border-radius: 6px !important;
      text-decoration: none !important;
    }
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1) !important;
      padding-top: 1.5rem !important;
      text-align: center !important;
      font-size: 0.88rem !important;
      color: #94a3b8 !important;
    }
    .footer-bottom a {
      color: #e2e8f0 !important;
      text-decoration: none !important;
    }
    .mix-signature-tag {
      display: inline-flex !important;
      align-items: center !important;
      gap: 0.4rem !important;
      margin-top: 0.8rem !important;
      padding: 0.45rem 1.3rem !important;
      background: #111827 !important;
      border: 2px solid #ec4899 !important;
      border-radius: 30px !important;
      box-shadow: 0 0 15px rgba(236, 72, 153, 0.35) !important;
      text-decoration: none !important;
    }
    .mix-signature-tag span {
      background: linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      font-weight: 900 !important;
      font-size: 0.92rem !important;
    }
  `;
  document.head.appendChild(style);
})();

// ========================================================
// 3. بناء الهيكل الفاخر وحقن الأزرار العائمة والمودال
// ========================================================
function setupGlobalLayout() {
  // حقن الهيدر الموحد
  var header = document.querySelector('header');
  if (header) {
    header.innerHTML = `
      <div class="custom-navbar">
        <a href="/" class="custom-brand">
          <img src="/images/logo_result.webp" alt="دهانات وعوازل الرياض" onerror="this.onerror=null; this.src='/preview.png';">
          <span>دهانات وعوازل الرياض</span>
        </a>
        <button type="button" class="custom-burger-btn" id="luxuryOpenBtn" aria-label="فتح القائمة">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    `;
  }

  // إزالة القديم وحقن الـ Drawer الجانبي
  var oldDrawer = document.getElementById('luxurySideDrawer');
  if (oldDrawer) oldDrawer.remove();
  var oldBackdrop = document.getElementById('luxuryDrawerBackdrop');
  if (oldBackdrop) oldBackdrop.remove();

  var drawerWrapper = document.createElement('div');
  drawerWrapper.innerHTML = `
    <div id="luxuryDrawerBackdrop"></div>
    <aside id="luxurySideDrawer">
      <div>
        <div class="drawer-top-bar">
          <span class="drawer-brand-text">دهانات وعوازل الرياض</span>
          <button type="button" class="drawer-close-x" id="luxuryCloseBtn" aria-label="إغلاق">&times;</button>
        </div>
        <ul class="drawer-nav-items">
          <li><a href="/">🏠 الرئيسية</a></li>
          <li>
            <button type="button" class="services-accordion-trigger" id="servicesTrigger">
              <span>🎨 خدماتنا التخصصية</span>
              <span class="accordion-arrow" id="servicesArrow">▼</span>
            </button>
            <div id="servicesNestedMenu">
              <a href="/interior-painting.html">• دهانات داخلية ومعجون</a>
              <a href="/exterior-painting.html">• دهانات خارجية وبروفايل</a>
              <a href="/epoxy-flooring.html">• إيبوكسي أرضيات احترافي</a>
              <a href="/sound-insulation.html">• عزل صوت جدران وأبواب</a>
            </div>
          </li>
          <li><a href="/prices.html">🏷️ الأسعار التقديرية</a></li>
          <li><a href="/our-works.html">📷 معرض الأعمال الميدانية</a></li>
          <li><a href="/city-landing.html">📍 أحياء شمال الرياض</a></li>
          <li><a href="/about-us.html">⭐ من نحن</a></li>
          <li><a href="/warranty.html">🛡️ شهادة الضمان المعتمد</a></li>
          <li><a href="/faq.html">❓ الأسئلة الشائعة</a></li>
          <li><a href="/contact-us.html">📞 اتصل بنا</a></li>
        </ul>
      </div>
      <div class="drawer-action-btns">
        <a href="tel:0549881316" class="drawer-btn drawer-btn-call">📞 اتصال مباشر: 0549881316</a>
        <a href="https://wa.me/966549881316" class="drawer-btn drawer-btn-wa">💬 تواصل واتساب</a>
      </div>
    </aside>
  `;
  document.body.appendChild(drawerWrapper);

  // حقن الأزرار العائمة وزر الصعود للأعلى
  var oldFloat = document.querySelector('.custom-floating-actions');
  if (oldFloat) oldFloat.remove();
  var oldScroll = document.querySelector('.custom-scroll-top');
  if (oldScroll) oldScroll.remove();

  var floatingActions = document.createElement('div');
  floatingActions.className = 'custom-floating-actions';
  floatingActions.innerHTML = `
    <a href="https://wa.me/966549881316" class="custom-float-btn custom-float-wa" aria-label="واتساب">💬</a>
    <a href="tel:0549881316" class="custom-float-btn custom-float-call" aria-label="اتصال">📞</a>
  `;
  document.body.appendChild(floatingActions);

  var scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'custom-scroll-top';
  scrollTopBtn.setAttribute('aria-label', 'أعلى الصفحة');
  scrollTopBtn.innerHTML = '▲';
  document.body.appendChild(scrollTopBtn);

  // حقن الفوتر الموحد
  var footer = document.querySelector('footer');
  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h4>دهانات وعوازل الرياض</h4>
            <p>مؤسسة متخصصة بتنفيذ الدهانات الداخلية والخارجية الفاخرة، أرضيات الإيبوكسي الصناعية والديكورية، وأنظمة عزل الصوت للأبواب والجدران بأحدث المعايير في مدينة الرياض.</p>
          </div>
          <div class="footer-col">
            <h4>خدماتنا المعتمدة</h4>
            <ul>
              <li><a href="/interior-painting.html">دهانات داخلية وتأسيس معجون</a></li>
              <li><a href="/exterior-painting.html">دهانات واجهات بروفايل وعسيب</a></li>
              <li><a href="/epoxy-flooring.html">إيبوكسي أرضيات للمستودعات ومواقف</a></li>
              <li><a href="/sound-insulation.html">عزل صوت الجدران والأبواب</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>روابط هامة</h4>
            <ul>
              <li><a href="/prices.html">قائمة الأسعار التقديرية</a></li>
              <li><a href="/our-works.html">معرض الأعمال المنفذة</a></li>
              <li><a href="/city-landing.html">تغطية أحياء شمال الرياض</a></li>
              <li><a href="/warranty.html">شروط وسياسة الضمان</a></li>
              <li><a href="/faq.html">الأسئلة الشائعة</a></li>
            </ul>
          </div>
          <div class="footer-col footer-contact-info">
            <h4>تواصل وطلب المعاينة</h4>
            <p>📍 التغطية: كافة أحياء الرياض مع تركيز خاص على شمال الرياض</p>
            <p>📞 اتصال: <a href="tel:0549881316" class="footer-gold-phone">0549881316</a></p>
            <p>💬 واتساب: <a href="https://wa.me/966549881316" class="footer-gold-phone">0549881316</a></p>
            <p>⏰ أوقات العمل: يومياً 7:00 ص - 11:00 م</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>جميع الحقوق محفوظة © 2026 دهانات وعوازل وإيبوكسي الرياض | <a href="/privacy-policy.html">سياسة الخصوصية</a> | <a href="/terms-conditions.html">الشروط والأحكام</a></p>
          <div>
            <a href="https://wa.me/966578539687" target="_blank" rel="noopener" class="mix-signature-tag">
              <span>🚀 تطوير مواقع وإعلانات مؤسسة mix.tec</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // تفعيل القائمة الجانبية (Drawer)
  var openBtn = document.getElementById('luxuryOpenBtn');
  var closeBtn = document.getElementById('luxuryCloseBtn');
  var backdrop = document.getElementById('luxuryDrawerBackdrop');
  var drawer = document.getElementById('luxurySideDrawer');

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.onclick = openDrawer;
  if (closeBtn) closeBtn.onclick = closeDrawer;
  if (backdrop) backdrop.onclick = closeDrawer;

  // تفعيل قائمة الخدمات المنسدلة
  var trigger = document.getElementById('servicesTrigger');
  var nested = document.getElementById('servicesNestedMenu');
  var arrow = document.getElementById('servicesArrow');
  if (trigger && nested) {
    trigger.onclick = function(e) {
      e.preventDefault();
      var isOpen = nested.classList.toggle('open');
      if (arrow) arrow.classList.toggle('open', isOpen);
    };
  }

  // تفعيل زر الصعود للأعلى
  window.addEventListener('scroll', function() {
    if (scrollTopBtn) {
      scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    }
  });
  scrollTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

// ========================================================
// 4. تشغيل المكونات والمودال والنماذج فور التحميل
// ========================================================
document.addEventListener('DOMContentLoaded', function() {
  setupGlobalLayout();

  // تتبع صفحة الشكر تلقائياً
  if (window.location.pathname.includes('thank-you')) {
    gtag('event', 'conversion', { 'send_to': G_ID + '/' + F_L });
  }

  // محرك تكبير الصور المدمج (Vanilla Lightbox Modal)
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox-modal';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button type="button" class="lightbox-close" aria-label="إغلاق">&times;</button>
      <img class="lightbox-img" src="" alt="">
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  var lbImg = lightbox.querySelector('.lightbox-img');
  var lbCap = lightbox.querySelector('.lightbox-caption');
  var lbClose = lightbox.querySelector('.lightbox-close');

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lbClose.onclick = closeLightbox;
  lightbox.onclick = function(e) {
    if (e.target === lightbox) closeLightbox();
  };
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });

  document.querySelectorAll('img').forEach(function(img) {
    if (img.closest('.custom-brand') || img.closest('.footer-col')) return;
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      lbImg.src = this.src;
      lbCap.textContent = this.alt || 'معاينة العمل';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // معالجة نموذج الطلب السريع بنظام التحويل للواتساب بعد 300ms
  document.querySelectorAll('.ajax-lead-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      gtag('event', 'conversion', { 'send_to': G_ID + '/' + F_L });

      var name = form.querySelector('[name="name"]')?.value || 'عميل';
      var phone = form.querySelector('[name="phone"]')?.value || '';
      var service = form.querySelector('[name="service"]')?.value || 'استفسار عام';
      var notes = form.querySelector('[name="notes"]')?.value || 'طلب معاينة وتسعير';

      var msg = encodeURIComponent(
        'السلام عليكم ورحمة الله،\nطلب خدمة جديد من موقع دهانات وعوازل الرياض:\n' +
        'الاسم: ' + name + '\n' +
        'الجوال: ' + phone + '\n' +
        'الخدمة المطلوبة: ' + service + '\n' +
        'التفاصيل والحي: ' + notes
      );

      setTimeout(function() {
        window.open('https://wa.me/966549881316?text=' + msg, '_blank');
        window.location.href = '/thank-you.html';
      }, 300);
    });
  });
});
