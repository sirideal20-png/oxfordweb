import {
  Handshake, Award, Shield, FileCheck, BookOpen, Mail,
  Phone, ArrowRight, ExternalLink, CheckCircle, Users,
  Globe, Clock, Calendar, Briefcase, Download, MapPin
} from 'lucide-react';
import { useOxfordClock } from '@/hooks/useOxfordTime';

const whyRepresent = [
  { icon: Award, title: 'Competitive Commissions', desc: 'Rewarding the recruitment of high-quality, successful applicants with industry-leading rates.' },
  { icon: Download, title: 'Marketing Support', desc: 'Access to digital prospectuses, brand assets, and customized promotional materials.' },
  { icon: Phone, title: 'Dedicated Agent Support', desc: 'A direct line to our International Office for fast-track application queries and CAS processing.' },
  { icon: BookOpen, title: 'Training & Updates', desc: 'Regular webinars and newsletters on UK visa policy changes and new course offerings.' },
];

const codeOfConduct = [
  { title: 'Ethical Recruitment', desc: 'Providing honest and accurate information regarding courses, fees, and the 10-step application process.' },
  { title: 'Transparency', desc: 'Clearly explaining the "Placement Exam" requirements and the "30-mark" module passing criteria to all students.' },
  { title: 'Compliance', desc: 'Ensuring all students are genuine and meet the financial requirements for UK visa sponsorship.' },
];

const appointmentSteps = [
  { step: 1, title: 'Expression of Interest', desc: 'Fill out the Agent Application Form on this page to begin the process.' },
  { step: 2, title: 'Due Diligence', desc: 'Our team reviews your business license, company profile, and references from other UK-standard institutions.' },
  { step: 3, title: 'Interview', desc: 'A virtual meeting with our International Director to discuss your recruitment strategy.' },
  { step: 4, title: 'Formal Agreement', desc: 'Upon approval, we issue a formal Agency Agreement and your Authorized Representative Certificate.' },
];

const toolkitItems = [
  { icon: FileCheck, title: 'Standardized Checklists', desc: 'The exact documents required for Bachelors, Masters, and PhD levels.' },
  { icon: Award, title: 'Fee & Scholarship Guides', desc: 'Up-to-date lists of early bird discounts and "GREAT" scholarships.' },
  { icon: Briefcase, title: 'The OSCT Brand Kit', desc: 'High-resolution logos, campus images, and social media templates.' },
  { icon: BookOpen, title: 'Placement Exam Samples', desc: 'Mock papers to help you prepare your students for our internal proficiency test.' },
];

const OxfordClockWidget = () => {
  const time = useOxfordClock();
  const now = new Date();
  const ukDate = now.toLocaleDateString('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-2 text-emerald-400">
        <Clock size={14} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Oxford, UK — Live</span>
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
      </div>
      <div className="text-3xl font-mono font-bold text-white tracking-widest">
        {time}
      </div>
      <div className="flex items-center gap-2 text-slate-400">
        <Calendar size={12} />
        <span className="text-[11px]">{ukDate}</span>
      </div>
    </div>
  );
};

const AgentsSection = () => {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover"
            alt="Partnership"
          />
        </div>
        <div className="relative z-10 p-6 md:p-10 grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
              <Handshake size={12} />
              Partner With Us
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
              Agent & Representative <br />
              <span className="text-emerald-400">Portal</span>
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              At the Oxford Skills Center of Technology, we recognize that our global network of agents and
              representatives plays a vital role in connecting talented students with world-class education.
              We are committed to building long-term, ethical, and mutually beneficial partnerships with
              professional education consultants worldwide.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-lg bg-emerald-500 text-white hover:bg-emerald-400 transition-colors">
              <Handshake size={14} />
              Apply to Become an Agent
              <ArrowRight size={12} />
            </button>
          </div>
          <div className="lg:col-span-2 space-y-3">
            <OxfordClockWidget />
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sky-400">
                <MapPin size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Office Hours</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mon – Fri: <span className="font-semibold text-white">9:00 AM – 5:00 PM</span> (GMT/BST)
              </p>
              <p className="text-[10px] text-slate-500">Oxford Skills Center of Technology LTD, International Office</p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Why Represent OSCT? */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
            <Award size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">1. Why Represent OSCT?</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Benefits of joining our global partner network</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {whyRepresent.map((item) => (
            <div
              key={item.title}
              className="group bg-card border border-border rounded-xl p-4 hover:border-primary/40 hover:shadow-md transition-all space-y-2"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon size={16} />
                </div>
                <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Code of Conduct */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
            <Shield size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">2. Our Expectations (Code of Conduct)</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Maintaining quality and student welfare</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            To maintain our reputation and ensure student welfare, all OSCT representatives must adhere to:
          </p>
          <div className="space-y-3">
            {codeOfConduct.map((item) => (
              <div key={item.title} className="flex items-start gap-3 bg-muted/50 border border-border rounded-lg p-4">
                <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400 mt-0.5 shrink-0">
                  <CheckCircle size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground mb-0.5">{item.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How to Become an Authorized Representative */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
            <Users size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">3. How to Become an Authorized Representative</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Our strict 4-step appointment process</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 md:p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {appointmentSteps.map((item) => (
              <div key={item.step} className="relative bg-muted/50 border border-border rounded-lg p-4 pl-14">
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                  {item.step}
                </div>
                <h4 className="text-xs font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Agent Resource Toolkit */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-100 dark:bg-sky-900/30 rounded-lg text-sky-600 dark:text-sky-400">
            <Briefcase size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">4. Agent Resource Toolkit</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Everything you need in the secure Partner Portal</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Once appointed, you will gain access to our secure <span className="font-semibold text-foreground">Partner Portal</span>, which includes:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {toolkitItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3 bg-muted/50 border border-border rounded-lg p-4">
                <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg shrink-0">
                  <item.icon size={16} className="text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Agent News & Travel Schedule */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
            <Globe size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">5. Agent News & Travel Schedule</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Stay updated on our global visit calendar</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-xl p-5 md:p-8 text-white space-y-4">
          <p className="text-sm text-emerald-100 leading-relaxed max-w-2xl">
            Stay informed about when our team is visiting your region. We often conduct joint seminars and
            <span className="font-semibold text-white"> "on-the-spot" admission days</span> at our partners' offices.
          </p>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-white/15 text-white border border-white/20 hover:bg-white/25 backdrop-blur-sm transition-colors">
            <Calendar size={14} />
            View Global Visit Schedule
            <ArrowRight size={12} />
          </button>
        </div>
      </section>

      {/* 6. Contact the Agency Team */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
            <Mail size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">6. Contact the Agency Team</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Reach our dedicated partner desk</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you have questions about a pending application or wish to discuss a new partnership,
            please reach out to our dedicated partner desk:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="mailto:support@oxfordskillscenter.co.uk"
              className="flex items-center gap-3 bg-muted/50 border border-border rounded-lg p-4 hover:border-primary/40 transition-all group min-w-0"
            >
              <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                <Mail size={16} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email</h4>
                <p className="text-xs font-semibold text-foreground flex items-center gap-1 truncate">
                  <span className="truncate">support@oxfordskillscenter.co.uk</span>
                  <ExternalLink size={9} className="shrink-0" />
                </p>
              </div>
            </a>
            <a
              href="https://wa.me/447782274482"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-muted/50 border border-border rounded-lg p-4 hover:border-emerald-500/40 transition-all group min-w-0"
            >
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400 shrink-0">
                <Phone size={16} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">WhatsApp for Agents</h4>
                <p className="text-xs font-semibold text-foreground">+44 7782 274482</p>
              </div>
            </a>
            <a href="https://maps.app.goo.gl/Bc2yPeAD3R4Km5mK7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-muted/50 border border-border rounded-lg p-4 min-w-0 hover:border-primary/40 transition-colors">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 shrink-0">
                <MapPin size={16} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Address</h4>
                <p className="text-xs font-semibold text-foreground">OSCT LTD, International Office</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-slate-900 rounded-xl p-6 md:p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Ready to Partner With OSCT?</h3>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Join our global network of authorized representatives and help students access world-class education.
        </p>
        <button className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold rounded-lg bg-emerald-500 text-white hover:bg-emerald-400 transition-colors">
          <Handshake size={16} />
          Apply to Become an Agent
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default AgentsSection;
