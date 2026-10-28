import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Inbox, X, RefreshCw, Mail, Calendar, Trash2, Copy, Check, Download } from 'lucide-react';
import { Inquiry } from '../types.ts';

interface InquiryVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryVaultModal: React.FC<InquiryVaultModalProps> = ({ isOpen, onClose }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchVaultInquiries = async () => {
    try {
      setLoading(true);
      // Fetch public/direct inquiry view
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const json = await res.json();
        setInquiries(json.data || []);
      }
    } catch (err) {
      console.error('Error fetching vault inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchVaultInquiries();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyMessage = (inq: Inquiry) => {
    const text = `From: ${inq.name} (${inq.email})\nTopic: ${inq.subject || 'Inquiry'}\nDate: ${new Date(inq.createdAt).toLocaleString()}\n\nMessage:\n${inq.message}`;
    navigator.clipboard.writeText(text);
    setCopiedId(inq._id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAll = () => {
    const content = inquiries.map(i => 
      `--- INQUIRY FROM ${i.name} (${i.email}) ---\nDate: ${new Date(i.createdAt).toLocaleString()}\nSubject: ${i.subject || 'General'}\nMessage:\n${i.message}\n`
    ).join('\n\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `adarsh_inquiries_backup_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-700 bg-[#0f172a] p-6 shadow-2xl space-y-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-900/40">
              <Inbox className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Adarsh&apos;s Inquiries Vault
              </h3>
              <div className="text-[11px] text-slate-400">
                All messages sent via the website form are recorded here for Adarshnarayanmzp44@gmail.com
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchVaultInquiries}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
              title="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {inquiries.length > 0 && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Total Messages: <strong className="text-white">{inquiries.length}</strong>
            </span>
            <button
              onClick={handleExportAll}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Export as Text File</span>
            </button>
          </div>
        )}

        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="p-8 text-center border border-slate-800/80 rounded-xl bg-slate-900/40 text-xs text-slate-400">
            No inquiries recorded yet. When recruiters submit through the contact form, their messages will appear here.
          </div>
        ) : (
          <div className="space-y-3">
            {inquiries.map((inq) => (
              <div
                key={inq._id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{inq.name}</span>
                      <span className="text-xs font-mono text-blue-400 font-normal">
                        ({inq.email})
                      </span>
                    </div>
                    {inq.subject && (
                      <div className="text-xs font-medium text-slate-300 mt-0.5">
                        Topic: {inq.subject}
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1 shrink-0">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-black/40 border border-slate-800/80 text-xs text-slate-200 leading-relaxed font-sans">
                  {inq.message}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <a
                    href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject || 'Portfolio Inquiry')}&body=Hello ${encodeURIComponent(inq.name)},\n\nThank you for reaching out.\n\nBest regards,\nAdarsh Narayan`}
                    className="flex items-center gap-1.5 text-blue-400 hover:underline font-mono text-[11px]"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Reply to {inq.email}</span>
                  </a>

                  <button
                    onClick={() => handleCopyMessage(inq)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedId === inq._id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg"
          >
            Close Vault
          </button>
        </div>
      </motion.div>
    </div>
  );
};
