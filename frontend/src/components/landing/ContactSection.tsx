export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-brand-accent)" }}>
          Contact
        </p>
        <h2 className="text-4xl font-bold text-white mb-4">Questions? We are here to help.</h2>
        <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
          Reach out for support, partnerships, or feedback. We reply quickly.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
          <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
            Best for detailed questions and support.
          </p>
          <a href="mailto:support@launchfolio.com" className="text-sm font-medium" style={{ color: "var(--color-brand-primary)" }}>
            support@launchfolio.com
          </a>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
          <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
            Want to integrate or collaborate with LaunchFolio?
          </p>
          <a href="mailto:partners@launchfolio.com" className="text-sm font-medium" style={{ color: "var(--color-brand-primary)" }}>
            partners@launchfolio.com
          </a>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
          <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
            Share ideas or request new features.
          </p>
          <a href="mailto:community@launchfolio.com" className="text-sm font-medium" style={{ color: "var(--color-brand-primary)" }}>
            community@launchfolio.com
          </a>
        </div>
      </div>
    </section>
  );
}
