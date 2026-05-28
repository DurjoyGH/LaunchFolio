const getFooterTemplate = ({ blueprint, userInput }) => {
  const primary = blueprint.primaryColor;
  const name = userInput.name;
  const social = userInput.social || {};
  const year = new Date().getFullYear();

  return `export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © ${year} <span style={{ color: "${primary}" }}>${name}</span>. Built with LaunchFolio.
        </p>
        <div className="flex gap-6">
          ${social.github ? `<a href="${social.github}" target="_blank" className="text-gray-500 hover:text-white text-sm transition-colors">GitHub</a>` : ""}
          ${social.linkedin ? `<a href="${social.linkedin}" target="_blank" className="text-gray-500 hover:text-white text-sm transition-colors">LinkedIn</a>` : ""}
          ${social.twitter ? `<a href="${social.twitter}" target="_blank" className="text-gray-500 hover:text-white text-sm transition-colors">Twitter</a>` : ""}
          ${social.website ? `<a href="${social.website}" target="_blank" className="text-gray-500 hover:text-white text-sm transition-colors">Website</a>` : ""}
        </div>
      </div>
    </footer>
  );
}`;
};

module.exports = { getFooterTemplate };
