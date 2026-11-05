'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Search,
  ShoppingCart,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  Edit2,
  Save,
  X,
} from 'lucide-react';
import { store } from '@/lib/store';
import { Order, OrderStatus } from '@/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Tracking edit state
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [carrierInput, setCarrierInput] = useState('');
  const [trackingInput, setTrackingInput] = useState('');

  useEffect(() => {
    setOrders(store.getOrders());
  }, []);

  const refreshOrders = () => {
    setOrders(store.getOrders());
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    store.updateOrderStatus(orderId, newStatus);
    refreshOrders();
  };

  const handleStartEditTracking = (ord: Order) => {
    setEditingOrderId(ord.id);
    setCarrierInput(ord.carrier || 'DTDC Express Air');
    setTrackingInput(ord.trackingNumber || `DTDC-IND-${Math.floor(1000000 + Math.random() * 9000000)}`);
  };

  const handleSaveTracking = (orderId: string) => {
    store.updateOrderStatus(orderId, 'shipped', {
      carrier: carrierInput,
      trackingNumber: trackingInput,
    });
    setEditingOrderId(null);
    refreshOrders();
  };

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">
            Order Fulfillment &amp; Courier Logistics
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-1">
            Orders ({orders.length})
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 bg-ivory-50 p-1.5 rounded-2xl border border-parchment overflow-x-auto text-xs">
          {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl capitalize font-medium transition-all ${
                statusFilter === st
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-ivory-50 rounded-3xl border border-parchment shadow-craft overflow-hidden p-6 sm:p-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-charcoal">
            <thead className="bg-parchment/40 text-charcoal/60 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Order Ref</th>
                <th className="p-3">Customer &amp; Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Items &amp; Amount</th>
                <th className="p-3">Courier Logistics</th>
                <th className="p-3">Fulfillment Status</th>
                <th className="p-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment/60">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/60 transition-colors">
                  <td className="p-3">
                    <span className="font-mono font-bold text-charcoal block">{ord.orderNumber}</span>
                    <span className="text-[10px] text-charcoal/50">
                      {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-medium block">{ord.customerName}</span>
                    <span className="text-[11px] text-charcoal/60">{ord.customerPhone}</span>
                  </td>
                  <td className="p-3 max-w-xs text-charcoal/70">
                    <p className="truncate">{ord.shippingAddress.streetAddress}</p>
                    <p className="text-[10px] text-charcoal/50">
                      {ord.shippingAddress.city}, {ord.shippingAddress.state} - {ord.shippingAddress.pincode}
                    </p>
                  </td>
                  <td className="p-3">
                    <span className="font-serif font-bold text-charcoal block">
                      ₹{ord.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-charcoal/50">
                      {ord.items.length} {ord.items.length === 1 ? 'creation' : 'creations'}
                    </span>
                  </td>
                  <td className="p-3">
                    {editingOrderId === ord.id ? (
                      <div className="space-y-1.5 p-2 bg-white rounded-xl border border-parchment">
                        <input
                          type="text"
                          value={carrierInput}
                          onChange={(e) => setCarrierInput(e.target.value)}
                          placeholder="Carrier"
                          className="w-full text-[10px] px-2 py-1 rounded border border-parchment"
                        />
                        <input
                          type="text"
                          value={trackingInput}
                          onChange={(e) => setTrackingInput(e.target.value)}
                          placeholder="AWB Number"
                          className="w-full text-[10px] px-2 py-1 rounded border border-parchment"
                        />
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleSaveTracking(ord.id)}
                            className="px-2 py-0.5 rounded bg-forest text-white text-[10px] font-semibold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingOrderId(null)}
                            className="px-2 py-0.5 rounded border border-parchment text-[10px]"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : ord.trackingNumber ? (
                      <div className="flex items-center space-x-1.5">
                        <Truck className="w-3.5 h-3.5 text-terracotta" />
                        <div>
                          <span className="font-semibold text-charcoal block text-[11px]">{ord.carrier}</span>
                          <code className="text-[10px] text-charcoal/60">{ord.trackingNumber}</code>
                        </div>
                        <button
                          onClick={() => handleStartEditTracking(ord)}
                          className="text-charcoal/40 hover:text-charcoal ml-1"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStartEditTracking(ord)}
                        className="text-[11px] text-terracotta hover:underline font-semibold flex items-center space-x-1"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Assign AWB</span>
                      </button>
                    )}
                  </td>
                  <td className="p-3">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold focus:outline-none ${
                        ord.status === 'delivered'
                          ? 'bg-forest/15 border-forest text-forest'
                          : ord.status === 'processing'
                          ? 'bg-turmeric-50 border-turmeric text-turmeric-dark'
                          : ord.status === 'shipped'
                          ? 'bg-indigo/15 border-indigo text-indigo'
                          : 'bg-white border-parchment text-charcoal'
                      }`}
                    >
                      <option value="pending">pending</option>
                      <option value="confirmed">confirmed</option>
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="px-2.5 py-1 rounded-lg border border-parchment bg-white hover:bg-parchment/60 text-xs font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm">
          <div className="bg-ivory-50 rounded-3xl border border-parchment shadow-2xl w-full max-w-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-parchment pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-terracotta font-bold">
                  Order Dossier
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-medium">
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-charcoal/60 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-parchment/40 p-4 rounded-2xl border border-parchment">
              <div>
                <span className="font-semibold block text-charcoal">Customer:</span>
                <p>{selectedOrder.customerName}</p>
                <p>{selectedOrder.customerEmail}</p>
                <p>{selectedOrder.customerPhone}</p>
              </div>
              <div>
                <span className="font-semibold block text-charcoal">Delivery Address:</span>
                <p>{selectedOrder.shippingAddress.streetAddress}</p>
                <p>
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                </p>
                <p>{selectedOrder.shippingAddress.country}</p>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-sm font-semibold text-charcoal mb-3">Order Items</h4>
              <div className="divide-y divide-parchment text-xs">
                {selectedOrder.items.map((it) => (
                  <div key={it.id} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-12 rounded bg-parchment border border-parchment overflow-hidden">
                        <Image src={it.productImage} alt={it.productName} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-medium text-charcoal block">{it.productName}</span>
                        {it.variantName && (
                          <span className="text-[10px] text-terracotta">{it.variantName}</span>
                        )}
                        <span className="text-charcoal/60 text-[11px]">Qty: {it.quantity}</span>
                      </div>
                    </div>
                    <span className="font-serif font-bold text-charcoal">
                      ₹{it.lineTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-parchment text-xs flex justify-between font-bold text-charcoal">
              <span>Total Amount Paid</span>
              <span>₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
