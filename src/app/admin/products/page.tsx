'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  AlertTriangle,
  ArrowUpDown,
  Sparkles,
  Eye,
} from 'lucide-react';
import { store } from '@/lib/store';
import { Product, CraftType } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    shortDescription: '',
    description: '',
    price: 9500,
    salePrice: 0,
    categoryId: 'cat-madhubani',
    categoryName: 'Madhubani Art Panels',
    collectionId: 'col-madhubani-reverie',
    collectionName: 'Madhubani Reverie',
    craftType: 'Madhubani Painting' as CraftType,
    regionProvenance: 'Jitwarpur, Madhubani, Bihar',
    material: 'Natural organic mineral pigments on handcrafted rag paper',
    artisanNotes: 'Master craftsmanship created with fine bamboo twigs.',
    dimensions: '22 inches x 30 inches',
    careInstructions: 'Frame under museum anti-reflective glass.',
    stock: 8,
    isFeatured: true,
    isBestseller: false,
    isPublished: true,
    imageUrl: '/images/sujni.avif',
  });

  useEffect(() => {
    setProducts(store.getProducts());
  }, []);

  const refreshProducts = () => {
    setProducts(store.getProducts());
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      sku: `TK-${Math.floor(100 + Math.random() * 900)}`,
      shortDescription: '',
      description: '',
      price: 8500,
      salePrice: 0,
      categoryId: 'cat-madhubani',
      categoryName: 'Madhubani Art Panels',
      collectionId: 'col-madhubani-reverie',
      collectionName: 'Madhubani Reverie',
      craftType: 'Madhubani Painting',
      regionProvenance: 'Jitwarpur, Madhubani, Bihar',
      material: '100% Hand-spun Tussar Silk with Natural Mineral Dyes',
      artisanNotes: 'Master handcraft by cooperative artisans.',
      dimensions: 'Standard Atelier Specifications',
      careInstructions: 'Dry clean only. Store wrapped in unbleached muslin.',
      stock: 6,
      isFeatured: false,
      isBestseller: false,
      isPublished: true,
      imageUrl: '/images/craft-hero.avif',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      shortDescription: product.shortDescription,
      description: product.description,
      price: product.price,
      salePrice: product.salePrice || 0,
      categoryId: product.categoryId,
      categoryName: product.categoryName,
      collectionId: product.collectionId,
      collectionName: product.collectionName,
      craftType: product.craftType,
      regionProvenance: product.regionProvenance,
      material: product.material,
      artisanNotes: product.artisanNotes,
      dimensions: product.dimensions,
      careInstructions: product.careInstructions,
      stock: product.stock,
      isFeatured: product.isFeatured,
      isBestseller: product.isBestseller,
      isPublished: product.isPublished,
      imageUrl: product.images[0] || '/images/craft-hero.avif',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you wish to archive this handcrafted piece from the catalogue?')) {
      store.deleteProduct(id);
      refreshProducts();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (editingProduct) {
      store.updateProduct(editingProduct.id, {
        name: formData.name,
        slug,
        sku: formData.sku,
        shortDescription: formData.shortDescription,
        description: formData.description,
        price: Number(formData.price),
        salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        collectionId: formData.collectionId,
        collectionName: formData.collectionName,
        craftType: formData.craftType,
        regionProvenance: formData.regionProvenance,
        material: formData.material,
        artisanNotes: formData.artisanNotes,
        dimensions: formData.dimensions,
        careInstructions: formData.careInstructions,
        stock: Number(formData.stock),
        isFeatured: formData.isFeatured,
        isBestseller: formData.isBestseller,
        isPublished: formData.isPublished,
        images: [formData.imageUrl, '/images/craft-hero.avif'],
      });
    } else {
      store.createProduct({
        name: formData.name,
        slug,
        sku: formData.sku,
        shortDescription: formData.shortDescription,
        description: formData.description,
        price: Number(formData.price),
        salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        collectionId: formData.collectionId,
        collectionName: formData.collectionName,
        craftType: formData.craftType,
        regionProvenance: formData.regionProvenance,
        material: formData.material,
        artisanNotes: formData.artisanNotes,
        dimensions: formData.dimensions,
        careInstructions: formData.careInstructions,
        stock: Number(formData.stock),
        isFeatured: formData.isFeatured,
        isBestseller: formData.isBestseller,
        isPublished: formData.isPublished,
        images: [formData.imageUrl, '/images/craft-hero.avif'],
        variants: [
          {
            id: `v-${Date.now()}`,
            name: 'Standard Edition',
            sku: `${formData.sku}-STD`,
            stock: Number(formData.stock),
          },
        ],
      });
    }

    refreshProducts();
    setIsModalOpen(false);
  };

  const filtered = products.filter((p) => {
    if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.craftType.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">
            Catalog &amp; Inventory Management
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-1">
            Loom Products ({products.length})
          </h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-terracotta text-white font-semibold text-xs uppercase tracking-wider hover:bg-terracotta-dark transition-colors flex items-center space-x-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Handloom Piece</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-ivory-50 rounded-2xl border border-parchment p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, SKU, or craft..."
            className="w-full text-xs pl-9 pr-4 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta w-full sm:w-auto"
          >
            <option value="all">All Categories</option>
            <option value="cat-madhubani">Madhubani Art Panels</option>
            <option value="cat-sarees">Heritage Handloom Sarees</option>
            <option value="cat-dupattas">Artisanal Dupattas &amp; Stoles</option>
            <option value="cat-living">Living &amp; Interior Textiles</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-ivory-50 rounded-3xl border border-parchment shadow-craft overflow-hidden p-6 sm:p-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-charcoal">
            <thead className="bg-parchment/40 text-charcoal/60 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Artisanal Piece</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Craft &amp; Region</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment/60">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-white/60 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-parchment border border-parchment flex-shrink-0">
                        <Image src={prod.images[0] || '/images/craft-hero.avif'} alt={prod.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <h4 className="font-serif font-medium text-charcoal truncate">{prod.name}</h4>
                        <span className="text-[10px] text-charcoal/50">{prod.categoryName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-[11px] font-bold text-charcoal/80">
                    {prod.sku}
                  </td>
                  <td className="p-3">
                    <span className="font-medium block">{prod.craftType}</span>
                    <span className="text-[11px] text-charcoal/50">{prod.regionProvenance}</span>
                  </td>
                  <td className="p-3">
                    <span className="font-serif font-bold text-charcoal">
                      ₹{(prod.salePrice ?? prod.price).toLocaleString('en-IN')}
                    </span>
                    {prod.salePrice && (
                      <span className="text-[10px] text-charcoal/40 line-through block">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        prod.stock <= 4 ? 'bg-red-100 text-red-700' : 'bg-forest/15 text-forest'
                      }`}
                    >
                      {prod.stock} units
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        prod.isPublished ? 'bg-forest/10 text-forest' : 'bg-charcoal/10 text-charcoal/60'
                      }`}
                    >
                      {prod.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/product/${prod.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg border border-parchment hover:bg-parchment/60 text-charcoal/70"
                        title="View Live Store Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="p-1.5 rounded-lg border border-parchment hover:bg-parchment/60 text-charcoal/70"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form for Add/Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-ivory-50 rounded-3xl border border-parchment shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-parchment pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-terracotta font-bold">
                  {editingProduct ? 'Update Product' : 'New Creation Entry'}
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-medium">
                  {editingProduct ? editingProduct.name : 'Add Handcrafted Piece'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-charcoal/60 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Regular Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Sale Price (₹, optional)</label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Inventory Units *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Craft Discipline</label>
                  <select
                    value={formData.craftType}
                    onChange={(e) => setFormData({ ...formData, craftType: e.target.value as CraftType })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  >
                    <option value="Madhubani Painting">Madhubani Painting</option>
                    <option value="Sujni Embroidery">Sujni Embroidery</option>
                    <option value="Kantha Needlework">Kantha Needlework</option>
                    <option value="Rabari Mirrorwork">Rabari Mirrorwork</option>
                    <option value="Jat Cross-Stitch">Jat Cross-Stitch</option>
                    <option value="Bela Block Print">Bela Block Print</option>
                    <option value="Chanderi Weaving">Chanderi Weaving</option>
                    <option value="Tussar Handloom">Tussar Handloom</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal mb-1">Regional Provenance</label>
                  <input
                    type="text"
                    value={formData.regionProvenance}
                    onChange={(e) => setFormData({ ...formData, regionProvenance: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Material Composition</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Detailed Narrative &amp; Craft Story</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Image Asset URL</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded text-terracotta focus:ring-terracotta"
                  />
                  <span>Published on Storefront</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-terracotta focus:ring-terracotta"
                  />
                  <span>Featured Collection Piece</span>
                </label>
              </div>

              <div className="pt-4 border-t border-parchment flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-parchment bg-white hover:bg-parchment/60 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-terracotta text-white font-semibold hover:bg-terracotta-dark shadow-sm"
                >
                  {editingProduct ? 'Save Modifications' : 'Create Handloom Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
