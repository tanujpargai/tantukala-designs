import {
  Product,
  Category,
  Collection,
  Order,
  OrderStatus,
  WholesaleEnquiry,
  ArtisanStory,
  JournalPost,
  SiteSettings,
} from '@/types';
import {
  initialCategories,
  initialCollections,
  initialProducts,
  initialArtisans,
  initialJournalPosts,
  initialSiteSettings,
} from '../data/initialData';

// Initial sample orders so the Admin dashboard is immediately rich and informative
const initialOrders: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'TK-2026-9481',
    customerName: 'Ananya Deshmukh',
    customerEmail: 'ananya.d@heritage.in',
    customerPhone: '+91 98201 44552',
    shippingAddress: {
      fullName: 'Ananya Deshmukh',
      phone: '+91 98201 44552',
      streetAddress: 'Flat 402, Samudra Towers, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018',
      country: 'India',
    },
    items: [
      {
        id: 'item-101-1',
        productId: 'prod-002',
        productName: 'Sujni Embroidered Tussar Silk Saree',
        productImage: '/images/kantha.avif',
        variantName: 'Natural Warm Gold',
        price: 17500,
        quantity: 1,
        lineTotal: 17500,
      },
      {
        id: 'item-101-2',
        productId: 'prod-004',
        productName: 'Bela Teak Block-Printed Cotton Runner Set',
        productImage: '/images/bela.avif',
        price: 4950,
        quantity: 1,
        lineTotal: 4950,
      },
    ],
    subtotal: 22450,
    discountAmount: 2245,
    shippingFee: 0,
    taxAmount: 0,
    totalAmount: 20205,
    status: 'delivered',
    paymentStatus: 'captured',
    paymentMethod: 'Razorpay UPI (Axis Bank)',
    razorpayOrderId: 'order_Otk98172hsa',
    razorpayPaymentId: 'pay_Plo89127391',
    trackingNumber: 'DTDC-IND-8912304',
    carrier: 'DTDC Express Air',
    createdAt: '2026-10-28T14:32:00Z',
    updatedAt: '2026-10-31T11:20:00Z',
  },
  {
    id: 'ord-102',
    orderNumber: 'TK-2026-9532',
    customerName: 'Vikramaditya Roy',
    customerEmail: 'v.roy@archstudio.org',
    customerPhone: '+91 98110 33819',
    shippingAddress: {
      fullName: 'Vikramaditya Roy',
      phone: '+91 98110 33819',
      streetAddress: 'Villa 14, Magnolia Enclave, Golf Course Road',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
      country: 'India',
    },
    items: [
      {
        id: 'item-102-1',
        productId: 'prod-001',
        productName: 'Tree of Life Sacred Mithila Art Panel',
        productImage: '/images/sujni.avif',
        variantName: 'Teakwood Shadow Box Frame',
        price: 11200,
        quantity: 1,
        lineTotal: 11200,
      },
    ],
    subtotal: 11200,
    discountAmount: 0,
    shippingFee: 0,
    taxAmount: 0,
    totalAmount: 11200,
    status: 'processing',
    paymentStatus: 'captured',
    paymentMethod: 'Razorpay NetBanking (HDFC)',
    razorpayOrderId: 'order_Otk98199xyz',
    razorpayPaymentId: 'pay_Plo89199201',
    trackingNumber: 'BLUEDART-8819230',
    carrier: 'BlueDart Surface Heavy',
    createdAt: '2026-11-02T09:15:00Z',
    updatedAt: '2026-11-03T10:00:00Z',
  },
  {
    id: 'ord-103',
    orderNumber: 'TK-2026-9601',
    customerName: 'Meera Sengupta',
    customerEmail: 'meera.s@kolkatart.com',
    customerPhone: '+91 94330 87112',
    shippingAddress: {
      fullName: 'Meera Sengupta',
      phone: '+91 94330 87112',
      streetAddress: '72B, Southern Avenue, Lake Area',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700029',
      country: 'India',
    },
    items: [
      {
        id: 'item-103-1',
        productId: 'prod-003',
        productName: 'Nomadic Rabari Hand-Mirrored Stole',
        productImage: '/images/rabari.avif',
        price: 10800,
        quantity: 1,
        lineTotal: 10800,
      },
    ],
    subtotal: 10800,
    discountAmount: 1000,
    shippingFee: 0,
    taxAmount: 0,
    totalAmount: 9800,
    status: 'confirmed',
    paymentStatus: 'captured',
    paymentMethod: 'Razorpay Cards (Visa Signature)',
    razorpayOrderId: 'order_Otk98201abc',
    razorpayPaymentId: 'pay_Plo89201332',
    createdAt: '2026-11-04T16:45:00Z',
    updatedAt: '2026-11-04T16:45:00Z',
  },
];

const initialWholesale: WholesaleEnquiry[] = [
  {
    id: 'wh-101',
    businessName: 'Virasat Luxury Concept Boutique',
    contactPerson: 'Sanjana Mehra',
    email: 'sanjana@virasatcrafts.com',
    phone: '+91 98102 77811',
    businessType: 'Retail Boutique / Gallery',
    country: 'India',
    city: 'New Delhi & Jaipur',
    taxId: '07AAACV9812K1Z9',
    estimatedQuantity: '50 - 100 units/quarter',
    productInterests: ['Madhubani Art Panels', 'Heritage Handloom Sarees', 'Artisanal Dupattas & Stoles'],
    message: 'We operate two luxury design concept boutiques in Delhi (Mehrauli) and Jaipur (C-Scheme). We wish to curate an exclusive seasonal capsule of Tantukala Madhubani framed panels and Sujni silk sarees for our upcoming bridal salon exhibition.',
    status: 'quoted',
    internalNotes: 'Sent sample catalogue and wholesale pricing tier B on Nov 2. Follow-up scheduled with founder next week.',
    createdAt: '2026-10-29T15:20:00Z',
  },
  {
    id: 'wh-102',
    businessName: 'Aura Home & Living Pte Ltd',
    contactPerson: 'Rachel Tan',
    email: 'rachel@aurahome.sg',
    phone: '+65 6789 2201',
    businessType: 'Interior Design Firm & Concept Store',
    country: 'Singapore',
    city: 'Singapore',
    taxId: 'UEN201809182A',
    estimatedQuantity: '100 - 250 units',
    productInterests: ['Living & Interior Textiles', 'Bela Block Print', 'Bengal Kantha Throws'],
    message: 'Seeking artisanal table linens and Kantha throws for a hospitality boutique hotel project in Sentosa, Singapore. Need custom color palettes in terracotta and warm parchment.',
    status: 'new',
    internalNotes: 'New international enquiry. Review export shipping terms and MOQ.',
    createdAt: '2026-11-03T11:10:00Z',
  },
];

const STORAGE_KEYS = {
  PRODUCTS: 'tantukala_products_v1',
  CATEGORIES: 'tantukala_categories_v1',
  COLLECTIONS: 'tantukala_collections_v1',
  ORDERS: 'tantukala_orders_v1',
  WHOLESALE: 'tantukala_wholesale_v1',
  ARTISANS: 'tantukala_artisans_v1',
  JOURNAL: 'tantukala_journal_v1',
  SETTINGS: 'tantukala_settings_v1',
  SUBSCRIBERS: 'tantukala_subscribers_v1',
};

// Safe helper to read from localStorage or return fallback
function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) {
      window.localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

// Safe helper to write to localStorage
function setStored<T>(key: string, val: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
}

// Memory cache for SSR/Server routes
let serverProducts = [...initialProducts];
let serverOrders = [...initialOrders];
let serverWholesale = [...initialWholesale];
let serverSubscribers: string[] = ['care@tantukaladesigns.com', 'collector@mithila.art'];
let serverSettings = { ...initialSiteSettings };

export const store = {
  // PRODUCTS
  getProducts: (): Product[] => {
    return getStored<Product[]>(STORAGE_KEYS.PRODUCTS, serverProducts);
  },

  getProductBySlug: (slug: string): Product | undefined => {
    const prods = store.getProducts();
    return prods.find((p) => p.slug === slug);
  },

  getProductById: (id: string): Product | undefined => {
    const prods = store.getProducts();
    return prods.find((p) => p.id === id);
  },

  createProduct: (productData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const prods = store.getProducts();
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newProduct, ...prods];
    setStored(STORAGE_KEYS.PRODUCTS, updated);
    serverProducts = updated;
    return newProduct;
  },

  updateProduct: (id: string, updates: Partial<Product>): Product | null => {
    const prods = store.getProducts();
    const index = prods.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updatedProduct = { ...prods[index], ...updates };
    prods[index] = updatedProduct;
    setStored(STORAGE_KEYS.PRODUCTS, prods);
    serverProducts = prods;
    return updatedProduct;
  },

  deleteProduct: (id: string): boolean => {
    const prods = store.getProducts();
    const filtered = prods.filter((p) => p.id !== id);
    setStored(STORAGE_KEYS.PRODUCTS, filtered);
    serverProducts = filtered;
    return true;
  },

  // CATEGORIES
  getCategories: (): Category[] => {
    return getStored<Category[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  },

  // COLLECTIONS
  getCollections: (): Collection[] => {
    return getStored<Collection[]>(STORAGE_KEYS.COLLECTIONS, initialCollections);
  },

  getCollectionBySlug: (slug: string): Collection | undefined => {
    const cols = store.getCollections();
    return cols.find((c) => c.slug === slug);
  },

  // ORDERS
  getOrders: (): Order[] => {
    return getStored<Order[]>(STORAGE_KEYS.ORDERS, serverOrders);
  },

  getOrderById: (id: string): Order | undefined => {
    const orders = store.getOrders();
    return orders.find((o) => o.id === id);
  },

  getOrderByNumber: (orderNumber: string): Order | undefined => {
    const orders = store.getOrders();
    return orders.find((o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase());
  },

  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order => {
    const orders = store.getOrders();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `TK-2026-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newOrder, ...orders];
    setStored(STORAGE_KEYS.ORDERS, updated);
    serverOrders = updated;

    // Deduct inventory
    const prods = store.getProducts();
    newOrder.items.forEach((item) => {
      const p = prods.find((prod) => prod.id === item.productId);
      if (p) {
        p.stock = Math.max(0, p.stock - item.quantity);
      }
    });
    setStored(STORAGE_KEYS.PRODUCTS, prods);
    serverProducts = prods;

    return newOrder;
  },

  updateOrderStatus: (id: string, status: OrderStatus, tracking?: { carrier?: string; trackingNumber?: string }): Order | null => {
    const orders = store.getOrders();
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return null;

    const updatedOrder: Order = {
      ...orders[index],
      status,
      ...(tracking?.carrier ? { carrier: tracking.carrier } : {}),
      ...(tracking?.trackingNumber ? { trackingNumber: tracking.trackingNumber } : {}),
      updatedAt: new Date().toISOString(),
    };
    orders[index] = updatedOrder;
    setStored(STORAGE_KEYS.ORDERS, orders);
    serverOrders = orders;
    return updatedOrder;
  },

  // WHOLESALE
  getWholesaleEnquiries: (): WholesaleEnquiry[] => {
    return getStored<WholesaleEnquiry[]>(STORAGE_KEYS.WHOLESALE, serverWholesale);
  },

  createWholesaleEnquiry: (data: Omit<WholesaleEnquiry, 'id' | 'status' | 'createdAt'>): WholesaleEnquiry => {
    const enquiries = store.getWholesaleEnquiries();
    const newEnquiry: WholesaleEnquiry = {
      ...data,
      id: `wh-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    const updated = [newEnquiry, ...enquiries];
    setStored(STORAGE_KEYS.WHOLESALE, updated);
    serverWholesale = updated;
    return newEnquiry;
  },

  updateWholesaleStatus: (id: string, status: WholesaleEnquiry['status'], internalNotes?: string): WholesaleEnquiry | null => {
    const enquiries = store.getWholesaleEnquiries();
    const index = enquiries.findIndex((e) => e.id === id);
    if (index === -1) return null;

    const updated = {
      ...enquiries[index],
      status,
      ...(internalNotes !== undefined ? { internalNotes } : {}),
    };
    enquiries[index] = updated;
    setStored(STORAGE_KEYS.WHOLESALE, enquiries);
    serverWholesale = enquiries;
    return updated;
  },

  // NEWSLETTER
  subscribeNewsletter: (email: string): { success: boolean; message: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const list = getStored<string[]>(STORAGE_KEYS.SUBSCRIBERS, serverSubscribers);
    if (list.includes(cleanEmail)) {
      return { success: true, message: 'You are already subscribed to the Tantukala Artisan Chronicle.' };
    }
    const updated = [...list, cleanEmail];
    setStored(STORAGE_KEYS.SUBSCRIBERS, updated);
    serverSubscribers = updated;
    return { success: true, message: 'Thank you for joining our circle of textile connoisseurs.' };
  },

  getSubscribers: (): string[] => {
    return getStored<string[]>(STORAGE_KEYS.SUBSCRIBERS, serverSubscribers);
  },

  // ARTISANS
  getArtisans: (): ArtisanStory[] => {
    return getStored<ArtisanStory[]>(STORAGE_KEYS.ARTISANS, initialArtisans);
  },

  getArtisanBySlug: (slug: string): ArtisanStory | undefined => {
    return store.getArtisans().find((a) => a.slug === slug);
  },

  // JOURNAL
  getJournalPosts: (): JournalPost[] => {
    return getStored<JournalPost[]>(STORAGE_KEYS.JOURNAL, initialJournalPosts);
  },

  getJournalBySlug: (slug: string): JournalPost | undefined => {
    return store.getJournalPosts().find((p) => p.slug === slug);
  },

  // SETTINGS
  getSettings: (): SiteSettings => {
    return getStored<SiteSettings>(STORAGE_KEYS.SETTINGS, serverSettings);
  },

  updateSettings: (updates: Partial<SiteSettings>): SiteSettings => {
    const current = store.getSettings();
    const updated = { ...current, ...updates };
    setStored(STORAGE_KEYS.SETTINGS, updated);
    serverSettings = updated;
    return updated;
  },
};
