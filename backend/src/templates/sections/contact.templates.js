/**
 * Contact section templates.
 * 5 variants: ContactModern, ContactSplit, ContactGlass, ContactMinimal, ContactCentered
 */
const { buildSocialLinks } = require("../../utils/social-icons");

const getContactTemplate = ({ blueprint, userInput, content }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "contact");
  const variant = sectionDef?.variant || "ContactModern";
  const primary = blueprint.primaryColor || "#6366f1";
  
  const heading = content.contactHeading || "Get In Touch";
  const text = content.contactText || "Have a question or want to work together? Send me a message.";
  const email = userInput.email || "";
  const location = userInput.location || "";
  const phone = userInput.phone || "";
  const social = userInput.social || {};

  // We add a dummy form submit handler in client components so the form doesn't just refresh the page.
  const formComponent = `
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Form submission is a mockup on generated sites.'); }}>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{color:"var(--color-heading)"}}>Name</label>
          <input type="text" required className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all" style={{borderColor:"var(--color-border)", color:"var(--color-body)"}} placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{color:"var(--color-heading)"}}>Email</label>
          <input type="email" required className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all" style={{borderColor:"var(--color-border)", color:"var(--color-body)"}} placeholder="john@example.com" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" style={{color:"var(--color-heading)"}}>Message</label>
        <textarea required rows={5} className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all resize-y" style={{borderColor:"var(--color-border)", color:"var(--color-body)"}} placeholder="Your message..."></textarea>
      </div>
      <button type="submit" className="w-full py-4 rounded-xl font-bold btn-primary transition-transform hover:scale-[1.02]">
        Send Message
      </button>
    </form>
  `;

  // ContactSplit
  if (variant === "ContactSplit") {
    return `
"use client";
export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-5xl font-black mb-8" style={{color:"var(--color-heading)"}}>${heading}</h2>
          <p className="text-xl mb-12 leading-relaxed" style={{color:"var(--color-body)"}}>${text}</p>
          <div className="space-y-8">
            ${email ? `<div>
              <p className="text-sm font-bold uppercase tracking-wider mb-2" style={{color:"var(--color-text-muted)"}}>Email</p>
              <a href="mailto:${email}" className="text-2xl font-medium hover:underline" style={{color:"var(--color-heading)"}}>${email}</a>
            </div>` : ""}
            ${phone ? `<div>
              <p className="text-sm font-bold uppercase tracking-wider mb-2" style={{color:"var(--color-text-muted)"}}>Phone</p>
              <p className="text-2xl font-medium" style={{color:"var(--color-heading)"}}>${phone}</p>
            </div>` : ""}
            ${location ? `<div>
              <p className="text-sm font-bold uppercase tracking-wider mb-2" style={{color:"var(--color-text-muted)"}}>Location</p>
              <p className="text-2xl font-medium" style={{color:"var(--color-heading)"}}>${location}</p>
            </div>` : ""}
          </div>
        </div>
        <div className="p-10 rounded-3xl border shadow-xl" style={{borderColor:"var(--color-border)", background:"var(--color-card-bg)"}}>
          ${formComponent}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ContactGlass
  if (variant === "ContactGlass") {
    return `
"use client";
export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{background:"radial-gradient(circle at 50% 50%, ${primary}, transparent 70%)"}} />
      <div className="max-w-4xl mx-auto relative z-10 p-12 md:p-16 rounded-[3rem] border backdrop-blur-xl shadow-2xl" style={{borderColor:"var(--color-border)", background:"var(--color-card-bg)"}}>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color:"var(--color-heading)"}}>${heading}</h2>
          <p className="text-lg" style={{color:"var(--color-body)"}}>${text}</p>
        </div>
        ${formComponent}
      </div>
    </section>
  );
}`;
  }

  // ContactMinimal
  if (variant === "ContactMinimal") {
    return `
"use client";
export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 border-t" style={{borderColor:"var(--color-border)"}}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-mono mb-8 uppercase tracking-widest" style={{ color: "${primary}" }}>[ Contact ]</h2>
        <p className="text-2xl md:text-3xl leading-relaxed font-medium mb-16" style={{color:"var(--color-heading)"}}>
          ${text}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center text-lg">
          ${email ? `<a href="mailto:${email}" className="hover:underline" style={{color:"var(--color-heading)"}}>${email}</a>` : ""}
          ${phone ? `<span className="hidden sm:inline" style={{color:"var(--color-border)"}}>|</span><span style={{color:"var(--color-heading)"}}>${phone}</span>` : ""}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ContactCentered
  if (variant === "ContactCentered") {
    return `
"use client";
export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-opacity-5" style={{backgroundColor:"${primary}10"}}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6" style={{color:"var(--color-heading)"}}>${heading}</h2>
        <p className="text-xl mb-16 max-w-2xl mx-auto" style={{color:"var(--color-body)"}}>${text}</p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          ${email ? `<div className="p-8 rounded-2xl border bg-white/5" style={{borderColor:"var(--color-border)"}}><p className="font-bold mb-2" style={{color:"var(--color-heading)"}}>Email</p><p className="text-sm truncate" style={{color:"var(--color-text-muted)"}}>${email}</p></div>` : "<div/>"}
          ${phone ? `<div className="p-8 rounded-2xl border bg-white/5" style={{borderColor:"var(--color-border)"}}><p className="font-bold mb-2" style={{color:"var(--color-heading)"}}>Phone</p><p className="text-sm truncate" style={{color:"var(--color-text-muted)"}}>${phone}</p></div>` : "<div/>"}
          ${location ? `<div className="p-8 rounded-2xl border bg-white/5" style={{borderColor:"var(--color-border)"}}><p className="font-bold mb-2" style={{color:"var(--color-heading)"}}>Location</p><p className="text-sm truncate" style={{color:"var(--color-text-muted)"}}>${location}</p></div>` : "<div/>"}
        </div>

        <div className="max-w-2xl mx-auto text-left">
          ${formComponent}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ContactModern — default
  return `
"use client";
export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Contact</span>
            <h2 className="text-4xl font-bold mb-6" style={{color:"var(--color-heading)"}}>${heading}</h2>
            <p className="text-lg leading-relaxed mb-10" style={{color:"var(--color-body)"}}>${text}</p>
            <div className="flex flex-col gap-6">
              ${email ? `<div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full flex items-center justify-center border" style={{borderColor:"var(--color-border)", background:"var(--color-card-bg)", color:"${primary}"}}>✉</div><div><p className="text-sm font-medium" style={{color:"var(--color-text-muted)"}}>Email</p><a href="mailto:${email}" className="font-bold hover:underline" style={{color:"var(--color-heading)"}}>${email}</a></div></div>` : ""}
              ${location ? `<div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full flex items-center justify-center border" style={{borderColor:"var(--color-border)", background:"var(--color-card-bg)", color:"${primary}"}}>📍</div><div><p className="text-sm font-medium" style={{color:"var(--color-text-muted)"}}>Location</p><p className="font-bold" style={{color:"var(--color-heading)"}}>${location}</p></div></div>` : ""}
            </div>
          </div>
          <div className="md:col-span-3 p-8 md:p-10 rounded-3xl border shadow-lg" style={{borderColor:"var(--color-border)", background:"var(--color-card-bg)"}}>
            ${formComponent}
          </div>
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getContactTemplate };
