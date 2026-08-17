// src/app/admin/leads/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { getAllLeads, markLeadContacted } from '../../../lib/firestore';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Lead = {
  id: string;
  name: string;
  phone: string;
  city?: string;
  state?: string;
  age?: string;
  leadType: string;
  source?: string;
  contacted: boolean;
  notes?: string;
};

export default function AdminLeadsPage() {
  const [leads, setLeads]     = useState<Lead[]>([]);
  const [filter, setFilter]   = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllLeads().then((data) => {
      setLeads(data as Lead[]);
      setLoading(false);
    });
  }, []);

  const handleMarkContacted = async (id: string, notes: string) => {
    await markLeadContacted(id, notes);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, contacted: true, notes } : l));
    toast.success('Marked as contacted');
  };

  const filtered = filter === 'all' ? leads : leads.filter(l => l.leadType === filter);

  const counts = {
    all:          leads.length,
    otp_registration: leads.filter(l => l.leadType === 'otp_registration').length,
    whatsapp:     leads.filter(l => l.leadType === 'whatsapp').length,
    cod_request:  leads.filter(l => l.leadType === 'cod_request').length,
  };

  return (
    <div className="min-h-screen px-4 pt-4 pb-8" style={{ background: '#0D0800' }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/admin" className="text-[#D4A017] text-sm">← Back</Link>
          <h1 className="text-[#F5E6C8] text-xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
            All Leads ({leads.length})
          </h1>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {[
            { key: 'all',              label: `All (${counts.all})` },
            { key: 'otp_registration', label: `OTP Reg (${counts.otp_registration})` },
            { key: 'whatsapp',         label: `WhatsApp (${counts.whatsapp})` },
            { key: 'cod_request',      label: `COD (${counts.cod_request})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition"
              style={{
                background: filter === tab.key ? '#D4A017' : 'rgba(212,160,23,0.1)',
                color:      filter === tab.key ? '#1A0F00'  : '#D4A017',
                border:     `1px solid ${filter === tab.key ? '#D4A017' : 'rgba(212,160,23,0.3)'}`,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-[#F5E6C8] text-center py-8">Loading...</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((lead) => (
              <LeadCard key={lead.id} lead={lead} onMarkContacted={handleMarkContacted} />
            ))}
            {filtered.length === 0 && (
              <div className="text-[#F5E6C8]/50 text-center py-8">No leads in this category.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LeadCard({ lead, onMarkContacted }: {
  lead: Lead;
  onMarkContacted: (id: string, notes: string) => void;
}) {
  const [notes, setNotes]     = useState(lead.notes || '');
  const [expanded, setExpanded] = useState(false);

  const typeColors: Record<string, string> = {
    otp_registration: '#3b82f6',
    whatsapp: '#22c55e',
    cod_request: '#D4A017',
  };

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: lead.contacted ? 'rgba(45,26,0,0.4)' : 'rgba(45,26,0,0.7)',
        border: `1px solid ${lead.contacted ? 'rgba(212,160,23,0.15)' : 'rgba(212,160,23,0.4)'}`,
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[#F5E6C8] font-bold text-sm">{lead.name}</div>
          <a href={`tel:${lead.phone}`} className="text-[#D4A017] text-sm font-mono">{lead.phone}</a>
          <div className="text-[#F5E6C8]/40 text-xs mt-0.5">
            {lead.city}{lead.state && `, ${lead.state}`}{lead.age && ` · Age: ${lead.age}`}
          </div>
        </div>
        <div className="text-right flex flex-col items-end gap-1">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{
              color: typeColors[lead.leadType] || '#D4A017',
              background: `${typeColors[lead.leadType] || '#D4A017'}22`,
              border: `1px solid ${typeColors[lead.leadType] || '#D4A017'}44`,
            }}
          >
            {lead.leadType}
          </span>
          <div className={`text-xs ${lead.contacted ? 'text-green-400' : 'text-orange-400'}`}>
            {lead.contacted ? '✓ Called' : '⏳ Pending'}
          </div>
        </div>
      </div>

      {!lead.contacted && (
        <div className="mt-3">
          <button onClick={() => setExpanded(!expanded)} className="text-[#D4A017] text-xs underline">
            {expanded ? 'Hide' : '+ Add call notes & mark contacted'}
          </button>
          {expanded && (
            <div className="mt-2 space-y-2">
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Call notes (e.g. interested, call back tomorrow)"
                className="input-field text-xs"
              />
              <button
                onClick={() => onMarkContacted(lead.id, notes)}
                className="w-full text-[#1A0F00] text-xs py-2 rounded-lg font-bold"
                style={{ background: 'linear-gradient(135deg, #8B6914, #D4A017)' }}
              >
                ✓ Mark as Contacted
              </button>
            </div>
          )}
        </div>
      )}
      {lead.contacted && lead.notes && (
        <div className="mt-2 text-[#F5E6C8]/40 text-xs italic">Notes: {lead.notes}</div>
      )}
    </div>
  );
}
