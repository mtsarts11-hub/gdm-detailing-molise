"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Language = "it" | "en";

const BOOKING_URL = "https://simplybook.me/";
const WHATSAPP_NUMBER = "393209745901";
const MAP_URL =
  "https://www.google.com/maps/place/GDM+DETAILING/@41.5978336,14.2337013,14z/";

const copy = {
  it: {
    nav: ["Home", "Chi siamo", "Servizi", "Galleria", "Contatti"],
    book: "Prenota ora",
    menu: "Apri menu",
    eyebrow: "DETAILING AUTO E MOTO · MOLISE",
    heroTitle: "La cura che la tua auto merita.",
    heroText:
      "Dalla correzione della vernice alla protezione ceramica, trattiamo ogni dettaglio con la precisione che la tua auto merita.",
    servicesCta: "Scopri i trattamenti",
    serviceIntro: "Auto · Moto · Protezione · Lucidatura",
    serviceTitle: "Un trattamento, mai uno standard.",
    serviceText:
      "Ogni superficie, ogni veicolo e ogni esigenza meritano una valutazione su misura.",
    aboutEyebrow: "GDM DETAILING",
    aboutTitle: "Precisione, protezione, presenza.",
    aboutText:
      "Non è un semplice lavaggio. È un trattamento studiato per valorizzare le superfici, proteggere nel tempo e riportare ogni veicolo al suo massimo splendore.",
    aboutNote: "Lavoriamo per far parlare la qualità, prima delle parole.",
    galleryEyebrow: "GALLERIA",
    galleryTitle: "Lavori che parlano da sé.",
    galleryText: "Dettagli, riflessi e finiture: guarda da vicino il risultato.",
    viewImage: "Apri immagine",
    beforeEyebrow: "PRIMA / DOPO",
    beforeTitle: "Il cambiamento si vede.",
    beforeText:
      "Stiamo preparando una selezione di confronti verificati, per raccontare ogni trasformazione con la stessa trasparenza con cui lavoriamo.",
    comingSoon: "Confronti verificati in arrivo",
    processEyebrow: "IL NOSTRO METODO",
    processTitle: "Come lavoriamo",
    locationEyebrow: "DOVE SIAMO",
    locationTitle: "Ci trovi in Molise.",
    locationText:
      "Riceviamo su appuntamento e lavoriamo anche nei dintorni. Scrivici o chiamaci per organizzare la tua visita.",
    mapLink: "Apri in Google Maps",
    contactEyebrow: "CONTATTI",
    contactTitle: "Parliamo della tua auto.",
    contactText:
      "Raccontaci cosa vuoi migliorare: ti risponderemo per valutare insieme il trattamento giusto.",
    name: "Nome",
    email: "Email",
    phone: "Telefono",
    message: "Descrivi la tua richiesta",
    submit: "Invia su WhatsApp",
    privacy: "Inviando, accetti di essere ricontattato in merito alla tua richiesta.",
    footerLine: "© 2026 GDM Detailing. Tutti i diritti riservati.",
    privacyLink: "Privacy",
    cookieLink: "Cookie",
    close: "Chiudi",
    previous: "Precedente",
    next: "Successiva",
  },
  en: {
    nav: ["Home", "About", "Services", "Gallery", "Contact"],
    book: "Book now",
    menu: "Open menu",
    eyebrow: "AUTO & MOTORCYCLE DETAILING · MOLISE",
    heroTitle: "The care your car deserves.",
    heroText:
      "From paint correction to ceramic protection, every detail is treated with the precision your vehicle deserves.",
    servicesCta: "Explore treatments",
    serviceIntro: "Cars · Motorcycles · Protection · Polishing",
    serviceTitle: "One treatment, never a standard one.",
    serviceText:
      "Every surface, vehicle and need deserves an approach made to measure.",
    aboutEyebrow: "GDM DETAILING",
    aboutTitle: "Precision, protection, presence.",
    aboutText:
      "It is not a simple wash. It is a considered treatment designed to enhance surfaces, protect them over time and return every vehicle to its finest condition.",
    aboutNote: "We let quality speak before words do.",
    galleryEyebrow: "GALLERY",
    galleryTitle: "Work that speaks for itself.",
    galleryText: "Details, reflections and finishes: take a closer look at the result.",
    viewImage: "Open image",
    beforeEyebrow: "BEFORE / AFTER",
    beforeTitle: "The difference is visible.",
    beforeText:
      "We are preparing a selection of verified comparisons, so every transformation is told with the same transparency we bring to our work.",
    comingSoon: "Verified comparisons coming soon",
    processEyebrow: "OUR METHOD",
    processTitle: "How we work",
    locationEyebrow: "LOCATION",
    locationTitle: "Find us in Molise.",
    locationText:
      "We welcome clients by appointment and work across the surrounding area. Message or call us to arrange your visit.",
    mapLink: "Open in Google Maps",
    contactEyebrow: "CONTACT",
    contactTitle: "Let's talk about your car.",
    contactText:
      "Tell us what you would like to improve. We will help you find the right treatment.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Tell us about your request",
    submit: "Send via WhatsApp",
    privacy: "By sending, you agree to be contacted about your request.",
    footerLine: "© 2026 GDM Detailing. All rights reserved.",
    privacyLink: "Privacy",
    cookieLink: "Cookies",
    close: "Close",
    previous: "Previous",
    next: "Next",
  },
} as const;

const services = [
  { number: "01", it: "Trattamenti ceramici", en: "Ceramic treatments", note: "Protezione e profondità" },
  { number: "02", it: "Lucidatura correttiva", en: "Paint correction", note: "Brillantezza controllata" },
  { number: "03", it: "Trattamenti interni", en: "Interior treatments", note: "Cura in ogni materia" },
  { number: "04", it: "Detailing auto e moto", en: "Car & motorcycle detailing", note: "Una finitura su misura" },
];

const gallery = [
  { src: "/images/hr_1.jpg", alt: "Audi grigia lucidata in officina", shape: "gallery-large" },
  { src: "/images/hr_3.jpg", alt: "Riflesso su vernice nera", shape: "gallery-tall" },
  { src: "/images/hr_4.jpg", alt: "Auto storica restaurata", shape: "gallery-wide" },
  { src: "/images/hr_7.jpg", alt: "Cofano di automobile storica", shape: "gallery-tall" },
  { src: "/images/hr_9.jpg", alt: "Auto nera con finitura lucida", shape: "gallery-large" },
  { src: "/images/hr_14.jpg", alt: "Dettaglio di vernice scura", shape: "gallery-wide" },
  { src: "/images/hr_17.jpg", alt: "Riflesso su carrozzeria blu", shape: "gallery-tall" },
  { src: "/images/hr_18.jpg", alt: "Cofano con riflesso del cielo", shape: "gallery-large" },
  { src: "/images/hr_23.jpg", alt: "Auto scura fotografata al tramonto", shape: "gallery-tall" },
  { src: "/images/hr_25.jpg", alt: "Dettaglio frontale dell'auto", shape: "gallery-wide" },
];

const steps = [
  { number: "01", it: "Ci racconti di cosa ha bisogno il tuo veicolo.", en: "Tell us what your vehicle needs." },
  { number: "02", it: "Valutiamo insieme il trattamento più adatto.", en: "Together, we assess the right treatment." },
  { number: "03", it: "Lavoriamo con cura, prodotti selezionati e attenzione ai dettagli.", en: "We work with care, selected products and attention to detail." },
  { number: "04", it: "Ritiri un risultato che si vede, si tocca e dura.", en: "Collect a result you can see, feel and trust to last." },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("it");
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const page = useRef<HTMLElement>(null);
  const t = copy[language];

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-copy > *",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.68, stagger: 0.1, ease: "power3.out", delay: 0.12 },
      );
      gsap.fromTo(
        ".hero-car",
        { autoAlpha: 0, x: 52, scale: 1.025 },
        { autoAlpha: 1, x: 0, scale: 1, duration: 1.05, ease: "power3.out", delay: 0.18 },
      );
      gsap.fromTo(
        ".hero-sweep",
        { scaleX: 0, transformOrigin: "right center" },
        { scaleX: 1, duration: 0.9, ease: "power3.out", delay: 0.35 },
      );
    }, page);
    return () => context.revert();
  }, [language]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (activeImage === null) return;
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight") setActiveImage((index) => (index === null ? null : (index + 1) % gallery.length));
      if (event.key === "ArrowLeft") setActiveImage((index) => (index === null ? null : (index - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeImage]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const sendToWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = language === "it"
      ? `Ciao GDM Detailing, sono ${form.get("name")}.\nEmail: ${form.get("email")}\nTelefono: ${form.get("phone")}\n\nRichiesta: ${form.get("message")}`
      : `Hello GDM Detailing, I am ${form.get("name")}.\nEmail: ${form.get("email")}\nPhone: ${form.get("phone")}\n\nRequest: ${form.get("message")}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const navTargets = ["home", "about", "services", "gallery", "contact"];

  return (
    <main ref={page} className="site-shell">
      <section className="hero-frame" id="home">
        <header className="site-header">
          <button className="brand" aria-label="GDM Detailing home" onClick={() => scrollTo("home")}>
            <img src="/images/gdm-wordmark-redrawn.png" alt="GDM Detailing" />
          </button>
          <nav className="desktop-nav" aria-label="Main navigation">
            {t.nav.map((item, index) => (
              <button key={item} onClick={() => scrollTo(navTargets[index])}>{item}</button>
            ))}
          </nav>
          <div className="header-actions">
            <div className="language-switch" aria-label="Language selector">
              <button className={language === "it" ? "active" : ""} onClick={() => setLanguage("it")}>IT</button>
              <span>/</span>
              <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
            </div>
            <a className="button button-primary header-book" href={BOOKING_URL} target="_blank" rel="noreferrer">{t.book} <span>↗</span></a>
            <button className="menu-button" aria-label={t.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              <i /><i />
            </button>
          </div>
        </header>
        <div className={menuOpen ? "mobile-menu is-open" : "mobile-menu"}>
          {t.nav.map((item, index) => <button key={item} onClick={() => scrollTo(navTargets[index])}>{item}</button>)}
          <a href={BOOKING_URL} target="_blank" rel="noreferrer">{t.book} ↗</a>
        </div>
        <div className="hero-grid" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">{t.eyebrow}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-description">{t.heroText}</p>
            <div className="hero-buttons">
              <a className="button button-primary" href={BOOKING_URL} target="_blank" rel="noreferrer">{t.book} <span>↗</span></a>
              <button className="button button-ghost" onClick={() => scrollTo("services")}>{t.servicesCta} <span>↓</span></button>
            </div>
            <p className="hero-trust">{t.serviceIntro}</p>
          </div>
          <p className="hero-ghost" aria-hidden="true">GDM</p>
          <div className="hero-car-light" aria-hidden="true" />
          <div className="hero-car-ground" aria-hidden="true" />
          <img className="hero-car" src="/hero-gdm-detailing-v2.png" alt="Coupé blu impeccabilmente rifinita" />
          <div className="hero-sweep" aria-hidden="true" />
        </div>
      </section>

      <section className="service-reveal section" id="services">
        <div className="section-intro compact-intro">
          <p className="eyebrow">SERVIZI</p>
          <div><h2>{t.serviceTitle}</h2><p>{t.serviceText}</p></div>
        </div>
        <button className="expand-button" aria-expanded={servicesOpen} onClick={() => setServicesOpen(!servicesOpen)}>
          <span>{t.servicesCta}</span><b>{servicesOpen ? "−" : "+"}</b>
        </button>
        <div className={servicesOpen ? "service-list is-open" : "service-list"}>
          {services.map((service) => <article key={service.number} className="service-item">
            <span>{service.number}</span><h3>{language === "it" ? service.it : service.en}</h3><p>{service.note}</p>
          </article>)}
        </div>
      </section>

      <section className="about-section section" id="about">
        <div className="about-image-wrap"><img src="/images/hr_3.jpg" alt="Riflessi definiti su vernice nera" /></div>
        <div className="about-copy">
          <p className="eyebrow">{t.aboutEyebrow}</p>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
          <div className="about-note"><span>✦</span><span>{t.aboutNote}</span></div>
        </div>
      </section>

      <section className="gallery-section section" id="gallery">
        <div className="section-intro">
          <p className="eyebrow">{t.galleryEyebrow}</p>
          <div><h2>{t.galleryTitle}</h2><p>{t.galleryText}</p></div>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, index) => <button key={item.src} className={`gallery-item ${item.shape}`} onClick={() => setActiveImage(index)} aria-label={`${t.viewImage}: ${item.alt}`}>
            <img src={item.src} alt={item.alt} /><span>+</span>
          </button>)}
        </div>
      </section>

      <section className="comparison-section section">
        <div className="comparison-copy">
          <p className="eyebrow">{t.beforeEyebrow}</p>
          <h2>{t.beforeTitle}</h2>
          <p>{t.beforeText}</p>
        </div>
        <div className="comparison-pending">
          <div className="comparison-line" /><span className="pending-cross">↔</span>
          <p>{t.comingSoon}</p>
          <small>GDM · DETAILING</small>
        </div>
      </section>

      <section className="process-section section" id="process">
        <div className="section-intro compact-intro"><p className="eyebrow">{t.processEyebrow}</p><div><h2>{t.processTitle}</h2></div></div>
        <div className="process-list">
          {steps.map((step) => <article key={step.number} className="process-step"><span>{step.number}</span><p>{language === "it" ? step.it : step.en}</p></article>)}
        </div>
      </section>

      <section className="location-section section">
        <div className="location-copy">
          <p className="eyebrow">{t.locationEyebrow}</p><h2>{t.locationTitle}</h2><p>{t.locationText}</p>
          <div className="rating"><strong>5,0</strong><span>★★★★★</span><small>Google · 2 recensioni</small></div>
          <a className="text-link" href={MAP_URL} target="_blank" rel="noreferrer">{t.mapLink} <span>↗</span></a>
        </div>
        <div className="map-wrap"><iframe title="GDM Detailing location" src="https://www.google.com/maps?q=41.5978336,14.2337013&z=14&output=embed" loading="lazy" /></div>
      </section>

      <section className="contact-section section" id="contact">
        <div className="contact-heading"><p className="eyebrow">{t.contactEyebrow}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div>
        <form onSubmit={sendToWhatsApp} className="contact-form">
          <label><span>{t.name}</span><input required name="name" autoComplete="name" /></label>
          <label><span>{t.email}</span><input required name="email" type="email" autoComplete="email" /></label>
          <label><span>{t.phone}</span><input required name="phone" type="tel" autoComplete="tel" /></label>
          <label className="full"><span>{t.message}</span><textarea required name="message" rows={4} /></label>
          <div className="form-bottom"><p>{t.privacy}</p><button className="button button-primary" type="submit">{t.submit} <span>↗</span></button></div>
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><strong>GDM</strong><span>DETAILING</span></div>
        <div className="footer-links"><a href="https://www.instagram.com/gdmdetailing/" target="_blank" rel="noreferrer">Instagram ↗</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href={BOOKING_URL} target="_blank" rel="noreferrer">{t.book} ↗</a></div>
        <div className="footer-bottom"><p>{t.footerLine}</p><div><a href="#home">{t.privacyLink}</a><a href="#home">{t.cookieLink}</a></div></div>
      </footer>

      <a className="whatsapp-float" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label="WhatsApp GDM Detailing">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />
      </a>

      {activeImage !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[activeImage].alt}>
        <button className="lightbox-close" onClick={() => setActiveImage(null)} aria-label={t.close}>×</button>
        <button className="lightbox-nav previous" onClick={() => setActiveImage((activeImage - 1 + gallery.length) % gallery.length)} aria-label={t.previous}>←</button>
        <img src={gallery[activeImage].src} alt={gallery[activeImage].alt} />
        <button className="lightbox-nav next" onClick={() => setActiveImage((activeImage + 1) % gallery.length)} aria-label={t.next}>→</button>
      </div>}
    </main>
  );
}
