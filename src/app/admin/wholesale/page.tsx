'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  FileText,
  Save,
  MessageSquare,
} from 'lucide-react';
import { store } from '@/lib/store';
import { WholesaleEnquiry } from '@/types';

export default function AdminWholesalePage() {
  const [enquiries, setEnquiries] = useState<WholesaleEnquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeNotes, setActiveNotes] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    const list = store.getWholesaleEnquiries();
    setEnquiries(list);
    const initialNotes: { [id: string]: string } = {};
    list.forEach((e) => {
      initialNotes[e.id] = e.internalNotes || '';
    });
    setActiveNotes(initialNotes);
  }, []);

  const refresh = () => {
    const list = store.getWholesaleEnquiries();
    setEnquiries(list);
  };

  const handleStatusChange = (id: string, newStatus: WholesaleEnquiry['status']) => {
    store.updateWholesaleStatus(id, newStatus);
    refresh();
  };

  const handleSaveNotes = (id: string) => {
    const currentStatus = enquiries.find((e) => e.id === id)?.status || 'new';
    store.updateWholesaleStatus(id, currentStatus, activeNotes[id]);
    refresh();
    alert('Curator internal notes saved.');
  };

  const filtered = enquiries.filter((e) => {
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">
            B2B Commercial Accounts
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-1">
            Wholesale Inquiries ({enquiries.length})
          </h1>
        </div>

        {/* Status Filters */}
        <div className="flex items-center space-x-1 bg-ivory-50 p-1.5 rounded-2xl border border-parchment text-xs overflow-x-auto">
          {['all', 'new', 'contacted', 'quoted', 'in_progress', 'closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl capitalize font-medium transition-all ${
                statusFilter === st
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Cards */}
      <div className="space-y-6">
        {filtered.map((enq) => (
          <div
            key={enq.id}
            className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-8 shadow-craft space-y-6"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-parchment gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-terracotta font-bold">
                  {enq.businessType} &bull; {enq.city}, {enq.country}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal">
                  {enq.businessName}
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs text-charcoal/50">
                  {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <select
                  value={enq.status}
                  onChange={(e) =>
                    handleStatusChange(enq.id, e.target.value as WholesaleEnquiry['status'])
                  }
                  className={`text-xs px-3 py-1.5 rounded-xl border font-semibold focus:outline-none ${
                    enq.status === 'new'
                      ? 'bg-terracotta text-white border-terracotta'
                      : enq.status === 'quoted'
                      ? 'bg-turmeric-50 text-turmeric-dark border-turmeric'
                      : 'bg-white border-parchment text-charcoal'
                  }`}
                >
                  <option value="new">new inquiry</option>
                  <option value="contacted">contacted</option>
                  <option value="quoted">quoted</option>
                  <option value="in_progress">in progress</option>
                  <option value="closed">closed</option>
                </select>
              </div>
            </div>

            {/* Contact & Volume Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-parchment/30 p-4 rounded-2xl border border-parchment">
              <div>
                <span className="text-charcoal/50 text-[10px] uppercase font-bold block mb-1">
                  Primary Contact
                </span>
                <p className="font-medium text-charcoal">{enq.contactPerson}</p>
                <div className="flex items-center space-x-2 mt-1 text-charcoal/70">
                  <Mail className="w-3.5 h-3.5 text-terracotta" />
                  <a href={`mailto:${enq.email}`} className="hover:underline">
                    {enq.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2 mt-0.5 text-charcoal/70">
                  <Phone className="w-3.5 h-3.5 text-terracotta" />
                  <a href={`tel:${enq.phone}`} className="hover:underline">
                    {enq.phone}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-charcoal/50 text-[10px] uppercase font-bold block mb-1">
                  Order Scope
                </span>
                <p className="font-medium text-charcoal">Est. Volume: {enq.estimatedQuantity}</p>
                {enq.taxId && <p className="text-charcoal/60 mt-0.5">Tax/GST: {enq.taxId}</p>}
              </div>

              <div>
                <span className="text-charcoal/50 text-[10px] uppercase font-bold block mb-1">
                  Products of Interest
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {enq.productInterests.map((item, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full bg-white border border-parchment text-[10px] font-medium text-charcoal"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Buyer Message */}
            {enq.message && (
              <div>
                <span className="text-[10px] uppercase text-charcoal/50 font-bold block mb-1">
                  Client Project Specifications
                </span>
                <p className="text-xs text-charcoal/80 leading-relaxed bg-white p-3.5 rounded-xl border border-parchment font-light">
                  &ldquo;{enq.message}&rdquo;
                </p>
              </div>
            )}

            {/* Internal Curator Notes */}
            <div className="pt-2">
              <span className="text-[10px] uppercase text-charcoal/50 font-bold block mb-1">
                Internal Trade Notes &amp; Follow-up Log
              </span>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={activeNotes[enq.id] || ''}
                  onChange={(e) =>
                    setActiveNotes({ ...activeNotes, [enq.id]: e.target.value })
                  }
                  placeholder="e.g. Sent catalogue and tier 2 quotation on Nov 4..."
                  className="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                />
                <button
                  onClick={() => handleSaveNotes(enq.id)}
                  className="px-4 py-2 bg-charcoal text-white rounded-xl text-xs font-semibold hover:bg-terracotta transition-colors flex items-center space-x-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
