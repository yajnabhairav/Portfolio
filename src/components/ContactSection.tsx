import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  MessageSquare, 
  Briefcase, 
  ExternalLink,
  Copy,
  Check,
  Send,
  Sparkles,
  Clock
} from 'lucide-react';

interface ContactSectionProps {
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
  const [hasCopiedPhone, setHasCopiedPhone] = useState(false);
  
  // Interactive Email Template Builder that opens REAL email in user's Gmail / Mail client
  const [companyName, setCompanyName] = useState('');
  const [roleType, setRoleType] = useState('Full-Time Software / Systems Engineer');
  const [customNote, setCustomNote] = useState('');

  const targetEmail = 'Adarshnarayanmzp44@gmail.com';
  const targetPhone = '+91-7667714004';
  const targetWhatsApp = '917667714004';

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(
      `Job Opportunity: ${roleType}${companyName ? ` at ${companyName}` : ''} - Adarsh Narayan`
    );
    const body = encodeURIComponent(
      `Hello Adarsh,\n\nI reviewed your portfolio and would like to connect regarding an engineering role.\n\nCompany: ${companyName || '[Company Name]'}\nPosition: ${roleType}\n\nDetails / Discussion Scope:\n${customNote || 'We are interested in discussing your technical background in C++, systems engineering, and embedded systems.'}\n\nPlease let me know your availability for a brief call.\n\nBest regards,\n[Recruiter / Hiring Manager Name]`
    );
    return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  const generateGmailWebUrl = () => {
    const subject = encodeURIComponent(
      `Job Opportunity: ${roleType}${companyName ? ` at ${companyName}` : ''} - Adarsh Narayan`
    );
    const body = encodeURIComponent(
      `Hello Adarsh,\n\nI reviewed your portfolio and would like to connect regarding an engineering role.\n\nCompany: ${companyName || '[Company Name]'}\nPosition: ${roleType}\n\nDetails / Discussion Scope:\n${customNote || 'We are interested in discussing your technical background in C++, systems engineering, and embedded systems.'}\n\nPlease let me know your availability for a brief call.\n\nBest regards,\n[Recruiter / Hiring Manager Name]`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${subject}&body=${body}`;
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hi Adarsh,\nI reviewed your portfolio and would like to discuss a job opportunity${companyName ? ` at ${companyName}` : ''} for ${roleType}.\n\nAre you available for a brief chat?`
    );
    return `https://wa.me/${targetWhatsApp}?text=${text}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetEmail);
    setHasCopiedEmail(true);
    onShowToast(`Copied ${targetEmail} to clipboard!`, 'info');
    setTimeout(() => setHasCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(targetPhone);
    setHasCopiedPhone(true);
    onShowToast(`Copied ${targetPhone} to clipboard!`, 'info');
    setTimeout(() => setHasCopiedPhone(false), 2000);
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
                Whether you have an immediate opening, a contract requirement, or want to schedule a technical interview, 
                you can reach me directly below with zero delay.
              </p>
            </div>

            {/* Quick Action Channels */}
            <div className="flex flex-wrap sm:flex-col gap-2.5 shrink-0">
              <a
                href={`tel:${targetPhone}`}
                className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-lg shadow-emerald-600/20 whitespace-nowrap active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Call: {targetPhone}</span>
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
                href={`mailto:${targetEmail}?subject=Job%20Opportunity%20-%20Engineering%20Role%20Discussion`}
                className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-blue-200 bg-blue-950/60 border border-blue-800/60 hover:bg-blue-900/60 rounded-xl transition-colors whitespace-nowrap active:scale-95"
              >
                <Mail className="w-4 h-4" />
                <span>{targetEmail}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Coordinates & Profiles */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0f172a]/80 backdrop-blur-sm space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Direct Contact Info</span>
                </h3>
                <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available Now</span>
                </span>
              </div>

              <div className="space-y-3.5 text-sm">
                
                {/* Email with 1-click Copy & Direct Mailto */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded bg-blue-950/60 text-blue-400 border border-blue-900/40 shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400 font-medium">Personal Email</div>
                        <a 
                          href={`mailto:${targetEmail}`}
                          className="text-slate-200 hover:text-blue-400 font-mono text-xs transition-colors mt-0.5 block font-semibold"
                        >
                          {targetEmail}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleCopyEmail}
                        className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800 transition-colors"
                        title="Copy Email"
                      >
                        {hasCopiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Telephone with 1-click Call & Copy */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-900/40 shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400 font-medium">Phone & WhatsApp</div>
                        <a
                          href={`tel:${targetPhone}`}
                          className="text-slate-200 hover:text-emerald-400 font-mono text-xs transition-colors mt-0.5 block font-semibold"
                        >
                          {targetPhone}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyPhone}
                      className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800 transition-colors"
                      title="Copy Phone Number"
                    >
                      {hasCopiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded bg-purple-950/60 text-purple-400 border border-purple-900/40 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Current Location</div>
                      <div className="text-slate-200 text-xs mt-0.5 font-medium">
                        Hyderabad, Telangana, India <span className="text-slate-400">(Open to Relocation)</span>
                      </div>
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
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href="https://github.com/yajnabhairav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub (@yajnabhairav)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Response Time Guarantee Box */}
            <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Rapid Response Commitment</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calls and WhatsApp inquiries are typically answered immediately during IST working hours. Direct emails to <strong className="text-emerald-300">{targetEmail}</strong> receive a response within 2–4 hours.
              </p>
            </div>

          </div>

          {/* Right Column: 1-Click Direct Email & Message Dispatch Center */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-2xl border border-slate-800 bg-[#0f172a]/95 backdrop-blur-md shadow-xl space-y-6">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>1-Click Direct Email Dispatch</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Send Direct Email to Adarsh&apos;s Inbox
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Choose your role type below to generate a pre-filled, professional email that opens directly in your Gmail or mail application addressed to <strong className="text-slate-200">{targetEmail}</strong>.
                </p>
              </div>

              <div className="space-y-4">
                
                {/* Role Type Selector */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Position / Discussion Scope
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Full-Time Software / Systems Engineer',
                      'VLSI & Embedded Systems Specialist',
                      'C++ / Compiler / Backend Developer',
                      'Technical Interview Invitation'
                    ].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setRoleType(role)}
                        className={`p-2.5 text-xs text-left rounded-xl border transition-all ${
                          roleType === role
                            ? 'bg-blue-600/25 border-blue-500 text-blue-200 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Google, Qualcomm, Intel, Startup..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Custom Note */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Optional Custom Message or Details
                  </label>
                  <textarea
                    rows={3}
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="e.g. We loved your mini compiler project and AWS certifications, and want to discuss our open role..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Direct 1-Click Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 space-y-3">
                  <div className="text-xs text-slate-400 font-medium">
                    Select where you would like to send the email from:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Gmail Web */}
                    <a
                      href={generateGmailWebUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Open in Gmail (Web)</span>
                    </a>

                    {/* Default Mail Client (Outlook, Apple Mail, Thunderbird) */}
                    <a
                      href={generateMailtoUrl()}
                      className="group flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                    >
                      <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Open in Default Mail App</span>
                    </a>
                  </div>

                  {/* Or WhatsApp */}
                  <div className="pt-2">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-300 bg-emerald-950/50 border border-emerald-800/60 hover:bg-emerald-900/60 rounded-xl transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>Or message Adarsh on WhatsApp (+91-7667714004)</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
