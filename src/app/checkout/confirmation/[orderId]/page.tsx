'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { CheckCircle, Package, Truck, ArrowRight, Printer, Sparkles, MapPin } from 'lucide-react';
import { Order } from '@/types';
import { store } from '@/lib/store';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params?.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const found = store.getOrderById(orderId);
      if (found) {
        setOrder(found);
      }
    }
  }, [orderId]);

  useEffect(() => {
    // Launch festive artisanal celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B65C43', '#D5A449', '#24364A', '#435847'],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="py-32 text-center bg-ivory-100 min-h-screen">
        <h2 className="font-serif text-2xl text-charcoal">Finding your order details...</h2>
        <p className="text-xs text-charcoal/60 mt-2 mb-6">
          If your confirmation has not loaded, you can check your orders in your customer portal.
        </p>
        <Link
          href="/account"
          className="px-6 py-2.5 rounded-full bg-charcoal text-white text-xs uppercase tracking-widest"
        >
          View Account Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="py-14 sm:py-24 bg-ivory-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Celebration Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-forest/10 text-forest flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-1">
            Order Confirmed &bull; Artisanal Fulfillment Initiated
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal">
            Thank You, {order.customerName.split(' ')[0]}
          </h1>
          <p className="text-sm text-charcoal/70 mt-3 max-w-lg mx-auto font-light leading-relaxed">
            Your patronage directly empowers master weavers and craft cooperatives. A confirmation receipt has been sent to <strong className="text-charcoal">{order.customerEmail}</strong>.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-ivory-50 rounded-3xl border border-parchment shadow-craft overflow-hidden p-6 sm:p-10 space-y-8">
          {/* Top Metadata Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-parchment gap-4 text-xs">
            <div>
              <span className="text-charcoal/50 uppercase tracking-wider block text-[10px]">
                Order Reference
              </span>
              <span className="font-mono text-base font-bold text-charcoal">
                {order.orderNumber}
              </span>
            </div>
            <div>
              <span className="text-charcoal/50 uppercase tracking-wider block text-[10px]">
                Date Placed
              </span>
              <span className="text-charcoal font-medium">
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div>
              <span className="text-charcoal/50 uppercase tracking-wider block text-[10px]">
                Payment Status
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-forest/15 text-forest capitalize">
                {order.paymentStatus} via {order.paymentMethod}
              </span>
            </div>
          </div>

          {/* Delivery & Transit Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-parchment/30 p-5 rounded-2xl border border-parchment text-xs">
            <div className="space-y-1">
              <span className="font-semibold text-charcoal uppercase tracking-wider text-[10px] flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                <span>Shipping Destination</span>
              </span>
              <p className="text-charcoal font-medium">{order.shippingAddress.fullName}</p>
              <p className="text-charcoal/70">
                {order.shippingAddress.streetAddress}
                {order.shippingAddress.apartment ? `, ${order.shippingAddress.apartment}` : ''}
              </p>
              <p className="text-charcoal/70">
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <p className="text-charcoal/70">Phone: {order.shippingAddress.phone}</p>
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-charcoal uppercase tracking-wider text-[10px] flex items-center space-x-1.5">
                <Truck className="w-3.5 h-3.5 text-terracotta" />
                <span>Estimated Transit</span>
              </span>
              <p className="text-charcoal font-medium">Insured Express Courier (BlueDart / DTDC)</p>
              <p className="text-charcoal/70">Estimated Delivery: Within 3–6 business days</p>
              <p className="text-charcoal/60 text-[11px] pt-1">
                A live tracking number will be dispatched via SMS &amp; Email once the courier departs the atelier.
              </p>
            </div>
          </div>

          {/* Items Purchased */}
          <div>
            <h3 className="font-serif text-lg text-charcoal font-medium mb-4">
              Handcrafted Items in This Order
            </h3>
            <div className="divide-y divide-parchment">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-parchment border border-parchment flex-shrink-0">
                      <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-medium text-charcoal">{item.productName}</h4>
                      {item.variantName && (
                        <p className="text-xs text-terracotta">{item.variantName}</p>
                      )}
                      <p className="text-xs text-charcoal/60">
                        Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-charcoal">
                    ₹{item.lineTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Breakdown */}
          <div className="pt-4 border-t border-parchment max-w-xs ml-auto space-y-2 text-xs text-charcoal/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-forest font-medium">
                <span>Discount Applied</span>
                <span>-₹{order.discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Transit</span>
              <span>
                {order.shippingFee === 0 ? 'Complimentary' : `₹${order.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-serif font-bold text-charcoal pt-2 border-t border-parchment">
              <span>Total Paid</span>
              <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-parchment flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-terracotta transition-colors text-center inline-flex items-center justify-center space-x-2"
            >
              <span>Explore More Creations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/account"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-parchment bg-white text-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-parchment transition-colors text-center"
            >
              View Order in My Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
