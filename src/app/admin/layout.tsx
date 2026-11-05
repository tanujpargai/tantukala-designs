'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Layers,
  Building2,
  FileEdit,
  Settings,
  ExternalLink,
  ShieldCheck,
  LogOut,
  Bell,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, logout, quickAdminLogin } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Products & Loom', href: '/admin/products', icon: Package },
    { name: 'Orders & Fulfillment', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Wholesale B2B', href: '/admin/wholesale', icon: Building2 },
    { name: 'Collections', href: '/admin/collections', icon: Layers },
    { name: 'Content & CMS', href: '/admin/content', icon: FileEdit },
    { name: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-charcoal text-ivory-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-charcoal-dark border border-charcoal-muted p-8 rounded-3xl text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-indigo/20 text-turmeric flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-medium text-ivory-50">
              Curator Admin Authentication
            </h1>
            <p className="text-xs text-ivory-200/70 mt-2 leading-relaxed">
              This protected dashboard manages atelier inventory, order fulfillment, and wholesale contracts for Tantukala Designs.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={quickAdminLogin}
              className="w-full py-3.5 rounded-xl bg-terracotta text-white font-semibold text-xs uppercase tracking-widest hover:bg-terracotta-dark transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-turmeric" />
              <span>Authenticate as Master Curator</span>
            </button>
            <Link
              href="/"
              className="w-full block py-2 text-xs text-ivory-200/60 hover:text-white transition-colors"
            >
              Return to Public Handloom Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-charcoal text-ivory-100 border-b border-charcoal-muted sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-1.5 text-ivory-200 hover:text-white"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link href="/admin" className="flex items-center space-x-2">
              <span className="font-serif text-lg font-bold tracking-wider text-ivory-50">
                TANTUKALA
              </span>
              <span className="text-[10px] uppercase tracking-widest bg-indigo px-2 py-0.5 rounded text-white font-semibold">
                Curator CMS
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <Link
              href="/"
              target="_blank"
              className="flex items-center space-x-1.5 text-ivory-200/80 hover:text-turmeric transition-colors"
            >
              <span>Live Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <span className="text-charcoal-muted">|</span>
            <button
              onClick={logout}
              className="text-ivory-200/80 hover:text-red-400 transition-colors flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 pt-16 z-20 w-64 bg-charcoal-dark text-ivory-100 border-r border-charcoal-muted flex flex-col justify-between p-4 transition-transform lg:static lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-turmeric font-bold px-3 py-2 block">
              Atelier Management
            </span>
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-terracotta text-white shadow-sm'
                      : 'text-ivory-200/70 hover:bg-charcoal hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="p-3 bg-charcoal rounded-xl border border-charcoal-muted text-[11px] text-ivory-200/60 space-y-1">
            <p className="font-semibold text-ivory-100">Live Database Synced</p>
            <p>Role: {user?.fullName}</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
