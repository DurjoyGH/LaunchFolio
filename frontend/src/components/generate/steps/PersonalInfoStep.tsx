import Input from "@/components/ui/Input";
import type { FormData } from "@/app/generate/page";

interface Props {
  formData: FormData;
  update: (partial: Partial<FormData>) => void;
}

export default function PersonalInfoStep({ formData, update }: Props) {
  const updateSocial = (key: string, value: string) =>
    update({ social: { ...formData.social, [key]: value } });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Personal Information</h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          This is the core info that will appear on your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          placeholder="Alex Johnson"
          value={formData.name}
          onChange={(e) => update({ name: e.target.value })}
          required
        />
        <Input
          label="Professional Title *"
          placeholder="Full Stack Developer"
          value={formData.title}
          onChange={(e) => update({ title: e.target.value })}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="alex@example.com"
          value={formData.email}
          onChange={(e) => update({ email: e.target.value })}
        />
        <Input
          label="Location"
          placeholder="San Francisco, CA"
          value={formData.location}
          onChange={(e) => update({ location: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>Bio</label>
        <textarea
          rows={4}
          placeholder="Write a short bio — or leave blank and AI will generate one..."
          value={formData.bio}
          onChange={(e) => update({ bio: e.target.value })}
          className="input resize-none"
        />
        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Optional — AI generates a professional bio if left empty.</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Social Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="GitHub URL" placeholder="https://github.com/username" value={formData.social.github} onChange={(e) => updateSocial("github", e.target.value)} />
          <Input label="LinkedIn URL" placeholder="https://linkedin.com/in/username" value={formData.social.linkedin} onChange={(e) => updateSocial("linkedin", e.target.value)} />
          <Input label="Twitter / X URL" placeholder="https://twitter.com/username" value={formData.social.twitter} onChange={(e) => updateSocial("twitter", e.target.value)} />
          <Input label="Personal Website" placeholder="https://yourwebsite.com" value={formData.social.website} onChange={(e) => updateSocial("website", e.target.value)} />
        </div>
      </div>
    </div>
  );
}
