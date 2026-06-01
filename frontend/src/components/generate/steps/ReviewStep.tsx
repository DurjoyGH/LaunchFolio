import type { FormData } from "@/app/generate/page";
import Badge from "@/components/ui/Badge";

interface Props {
  formData: FormData;
}

export default function ReviewStep({ formData }: Props) {
  const { 
    userType, name, title, bio, email, phone, 
    skills, education, projects, services, testimonials, gallery, hobbies, achievements,
    social, designPreferences: dp, profileImage, resumeUrl, customDomain 
  } = formData;

  const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="p-5 rounded-xl border" style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-secondary)" }}>
      <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-brand-primary)" }}>{label}</p>
      {children}
    </div>
  );

  const SECTION_LABELS: Record<string, string> = {
    gallery: "Gallery",
    hobbies: "Hobbies",
    services: "Services",
    testimonials: "Testimonials",
    achievements: "Achievements",
    skills: "Skills",
    projects: "Projects",
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Review & Generate</h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Everything looks good? Click <strong className="text-white">Generate Portfolio</strong> to start.
        </p>
      </div>

      <Section label="Personal">
        <div className="flex items-center gap-3 mb-2">
          {profileImage && <img src={profileImage} alt="Profile" className="w-12 h-12 rounded-full object-cover" />}
          <div>
            <p className="font-semibold text-white">{name || <span className="text-red-400">Missing!</span>}</p>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{title}</p>
          </div>
        </div>
        {email && <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>📧 {email}</p>}
        {phone && <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>📞 {phone}</p>}
        {resumeUrl && <p className="text-sm mt-1 text-green-400">📄 Resume uploaded</p>}
        {bio && <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{bio}</p>}
      </Section>

      {userType === "it" || (formData.selectedSections.includes("skills") && skills.length > 0) ? (
        <Section label={`Skills (${skills.length})`}>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? skills.map((s, i) => (
              <Badge key={i} variant="info">{s.name}</Badge>
            )) : <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>No skills added</span>}
          </div>
        </Section>
      ) : null}

      {education.length > 0 && (
        <Section label={`Education (${education.length})`}>
          <div className="space-y-2">
            {education.map((e, i) => (
              <div key={i} className="flex items-center justify-between">
                <p className="text-sm text-white font-medium">{e.degree}{e.field ? ` in ${e.field}` : ""}</p>
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{e.institution}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {userType === "it" || (formData.selectedSections.includes("projects") && projects.length > 0) ? (
        <Section label={`Projects (${projects.length})`}>
          {projects.length > 0 ? (
            <div className="space-y-2">
              {projects.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {p.image && <img src={p.image} alt={p.title} className="w-8 h-8 rounded object-cover" />}
                    <p className="text-sm text-white font-medium">{p.title}</p>
                  </div>
                  <div className="flex gap-1">
                    {p.techStack.slice(0,2).map((t, j) => <Badge key={j} variant="default">{t}</Badge>)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>No projects added</span>
          )}
        </Section>
      ) : null}

      {userType === "nonit" && formData.selectedSections.length > 0 && (
        <Section label="Optional Sections">
          <div className="flex flex-wrap gap-2">
            {formData.selectedSections.length > 0 ? formData.selectedSections.map((s, i) => (
              <Badge key={i} variant="default">{SECTION_LABELS[s] || s}</Badge>
            )) : <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>None</span>}
          </div>
        </Section>
      )}

      <Section label="Design">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: dp.primaryColor || '#000' }} />
            <span className="text-sm text-white font-mono">{dp.primaryColor || dp.palette || 'auto'}</span>
          </div>
          <Badge variant="info">{dp.theme} theme</Badge>
          {dp.style && <Badge variant="info">{dp.style} style</Badge>}
          {dp.fontPreference && <Badge variant="info">{dp.fontPreference}</Badge>}
          {customDomain && <Badge variant="success">{customDomain}.vercel.app</Badge>}
        </div>
      </Section>

      <div className="p-4 rounded-xl border" style={{ borderColor: "rgba(99,102,241,0.25)", backgroundColor: "rgba(99,102,241,0.06)" }}>
        <p className="text-sm" style={{ color: "var(--color-brand-primary)" }}>
          ✦ <strong>What happens next:</strong> AI will plan your portfolio blueprint, our builder will assemble the components, and your site will be deployed to Vercel automatically. This takes 2–5 minutes.
        </p>
      </div>
    </div>
  );
}
