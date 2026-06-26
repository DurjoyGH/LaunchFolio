import { BriefcaseBusiness, GraduationCap, Heart, ImageIcon, Quote, Sparkles, Trophy } from "lucide-react";
import type { SectionProps } from "../types";
import { AnchorButton } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

export function SkillsSection({ input }: SectionProps) {
  const skills = input.skills || [];
  if (!skills.length) return null;
  return (
    <section id="skills" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Capabilities" title="Skills with practical range." />
        <div className="mt-10 flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <Badge key={`${skill.name}-${index}`} className="px-4 py-2 text-sm">
              {skill.name}
              {skill.level ? <span className="ml-2 text-[var(--portfolio-primary)]">{skill.level}</span> : null}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EducationSection({ input }: SectionProps) {
  const education = input.education || [];
  if (!education.length) return null;
  return (
    <section id="education" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Education" title="Academic foundation." />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {education.map((item, index) => (
            <Card key={`${item.institution}-${index}`}>
              <CardHeader>
                <GraduationCap className="h-5 w-5 text-[var(--portfolio-primary)]" />
                <CardTitle>{item.degree || item.field || "Education"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--portfolio-muted)]">{item.institution}</p>
                <p className="mt-2 text-sm text-[var(--portfolio-muted)]">{[item.startYear, item.endYear].filter(Boolean).join(" - ")}</p>
                {item.description ? <p className="mt-4 leading-7 text-[var(--portfolio-muted)]">{item.description}</p> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({ input }: SectionProps) {
  const projects = input.projects || [];
  if (!projects.length) return null;
  return (
    <section id="projects" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Portfolio" title="Selected projects." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={`${project.title}-${index}`} className="overflow-hidden">
              {project.image ? <img src={project.image} alt={project.title || "Project"} className="aspect-video w-full object-cover" /> : null}
              <CardHeader>
                <BriefcaseBusiness className="h-5 w-5 text-[var(--portfolio-primary)]" />
                <CardTitle>{project.title || "Project"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="min-h-20 leading-7 text-[var(--portfolio-muted)]">{project.description}</p>
                {project.techStack?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => <Badge key={tech}>{tech}</Badge>)}
                  </div>
                ) : null}
                <div className="mt-6 flex gap-3">
                  {project.liveUrl ? <AnchorButton href={project.liveUrl} target="_blank" rel="noreferrer" size="sm">Live</AnchorButton> : null}
                  {project.githubUrl ? <AnchorButton href={project.githubUrl} target="_blank" rel="noreferrer" variant="outline" size="sm">Code</AnchorButton> : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GallerySection({ input }: SectionProps) {
  const gallery = input.gallery || [];
  if (!gallery.length) return null;
  return (
    <section id="gallery" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Gallery" title="Visual highlights." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <Card key={`${item.url}-${index}`} className="overflow-hidden">
              {item.url ? <img src={item.url} alt={item.caption || "Gallery item"} className="aspect-[4/3] w-full object-cover" /> : <ImageIcon className="m-8 h-8 w-8" />}
              {item.caption ? <CardContent className="pt-5"><p className="text-sm text-[var(--portfolio-muted)]">{item.caption}</p></CardContent> : null}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({ input }: SectionProps) {
  const services = input.services || [];
  if (!services.length) return null;
  return (
    <section id="services" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Services" title="Ways to work together." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <Card key={`${service.title}-${index}`}>
              <CardHeader>
                <Sparkles className="h-5 w-5 text-[var(--portfolio-primary)]" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-[var(--portfolio-muted)]">{service.description}</p>
                {service.price ? <p className="mt-5 text-sm font-medium text-[var(--portfolio-text)]">{service.price}</p> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({ input }: SectionProps) {
  const testimonials = input.testimonials || [];
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Testimonials" title="What people say." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <Card key={`${item.name}-${index}`}>
              <CardContent className="pt-6">
                <Quote className="mb-5 h-5 w-5 text-[var(--portfolio-primary)]" />
                <p className="text-lg leading-8 text-[var(--portfolio-muted)]">{item.text}</p>
                <p className="mt-6 font-medium text-[var(--portfolio-text)]">{item.name}</p>
                {item.role ? <p className="text-sm text-[var(--portfolio-muted)]">{item.role}</p> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HobbiesSection({ input }: SectionProps) {
  const hobbies = input.hobbies || [];
  if (!hobbies.length) return null;
  return (
    <section id="hobbies" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Outside Work" title="Interests and energy." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hobbies.map((hobby, index) => (
            <Card key={`${hobby.name}-${index}`}>
              <CardContent className="pt-6">
                <div className="mb-4 text-3xl">{hobby.emoji || <Heart className="h-7 w-7" />}</div>
                <p className="font-medium text-[var(--portfolio-text)]">{hobby.name}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--portfolio-muted)]">{hobby.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AchievementsSection({ input }: SectionProps) {
  const achievements = input.achievements || [];
  if (!achievements.length) return null;
  return (
    <section id="achievements" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Achievements" title="Milestones worth noting." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {achievements.map((achievement, index) => (
            <Card key={`${achievement.title}-${index}`}>
              <CardContent className="pt-6">
                <Trophy className="mb-5 h-6 w-6 text-[var(--portfolio-primary)]" />
                <p className="text-lg font-medium text-[var(--portfolio-text)]">{achievement.title}</p>
                {achievement.year ? <p className="mt-1 text-sm text-[var(--portfolio-primary)]">{achievement.year}</p> : null}
                <p className="mt-4 leading-7 text-[var(--portfolio-muted)]">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-4 text-4xl font-semibold text-[var(--portfolio-text)]">{title}</h2>
    </div>
  );
}
