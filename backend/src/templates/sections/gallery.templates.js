/**
 * Gallery section templates.
 * 3 variants: GalleryMasonry, GalleryGrid, GalleryShowcase
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
    caption: (g.caption || "").replace(/'/g, "\\'"),
  }));

  // GalleryGrid
  if (variant === "GalleryGrid") {
    const gridItems = items.map((g, i) => `
    <div key={${i}} className="group relative overflow-hidden rounded-2xl border border-white/10">
      <img src="${g.url}" alt="${g.caption || "Gallery"}" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
      ${g.caption ? `
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
        <p className="text-white font-medium text-center text-sm">${g.caption}</p>
      </div>` : ""}
    </div>`).join("\n");

    return `
export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{color:"${primary}"}}>Portfolio</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
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
    <div key={${i}} className="group rounded-2xl overflow-hidden border border-white/10">
      <div className="overflow-hidden">
        <img src="${g.url}" alt="${g.caption || "Gallery"}" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      ${g.caption ? `<div className="p-4"><p className="text-sm text-gray-400">${g.caption}</p></div>` : ""}
    </div>`).join("\n");

    return `
export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">${heading}</h2>
          <div className="w-20 h-1" style={{background:"${primary}"}} />
        </div>
        <div className="grid md:grid-cols-2 gap-8">${showcaseItems}</div>
      </div>
    </section>
  );
}`;
  }

  // GalleryMasonry — default
  const masonryItems = items.map((g, i) => `
    <div key={${i}} className="break-inside-avoid mb-6 rounded-2xl overflow-hidden border border-white/10 group relative">
      <img src="${g.url}" alt="${g.caption || "Gallery"}" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
      ${g.caption ? `
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white text-sm">${g.caption}</p>
      </div>` : ""}
    </div>`).join("\n");

  return `
export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{color:"${primary}"}}>Visual</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
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
