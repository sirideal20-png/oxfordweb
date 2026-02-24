import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Clock, MessageCircle, HelpCircle,
  ChevronDown, Send, Headphones, FileText, ExternalLink,
  Shield, Wifi, CreditCard, GraduationCap, BookOpen, Users, Loader2, CheckCircle, LogIn, UserPlus, Search, Ticket, Copy, ArrowRight
} from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const faqs = [
  { q: 'How do I reset my student portal password?', a: 'Visit the Student Info System page and click "Forgot Password". You will receive a reset link to your registered email within 5 minutes.' },
  { q: 'How can I request an official transcript?', a: 'Go to Transactions → Document Application and submit a transcript request. Processing takes 3–5 working days.' },
  { q: 'What are the payment methods for tuition fees?', a: 'We accept bank transfers, credit/debit cards via our Online Payment portal, and instalment plans. Visit Transactions → Online Payment for details.' },
  { q: 'How do I apply for accommodation?', a: 'Navigate to Transactions → Accommodation to view available halls and submit your application. Priority is given to first-year and international students.' },
  { q: 'Where can I find my exam schedule?', a: 'Your personalised exam schedule is available under Student Portal → Exam Schedule. You can also sync it with your calendar.' },
  { q: 'How do I contact my academic adviser?', a: 'Log in to the Student Info System to view your assigned adviser and their contact details, or visit the Support Desk in person.' },
  { q: 'What is the refund policy for course withdrawals?', a: 'Full details are available on the Admissions → Refund Policy page. Refund eligibility depends on the withdrawal date relative to the semester start.' },
  { q: 'How do I access the Learning Management System (LMS)?', a: 'Go to Transactions → LMS or visit lms.oxfordskillscenter.co.uk. Use your student credentials to log in.' },
];

const supportChannels = [
  { icon: Headphones, title: 'IT Help Desk', desc: 'Technical issues with portals, email, or systems.', contact: 'support@oxfordskillscenter.co.uk', hours: 'Mon–Fri 08:00–20:00', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/40' },
  { icon: GraduationCap, title: 'Academic Support', desc: 'Course queries, grading, and academic advising.', contact: 'support@oxfordskillscenter.co.uk', hours: 'Mon–Fri 09:00–17:00', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
  { icon: CreditCard, title: 'Finance Office', desc: 'Tuition fees, payments, scholarships, and refunds.', contact: 'support@oxfordskillscenter.co.uk', hours: 'Mon–Fri 09:00–16:30', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/40' },
  { icon: Users, title: 'Student Welfare', desc: 'Wellbeing, counselling, and accessibility services.', contact: 'support@oxfordskillscenter.co.uk', hours: 'Mon–Fri 08:30–18:00', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/40' },
];

const quickLinks = [
  { icon: FileText, label: 'Student Handbook', path: '/student-portal/student-handbook' },
  { icon: BookOpen, label: 'Regulations', path: '/student-portal/regulations' },
  { icon: Shield, label: 'Visa Applications', path: '/admissions/visa-applications' },
  { icon: Wifi, label: 'Webmail', path: '/transactions/webmail' },
  { icon: HelpCircle, label: 'How To Do It', path: '/transactions/how-to-do-it' },
  { icon: ExternalLink, label: 'Support Desk Portal', path: '/transactions/support-desk' },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  open: { label: 'Open', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/40' },
  in_progress: { label: 'In Progress', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/40' },
  resolved: { label: 'Resolved', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/40' },
  closed: { label: 'Closed', color: 'text-muted-foreground', bg: 'bg-muted' },
};

const SupportPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', category: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState('');
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');
  const [trackInput, setTrackInput] = useState('');
  const [tracking, setTracking] = useState(false);
  const [trackedTicket, setTrackedTicket] = useState<any>(null);
  const [trackError, setTrackError] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFieldInteraction = (e: React.MouseEvent | React.FocusEvent) => {
    if (!user) {
      e.preventDefault();
      (e.target as HTMLElement).blur();
      setShowAuthGate(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const insertData: any = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        category: formData.category,
        message: formData.message.trim(),
      };
      if (user) insertData.user_id = user.id;
      const { data, error } = await supabase.from('support_requests').insert(insertData).select('ticket_number').single();
      if (error) throw error;
      setFormData({ name: '', email: '', category: '', message: '' });
      setSubmittedTicket(data?.ticket_number || '');
      setSubmitted(true);
      toast({ title: 'Request submitted', description: `Your ticket number is ${data?.ticket_number}` });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to submit request. Please try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = trackInput.trim().toUpperCase();
    if (!query) return;
    setTracking(true);
    setTrackedTicket(null);
    setTrackError('');
    try {
      const { data, error } = await supabase
        .from('support_requests')
        .select('ticket_number, name, email, category, message, status, created_at, admin_notes')
        .eq('ticket_number', query)
        .maybeSingle();
      if (error) throw error;
      if (!data) {
        setTrackError('No ticket found with that number. Please check and try again.');
      } else {
        setTrackedTicket(data);
      }
    } catch {
      setTrackError('Something went wrong. Please try again.');
    } finally {
      setTracking(false);
    }
  };

  const copyTicket = (ticket: string) => {
    navigator.clipboard.writeText(ticket);
    toast({ title: 'Copied!', description: `${ticket} copied to clipboard.` });
  };

  return (
    <div ref={searchContainerRef} className="space-y-12 animate-fadeIn pb-12 font-sans">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search support topics…" />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-6 rounded-b-[3rem] shadow-2xl border-b border-slate-700">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -ml-20 -mb-20" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-6 backdrop-blur-md">
            <Headphones size={14} /> Help & Support
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            How Can We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Help You?</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-6">
            Get the support you need — from IT issues to academic guidance, our team is here for you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => { setActiveTab('submit'); setTimeout(() => document.getElementById('ticket-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl bg-white text-slate-900 hover:bg-white/90 transition-all shadow-lg"
            >
              <Send size={16} /> Lodge a Ticket
            </button>
            <button
              onClick={() => { setActiveTab('track'); setTimeout(() => document.getElementById('ticket-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              <Search size={16} /> Track Your Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8 md:divide-x divide-border gap-4 md:gap-0">
          <div className="flex items-center justify-center gap-3 px-4">
            <div className="p-2 bg-primary/10 rounded-lg"><Phone size={18} className="text-primary" /></div>
            <div>
              <p className="text-xs font-bold text-foreground">+44 7782 274482</p>
              <p className="text-[10px] text-muted-foreground">Mon–Fri 08:00–18:00 GMT</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 px-4">
            <div className="p-2 bg-primary/10 rounded-lg"><Mail size={18} className="text-primary" /></div>
            <div>
              <p className="text-xs font-bold text-foreground">support@oxfordskillscenter.co.uk</p>
              <p className="text-[10px] text-muted-foreground">Response within 24 hours</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 px-4">
            <div className="p-2 bg-primary/10 rounded-lg"><MapPin size={18} className="text-primary" /></div>
            <div>
              <p className="text-xs font-bold text-foreground">Oxford, United Kingdom</p>
              <p className="text-[10px] text-muted-foreground">Walk-in support available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Channels */}
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Support Channels</h2>
        <p className="text-sm text-muted-foreground mb-6">Reach the right team for your specific needs.</p>
        <div className="grid md:grid-cols-2 gap-5">
          {supportChannels.map((ch) => (
            <div key={ch.title} data-searchable className={`${ch.bg} border border-border rounded-2xl p-6 hover:shadow-md transition-all`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-card border border-border shadow-sm ${ch.color}`}>
                  <ch.icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-sm mb-1">{ch.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{ch.desc}</p>
                  <div className="space-y-1.5">
                    <p className="text-xs text-foreground flex items-center gap-2"><Mail size={12} className="text-muted-foreground" /> {ch.contact}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2"><Clock size={12} /> {ch.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
        <p className="text-sm text-muted-foreground mb-6">Quick answers to common queries.</p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} data-searchable className="bg-card border border-border rounded-xl overflow-hidden transition-all">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={16} className="text-primary shrink-0" />
                  <span className="font-semibold text-foreground text-sm">{faq.q}</span>
                </div>
                <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-200 shrink-0 ml-2 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 pt-0 animate-slideDown">
                  <div className="pl-7 border-l-2 border-primary/20 ml-1">
                    <p className="text-muted-foreground text-xs leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Quick Links</h2>
        <p className="text-sm text-muted-foreground mb-6">Jump to commonly needed pages.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              data-searchable
              className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div className="w-10 h-10 mx-auto mb-2 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <link.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Submit Request / Track Ticket */}
      <div id="ticket-section" className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {/* Tab Switcher */}
            <div className="flex gap-1 bg-muted rounded-xl p-1 mb-6">
              <button
                onClick={() => setActiveTab('submit')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'submit' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Send size={14} /> Submit Request
              </button>
              <button
                onClick={() => setActiveTab('track')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'track' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Search size={14} /> Track Ticket
              </button>
            </div>

            {activeTab === 'submit' ? (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-2">Submit a Request</h2>
                <p className="text-sm text-muted-foreground mb-6">Can't find what you need? Send us a message and we'll get back to you within 24 hours.</p>
                
                {submitted ? (
                  <div className="bg-card border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                      <CheckCircle size={32} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Request Submitted Successfully!</h3>
                    
                    {submittedTicket && (
                      <div className="bg-muted border border-border rounded-xl p-4 space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Your Ticket Number</p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-xl font-mono font-extrabold text-primary tracking-wider">{submittedTicket}</span>
                          <button
                            onClick={() => copyTicket(submittedTicket)}
                            className="p-1.5 rounded-md hover:bg-primary/10 transition-colors"
                            title="Copy ticket number"
                          >
                            <Copy size={14} className="text-primary" />
                          </button>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Save this number! You can use it to track your request status anytime.
                        </p>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Our team will review it and respond within <strong className="text-foreground">24 hours</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                      <button
                        onClick={() => { setActiveTab('track'); setTrackInput(submittedTicket); setSubmitted(false); }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                      >
                        <Search size={14} /> Track This Ticket
                      </button>
                      <button
                        onClick={() => { setSubmitted(false); setSubmittedTicket(''); }}
                        className="text-xs text-primary font-medium hover:underline"
                      >
                        Submit another request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 relative">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={handleFieldInteraction}
                        onClick={handleFieldInteraction}
                        readOnly={!user}
                        className="w-full px-4 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground cursor-text"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={handleFieldInteraction}
                        onClick={handleFieldInteraction}
                        readOnly={!user}
                        className="w-full px-4 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground cursor-text"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Category</label>
                      <div onClick={handleFieldInteraction}>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          onFocus={handleFieldInteraction}
                          disabled={!user}
                          className="w-full px-4 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-foreground disabled:opacity-100 disabled:cursor-pointer"
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="technical">IT / Technical Issue</option>
                          <option value="academic">Academic Query</option>
                          <option value="finance">Finance / Payments</option>
                          <option value="accommodation">Accommodation</option>
                          <option value="welfare">Student Welfare</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={handleFieldInteraction}
                        onClick={handleFieldInteraction}
                        readOnly={!user}
                        rows={4}
                        className="w-full px-4 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground resize-none cursor-text"
                        placeholder="Describe your issue or question…"
                        required
                      />
                    </div>
                    <button
                      type={user ? 'submit' : 'button'}
                      onClick={!user ? handleFieldInteraction : undefined}
                      disabled={submitting}
                      className="w-full px-6 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {submitting ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : <><Send size={16} /> Submit Request</>}
                    </button>

                    {/* Auth Gate */}
                    {showAuthGate && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowAuthGate(false)} />
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-[2px] rounded-lg animate-fadeIn">
                          <div className="bg-card border border-border rounded-xl p-5 max-w-xs w-full text-center space-y-3 shadow-2xl mx-4">
                            <div className="w-10 h-10 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                              <LogIn size={20} className="text-primary" />
                            </div>
                            <h3 className="text-sm font-bold text-foreground">Sign Up Required</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              You need to <strong className="text-foreground">create an account first</strong> to submit a support request. Already have one? Sign in instead.
                            </p>
                            <div className="flex flex-col gap-2 pt-1">
                              <button
                                onClick={() => navigate('/auth?mode=signup')}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                              >
                                <UserPlus size={14} /> Create Account
                              </button>
                              <button
                                onClick={() => navigate('/auth')}
                                className="text-[11px] text-primary font-medium hover:underline transition-colors"
                              >
                                Already have an account? Sign In
                              </button>
                              <button
                                onClick={() => setShowAuthGate(false)}
                                className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </form>
                )}
              </>
            ) : (
              /* Track Ticket Tab */
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Track Your Ticket</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Enter your ticket number (e.g. <span className="font-mono font-bold text-foreground">OSCT-00001</span>) to check the status of your support request. No login required.
                  </p>
                </div>

                <form onSubmit={handleTrackTicket} className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={trackInput}
                      onChange={(e) => { setTrackInput(e.target.value.toUpperCase()); setTrackError(''); }}
                      placeholder="OSCT-00001"
                      className="w-full pl-10 pr-4 py-3 text-sm font-mono bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground uppercase tracking-wider"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={tracking || !trackInput.trim()}
                    className="px-5 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-60"
                  >
                    {tracking ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                    Track
                  </button>
                </form>

                {trackError && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-center animate-fadeIn">
                    <p className="text-xs font-medium text-destructive">{trackError}</p>
                  </div>
                )}

                {trackedTicket && (
                  <div className="bg-card border border-border rounded-2xl overflow-hidden animate-fadeIn">
                    <div className="bg-muted/50 border-b border-border px-5 py-4 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <Ticket size={18} className="text-primary" />
                        <span className="font-mono font-extrabold text-foreground tracking-wider">{trackedTicket.ticket_number}</span>
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${statusConfig[trackedTicket.status]?.bg || 'bg-muted'} ${statusConfig[trackedTicket.status]?.color || 'text-muted-foreground'}`}>
                        {statusConfig[trackedTicket.status]?.label || trackedTicket.status}
                      </span>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Name</p>
                          <p className="text-xs text-foreground font-medium">{trackedTicket.name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Category</p>
                          <p className="text-xs text-foreground font-medium capitalize">{trackedTicket.category}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Submitted</p>
                          <p className="text-xs text-foreground font-medium">
                            {new Date(trackedTicket.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Email</p>
                          <p className="text-xs text-foreground font-medium">{trackedTicket.email}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Message</p>
                        <p className="text-xs text-muted-foreground leading-relaxed bg-muted/50 rounded-lg p-3">{trackedTicket.message}</p>
                      </div>
                      {trackedTicket.admin_notes && (
                        <div className="border-t border-border pt-4">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 flex items-center gap-1">
                            <ArrowRight size={10} /> Admin Response
                          </p>
                          <p className="text-xs text-foreground leading-relaxed bg-primary/5 border border-primary/20 rounded-lg p-3">{trackedTicket.admin_notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!trackedTicket && !trackError && (
                  <div className="bg-muted/30 border border-border rounded-xl p-6 text-center space-y-2">
                    <Search size={32} className="mx-auto text-muted-foreground/40" />
                    <p className="text-xs text-muted-foreground">Enter your ticket number above to view its current status and any admin responses.</p>
                    <p className="text-[10px] text-muted-foreground/70">
                      Don't have a ticket yet?{' '}
                      <button onClick={() => setActiveTab('submit')} className="text-primary font-semibold hover:underline">Submit a request</button>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Office Info */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-6">
                <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2"><MapPin size={16} className="text-primary" /> Visit Us</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Main Campus</p>
                    <p className="text-xs text-muted-foreground">Oxford Skills Center of Technology</p>
                    <p className="text-xs text-muted-foreground">Oxford, United Kingdom</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Student Support Centre</p>
                    <p className="text-xs text-muted-foreground">Building A, Ground Floor</p>
                    <p className="text-xs text-muted-foreground">Open Mon–Fri 08:30–17:00</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-48 border-t border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.689!2d-1.2577!3d51.7520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDQ1JzA3LjIiTiAxwrAxNSc0Ni4wIlc!5e0!3m2!1sen!2suk!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Oxford Skills Center Location"
                />
              </div>
              <div className="p-3 border-t border-border bg-muted/30">
                <a
                  href="https://maps.app.goo.gl/Bc2yPeAD3R4Km5mK7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink size={12} /> Open in Google Maps
                </a>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2"><Clock size={16} className="text-primary" /> Operating Hours</h3>
              <div className="space-y-2">
                {[
                  { day: 'Monday – Friday', time: '08:00 – 18:00' },
                  { day: 'Saturday', time: '09:00 – 14:00' },
                  { day: 'Sunday', time: 'Closed' },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between items-center py-1.5 border-b border-border/50 last:border-0">
                    <span className="text-xs font-medium text-foreground">{h.day}</span>
                    <span className="text-xs text-muted-foreground">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2"><MessageCircle size={16} className="text-primary" /> Emergency Contact</h3>
              <p className="text-xs text-muted-foreground mb-3">For urgent matters outside office hours, please contact our emergency line.</p>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Phone size={14} className="text-primary" />
                <span className="text-xs font-bold text-foreground">+44 7782 274482</span>
                <span className="text-[10px] text-muted-foreground ml-auto">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
