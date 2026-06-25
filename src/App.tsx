import { useState, useRef, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Palette,
  Megaphone,
  Code2,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/* =========================================================
   Digital Fox — Marketing Agency Portfolio
   Stack: React + TypeScript + Tailwind CSS + Framer Motion + lucide-react
   Font: Kanit (display + body), JetBrains Mono (labels/eyebrows)
   ========================================================= */

document.title = "Digital Fox — Marketing Agency";

/* ---------------------------------------------------------
   Data
   --------------------------------------------------------- */

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

interface Service {
  icon: typeof Palette;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    icon: Palette,
    title: "Branding",
    description:
      "Logos, color systems, and visual identity that make a new business look established from day one.",
  },
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    description:
      "Content and community growth built for a multi-platform Myanmar — Telegram, Viber, TikTok, and YouTube together.",
  },
  {
    icon: Code2,
    title: "Website Development",
    description:
      "Fast, mobile-first websites that tell your story clearly and keep working even when a single platform goes down.",
  },
  {
    icon: TrendingUp,
    title: "Multi-Channel Strategy",
    description:
      "A growth system spread across search, owned channels, and KOL partnerships — built so one platform block cannot stop your pipeline.",
  },
];

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  { step: "01", title: "Discover", description: "We learn your business, your customers, and where they actually spend time online." },
  { step: "02", title: "Strategize", description: "A channel mix and content plan built around your goals and budget — not a generic template." },
  { step: "03", title: "Create", description: "Branding, content, and campaigns produced in-house by our design and content team." },
  { step: "04", title: "Launch & Grow", description: "We run, measure, and optimize — with a monthly report so you always know what is working." },
];

interface PortfolioItem {
  client: string;
  category: string;
  result: string;
  link?: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { client: "BAIC Myanmar", category: "Automotive Digital Campaign", result: "Product launch content for ARCFOX EV line" },
  { client: "Htike Kyi Restaurant", category: "F&B Promotion", result: "Seasonal offer campaigns & social content" },
  { client: "Great Generator Power", category: "Product Marketing", result: "Catalogue-style ad creative across product range" },
  { client: "Shwe Oat Sone (Amber)", category: "Beauty Brand Campaign", result: "Heritage skincare storytelling content" },
  { client: "Beauty Care Signature Spa", category: "Branding + Social", result: "Brand identity and ongoing social presence" },
  { client: "Dental Palace", category: "Healthcare Branding", result: "Local clinic branding and patient-facing content" },
  { client: "Designer Ko Linn", category: "Website Development", result: "Fashion academy website", link: "https://www.designerkolinn.com" },
  { client: "ReStyle", category: "Website Development", result: "Fashion e-commerce storefront", link: "https://www.restyle-official.com" },
  { client: "Shartra", category: "Website Development", result: "Bridal & ready-to-wear showcase site", link: "https://www.shartra.com" },
];

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Foundation",
    price: "Contact us",
    description: "For SMEs who need a real digital home before anything else.",
    features: [
      "Website / landing page with lead form",
      "Google Business Profile + local SEO",
      "Viber Public Chat setup",
    ],
  },
  {
    name: "Growth",
    price: "Contact us",
    description: "For businesses ready to run paid acquisition across channels.",
    features: [
      "Everything in Foundation",
      "Google Search Ads management",
      "Telegram channel + community management",
      "TikTok content for awareness",
    ],
    highlighted: true,
  },
  {
    name: "Full Funnel",
    price: "Contact us",
    description: "A complete multi-channel system with reporting.",
    features: [
      "Everything in Growth",
      "YouTube content + KOL collaboration",
      "Email / SMS retargeting setup",
      "Monthly performance report",
    ],
  },
];

interface TeamMember {
  role: string;
  description: string;
}

const TEAM: TeamMember[] = [
  { role: "Content Creator", description: "Writes the words and plans the posts that sound like your brand, not a template." },
  { role: "Video Editor", description: "Cuts the short-form video that actually gets watched to the end." },
  { role: "Graphic Designer", description: "Builds the visual system — logos, ad creative, and everything in between." },
  { role: "Business Manager", description: "Keeps strategy, budget, and reporting honest and on track." },
];

/* ---------------------------------------------------------
   Small shared components
   --------------------------------------------------------- */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
      {children}
    </span>
  );
}

function NeonButton({
  children,
  href,
  variant = "solid",
}: {
  children: ReactNode;
  href: string;
  variant?: "solid" | "ghost";
}) {
  if (variant === "ghost") {
    return (
      <a
        href={href}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-white/40"
      >
        {children}
      </a>
    );
  }
  return (
    <div className="neon-frame neon-frame--glow">
      <a
        href={href}
        className="flex items-center gap-2 rounded-full bg-obsidian px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
      >
        {children}
      </a>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl text-center"
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-ink-muted">{description}</p>}
    </motion.div>
  );
}

/* ---------------------------------------------------------
   Navbar
   --------------------------------------------------------- */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-obsidian/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-mono text-lg font-bold tracking-tight text-ink">
            DIGITAL <span className="text-neon-magenta">FOX</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <NeonButton href="#contact">
            Get a Quote <ArrowRight size={16} />
          </NeonButton>
        </div>

        <button
          aria-label="Toggle menu"
          className="text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-ink-muted"
                >
                  {link.label}
                </a>
              ))}
              <NeonButton href="#contact">
                Get a Quote <ArrowRight size={16} />
              </NeonButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------------------------------------------------
   Hero
   --------------------------------------------------------- */

function Hero() {
  const mascotRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // tilt range — keep it subtle so it reads as "alert", not "dizzy"
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);
  const eyeShiftX = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);
  const eyeShiftY = useTransform(mouseY, [-0.5, 0.5], [-4, 4]);

  function handleMascotMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = mascotRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMascotMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24">
      {/* ambient glow, echoes the neon logo */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            <span>Delivering impact</span>
            <span className="h-1 w-1 rounded-full bg-neon-cyan" />
            <span>Since 2020</span>
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.05] text-ink sm:text-6xl">
            Hi! We are <span className="text-violet">The Foxes</span>
          </h1>

          <p className="mt-6 text-lg text-ink-muted">
            Turning digital noise into meaningful brand growth — across every
            channel your customers actually use, not just the one that might
            get blocked tomorrow.
          </p>

          <p className="mt-2 font-mono text-sm text-neon-cyan">
            We care more than just results.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <NeonButton href="#portfolio">
              See Our Work <ArrowRight size={16} />
            </NeonButton>
            <NeonButton href="#contact" variant="ghost">
              Let&apos;s Talk
            </NeonButton>
          </div>
        </motion.div>

        <motion.div
          ref={mascotRef}
          onMouseMove={handleMascotMouseMove}
          onMouseLeave={handleMascotMouseLeave}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto aspect-square w-full max-w-md"
          style={{ perspective: 800 }}
        >
          <div className="neon-frame neon-frame--square neon-frame--glow h-full w-full">
            <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] bg-surface">
              <motion.img
                src="https://res.cloudinary.com/dgz0amdvk/image/upload/v1782239342/Fox_Mascot_Half_Body_emmu7p.svg"
                alt="Digital Fox mascot"
                className="h-4/5 w-4/5 object-contain"
                style={{
                  rotateX,
                  rotateY,
                  x: eyeShiftX,
                  y: eyeShiftY,
                  transformStyle: "preserve-3d",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Services
   --------------------------------------------------------- */

function Services() {
  return (
    <section id="services" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What we do"
          title="Services built for how Myanmar actually goes online"
          description="No single-platform bets. Every service plugs into a wider system, so a block or an algorithm change never stops your growth."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-white/5 bg-elevated p-6 transition-colors hover:border-white/15"
              >
                <div className="mb-4 inline-flex rounded-xl bg-obsidian p-3">
                  <Icon size={22} className="text-neon-cyan" />
                </div>
                <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Process
   --------------------------------------------------------- */

function Process() {
  return (
    <section id="process" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How we work"
          title="Four steps, every project"
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative"
            >
              <span className="font-mono text-4xl font-bold text-white/10">
                {step.step}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Portfolio
   --------------------------------------------------------- */

function Portfolio() {
  return (
    <section id="portfolio" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Clients we have helped grow"
          description="A mix of branding, social campaigns, and full website builds across food, beauty, automotive, and fashion."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <motion.a
              key={item.client}
              href={item.link ?? "#contact"}
              target={item.link ? "_blank" : undefined}
              rel={item.link ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="group block overflow-hidden rounded-2xl border border-white/5 bg-elevated transition-colors hover:border-white/20"
            >
              {/* Swap with an actual project screenshot */}
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-violet/10 via-neon-cyan/5 to-neon-magenta/10 font-mono text-xs text-ink-muted">
                project image
              </div>
              <div className="p-5">
                <p className="font-mono text-xs uppercase tracking-wide text-neon-cyan">
                  {item.category}
                </p>
                <h3 className="mt-2 flex items-center gap-1.5 text-lg font-semibold text-ink">
                  {item.client}
                  {item.link && (
                    <ArrowUpRight
                      size={16}
                      className="text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  )}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{item.result}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Pricing
   --------------------------------------------------------- */

function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Packages"
          title="Pick a starting point, grow into the rest"
          description="Every package is a foundation for the next one — nothing gets thrown away as you scale."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={
                tier.highlighted
                  ? "neon-frame neon-frame--square neon-frame--glow"
                  : ""
              }
            >
              <div
                className={`flex h-full flex-col rounded-[1.5rem] p-8 ${
                  tier.highlighted
                    ? "bg-obsidian"
                    : "border border-white/5 bg-elevated"
                }`}
              >
                <h3 className="text-xl font-semibold text-ink">{tier.name}</h3>
                <p className="mt-2 text-sm text-ink-muted">{tier.description}</p>
                <p className="mt-6 font-mono text-2xl font-bold text-ink">
                  {tier.price}
                </p>

                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-ink-muted">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-neon-cyan" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 py-3 text-sm font-medium text-ink transition-colors hover:border-white/40"
                >
                  Get this package <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Team / Mascots
   --------------------------------------------------------- */

function Team() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="The pack" title="Meet the foxes behind the work" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-white/5 bg-elevated p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-obsidian">
                <Sparkles size={22} className="text-fox-orange" />
              </div>
              <h3 className="font-semibold text-ink">{member.role}</h3>
              <p className="mt-2 text-sm text-ink-muted">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Contact
   --------------------------------------------------------- */

function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow>Let&apos;s grow something</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
            Tell us about your business
          </h2>
          <p className="mt-4 text-ink-muted">
            Send a message and we will reply with a free audit of your
            current digital presence — no commitment required.
          </p>

          <div className="mt-10 space-y-4">
            <a href="tel:09796960249" className="flex items-center gap-3 text-ink-muted hover:text-ink">
              <Phone size={18} className="text-neon-cyan" /> 09 796-960-249
            </a>
            <a href="mailto:digitalfox1508@gmail.com" className="flex items-center gap-3 text-ink-muted hover:text-ink">
              <Mail size={18} className="text-neon-cyan" /> digitalfox1508@gmail.com
            </a>
            <div className="flex items-center gap-3 text-ink-muted">
              <MapPin size={18} className="text-neon-cyan" /> Myanmar
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-white/5 bg-elevated p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-xl border border-white/10 bg-obsidian px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-neon-cyan focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border border-white/10 bg-obsidian px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-neon-cyan focus:outline-none"
            />
            <input
              type="text"
              placeholder="Business name"
              className="w-full rounded-xl border border-white/10 bg-obsidian px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-neon-cyan focus:outline-none"
            />
            <textarea
              placeholder="What do you need help with?"
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-obsidian px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-neon-cyan focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-neon-gradient py-3 text-sm font-semibold text-obsidian transition-transform hover:scale-[1.01]"
          >
            Send message <Send size={16} />
          </button>
        </motion.form>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Footer
   --------------------------------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <span className="font-mono text-sm text-ink-muted">
          DIGITAL <span className="text-neon-magenta">FOX</span> — Creative Agency
        </span>
        <span className="text-sm text-ink-muted">
          © {new Date().getFullYear()} Digital Fox. Built in Myanmar.
        </span>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------
   App
   --------------------------------------------------------- */

export default function App() {
  return (
    <div className="min-h-screen bg-obsidian font-sans text-ink">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Pricing />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
