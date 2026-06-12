/**
 * Gallery section templates.
 * 5 variants: GalleryMasonry, GalleryGrid, GalleryShowcase, GalleryCarousel, GalleryPolaroid
 */
const getGalleryTemplate = ({ blueprint, userInput, content }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "gallery");
  const variant = sectionDef?.variant || "GalleryGrid";
  const gallery = userInput.gallery || [];
  const heading = content?.galleryHeading || "Gallery";
  const primary = blueprint.primaryColor || "#6366f1";

  if (gallery.length === 0) {
    return `\nexport default function Gallery() { return null; }`;
  }

  const items = gallery.map((g) => ({
    url: g.url || "",
    caption: (g.caption || "").replace(/'/g, "\\\\'"),
  }));

  // GalleryGrid
  if (variant === "GalleryGrid") {
    const gridItems = items.map((g, i) => `
    <div key={${i}} className="group relative overflow-hidden rounded-2xl border" style={{borderColor:"var(--color-border)"}}>
      <img src="${g.url}" alt="${g.caption || "Gallery"}" className="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-105" />
      ${g.caption ? `
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
        <p className="text-white font-medium text-lg">${g.caption}</p>
      </div>` : ""}
    </div>`).join("\n");

    return `
export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{color:"${primary}"}}>Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold" style={{color:"var(--color-heading)"}}>${heading}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          ${gridItems}
        </div>
      </div>
    </section>
  );
}`;
  }

  // GalleryShowcase
  if (variant === "GalleryShowcase") {
    const showcaseItems = items.map((g, i) => `
    <div key={${i}} className="group rounded-3xl overflow-hidden border mb-12 last:mb-0" style={{borderColor:"var(--color-border)", background:"var(--color-card-bg)"}}>
      <div className="overflow-hidden">
        <img src="${g.url}" alt="${g.caption || "Gallery"}" className="w-full h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      ${g.caption ? `<div className="p-8 text-center"><p className="text-xl font-medium" style={{color:"var(--color-heading)"}}>${g.caption}</p></div>` : ""}
    </div>`).join("\n");

    return `
export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6" style={{color:"var(--color-heading)"}}>${heading}</h2>
          <div className="w-24 h-2 mx-auto" style={{background:"${primary}"}} />
        </div>
        <div>${showcaseItems}</div>
      </div>
    </section>
  );
}`;
  }

  // GalleryCarousel (CSS scroll snap)
  if (variant === "GalleryCarousel") {
    const carouselItems = items.map((g, i) => `
    <div key={${i}} className="snap-center shrink-0 w-[85vw] md:w-[60vw] rounded-3xl overflow-hidden relative border" style={{borderColor:"var(--color-border)"}}>
      <img src="${g.url}" alt="${g.caption || "Gallery"}" className="w-full h-[60vh] object-cover" />
      ${g.caption ? `
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <p className="text-white text-2xl font-bold">${g.caption}</p>
      </div>` : ""}
    </div>`).join("\n");

    return `
export default function Gallery() {
  return (
    <section id="gallery" className="py-24">
      <div className="px-6 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold max-w-7xl mx-auto" style={{color:"var(--color-heading)"}}>${heading}</h2>
      </div>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 px-6 pb-8 hide-scrollbar">
        ${carouselItems}
      </div>
    </section>
  );
}`;
  }

  // GalleryPolaroid
  if (variant === "GalleryPolaroid") {
    const polaroidItems = items.map((g, i) => {
      const rotate = (i % 3 === 0) ? "-rotate-2" : (i % 2 === 0) ? "rotate-3" : "-rotate-1";
      return `
    <div key={${i}} className="p-4 rounded border shadow-xl bg-white ${rotate} transition-transform hover:scale-105 hover:z-10 hover:rotate-0">
      <img src="${g.url}" alt="${g.caption || "Gallery"}" className="w-full aspect-[4/5] object-cover mb-4" />
      ${g.caption ? `<p className="text-center font-mono text-gray-800 text-sm py-2">${g.caption}</p>` : ""}
    </div>`;
    }).join("\n");

    return `
export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold" style={{color:"var(--color-heading)"}}>${heading}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          ${polaroidItems}
        </div>
      </div>
    </section>
  );
}`;
  }

  // GalleryMasonry — default
  const masonryItems = items.map((g, i) => `
    <div key={${i}} className="break-inside-avoid mb-6 rounded-2xl overflow-hidden border group relative shadow-lg" style={{borderColor:"var(--color-border)"}}>
      <img src="${g.url}" alt="${g.caption || "Gallery"}" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
      ${g.caption ? `
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white text-lg font-medium">${g.caption}</p>
      </div>` : ""}
    </div>`).join("\n");

  return `
export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{color:"var(--color-heading)"}}>${heading}</h2>
          <div className="w-24 h-1 mx-auto" style={{background:"${primary}"}} />
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          ${masonryItems}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getGalleryTemplate };
