import {
  Globe, Mail, Video, MapPin, Users, Calendar,
  GraduationCap, Monitor, MessageCircle, Clock,
  BookOpen, Phone, ArrowRight, ExternalLink
} from 'lucide-react';

const VisitsSection = () => {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c476?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover"
            alt="Global Outreach"
          />
        </div>
        <div className="relative z-10 p-6 md:p-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 mb-4">
            <Globe size={12} />
            Global Outreach
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug mb-3">
            Global Outreach <br />
            <span className="text-emerald-400">& Visits</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            At the Oxford Skills Center of Technology (OSCT), we believe in bringing world-class education closer to you.
            Our dedicated International Office team travels extensively to meet prospective students, parents, and educational partners across the globe.
          </p>
        </div>
      </div>

      {/* International Recruitment Tours */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
            <Globe size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">International Recruitment Tours</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Our team visits numerous countries each year</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Each year, the OSCT International Office team visits numerous countries to support marketing activities,
            participate in global education fairs, and introduce our academic programs to prospective students.
          </p>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: Users, title: 'Meet Counselors', desc: 'Meet our admissions counselors in person for a detailed discussion.' },
              { icon: GraduationCap, title: 'Eligibility Check', desc: 'Receive an on-the-spot assessment of your eligibility for our programs.' },
              { icon: MapPin, title: 'Regional Scholarships', desc: 'Learn about scholarship opportunities specifically for your region.' },
            ].map((item) => (
              <div key={item.title} className="bg-muted/50 border border-border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <item.icon size={16} className="text-primary" />
                  <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-full shrink-0">
              <Mail size={16} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Plan Your Meeting</h4>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                To learn whether your country of residence is scheduled for a visit, please contact our team at:
              </p>
              <a
                href="mailto:international@oxfordskillscenter.co.uk"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mt-1 inline-flex items-center gap-1"
              >
                international@oxfordskillscenter.co.uk
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* University Fairs & Exhibitions */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
            <Calendar size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">University Fairs & Exhibitions</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Meet us at major international education events</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            We regularly participate in major international education exhibitions, including <span className="font-semibold text-foreground">British Council Fairs</span> and <span className="font-semibold text-foreground">BMI Events</span>.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-lg p-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg shrink-0">
                <BookOpen size={16} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Studying in the UK</h4>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  We host dedicated seminars on navigating the UK education system, visa requirements, and student life.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-lg p-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg shrink-0">
                <GraduationCap size={16} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Navigating the CAS Process</h4>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  Get step-by-step guidance on the Confirmation of Acceptance for Studies (CAS) process for UK enrollment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Visits & Webinars */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
            <Video size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Virtual Visits & Webinars</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Connect with us digitally from anywhere in the world</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            If we aren't visiting your city this month, you can still connect with us digitally.
            We host <span className="font-semibold text-foreground">monthly Virtual Open Days</span> where you can explore everything OSCT has to offer.
          </p>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                icon: Monitor,
                title: 'Virtual Campus Tour',
                desc: 'Explore our facilities through an immersive 360-degree digital experience.',
                color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
              },
              {
                icon: MessageCircle,
                title: 'Live Q&A Sessions',
                desc: 'Speak directly with faculty members about course modules and placement exams.',
                color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
              },
              {
                icon: Users,
                title: 'Student Panels',
                desc: 'Hear from current international students about their experience living and studying with us.',
                color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
              },
            ].map((item) => (
              <div key={item.title} className="bg-muted/50 border border-border rounded-lg p-4 space-y-3 group hover:shadow-md transition-shadow">
                <div className={`p-2.5 rounded-lg inline-flex ${item.color}`}>
                  <item.icon size={18} />
                </div>
                <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <button className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors">
            <Video size={14} />
            Join Next Virtual Open Day
            <ArrowRight size={12} />
          </button>
        </div>
      </section>

      {/* On-Campus Visits */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-100 dark:bg-sky-900/30 rounded-lg text-sky-600 dark:text-sky-400">
            <MapPin size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">On-Campus Visits</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Experience OSCT in person with a guided tour</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you are currently in the region, we invite you to book an individual campus tour
            and experience our facilities firsthand.
          </p>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                icon: Clock,
                title: 'Guided Tours',
                desc: 'Available Monday through Friday, 9:00 AM – 4:00 PM. Explore labs, lecture halls, and student spaces.',
                badge: 'Mon–Fri',
              },
              {
                icon: GraduationCap,
                title: 'Shadow a Student',
                desc: 'Spend a few hours attending a lecture to get a real feel for our teaching style and campus culture.',
                badge: 'Immersive',
              },
              {
                icon: Users,
                title: 'Admissions Consultation',
                desc: 'End your visit with a one-on-one session to kickstart your 10-step application process.',
                badge: '1-on-1',
              },
            ].map((item) => (
              <div key={item.title} className="relative bg-muted/50 border border-border rounded-lg p-4 space-y-2">
                <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
                <div className="flex items-center gap-2">
                  <item.icon size={16} className="text-sky-600 dark:text-sky-400" />
                  <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <button className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-500 transition-colors">
            <Calendar size={14} />
            Book a Campus Tour
            <ArrowRight size={12} />
          </button>
        </div>
      </section>

      {/* Request a Visit to Your School */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
            <BookOpen size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Request a Visit to Your School</h2>
            <p className="text-xs text-muted-foreground mt-0.5">We bring career guidance directly to your institution</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 md:p-8 text-white space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            Are you a <span className="font-semibold text-white">school counselor or principal</span>? We are happy to visit your institution
            to conduct career counseling workshops and guide your students on international education pathways.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 space-y-2">
              <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                <GraduationCap size={14} />
                Career Counseling Workshops
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Interactive sessions helping students explore academic pathways and discover their potential in global education.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 space-y-2">
              <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                <Globe size={14} />
                International Education Pathways
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Guiding students through the process of studying abroad, including UK visa requirements and CAS procedures.
              </p>
            </div>
          </div>

          <button className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-lg bg-emerald-500 text-white hover:bg-emerald-400 transition-colors">
            <Mail size={14} />
            Book a School Visit
            <ArrowRight size={12} />
          </button>
        </div>
      </section>

      {/* Contact CTA */}
      <div className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-foreground mb-1">Have Questions About Our Visits?</h4>
          <p className="text-xs text-muted-foreground">Our International Office team is ready to assist you.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href="mailto:international@oxfordskillscenter.co.uk"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Mail size={12} /> Email Us
          </a>
          <a
            href="tel:+447782274482"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors"
          >
            <Phone size={12} /> +44 7782 274482
          </a>
        </div>
      </div>
    </div>
  );
};

export default VisitsSection;
