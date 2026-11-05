export type CraftType =
  | 'Madhubani Painting'
  | 'Sujni Embroidery'
  | 'Kantha Needlework'
  | 'Rabari Mirrorwork'
  | 'Jat Cross-Stitch'
  | 'Bela Block Print'
  | 'Tussar Handloom'
  | 'Chanderi Weaving';

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  priceOverride?: number;
  stock: number;
  colorName?: string;
  colorHex?: string;
  size?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  price: number;
  salePrice?: number;
  categoryId: string;
  categoryName: string;
  collectionId: string;
  collectionName: string;
  craftType: CraftType;
  regionProvenance: string;
  material: string;
  artisanNotes: string;
  dimensions: string;
  careInstructions: string;
  stock: number;
  isFeatured: boolean;
  isBestseller: boolean;
  isPublished: boolean;
  images: string[];
  variants: ProductVariant[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  editorialStory: string;
  imageUrl: string;
  bannerUrl?: string;
  isFeatured: boolean;
  sortOrder: number;
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  lineTotal: number;
}

export interface Address {
  fullName: string;
  phone: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus =
  | 'pending'
  | 'authorized'
  | 'captured'
  | 'failed'
  | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  variantId?: string;
  variantName?: string;
  price: number;
  quantity: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  billingAddress?: Address;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WholesaleEnquiry {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  businessType: string;
  country: string;
  city: string;
  taxId?: string;
  estimatedQuantity: string;
  productInterests: string[];
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'in_progress' | 'closed';
  internalNotes?: string;
  createdAt: string;
}

export interface ArtisanStory {
  id: string;
  name: string;
  slug: string;
  craftSpecialty: string;
  villageRegion: string;
  state: string;
  experienceYears: number;
  bio: string;
  quote: string;
  portraitImage: string;
  workshopImage?: string;
  isFeatured: boolean;
  sortOrder: number;
}

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  readingTime: string;
  category: string;
  isPublished: boolean;
  publishedAt: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  supportPhone: string;
  supportEmail: string;
  currency: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  standardShippingRate: number;
  expressShippingRate: number;
  announcementActive: boolean;
  announcementText: string;
  announcementLink: string;
}
