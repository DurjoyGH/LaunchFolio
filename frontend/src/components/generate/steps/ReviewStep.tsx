import type { FormData } from "@/app/generate/page";
import Badge from "@/components/ui/Badge";

interface Props {
  formData: FormData;
}

export default function ReviewStep({ formData }: Props) {
  const { name, title, bio, email, skills, projects, social, designPreferences: dp } = formData;

  const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="p-5 rounded-xl border" style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-secondary)" }}>
      <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-brand-primary)" }}>{label}</p>
      {children}
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Review & Generate</h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Everything looks good? Click <strong className="text-white">Generate Portfolio</strong> to start.
        </p>
      </div>

      <Section label="Personal">
        <p className="font-semibold text-white">{name || <span className="text-red-400">Missing!</span>}</p>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{title}</p>
        {email && <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>{email}</p>}
        {bio && <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{bio}</p>}
      </Section>

      <Section label={`Skills (${skills.length})`}>
        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? skills.map((s, i) => (
            <Badge key={i} variant="info">{s.name}</Badge>
          )) : <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>No skills added</span>}
        </div>
      </Section>

      <Section label={`Projects (${projects.length})`}>
        {projects.length > 0 ? (
          <div className="space-y-2">
            {projects.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <p className="text-sm text-white font-medium">{p.title}</p>
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

      <Section label="Design">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: dp.primaryColor }} />
            <span className="text-sm text-white font-mono">{dp.primaryColor}</span>
          </div>
          <Badge variant="info">{dp.theme} theme</Badge>
          <Badge variant="info">{dp.style} style</Badge>
          <Badge variant="info">{dp.fontPreference}</Badge>
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
