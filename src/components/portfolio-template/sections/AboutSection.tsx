import { MapPin, Mail, Phone } from "lucide-react";
import type { SectionProps } from "../types";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export function AboutSection({ input }: SectionProps) {
  const bio = input.bio || "A thoughtful professional with a practical approach to every project.";
  const facts = [
    input.location ? { icon: MapPin, label: "Location", value: input.location } : null,
    input.email ? { icon: Mail, label: "Email", value: input.email } : null,
    input.phone ? { icon: Phone, label: "Phone", value: input.phone } : null,
  ].filter(Boolean);

  return (
    <section id="about" className="px-5 py-24">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Badge>About</Badge>
          <h2 className="mt-4 text-4xl font-semibold text-[var(--portfolio-text)]">Built around useful work.</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg leading-8 text-[var(--portfolio-muted)]">{bio}</p>
            {facts.length ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {facts.map((item) => {
                  if (!item) return null;
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-md border border-[var(--portfolio-border)] p-4">
                      <Icon className="mb-3 h-4 w-4 text-[var(--portfolio-primary)]" />
                      <p className="text-xs uppercase tracking-wide text-[var(--portfolio-muted)]">{item.label}</p>
                      <p className="mt-1 truncate text-sm text-[var(--portfolio-text)]">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
