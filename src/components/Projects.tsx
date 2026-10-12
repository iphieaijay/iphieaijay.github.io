import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';

/* -------------------------------------------------------------------------
 * HOW TO ADD SCREENSHOTS
 * 1. Put your images in /public/screenshots/<project-slug>/ (e.g. home.png)
 * 2. Add them to the project's `screenshots` array:
 *    { src: "/screenshots/harborwell/dashboard.png", alt: "Admin dashboard", caption: "Admin dashboard" }
 * Projects with an empty array show a placeholder instead.
 * ---------------------------------------------------------------------- */

const projects = [
  {
    slug: "harborwell",
    title: "Harborwell",
    category: "Laravel",
    description:
      "A secure Laravel website built for a non-profit, with an admin dashboard for managing all of the website's data. Access is restricted to admins through customized Breeze authentication with two-factor authentication.",
    technologies: ["Laravel 13", "Blade", "TailwindCSS", "Alpine.js", "MySQL", "Eloquent ORM", "AWS S3"],
    features: [
      "Admin-only Breeze authentication (customized)",
      "Two-factor authentication (2FA)",
      "Admin dashboard for all website content",
      "AWS S3 file storage integration",
      "Activity and error logging",
    ],
    liveUrl: "https://harborwell.care",
    githubUrl: null, // private / client project
    screenshots: [
      // { src: "/screenshots/harborwell/home.png", alt: "Harborwell home page" },
      // { src: "/screenshots/harborwell/dashboard.png", alt: "Harborwell admin dashboard" },
    ],
  },
  {
    slug: "aaa-bunny-logistics",
    title: "AAA Bunny Logistics",
    category: "Laravel",
    description:
      "A lead-generation website for a clearing, forwarding and logistics company, designed to turn visitors into quote requests and enquiries.",
    technologies: ["Laravel 13", "Blade", "TailwindCSS"],
    features: [
      "Lead generation forms",
      "Service pages for clearing, forwarding and logistics",
      "Responsive Blade + Tailwind layouts",
    ],
    liveUrl: "https://aaabunnylogistics.com",
    githubUrl: null,
    screenshots: [],
  },
  {
    slug: "god-bless-nigeria",
    title: "God Bless Nigeria",
    category: "Laravel",
    description:
      "A lead-generation website for a church, helping the congregation connect with new visitors and members online.",
    technologies: ["Laravel 13", "Blade", "TailwindCSS"],
    features: [
      "Lead generation and contact forms",
      "Responsive Blade + Tailwind layouts",
      "Church information and ministry pages",
    ],
    liveUrl: "https://godblessnigeria.org",
    githubUrl: null,
    screenshots: [],
  },
  {
    slug: "user-authentication-api",
    title: "User Authentication API",
    category: ".NET",
    description:
      "A secure .NET Core 8 REST API implementing JWT authentication with comprehensive user management features, role-based authorization, and password reset functionality.",
    technologies: [".NET Core 8", "JWT", "Swagger", "EF Core", "SQL Server"],
    features: [
      "JWT Token Authentication",
      "Role-based Authorization",
      "Password Reset System",
      "API Documentation with Swagger",
      "Email Verification",
    ],
    liveUrl: null,
    githubUrl: "#",
    screenshots: [],
  },
  {
    slug: "multi-merchant-inventory-manager",
    title: "Multi-Merchant Inventory Manager",
    category: ".NET",
    description:
      "Enterprise-grade multi-merchant Inventory Manager with POS integrations, supporting multiple payment methods and real-time transaction monitoring.",
    technologies: [".NET Core", "RabbitMQ", "Azure", "SQL Server", "Angular"],
    features: [
      "POS Integration",
      "NFC Payment Processing",
      "Real-time Monitoring",
      "Multi-Payment Gateway Support",
      "Transaction Analytics",
    ],
    liveUrl: null,
    githubUrl: "#",
    screenshots: [],
  },
  {
    slug: "ecommerce-microservices",
    title: "E-Commerce Microservices",
    category: ".NET",
    description:
      "Scalable e-commerce backend built with microservices architecture, featuring order management, inventory tracking, and payment processing services.",
    technologies: ["Microservices", ".NET Core", "Docker", "Kubernetes", "PostgreSQL"],
    features: [
      "Microservices Architecture",
      "Docker Containerization",
      "API Gateway",
      "Service Discovery",
      "Event-Driven Communication",
    ],
    liveUrl: null,
    githubUrl: "#",
    screenshots: [],
  },
];

const FILTERS = ["All", "Laravel", ".NET"];

/* ------------------------------ Screenshot UI ---------------------------- */

const Lightbox = ({ shots, index, onClose, onChange }) => {
  const shot = shots[index];
  const prev = useCallback(() => onChange((index - 1 + shots.length) % shots.length), [index, shots.length, onChange]);
  const next = useCallback(() => onChange((index + 1) % shots.length), [index, shots.length, onChange]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot viewer"
      onClick={onClose}
    >
      <button
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={22} />
      </button>

      {shots.length > 1 && (
        <>
          <button
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next screenshot"
          >
            <ChevronRight size={26} />
          </button>
        </>
      )}

      <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img src={shot.src} alt={shot.alt} className="max-h-[80vh] w-auto rounded-lg object-contain" />
        <figcaption className="mt-3 text-center text-sm text-white/80">
          {shot.caption || shot.alt} ({index + 1}/{shots.length})
        </figcaption>
      </figure>
    </div>
  );
};

const ScreenshotGallery = ({ shots, title }) => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState({});

  // Only show images that exist; broken paths are dropped silently
  const valid = shots.filter((s) => !failed[s.src]);
  if (!valid.length) return null;

  const index = Math.min(active, valid.length - 1);
  const current = valid[index];
  const markFailed = (src) => setFailed((f) => ({ ...f, [src]: true }));

  return (
    <div className="h-56 shrink-0">
      <div className="flex h-full flex-col">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative min-h-0 w-full flex-1 overflow-hidden bg-slate-100"
          aria-label={`Enlarge screenshot of ${title}`}
        >
          <img
            src={current.src}
            alt={current.alt}
            loading="lazy"
            onError={() => markFailed(current.src)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            Click to enlarge
          </span>
        </button>

        {valid.length > 1 && (
          <div className="flex shrink-0 gap-2 overflow-x-auto bg-slate-50 p-2">
            {valid.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show screenshot ${i + 1}`}
                className={`h-12 w-20 flex-shrink-0 overflow-hidden rounded border-2 transition ${
                  i === index ? 'border-purple' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={s.src} alt="" onError={() => markFailed(s.src)} className="h-full w-full object-cover object-top" />
              </button>
            ))}
          </div>
        )}
      </div>

      {open && <Lightbox shots={valid} index={index} onClose={() => setOpen(false)} onChange={setActive} />}
    </div>
  );
};

/* ------------------------------ Project card ----------------------------- */

const getDomain = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

const ProjectCard = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);
  const isLive = Boolean(project.liveUrl);
  const isClientWork = isLive && !project.githubUrl;
  const isLong = project.description.length > 150;

  return (
    <Card
      className="flex h-[720px] flex-col overflow-hidden border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Renders only when the project has screenshots */}
      <ScreenshotGallery shots={project.screenshots} title={project.title} />

      {/* Scrollable details: long content scrolls instead of stretching the card */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <CardHeader>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge className="bg-navy text-white">{project.category}</Badge>
            {isLive && (
              <Badge variant="outline" className="border-green-600/30 bg-green-50 text-green-700">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-green-600" />
                Live
              </Badge>
            )}
            {isClientWork && (
              <Badge variant="outline" className="border-gray-300 text-gray-600">
                Client project
              </Badge>
            )}
          </div>

          <CardTitle className="text-xl text-navy">{project.title}</CardTitle>

          {isLive && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-1 inline-flex w-fit items-center gap-1 text-sm text-purple hover:underline"
            >
              {getDomain(project.liveUrl)}
              <ExternalLink size={12} />
            </a>
          )}

          <div>
            <p className={`leading-relaxed text-gray-700 ${expanded ? '' : 'line-clamp-3'}`}>
              {project.description}
            </p>
            {isLong && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-1 text-sm font-medium text-purple hover:underline"
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h4 className="mb-2 font-semibold text-navy">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="border-purple/20 bg-purple/10 text-purple">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-navy">Key Features:</h4>
            <ul className="space-y-1">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start text-sm">
                  <span className="mr-2 text-purple">•</span>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </div>

      {/* Buttons pinned to the bottom of every card */}
      <div className="flex shrink-0 flex-col gap-2 border-t border-gray-100 p-4 sm:flex-row">
        {project.liveUrl && (
          <Button asChild className="flex-1 bg-purple text-white hover:bg-purple/90">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <ExternalLink size={16} />
              Visit Website
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button
            asChild
            variant="outline"
            className="flex-1 border-purple text-purple hover:bg-purple hover:text-white"
          >
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <Github size={16} />
              View on GitHub
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
};

/* --------------------------------- Section ------------------------------- */

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding bg-gradient-to-br from-slate-800/5 to-navy/5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="mb-6 text-4xl font-bold text-navy md:text-5xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="mx-auto h-1 w-24 bg-purple"></div>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-3" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <Button
              key={f}
              role="tab"
              aria-selected={filter === f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className={
                filter === f
                  ? "bg-purple text-white hover:bg-purple/90"
                  : "border-purple text-purple hover:bg-purple hover:text-white"
              }
            >
              {f}
            </Button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;