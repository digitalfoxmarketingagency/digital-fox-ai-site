import { useState, useRef, createContext, useContext, type ReactNode } from "react";
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
   Bilingual: Myanmar (default) / English toggle
   ========================================================= */

document.title = "Digital Fox — Marketing Agency";

/* ---------------------------------------------------------
   Language context
   --------------------------------------------------------- */

type Lang = "my" | "en";
interface L {
  my: string;
  en: string;
}

const LanguageContext = createContext<{
  lang: Lang;
  toggle: () => void;
}>({ lang: "my", toggle: () => {} });

function useLang() {
  return useContext(LanguageContext);
}

function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("my");
  const toggle = () => setLang((prev) => (prev === "my" ? "en" : "my"));
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

/* ---------------------------------------------------------
   Data (bilingual)
   --------------------------------------------------------- */

const NAV_LINKS: { label: L; href: string }[] = [
  { label: { my: "ဝန်ဆောင်မှုများ", en: "Services" }, href: "#services" },
  { label: { my: "လုပ်ငန်းစဉ်", en: "Process" }, href: "#process" },
  { label: { my: "လုပ်ငန်းများ", en: "Portfolio" }, href: "#portfolio" },
  { label: { my: "စျေးနှုန်း", en: "Pricing" }, href: "#pricing" },
  { label: { my: "ဆက်သွယ်ရန်", en: "Contact" }, href: "#contact" },
];

interface Service {
  icon: typeof Palette;
  title: L;
  description: L;
}

const SERVICES: Service[] = [
  {
    icon: Palette,
    title: { my: "Branding", en: "Branding" },
    description: {
      my: "Logo၊ Color System နှင့် Visual Identity များဖြင့် လုပ်ငန်းအသစ်ကို ပထမနေ့ကစပြီး Established ဖြစ်အောင် ဖန်တီးပေးသည်။",
      en: "Logos, color systems, and visual identity that make a new business look established from day one.",
    },
  },
  {
    icon: Megaphone,
    title: { my: "Social Media Marketing", en: "Social Media Marketing" },
    description: {
      my: "Telegram, Viber, TikTok, YouTube အားလုံး ပေါင်းစပ်ထားသော Content နှင့် Community Growth — Multi-platform မြန်မာအတွက် အထူးတည်ဆောက်ထားသည်။",
      en: "Content and community growth built for a multi-platform Myanmar — Telegram, Viber, TikTok, and YouTube together.",
    },
  },
  {
    icon: Code2,
    title: { my: "Website Development", en: "Website Development" },
    description: {
      my: "မြန်ဆန်ပြီး Mobile-first ဖြစ်သော Website များဖြင့် သင့်အကြောင်းကို ရှင်းလင်းစွာ ပြောပြပေးမည်၊ Platform တစ်ခု Down ဖြစ်နေချိန်တောင် ဆက်လက်အလုပ်လုပ်နေမည်။",
      en: "Fast, mobile-first websites that tell your story clearly and keep working even when a single platform goes down.",
    },
  },
  {
    icon: TrendingUp,
    title: { my: "Multi-Channel Strategy", en: "Multi-Channel Strategy" },
    description: {
      my: "Search, Owned Channel, KOL Partnership များပေါ်မှာ ပျံ့နှံ့နေသော Growth System — Platform တစ်ခု Block ဖြစ်ရင်တောင် Pipeline ကို မရပ်တန့်စေနိုင်အောင် တည်ဆောက်ထားသည်။",
      en: "A growth system spread across search, owned channels, and KOL partnerships — built so one platform block cannot stop your pipeline.",
    },
  },
];

interface ProcessStep {
  step: string;
  title: L;
  description: L;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: { my: "ရှာဖွေလေ့လာခြင်း", en: "Discover" },
    description: {
      my: "သင့်လုပ်ငန်း၊ Customer၊ Online မှာ အချိန်ဘယ်လိုကုန်နေလဲဆိုတာ လေ့လာသည်။",
      en: "We learn your business, your customers, and where they actually spend time online.",
    },
  },
  {
    step: "02",
    title: { my: "Strategy ချမှတ်ခြင်း", en: "Strategize" },
    description: {
      my: "သင့်ရဲ့ ရည်မှန်းချက်နှင့် Budget အတိုင်း Channel Mix နှင့် Content Plan ကို ဖန်တီးပေးသည် — Generic Template မဟုတ်ပါ။",
      en: "A channel mix and content plan built around your goals and budget — not a generic template.",
    },
  },
  {
    step: "03",
    title: { my: "ဖန်တီးခြင်း", en: "Create" },
    description: {
      my: "Branding၊ Content နှင့် Campaign များကို ကျွန်တော်တို့ Design/Content Team မှ တိုက်ရိုက် ထုတ်လုပ်ပေးသည်။",
      en: "Branding, content, and campaigns produced in-house by our design and content team.",
    },
  },
  {
    step: "04",
    title: { my: "Launch & Grow", en: "Launch & Grow" },
    description: {
      my: "Run, Measure, Optimize လုပ်ပေးပြီး လစဉ် Report ဖြင့် ဘာတွေ အလုပ်ဖြစ်နေလဲ အမြဲသိနေနိုင်ပါသည်။",
      en: "We run, measure, and optimize — with a monthly report so you always know what is working.",
    },
  },
];

interface PortfolioItem {
  client: string;
  category: L;
  result: L;
  link?: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    client: "BAIC Myanmar",
    category: { my: "Automotive Digital Campaign", en: "Automotive Digital Campaign" },
    result: { my: "ARCFOX EV Line အတွက် Product Launch Content", en: "Product launch content for ARCFOX EV line" },
  },
  {
    client: "Htike Kyi Restaurant",
    category: { my: "F&B Promotion", en: "F&B Promotion" },
    result: { my: "ပွဲတော်ပေါ်ထွက် Offer Campaign နှင့် Social Content", en: "Seasonal offer campaigns & social content" },
  },
  {
    client: "Great Generator Power",
    category: { my: "Product Marketing", en: "Product Marketing" },
    result: { my: "Product Range တစ်လျှောက် Catalogue-style Ad Creative", en: "Catalogue-style ad creative across product range" },
  },
  {
    client: "Shwe Oat Sone (Amber)",
    category: { my: "Beauty Brand Campaign", en: "Beauty Brand Campaign" },
    result: { my: "အမွေအနှစ် Skincare Storytelling Content", en: "Heritage skincare storytelling content" },
  },
  {
    client: "Beauty Care Signature Spa",
    category: { my: "Branding + Social", en: "Branding + Social" },
    result: { my: "Brand Identity နှင့် ဆက်လက် Social Presence", en: "Brand identity and ongoing social presence" },
  },
  {
    client: "Dental Palace",
    category: { my: "Healthcare Branding", en: "Healthcare Branding" },
    result: { my: "Local Clinic Branding နှင့် Patient-facing Content", en: "Local clinic branding and patient-facing content" },
  },
  {
    client: "Designer Ko Linn",
    category: { my: "Website Development", en: "Website Development" },
    result: { my: "Fashion Academy Website", en: "Fashion academy website" },
    link: "https://www.designerkolinn.com",
  },
  {
    client: "ReStyle",
    category: { my: "Website Development", en: "Website Development" },
    result: { my: "Fashion E-commerce Storefront", en: "Fashion e-commerce storefront" },
    link: "https://www.restyle-official.com",
  },
  {
    client: "Shartra",
    category: { my: "Website Development", en: "Website Development" },
    result: { my: "Bridal & Ready-to-wear Showcase Site", en: "Bridal & ready-to-wear showcase site" },
    link: "https://www.shartra.com",
  },
];

interface PricingTier {
  name: L;
  price: L;
  description: L;
  features: L[];
  highlighted?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: { my: "Foundation", en: "Foundation" },
    price: { my: "ဆက်သွယ်ပါ", en: "Contact us" },
    description: {
      my: "မှန်ကန်တဲ့ Digital Home တစ်ခု မရှိသေးတဲ့ SME များအတွက်။",
      en: "For SMEs who need a real digital home before anything else.",
    },
    features: [
      { my: "Lead Form ပါသော Website / Landing Page", en: "Website / landing page with lead form" },
      { my: "Google Business Profile + Local SEO", en: "Google Business Profile + local SEO" },
      { my: "Viber Public Chat Setup", en: "Viber Public Chat setup" },
    ],
  },
  {
    name: { my: "Growth", en: "Growth" },
    price: { my: "ဆက်သွယ်ပါ", en: "Contact us" },
    description: {
      my: "Channel အားလုံးတစ်လျှောက် Paid Acquisition Run ဖို့ အသင့်ဖြစ်နေသော လုပ်ငန်းများအတွက်။",
      en: "For businesses ready to run paid acquisition across channels.",
    },
    features: [
      { my: "Foundation ပါသမျှ အားလုံး", en: "Everything in Foundation" },
      { my: "Google Search Ads စီမံခန့်ခွဲမှု", en: "Google Search Ads management" },
      { my: "Telegram Channel + Community Management", en: "Telegram channel + community management" },
      { my: "Awareness အတွက် TikTok Content", en: "TikTok content for awareness" },
    ],
    highlighted: true,
  },
  {
    name: { my: "Full Funnel", en: "Full Funnel" },
    price: { my: "ဆက်သွယ်ပါ", en: "Contact us" },
    description: {
      my: "Reporting ပါသော Multi-channel System တစ်ခုလုံးအတွက်။",
      en: "A complete multi-channel system with reporting.",
    },
    features: [
      { my: "Growth ပါသမျှ အားလုံး", en: "Everything in Growth" },
      { my: "YouTube Content + KOL Collaboration", en: "YouTube content + KOL collaboration" },
      { my: "Email / SMS Retargeting Setup", en: "Email / SMS retargeting setup" },
      { my: "လစဉ် Performance Report", en: "Monthly performance report" },
    ],
  },
];

interface TeamMember {
  role: L;
  description: L;
}

const TEAM: TeamMember[] = [
  {
    role: { my: "Content Creator", en: "Content Creator" },
    description: {
      my: "သင့်ဘရန်ဒ်ပီတ်နဲ့ ကိုက်ညီတဲ့ စာသားများနှင့် Post Plan များကို ရေးသားပေးသည်။",
      en: "Writes the words and plans the posts that sound like your brand, not a template.",
    },
  },
  {
    role: { my: "Video Editor", en: "Video Editor" },
    description: {
      my: "နောက်ဆုံးထိ ကြည့်စေနိုင်သော Short-form Video များကို ဖြတ်တောက်ပေးသည်။",
      en: "Cuts the short-form video that actually gets watched to the end.",
    },
  },
  {
    role: { my: "Graphic Designer", en: "Graphic Designer" },
    description: {
      my: "Logo၊ Ad Creative စသော Visual System တစ်ခုလုံးကို တည်ဆောက်ပေးသည်။",
      en: "Builds the visual system — logos, ad creative, and everything in between.",
    },
  },
  {
    role: { my: "Business Manager", en: "Business Manager" },
    description: {
      my: "Strategy၊ Budget နှင့် Reporting ကို မှန်ကန်စွာ ထိန်းသိမ်းပေးသည်။",
      en: "Keeps strategy, budget, and reporting honest and on track.",
    },
  },
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

function LanguageToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="flex items-center gap-1 rounded-full border border-white/15 px-1 py-1 text-xs font-mono"
    >
      <span
        className={`rounded-full px-2 py-1 transition-colors ${
          lang === "my" ? "bg-elevated text-ink" : "text-ink-muted"
        }`}
      >
        MY
      </span>
      <span
        className={`rounded-full px-2 py-1 transition-colors ${
          lang === "en" ? "bg-elevated text-ink" : "text-ink-muted"
        }`}
      >
        EN
      </span>
    </button>
  );
}

/* ---------------------------------------------------------
   Navbar
   --------------------------------------------------------- */

function Navbar() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  const ctaLabel = lang === "my" ? "စျေးနှုန်း တောင်းရန်" : "Get a Quote";

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
              {link.label[lang]}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <NeonButton href="#contact">
            {ctaLabel} <ArrowRight size={16} />
          </NeonButton>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <button
            aria-label="Toggle menu"
            className="text-ink"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
                  {link.label[lang]}
                </a>
              ))}
              <NeonButton href="#contact">
                {ctaLabel} <ArrowRight size={16} />
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
  const { lang } = useLang();
  const mascotRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

  const copy = {
    eyebrow1: { my: "ရလဒ်ကောင်းများ ပေးနေသည်", en: "Delivering impact" },
    eyebrow2: { my: "၂၀၂၀ ကစတင်", en: "Since 2020" },
    paragraph: {
      my: "Digital Noise ကို Brand Growth အဖြစ် ပြောင်းပေးပါတယ် — Customer တကယ် သုံးနေတဲ့ Channel တိုင်းမှာ၊ မနက်ဖြန် Block ဖြစ်နိုင်တဲ့ Platform တစ်ခုတည်းပေါ် မမှီခိုပါ။",
      en: "Turning digital noise into meaningful brand growth — across every channel your customers actually use, not just the one that might get blocked tomorrow.",
    },
    tagline: { my: "ကျွန်တော်တို့က ရလဒ်ထက် ပိုဂရုစိုက်ပါတယ်။", en: "We care more than just results." },
    cta1: { my: "လုပ်ငန်းများကြည့်ရန်", en: "See Our Work" },
    cta2: { my: "စကားပြောကြရအောင်", en: "Let's Talk" },
  };

  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            <span>{copy.eyebrow1[lang]}</span>
            <span className="h-1 w-1 rounded-full bg-neon-cyan" />
            <span>{copy.eyebrow2[lang]}</span>
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.05] text-ink sm:text-6xl">
            Hi! We are <span className="text-violet">The Foxes</span>
          </h1>

          <p className="mt-6 text-lg text-ink-muted">{copy.paragraph[lang]}</p>

          <p className="mt-2 font-mono text-sm text-neon-cyan">{copy.tagline[lang]}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <NeonButton href="#portfolio">
              {copy.cta1[lang]} <ArrowRight size={16} />
            </NeonButton>
            <NeonButton href="#contact" variant="ghost">
              {copy.cta2[lang]}
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
  const { lang } = useLang();
  const copy = {
    eyebrow: { my: "ဘာလုပ်ပေးလဲ", en: "What we do" },
    title: {
      my: "မြန်မာနိုင်ငံ Online သွားပုံအတိုင်း တည်ဆောက်ထားသော ဝန်ဆောင်မှုများ",
      en: "Services built for how Myanmar actually goes online",
    },
    description: {
      my: "Platform တစ်ခုတည်းပေါ် အားကိုးမှု မရှိပါ။ ဝန်ဆောင်မှုတိုင်းက စနစ်တစ်ခုလုံးထဲ ပါဝင်နေတဲ့အတွက် Block ဖြစ်ခြင်း ဒါမှမဟုတ် Algorithm ပြောင်းလဲခြင်းက သင့် Growth ကို ရပ်တန့်စွမ်း မရှိပါ။",
      en: "No single-platform bets. Every service plugs into a wider system, so a block or an algorithm change never stops your growth.",
    },
  };

  return (
    <section id="services" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={copy.eyebrow[lang]}
          title={copy.title[lang]}
          description={copy.description[lang]}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title.en}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-white/5 bg-elevated p-6 transition-colors hover:border-white/15"
              >
                <div className="mb-4 inline-flex rounded-xl bg-obsidian p-3">
                  <Icon size={22} className="text-neon-cyan" />
                </div>
                <h3 className="text-lg font-semibold text-ink">{service.title[lang]}</h3>
                <p className="mt-2 text-sm text-ink-muted">{service.description[lang]}</p>
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
  const { lang } = useLang();
  const copy = {
    eyebrow: { my: "ဘယ်လို အလုပ်လုပ်လဲ", en: "How we work" },
    title: { my: "Project တိုင်းအတွက် အဆင့် (၄) ဆင့်", en: "Four steps, every project" },
  };

  return (
    <section id="process" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} />

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
              <span className="font-mono text-4xl font-bold text-white/10">{step.step}</span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{step.title[lang]}</h3>
              <p className="mt-2 text-sm text-ink-muted">{step.description[lang]}</p>
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
  const { lang } = useLang();
  const copy = {
    eyebrow: { my: "ရွေးချယ်ထားသော လုပ်ငန်းများ", en: "Selected work" },
    title: { my: "ကျွန်တော်တို့ ကူညီခဲ့သော Client များ", en: "Clients we have helped grow" },
    description: {
      my: "Food, Beauty, Automotive, Fashion များတွင် Branding, Social Campaign, Website Development များကို ပေါင်းစပ်ဆောင်ရွက်ပေးထားသည်။",
      en: "A mix of branding, social campaigns, and full website builds across food, beauty, automotive, and fashion.",
    },
    placeholder: { my: "Project ပုံ", en: "project image" },
  };

  return (
    <section id="portfolio" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={copy.eyebrow[lang]}
          title={copy.title[lang]}
          description={copy.description[lang]}
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
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-violet/10 via-neon-cyan/5 to-neon-magenta/10 font-mono text-xs text-ink-muted">
                {copy.placeholder[lang]}
              </div>
              <div className="p-5">
                <p className="font-mono text-xs uppercase tracking-wide text-neon-cyan">
                  {item.category[lang]}
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
                <p className="mt-1 text-sm text-ink-muted">{item.result[lang]}</p>
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
  const { lang } = useLang();
  const copy = {
    eyebrow: { my: "Package များ", en: "Packages" },
    title: { my: "အစပြုရန် တစ်ခုရွေးပြီး ကျန်တာကို တိုးချဲ့ပါ", en: "Pick a starting point, grow into the rest" },
    description: {
      my: "Package တိုင်းသည် နောက်တစ်ခုအတွက် အုတ်မြစ်ဖြစ်သည် — Scale တက်လာသည်နှင့် ဘာမှ စွန့်ပစ်ရန် မလိုပါ။",
      en: "Every package is a foundation for the next one — nothing gets thrown away as you scale.",
    },
    ctaLabel: { my: "ဒီ Package ကို ယူမည်", en: "Get this package" },
  };

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={copy.eyebrow[lang]}
          title={copy.title[lang]}
          description={copy.description[lang]}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <motion.div
              key={tier.name.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={tier.highlighted ? "neon-frame neon-frame--square neon-frame--glow" : ""}
            >
              <div
                className={`flex h-full flex-col rounded-[1.5rem] p-8 ${
                  tier.highlighted ? "bg-obsidian" : "border border-white/5 bg-elevated"
                }`}
              >
                <h3 className="text-xl font-semibold text-ink">{tier.name[lang]}</h3>
                <p className="mt-2 text-sm text-ink-muted">{tier.description[lang]}</p>
                <p className="mt-6 font-mono text-2xl font-bold text-ink">{tier.price[lang]}</p>

                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature.en} className="flex items-start gap-2 text-sm text-ink-muted">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-neon-cyan" />
                      {feature[lang]}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 py-3 text-sm font-medium text-ink transition-colors hover:border-white/40"
                >
                  {copy.ctaLabel[lang]} <ArrowRight size={16} />
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
  const { lang } = useLang();
  const copy = {
    eyebrow: { my: "အဖွဲ့သား", en: "The pack" },
    title: { my: "လုပ်ငန်းနောက်ကွယ်ရှိ Fox များကို တွေ့ဆုံပါ", en: "Meet the foxes behind the work" },
  };

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.role.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-white/5 bg-elevated p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-obsidian">
                <Sparkles size={22} className="text-fox-orange" />
              </div>
              <h3 className="font-semibold text-ink">{member.role[lang]}</h3>
              <p className="mt-2 text-sm text-ink-muted">{member.description[lang]}</p>
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
  const { lang } = useLang();
  const copy = {
    eyebrow: { my: "တစ်ခုခု အတူ Growth လုပ်ကြရအောင်", en: "Let's grow something" },
    title: { my: "သင့်လုပ်ငန်းအကြောင်း ပြောပြပါ", en: "Tell us about your business" },
    description: {
      my: "Message ပို့လိုက်ပါ၊ သင့်ရဲ့ လက်ရှိ Digital Presence ကို Free Audit လုပ်ပြီး ပြန်စာပေးပါမည် — Commitment မလိုအပ်ပါ။",
      en: "Send a message and we will reply with a free audit of your current digital presence — no commitment required.",
    },
    location: { my: "မြန်မာနိုင်ငံ", en: "Myanmar" },
    namePh: { my: "အမည်", en: "Your name" },
    emailPh: { my: "အီးမေးလ်", en: "Email address" },
    businessPh: { my: "လုပ်ငန်းအမည်", en: "Business name" },
    messagePh: { my: "ဘာအကူအညီ လိုအပ်ပါသလဲ?", en: "What do you need help with?" },
    send: { my: "Message ပို့မည်", en: "Send message" },
  };

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow>{copy.eyebrow[lang]}</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">{copy.title[lang]}</h2>
          <p className="mt-4 text-ink-muted">{copy.description[lang]}</p>

          <div className="mt-10 space-y-4">
            <a href="tel:09796960249" className="flex items-center gap-3 text-ink-muted hover:text-ink">
              <Phone size={18} className="text-neon-cyan" /> 09 796-960-249
            </a>
            <a href="mailto:digitalfox1508@gmail.com" className="flex items-center gap-3 text-ink-muted hover:text-ink">
              <Mail size={18} className="text-neon-cyan" /> digitalfox1508@gmail.com
            </a>
            <div className="flex items-center gap-3 text-ink-muted">
              <MapPin size={18} className="text-neon-cyan" /> {copy.location[lang]}
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
              placeholder={copy.namePh[lang]}
              className="w-full rounded-xl border border-white/10 bg-obsidian px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-neon-cyan focus:outline-none"
            />
            <input
              type="email"
              placeholder={copy.emailPh[lang]}
              className="w-full rounded-xl border border-white/10 bg-obsidian px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-neon-cyan focus:outline-none"
            />
            <input
              type="text"
              placeholder={copy.businessPh[lang]}
              className="w-full rounded-xl border border-white/10 bg-obsidian px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-neon-cyan focus:outline-none"
            />
            <textarea
              placeholder={copy.messagePh[lang]}
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-obsidian px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-neon-cyan focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-neon-gradient py-3 text-sm font-semibold text-obsidian transition-transform hover:scale-[1.01]"
          >
            {copy.send[lang]} <Send size={16} />
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
  const { lang } = useLang();
  const builtIn = { my: "မြန်မာနိုင်ငံတွင် ဖန်တီးထားသည်", en: "Built in Myanmar" };
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <span className="font-mono text-sm text-ink-muted">
          DIGITAL <span className="text-neon-magenta">FOX</span> — Creative Agency
        </span>
        <span className="text-sm text-ink-muted">
          © {new Date().getFullYear()} Digital Fox. {builtIn[lang]}.
        </span>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------
   App
   --------------------------------------------------------- */

function AppContent() {
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

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
