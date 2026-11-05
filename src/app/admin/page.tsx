'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  Package,
  ShoppingCart,
  Building2,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Plus,
} from 'lucide-react';
import { store } from '@/lib/store';
import { Order, Product, WholesaleEnquiry, OrderStatus } from '@/types';

export default function AdminOverviewPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [wholesale, setWholesale] = useState<WholesaleEnquiry[]>([]);

  useEffect(() => {
    setOrders(store.getOrders());
    setProducts(store.getProducts());
    setWholesale(store.getWholesaleEnquiries());
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'confirmed');
  const lowStockProducts = products.filter((p) => p.stock <= 4);
  const newWholesale = wholesale.filter((w) => w.status === 'new');

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    store.updateOrderStatus(orderId, newStatus);
    setOrders(store.getOrders());
  };

  return (
    <div className="space-y-8">
      {/* Top Greeting & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">
            Atelier Executive Summary
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-1">
            Dashboard Overview
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/products?action=create"
            className="px-4 py-2.5 rounded-xl bg-terracotta text-white font-semibold text-xs uppercase tracking-wider hover:bg-terracotta-dark transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            href="/admin/wholesale"
            className="px-4 py-2.5 rounded-xl border border-parchment bg-white text-charcoal font-semibold text-xs uppercase tracking-wider hover:bg-parchment/60 transition-colors"
          >
            Review Inquiries
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="bg-ivory-50 rounded-2xl border border-parchment p-6 shadow-craft space-y-2">
          <div className="flex items-center justify-between text-charcoal/60 text-xs">
            <span>Gross Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-forest/10 text-forest flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-forest font-semibold flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>Active Loom Sales</span>
          </span>
        </div>

        {/* Metric 2 */}
        <div className="bg-ivory-50 rounded-2xl border border-parchment p-6 shadow-craft space-y-2">
          <div className="flex items-center justify-between text-charcoal/60 text-xs">
            <span>Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-indigo/10 text-indigo flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            {orders.length}
          </div>
          <span className="text-[11px] text-charcoal/60">
            {pendingOrders.length} pending fulfillment
          </span>
        </div>

        {/* Metric 3 */}
        <div className="bg-ivory-50 rounded-2xl border border-parchment p-6 shadow-craft space-y-2">
          <div className="flex items-center justify-between text-charcoal/60 text-xs">
            <span>Loom Products</span>
            <div className="w-8 h-8 rounded-lg bg-turmeric/15 text-turmeric-dark flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            {products.length}
          </div>
          <span className="text-[11px] text-terracotta font-medium flex items-center space-x-1">
            <AlertTriangle className="w-3 h-3" />
            <span>{lowStockProducts.length} low in atelier stock</span>
          </span>
        </div>

        {/* Metric 4 */}
        <div className="bg-ivory-50 rounded-2xl border border-parchment p-6 shadow-craft space-y-2">
          <div className="flex items-center justify-between text-charcoal/60 text-xs">
            <span>B2B Wholesale</span>
            <div className="w-8 h-8 rounded-lg bg-charcoal/10 text-charcoal flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            {wholesale.length}
          </div>
          <span className="text-[11px] text-terracotta font-semibold">
            {newWholesale.length} new incoming inquiries
          </span>
        </div>
      </div>

      {/* Recent Orders Management Table */}
      <div className="bg-ivory-50 rounded-3xl border border-parchment shadow-craft overflow-hidden p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-medium text-charcoal">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-charcoal/60 mt-0.5">
              Live updates directly modify courier dispatch and order history.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs text-terracotta font-semibold hover:underline flex items-center space-x-1"
          >
            <span>View All Fulfillment &rarr;</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-charcoal">
            <thead className="bg-parchment/40 text-charcoal/60 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Order Ref</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Fulfillment Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment/60">
              {orders.slice(0, 5).map((ord) => (
                <tr key={ord.id} className="hover:bg-white/60 transition-colors">
                  <td className="p-3 font-mono font-bold text-charcoal">
                    {ord.orderNumber}
                  </td>
                  <td className="p-3">
                    <span className="font-medium block">{ord.customerName}</span>
                    <span className="text-[11px] text-charcoal/50">{ord.shippingAddress.city}</span>
                  </td>
                  <td className="p-3 text-charcoal/70">
                    {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                  </td>
                  <td className="p-3 font-serif font-bold text-charcoal">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                      className={`text-xs px-2.5 py-1 rounded-lg border focus:outline-none ${
                        ord.status === 'delivered'
                          ? 'bg-forest/15 border-forest text-forest font-semibold'
                          : ord.status === 'processing'
                          ? 'bg-turmeric-50 border-turmeric text-turmeric-dark font-semibold'
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
                  <td className="p-3 text-charcoal/50">
                    {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Grid: Low Stock Alert & Incoming Wholesale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Low Stock Atelier Alert */}
        <div className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-8 shadow-craft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-charcoal flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-terracotta" />
              <span>Low Loom Stock Alert (&le; 4)</span>
            </h3>
            <Link href="/admin/products" className="text-xs text-terracotta font-semibold hover:underline">
              Manage Inventory
            </Link>
          </div>

          <div className="divide-y divide-parchment/60">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-serif font-medium text-charcoal">{p.name}</h4>
                  <span className="text-[10px] text-terracotta uppercase">{p.craftType}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-bold">
                  {p.stock} remaining
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Incoming Wholesale Inquiries */}
        <div className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-8 shadow-craft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-charcoal flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-indigo" />
              <span>Wholesale Buyer Inquiries</span>
            </h3>
            <Link href="/admin/wholesale" className="text-xs text-terracotta font-semibold hover:underline">
              View All ({wholesale.length})
            </Link>
          </div>

          <div className="divide-y divide-parchment/60">
            {wholesale.slice(0, 3).map((w) => (
              <div key={w.id} className="py-3 text-xs space-y-1">
                <div className="flex items-center justify-between font-medium">
                  <span className="text-charcoal">{w.businessName}</span>
                  <span className="px-2 py-0.5 rounded-full bg-turmeric-50 text-turmeric-dark font-semibold text-[10px] capitalize">
                    {w.status}
                  </span>
                </div>
                <p className="text-charcoal/60 text-[11px]">
                  Contact: {w.contactPerson} ({w.city}) &bull; Volume: {w.estimatedQuantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
