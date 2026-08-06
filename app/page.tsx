"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Language = "es" | "en";

const WHATSAPP_NUMBER = "34611577641";
const BOOKING_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola V Detail Center, quiero solicitar una cita.")}`;
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=C.+de+la+Zanfona%2C+4%2C+Nave+2.30%2C+47012+Valladolid%2C+Espa%C3%B1a";
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=C.+de+la+Zanfona%2C+4%2C+Nave+2.30%2C+47012+Valladolid%2C+Espa%C3%B1a&z=16&output=embed";
const INSTAGRAM_URL = "https://www.instagram.com/vdetailcenter/";

const copy = {
  es: {
    nav: ["Inicio", "Nosotros", "Servicios", "Galería", "Contacto"],
    book: "Solicitar cita",
    menu: "Abrir menú",
    eyebrow: "DETAILING PROFESIONAL · VALLADOLID",
    heroTitle: "El detalle que tu vehículo merece.",
    heroText:
      "Protección cerámica, PPF, corrección de pintura y acabado premium para cuidar cada superficie de tu vehículo.",
    servicesEyebrow: "SERVICIOS",
    servicesCta: "Ver tratamientos",
    serviceIntro: "DETAILING · PPF · CERÁMICA · PULIDO",
    serviceTitle: "Un tratamiento, hecho a medida.",
    serviceText:
      "Cada vehículo y cada superficie requieren una valoración profesional y una atención precisa.",
    aboutEyebrow: "V DETAIL CENTER",
    aboutTitle: "Cuidado profesional. Resultado premium.",
    aboutText:
      "Trabajamos cada vehículo con una mirada rigurosa: limpieza, corrección y protección para que el acabado vuelva a hablar por sí solo.",
    aboutNote: "Atendemos exclusivamente con cita previa.",
    galleryEyebrow: "GALERÍA",
    galleryTitle: "Trabajos que hablan por sí solos.",
    galleryText: "Acabados, reflejos y detalles de vehículos tratados en nuestro centro.",
    viewImage: "Abrir imagen",
    showMore: "Ver más",
    showLess: "Ver menos",
    beforeEyebrow: "ANTES / DESPUÉS",
    beforeTitle: "El cambio se nota.",
    beforeText:
      "Desliza para ver el mismo Mercedes-AMG antes, con suciedad de carretera visible, y después de su puesta a punto.",
    beforeHint: "Desliza para comparar",
    beforeLabel: "Antes",
    afterLabel: "Después",
    processEyebrow: "NUESTRO MÉTODO",
    processTitle: "Cómo trabajamos",
    locationEyebrow: "DÓNDE ESTAMOS",
    locationTitle: "Valladolid, con cita previa.",
    locationText:
      "Estamos en C. de la Zanfona, 4, Nave 2.30. Escríbenos o llámanos para solicitar tu cita.",
    mapLink: "Abrir en Google Maps",
    ratingLabel: "Google · 96 reseñas",
    contactEyebrow: "CONTACTO",
    contactTitle: "Hablemos de tu vehículo.",
    contactText:
      "Cuéntanos qué te gustaría mejorar. Te ayudaremos a valorar el tratamiento adecuado.",
    name: "Nombre",
    email: "Correo electrónico",
    phone: "Teléfono",
    message: "Describe tu solicitud",
    submit: "Enviar por WhatsApp",
    privacy: "Al enviar tus datos, aceptas que te contactemos sobre tu solicitud.",
    footerLine: "© 2026 V Detail Center. Todos los derechos reservados.",
    footerIntro: "Detailing profesional, protección cerámica, PPF y corrección de pintura en Valladolid.",
    footerNavigation: "Explora",
    footerServices: "Tratamientos",
    footerContact: "Contacto",
    footerVisit: "Dónde encontrarnos",
    footerArea: "Valladolid",
    footerAppointment: "Atención únicamente con cita previa",
    footerInstagram: "Síguenos en Instagram",
    footerPhone: "Llámanos",
    footerWhatsapp: "Escríbenos por WhatsApp",
    footerMap: "Abrir el mapa",
    privacyLink: "Privacidad",
    cookieLink: "Cookies",
    close: "Cerrar",
    previous: "Anterior",
    next: "Siguiente",
  },
  en: {
    nav: ["Home", "About", "Services", "Gallery", "Contact"],
    book: "Request an appointment",
    menu: "Open menu",
    eyebrow: "PROFESSIONAL DETAILING · VALLADOLID",
    heroTitle: "The detail your vehicle deserves.",
    heroText:
      "Ceramic protection, PPF, paint correction and premium finishing for every surface of your vehicle.",
    servicesEyebrow: "SERVICES",
    servicesCta: "View treatments",
    serviceIntro: "DETAILING · PPF · CERAMIC · POLISHING",
    serviceTitle: "A treatment made to measure.",
    serviceText:
      "Every vehicle and every surface deserves a professional assessment and precise attention.",
    aboutEyebrow: "V DETAIL CENTER",
    aboutTitle: "Professional care. Premium result.",
    aboutText:
      "Every vehicle is handled with a rigorous eye: cleaning, correction and protection so the finish can speak for itself.",
    aboutNote: "We work by appointment only.",
    galleryEyebrow: "GALLERY",
    galleryTitle: "Work that speaks for itself.",
    galleryText: "Finishes, reflections and details from vehicles treated in our centre.",
    viewImage: "Open image",
    showMore: "See more",
    showLess: "Show less",
    beforeEyebrow: "BEFORE / AFTER",
    beforeTitle: "The difference is visible.",
    beforeText:
      "Move the slider to see the same Mercedes-AMG before, with visible road dirt, and after its professional refresh.",
    beforeHint: "Drag to compare",
    beforeLabel: "Before",
    afterLabel: "After",
    processEyebrow: "OUR METHOD",
    processTitle: "How we work",
    locationEyebrow: "LOCATION",
    locationTitle: "Valladolid, by appointment.",
    locationText:
      "Find us at C. de la Zanfona, 4, Nave 2.30. Message or call us to request your appointment.",
    mapLink: "Open in Google Maps",
    ratingLabel: "Google · 96 reviews",
    contactEyebrow: "CONTACT",
    contactTitle: "Let's talk about your vehicle.",
    contactText:
      "Tell us what you would like to improve. We will help you find the right treatment.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Tell us about your request",
    submit: "Send via WhatsApp",
    privacy: "By sending, you agree to be contacted about your request.",
    footerLine: "© 2026 V Detail Center. All rights reserved.",
    footerIntro: "Professional detailing, ceramic protection, PPF and paint correction in Valladolid.",
    footerNavigation: "Explore",
    footerServices: "Treatments",
    footerContact: "Contact",
    footerVisit: "Where to find us",
    footerArea: "Valladolid",
    footerAppointment: "By appointment only",
    footerInstagram: "Follow us on Instagram",
    footerPhone: "Call us",
    footerWhatsapp: "Message us on WhatsApp",
    footerMap: "Open the map",
    privacyLink: "Privacy",
    cookieLink: "Cookies",
    close: "Close",
    previous: "Previous",
    next: "Next",
  },
} as const;

const services = [
  { number: "01", es: "Protección cerámica", en: "Ceramic protection", noteEs: "Cuidado y profundidad", noteEn: "Care and depth" },
  { number: "02", es: "Corrección de pintura", en: "Paint correction", noteEs: "Brillo controlado", noteEn: "Controlled gloss" },
  { number: "03", es: "Detailing interior", en: "Interior detailing", noteEs: "Atención a cada material", noteEn: "Care for every material" },
  { number: "04", es: "PPF y acabado premium", en: "PPF and premium finish", noteEs: "Un acabado a medida", noteEn: "A finish made to measure" },
];

const gallery = [
  { src: "/images/vdetail/gallery-porsche-black.jpg", alt: "Porsche negro con acabado brillante", shape: "gallery-large" },
  { src: "/images/vdetail/gallery-mustang-red.jpg", alt: "Ford Mustang rojo tratado en V Detail Center", shape: "gallery-tall" },
  { src: "/images/vdetail/gallery-bmw-x6-white.jpg", alt: "BMW X6 blanco con acabado cuidado", shape: "gallery-wide" },
  { src: "/images/vdetail/gallery-porsche-silver.jpg", alt: "Porsche plateado en el centro de detailing", shape: "gallery-tall" },
  { src: "/images/vdetail/gallery-bmw-black.jpg", alt: "BMW negro con pintura pulida", shape: "gallery-large" },
  { src: "/images/vdetail/gallery-bmw-orange.jpg", alt: "BMW naranja con acabado premium", shape: "gallery-wide" },
  { src: "/images/vdetail/gallery-mercedes-amg-green.jpg", alt: "Mercedes AMG verde tratado", shape: "gallery-tall" },
  { src: "/images/vdetail/gallery-porsche-white.jpg", alt: "Porsche blanco con carrocería brillante", shape: "gallery-large" },
  { src: "/images/vdetail/gallery-detailing-polish.jpg", alt: "Trabajo de pulido profesional", shape: "gallery-wide" },
  { src: "/images/vdetail/gallery-audi-grey.jpg", alt: "Audi gris preparado en el taller", shape: "gallery-tall" },
  { src: "/images/vdetail/gallery-audi-grille.jpg", alt: "Detalle frontal de Audi", shape: "gallery-large" },
  { src: "/images/vdetail/gallery-audi-white.jpg", alt: "Audi blanco con acabado cuidado", shape: "gallery-wide" },
  { src: "/images/vdetail/gallery-porsche-dark.jpg", alt: "Porsche oscuro con reflejos definidos", shape: "gallery-tall" },
  { src: "/images/vdetail/gallery-mercedes-black.jpg", alt: "Mercedes negro con acabado brillante", shape: "gallery-large" },
  { src: "/images/vdetail/gallery-bmw-front.jpg", alt: "Frontal de BMW tratado", shape: "gallery-wide" },
  { src: "/images/vdetail/gallery-porsche-night.jpg", alt: "Porsche negro en iluminación nocturna", shape: "gallery-tall" },
  { src: "/images/vdetail/gallery-bmw-sedan.jpg", alt: "BMW negro preparado por V Detail Center", shape: "gallery-large" },
  { src: "/images/vdetail/gallery-red-workshop.jpg", alt: "Vehículo rojo en el taller", shape: "gallery-wide" },
  { src: "/images/vdetail/gallery-golf-white.jpg", alt: "Volkswagen Golf blanco tratado", shape: "gallery-tall" },
  { src: "/images/vdetail/gallery-suv-blue.jpg", alt: "SUV azul con acabado premium", shape: "gallery-large" },
  { src: "/images/vdetail/gallery-cupra-white.jpg", alt: "Cupra blanco en V Detail Center", shape: "gallery-wide" },
  { src: "/images/vdetail/gallery-audi-premium.jpg", alt: "Audi gris con acabado premium", shape: "gallery-tall" },
  { src: "/images/vdetail/gallery-bmw-white.jpg", alt: "BMW blanco con carrocería pulida", shape: "gallery-large" },
  { src: "/images/vdetail/gallery-porsche-white-highres.jpg", alt: "Porsche blanco fotografiado en detalle", shape: "gallery-wide" },
];

const GALLERY_PREVIEW_COUNT = 6;

const steps = [
  { number: "01", es: "Cuéntanos qué necesita tu vehículo.", en: "Tell us what your vehicle needs." },
  { number: "02", es: "Valoramos contigo el tratamiento más adecuado.", en: "Together, we assess the right treatment." },
  { number: "03", es: "Trabajamos con precisión y atención a cada detalle.", en: "We work with precision and attention to every detail." },
  { number: "04", es: "Recoges un resultado que se ve y se disfruta.", en: "Collect a result you can see and enjoy." },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [galleryExpanded, setGalleryExpanded] = useState(false);
  const [comparisonPosition, setComparisonPosition] = useState(50);
  const page = useRef<HTMLElement>(null);
  const t = copy[language];

  useEffect(() => {
    let revealObserver: IntersectionObserver | undefined;
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

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const revealBlocks = gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]");
      const staggerBlocks = gsap.utils.toArray<HTMLElement>("[data-scroll-stagger]");
      const blocks = [...revealBlocks, ...staggerBlocks];

      staggerBlocks.forEach((block) => gsap.set(Array.from(block.children), { autoAlpha: 0, y: 26 }));
      gsap.set(revealBlocks, { autoAlpha: 0, y: 26 });

      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const block = entry.target as HTMLElement;
          const targets = block.hasAttribute("data-scroll-stagger") ? Array.from(block.children) : [block];
          gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            stagger: block.hasAttribute("data-scroll-stagger") ? 0.1 : 0,
            ease: "power3.out",
            overwrite: "auto",
          });
          revealObserver?.unobserve(block);
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -7%" });

      blocks.forEach((block) => revealObserver?.observe(block));
    }, page);
    return () => {
      revealObserver?.disconnect();
      context.revert();
    };
  }, [language]);

  useEffect(() => {
    if (!galleryExpanded || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(".gallery-item.is-revealed", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.08, ease: "power3.out", overwrite: "auto" });
  }, [galleryExpanded]);

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
    const message = language === "es"
      ? `Hola V Detail Center, soy ${form.get("name")}\.\nCorreo electrónico: ${form.get("email")}\nTeléfono: ${form.get("phone")}\n\nSolicitud: ${form.get("message")}`
      : `Hello V Detail Center, I am ${form.get("name")}\.\nEmail: ${form.get("email")}\nPhone: ${form.get("phone")}\n\nRequest: ${form.get("message")}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const navTargets = ["home", "about", "services", "gallery", "contact"];
  const visibleGallery = galleryExpanded ? gallery : gallery.slice(0, GALLERY_PREVIEW_COUNT);

  return (
    <main ref={page} className="site-shell">
      <section className="hero-frame" id="home">
        <header className="site-header">
          <button className="brand" aria-label="V Detail Center home" onClick={() => scrollTo("home")}>
            <img src="/images/vdetail/vdetail-logo-header.jpg" alt="V Detail Center" />
          </button>
          <nav className="desktop-nav" aria-label="Main navigation">
            {t.nav.map((item, index) => (
              <button key={item} onClick={() => scrollTo(navTargets[index])}>{item}</button>
            ))}
          </nav>
          <div className="header-actions">
            <div className="language-switch" aria-label="Language selector">
              <button className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")}>ES</button>
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
            <h1>{language === "es" ? <>El detalle que tu <span className="hero-mobile-break">vehículo merece.</span></> : t.heroTitle}</h1>
            <p className="hero-description">{t.heroText}</p>
            <div className="hero-buttons">
              <a className="button button-primary" href={BOOKING_URL} target="_blank" rel="noreferrer">{t.book} <span>↗</span></a>
              <button className="button button-ghost" onClick={() => scrollTo("services")}>{t.servicesCta} <span>↓</span></button>
            </div>
            <p className="hero-trust">{t.serviceIntro}</p>
          </div>
          <p className="hero-ghost" aria-hidden="true">VDC</p>
          <div className="hero-car-light" aria-hidden="true" />
          <div className="hero-car-ground" aria-hidden="true" />
          <img className="hero-car" src="/hero-vdetail-bmw-m4-v3.png" alt="BMW M4 azul de V Detail Center" />
          <div className="hero-sweep" aria-hidden="true" />
        </div>
      </section>

      <section className="service-reveal section" id="services">
        <div className="section-intro compact-intro" data-scroll-reveal>
          <p className="eyebrow">{t.servicesEyebrow}</p>
          <div><h2>{t.serviceTitle}</h2><p>{t.serviceText}</p></div>
        </div>
        <button className="expand-button" data-scroll-reveal aria-expanded={servicesOpen} onClick={() => setServicesOpen(!servicesOpen)}>
          <span>{t.servicesCta}</span><b>{servicesOpen ? "−" : "+"}</b>
        </button>
        <div className={servicesOpen ? "service-list is-open" : "service-list"} data-scroll-stagger>
          {services.map((service) => <article key={service.number} className="service-item">
            <span>{service.number}</span><h3>{language === "es" ? service.es : service.en}</h3><p>{language === "es" ? service.noteEs : service.noteEn}</p>
          </article>)}
        </div>
      </section>

      <section className="about-section section" id="about">
        <div className="about-image-wrap" data-scroll-reveal><img src="/images/vdetail/vdetail-porsche-rear-about.jpg" alt="Porsche visto desde atrás en V Detail Center" /></div>
        <div className="about-copy" data-scroll-reveal>
          <p className="eyebrow">{t.aboutEyebrow}</p>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
          <div className="about-note"><span>✦</span><span>{t.aboutNote}</span></div>
        </div>
      </section>

      <section className="gallery-section section" id="gallery">
        <div className="section-intro" data-scroll-reveal>
          <p className="eyebrow">{t.galleryEyebrow}</p>
          <div><h2>{t.galleryTitle}</h2><p>{t.galleryText}</p></div>
        </div>
        <div className="gallery-grid" data-scroll-stagger>
          {visibleGallery.map((item, index) => <button key={item.src} className={`gallery-item ${index >= GALLERY_PREVIEW_COUNT ? "is-revealed" : ""}`} onClick={() => setActiveImage(index)} aria-label={`${t.viewImage}: ${item.alt}`}>
            <img src={item.src} alt={item.alt} /><span>+</span>
          </button>)}
        </div>
        {gallery.length > GALLERY_PREVIEW_COUNT && <button className="button button-ghost gallery-more" type="button" aria-expanded={galleryExpanded} onClick={() => setGalleryExpanded(!galleryExpanded)}>{galleryExpanded ? t.showLess : t.showMore} <span>{galleryExpanded ? "↑" : "↓"}</span></button>}
      </section>

      <section className="comparison-section section">
        <div className="comparison-copy" data-scroll-reveal>
          <p className="eyebrow">{t.beforeEyebrow}</p>
          <h2>{t.beforeTitle}</h2>
          <p>{t.beforeText}</p>
        </div>
        <div className="comparison-viewer" data-scroll-reveal>
          <img className="comparison-image comparison-after" src="/images/vdetail/gallery-mercedes-amg-green.jpg" alt={language === "es" ? "Mercedes-AMG verde después de su puesta a punto en V Detail Center" : "Green Mercedes-AMG after its V Detail Center refresh"} />
          <img className="comparison-image comparison-before" src="/images/vdetail/vdetail-amg-green-before.jpg" alt="" style={{ clipPath: `inset(0 ${100 - comparisonPosition}% 0 0)` }} />
          <span className="comparison-label comparison-label-before">{t.beforeLabel}</span>
          <span className="comparison-label comparison-label-after">{t.afterLabel}</span>
          <div className="comparison-handle" style={{ left: `${comparisonPosition}%` }} aria-hidden="true"><span>↔</span></div>
          <input className="comparison-range" type="range" min="0" max="100" value={comparisonPosition} onChange={(event) => setComparisonPosition(Number(event.target.value))} aria-label={language === "es" ? "Comparación antes y después" : "Before and after comparison"} />
          <p className="comparison-hint">{t.beforeHint}</p>
        </div>
      </section>

      <section className="process-section section" id="process">
        <div className="section-intro compact-intro" data-scroll-reveal><p className="eyebrow">{t.processEyebrow}</p><div><h2>{t.processTitle}</h2></div></div>
        <div className="process-list" data-scroll-stagger>
          {steps.map((step) => <article key={step.number} className="process-step"><span>{step.number}</span><p>{language === "es" ? step.es : step.en}</p></article>)}
        </div>
      </section>

      <section className="location-section section">
        <div className="location-copy" data-scroll-reveal>
          <p className="eyebrow">{t.locationEyebrow}</p><h2>{t.locationTitle}</h2><p>{t.locationText}</p>
          <div className="rating"><strong>4,9</strong><span>★★★★★</span><small>{t.ratingLabel}</small></div>
          <a className="text-link" href={MAP_URL} target="_blank" rel="noreferrer">{t.mapLink} <span>↗</span></a>
        </div>
        <div className="map-wrap" data-scroll-reveal><iframe title="V Detail Center, C. de la Zanfona 4, Valladolid" src={MAP_EMBED_URL} loading="lazy" /></div>
      </section>

      <section className="contact-section section" id="contact">
        <div className="contact-heading" data-scroll-reveal>
          <p className="eyebrow">{t.contactEyebrow}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p>
          <div className="contact-channels" aria-label={t.footerContact}>
            <a className="contact-channel instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <span className="contact-channel-icon"><img src="/icons/instagram.svg" alt="" /></span>
              <span><small>{t.footerInstagram}</small><strong>@vdetailcenter</strong></span><b aria-hidden="true">↗</b>
            </a>
            <a className="contact-channel whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
              <span className="contact-channel-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" /></span>
              <span><small>{t.footerWhatsapp}</small><strong>+34 611 57 76 41</strong></span><b aria-hidden="true">↗</b>
            </a>
            <a className="contact-channel phone" href="tel:+34611577641">
              <span className="contact-channel-icon" aria-hidden="true">☎</span>
              <span><small>{t.footerPhone}</small><strong>+34 611 57 76 41</strong></span><b aria-hidden="true">↗</b>
            </a>
          </div>
        </div>
        <form onSubmit={sendToWhatsApp} className="contact-form" data-scroll-reveal>
          <label><span>{t.name}</span><input required name="name" autoComplete="name" /></label>
          <label><span>{t.email}</span><input required name="email" type="email" autoComplete="email" /></label>
          <label><span>{t.phone}</span><input required name="phone" type="tel" autoComplete="tel" /></label>
          <label className="full"><span>{t.message}</span><textarea required name="message" rows={4} /></label>
          <div className="form-bottom"><p>{t.privacy}</p><button className="button button-primary" type="submit">{t.submit} <span>↗</span></button></div>
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-intro">
            <img className="footer-logo" src="/images/vdetail/vdetail-logo-wordmark.jpg" alt="V Detail Center" />
            <p>{t.footerIntro}</p>
            <a className="button button-primary footer-book" href={BOOKING_URL} target="_blank" rel="noreferrer">{t.book} <span>↗</span></a>
          </div>
          <div className="footer-column footer-nav">
            <p className="footer-title">{t.footerNavigation}</p>
            {t.nav.map((item, index) => <button key={item} onClick={() => scrollTo(navTargets[index])}>{item}</button>)}
          </div>
          <div className="footer-column footer-services">
            <p className="footer-title">{t.footerServices}</p>
            {services.map((service) => <p key={service.number}>{language === "es" ? service.es : service.en}</p>)}
          </div>
          <div className="footer-column footer-contact">
            <p className="footer-title">{t.footerContact}</p>
            <a href="tel:+34611577641">{t.footerPhone}<strong>+34 611 57 76 41</strong></a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">{t.footerWhatsapp}<strong>WhatsApp ↗</strong></a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">{t.footerInstagram}<strong>@vdetailcenter ↗</strong></a>
          </div>
          <div className="footer-column footer-visit">
            <p className="footer-title">{t.footerVisit}</p>
            <p>{t.footerArea}</p>
            <p>{t.footerAppointment}</p>
            <a href={MAP_URL} target="_blank" rel="noreferrer">{t.footerMap} ↗</a>
          </div>
        </div>
        <div className="footer-bottom"><p>{t.footerLine}</p><div><a href="#home">{t.privacyLink}</a><a href="#home">{t.cookieLink}</a></div></div>
      </footer>

      <a className="whatsapp-float" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label="Contactar V Detail Center por WhatsApp">
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
