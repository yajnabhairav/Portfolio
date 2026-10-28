import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Linkedin, 
  Github, 
  MessageSquare, 
  Briefcase, 
  ExternalLink,
  Copy,
  Check,
  Inbox
} from 'lucide-react';
import { api } from '../services/api.ts';

interface ContactSectionProps {
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
  onOpenVault: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast, onOpenVault }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);

  // Direct Mailto Generator for Adarsh's Gmail
  const generateMailtoUrl = (data = formData) => {
    const to = 'Adarshnarayanmzp44@gmail.com';
    const subj = encodeURIComponent(data.subject || `Job Inquiry from ${data.name || 'Recruiter'}`);
    const body = encodeURIComponent(
      `Hello Adarsh,\n\nI reviewed your portfolio and would like to discuss an opportunity.\n\nSender Name: ${data.name || 'Not provided'}\nSender Email: ${data.email || 'Not provided'}\n\nMessage:\n${data.message || 'We would like to connect with you regarding an engineering role.'}\n\nBest regards,\n${data.name || 'Recruiting Team'}`
    );
    return `mailto:${to}?subject=${subj}&body=${body}`;
  };

  // Direct WhatsApp Generator
  const generateWhatsAppUrl = (data = formData) => {
    const text = encodeURIComponent(
      `Hi Adarsh,\nI reviewed your portfolio and want to connect.\n\nName: ${data.name || 'Recruiter'}\nEmail: ${data.email || 'N/A'}\nMessage: ${data.message || 'Looking forward to discussing an engineering role.'}`
    );
    return `https://wa.me/917667714004?text=${text}`;
  };

  // Gmail Webmail Composer direct URL
  const generateGmailWebUrl = (data = formData) => {
    const to = 'Adarshnarayanmzp44@gmail.com';
    const subj = encodeURIComponent(data.subject || `Job Inquiry from ${data.name || 'Recruiter'}`);
    const body = encodeURIComponent(
      `Hello Adarsh,\n\nSender Name: ${data.name}\nSender Email: ${data.email}\n\nMessage:\n${data.message}\n\nBest regards,\n${data.name}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subj}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please provide your name, email address, and message.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage(null);
      await api.submitInquiry(formData);
      setSubmittedData({ ...formData });
      onShowToast('Inquiry recorded in database vault and prepared for email dispatch!', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again.');
      onShowToast(err.message || 'Failed to send message', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Adarshnarayanmzp44@gmail.com');
    setHasCopiedEmail(true);
    onShowToast('Copied Adarshnarayanmzp44@gmail.com to clipboard', 'info');
    setTimeout(() => setHasCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative py-16 border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Recruiter / Hiring Highlight Banner */}
        <div className="mb-12 p-6 md:p-8 rounded-2xl border border-blue-500/40 bg-gradient-to-r from-blue-950/40 via-slate-900/70 to-emerald-950/30 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Immediate Availability · Software / Systems Engineer</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Recruiting for C++, Systems, or Embedded Roles?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                I am actively seeking full-time roles in Hyderabad, Bangalore, or remote. 
                Whether you have an immediate opening or want to conduct a technical interview, 
                you can reach me directly via call, email, or WhatsApp.
              </p>
            </div>

            {/* Quick Action Channels */}
            <div className="flex flex-wrap sm:flex-col gap-2.5 shrink-0">
              <a
                href="tel:+917667714004"
                className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-lg shadow-emerald-600/20 whitespace-nowrap active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Call: +91-7667714004</span>
              </a>

              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900/60 rounded-xl transition-colors whitespace-nowrap active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="mailto:Adarshnarayanmzp44@gmail.com?subject=Job%20Opportunity%20-%20Engineering%20Role%20Discussion"
                className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-blue-200 bg-blue-950/60 border border-blue-800/60 hover:bg-blue-900/60 rounded-xl transition-colors whitespace-nowrap active:scale-95"
              >
                <Mail className="w-4 h-4" />
                <span>Adarshnarayanmzp44@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Coordinates & Profiles */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0f172a]/70 backdrop-blur-sm space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                  Direct Communication
                </h3>
                <span className="text-xs font-mono text-emerald-400">Online & Active</span>
              </div>

              <div className="space-y-4 text-sm">
                
                {/* Email with 1-click Copy */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded bg-blue-950/50 text-blue-400 border border-blue-900/40 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-400 font-medium">Primary Email Address</div>
                    <div className="text-slate-200 font-mono text-xs truncate mt-0.5">
                      Adarshnarayanmzp44@gmail.com
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800"
                    title="Copy Email"
                  >
                    {hasCopiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-900/40 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Direct Telephone / Mobile</div>
                    <a
                      href="tel:+917667714004"
                      className="text-slate-200 hover:text-emerald-400 font-mono text-xs transition-colors mt-0.5 block"
                    >
                      +91-7667714004
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded bg-purple-950/50 text-purple-400 border border-purple-900/40 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Current Location</div>
                    <div className="text-slate-200 text-xs mt-0.5">
                      Hyderabad, Telangana, India
                    </div>
                  </div>
                </div>

              </div>

              {/* Verified Profile Links */}
              <div className="pt-2 flex flex-wrap gap-3 text-xs">
                <a
                  href="https://www.linkedin.com/in/adarsh-narayan-397b0425a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href="https://github.com/yajnabhairav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub (@yajnabhairav)</span>
                </a>
              </div>
            </div>

            {/* How Will Adarsh Know? Explanation Card & Vault Launcher */}
            <div className="p-5 rounded-2xl border border-blue-500/30 bg-blue-950/20 text-xs text-slate-300 space-y-3">
              <div className="font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>How Inquiries Reach Adarsh</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When an inquiry is submitted, it is saved directly to the database and also routed 
                straight to <strong className="text-blue-300">Adarshnarayanmzp44@gmail.com</strong>.
              </p>
              
              <div className="pt-2 border-t border-blue-900/40 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">View all past submissions:</span>
                <button
                  onClick={onOpenVault}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-400 hover:text-white bg-blue-900/40 border border-blue-800/60 rounded-lg transition-colors"
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Open Inquiries Vault</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Multi-Channel Live Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-2xl border border-slate-800 bg-[#0f172a]/90 backdrop-blur-md shadow-xl">
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Send Direct Inquiry
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Transmits immediately to Adarshnarayanmzp44@gmail.com
                  </div>
                </div>
              </div>

              {/* Post-Submission Multi-Dispatch Success Panel */}
              {submittedData && (
                <div className="p-5 mb-6 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs space-y-3">
                  <div className="font-bold flex items-center gap-2 text-sm text-emerald-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Inquiry Saved to Database Vault!</span>
                  </div>
                  <p className="leading-relaxed text-slate-300">
                    Your inquiry has been successfully captured. To ensure Adarsh receives it instantly in his Gmail or phone notification right now, click an instant dispatch option below:
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={generateGmailWebUrl(submittedData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Send via Gmail Web</span>
                    </a>

                    <a
                      href={generateMailtoUrl(submittedData)}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Default Mail Client</span>
                    </a>

                    <a
                      href={generateWhatsAppUrl(submittedData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950 border border-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Dispatch to WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-4 mb-6 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Name / Recruiter Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe / HR Partner"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. recruiter@company.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Subject / Discussion Scope
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Engineer Opportunity / C++ Systems Role"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Message Details <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about role requirements, job location, technical stack, or collaboration..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Submit Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-blue-600/20 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Transmitting to Database...' : 'Submit Inquiry'}</span>
                  </button>

                  <a
                    href={generateMailtoUrl()}
                    className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    title="Directly opens your mail composer to Adarshnarayanmzp44@gmail.com"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>Open in Email App directly</span>
                  </a>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
