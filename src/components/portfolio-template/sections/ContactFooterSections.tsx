import { Code2, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { SectionProps } from "../types";
import { AnchorButton } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export function ContactSection({ input }: SectionProps) {
  const links = [
    input.email ? { icon: Mail, label: "Email", value: input.email, href: `mailto:${input.email}` } : null,
    input.phone ? { icon: Phone, label: "Phone", value: input.phone, href: `tel:${input.phone}` } : null,
    input.location ? { icon: MapPin, label: "Location", value: input.location } : null,
  ].filter(Boolean);

  return (
    <section id="contact" className="px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <Card>
          <CardContent className="grid gap-8 p-8 md:grid-cols-[1fr_0.9fr] md:p-10">
            <div>
              <Badge>Contact</Badge>
              <h2 className="mt-4 text-4xl font-semibold text-[var(--portfolio-text)]">Ready for the next conversation.</h2>
              <p className="mt-5 leading-7 text-[var(--portfolio-muted)]">Reach out directly and I will get back with context, availability, and next steps.</p>
              {input.email ? <AnchorButton href={`mailto:${input.email}`} className="mt-7">Start a conversation</AnchorButton> : null}
            </div>
            <div className="grid gap-3">
              {links.map((item) => {
                if (!item) return null;
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-3 rounded-md border border-[var(--portfolio-border)] p-4">
                    <Icon className="h-5 w-5 text-[var(--portfolio-primary)]" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-[var(--portfolio-muted)]">{item.label}</p>
                      <p className="text-sm text-[var(--portfolio-text)]">{item.value}</p>
                    </div>
                  </div>
                );
                return item.href ? <a key={item.label} href={item.href}>{content}</a> : <div key={item.label}>{content}</div>;
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function FooterSection({ input }: SectionProps) {
  const socials = input.social || {};
  return (
    <footer id="footer" className="border-t border-[var(--portfolio-border)] px-5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-[var(--portfolio-muted)] md:flex-row md:items-center md:justify-between">
        <p>{input.name || "Portfolio"} © {new Date().getFullYear()}</p>
        <div className="flex items-center gap-3">
          {socials.github ? <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 className="h-4 w-4" /></a> : null}
          {socials.linkedin ? <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><UserRound className="h-4 w-4" /></a> : null}
          {input.email ? <a href={`mailto:${input.email}`} aria-label="Email"><Mail className="h-4 w-4" /></a> : null}
        </div>
      </div>
    </footer>
  );
}
