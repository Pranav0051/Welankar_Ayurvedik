import { useState, useEffect } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct, subscribeStore } from "../../services/store";
import type { Product } from "../../data/products";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConcern, setSelectedConcern] = useState("all");

  // Drawer / Modal State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formNameHi, setFormNameHi] = useState("");
  const [formNameMr, setFormNameMr] = useState("");
  const [formConcern, setFormConcern] = useState<Product["concern"]>("digestion");
  const [formPrice, setFormPrice] = useState(299);
  const [formStock, setFormStock] = useState(30);
  const [formWeight, setFormWeight] = useState("100g");
  const [formImage, setFormImage] = useState("");
  const [formTag, setFormTag] = useState("");
  const [formTagline, setFormTagline] = useState("");
  const [formIngredients, setFormIngredients] = useState("");
  const [formDosage, setFormDosage] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDescHi, setFormDescHi] = useState("");
  const [formDescMr, setFormDescMr] = useState("");
  const [formActive, setFormActive] = useState(true);

  useEffect(() => {
    return subscribeStore(() => {
      setProducts(getProducts());
    });
  }, []);

  const filtered = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.name_hi && p.name_hi.includes(searchQuery)) ||
      (p.name_mr && p.name_mr.includes(searchQuery));
    const matchesConcern = selectedConcern === "all" || p.concern === selectedConcern;
    return matchesSearch && matchesConcern;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormName("");
    setFormNameHi("");
    setFormNameMr("");
    setFormConcern("digestion");
    setFormPrice(299);
    setFormStock(30);
    setFormWeight("100g");
    setFormImage("https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&h=400&fit=crop&auto=format");
    setFormTag("");
    setFormTagline("Classical Ayurvedic Formulation");
    setFormIngredients("Amalaki, Haritaki, Bibhitaki");
    setFormDosage("1 tsp with warm water before sleep");
    setFormDesc("");
    setFormDescHi("");
    setFormDescMr("");
    setFormActive(true);
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingId(p.id);
    setFormName(p.name);
    setFormNameHi(p.name_hi || "");
    setFormNameMr(p.name_mr || "");
    setFormConcern(p.concern);
    setFormPrice(p.price);
    setFormStock(p.stock);
    setFormWeight(p.weight);
    setFormImage(p.image);
    setFormTag(p.tag || "");
    setFormTagline(p.tagline);
    setFormIngredients(p.ingredients ? p.ingredients.join(", ") : "");
    setFormDosage(p.dosage);
    setFormDesc(p.description);
    setFormDescHi(p.description_hi || "");
    setFormDescMr(p.description_mr || "");
    setFormActive(p.active);
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formName,
      name_hi: formNameHi,
      name_mr: formNameMr,
      slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      concern: formConcern,
      price: Number(formPrice),
      stock: Number(formStock),
      weight: formWeight,
      image: formImage || "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&h=400&fit=crop&auto=format",
      tag: formTag,
      tagline: formTagline,
      ingredients: formIngredients.split(",").map(s => s.trim()).filter(Boolean),
      dosage: formDosage,
      description: formDesc,
      description_hi: formDescHi,
      description_mr: formDescMr,
      longDescription: formDesc,
      active: formActive,
    };

    if (editingId) {
      updateProduct(editingId, payload);
    } else {
      addProduct(payload);
    }

    setIsDrawerOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product from the apothecary database?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#DDD0B5] pb-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#2C4A3B]">
            Product Catalogue Manager
          </h1>
          <p className="text-xs text-[#3F2A3D]/75 mt-0.5">
            Full CRUD operations, multilingual fields (EN/HI/MR), prices & inventory
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="mt-4 sm:mt-0 px-4 py-2.5 bg-[#2C4A3B] text-[#D9A404] rounded-xl font-heading font-bold text-xs hover:bg-[#1b2d23] shadow-md transition-all flex items-center space-x-1"
        >
          <span>➕ Add New Product</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#F4ECDC] border-2 border-[#DDD0B5] p-4 rounded-xl flex flex-col sm:flex-row gap-4 justify-between items-center text-xs">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search products by English, Hindi, or Marathi name..."
          className="w-full sm:w-80 bg-[#EFE6D0] border border-[#DDD0B5] rounded-lg p-2.5 text-xs text-[#3F2A3D]"
        />

        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#2C4A3B]">Concern:</span>
          <select
            value={selectedConcern}
            onChange={e => setSelectedConcern(e.target.value)}
            className="bg-[#EFE6D0] border border-[#DDD0B5] rounded-lg p-2 text-xs font-semibold text-[#2C4A3B]"
          >
            <option value="all">All Concerns</option>
            <option value="stress">Stress</option>
            <option value="digestion">Digestion</option>
            <option value="immunity">Immunity</option>
            <option value="skin">Skin</option>
            <option value="sleep">Sleep</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#F4ECDC] border-2 border-[#DDD0B5] rounded-2xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#3F2A3D]">
            <thead className="bg-[#2C4A3B] text-[#EFE6D0] font-heading font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">ID</th>
                <th className="p-3.5">Image</th>
                <th className="p-3.5">Product Name (EN / HI / MR)</th>
                <th className="p-3.5">Concern</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Stock</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD0B5]">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-[#EFE6D0]/80 transition-colors">
                  <td className="p-3.5 font-mono text-[11px]">#{p.id}</td>
                  <td className="p-3.5">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 object-cover rounded-md border border-[#DDD0B5]"
                    />
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-[#2C4A3B] block">{p.name}</span>
                    <span className="text-[10px] text-[#A85C32] block">
                      {p.name_hi || "—"} / {p.name_mr || "—"}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="bg-[#EFE6D0] border border-[#DDD0B5] text-[#2C4A3B] px-2 py-0.5 rounded font-semibold text-[10px] uppercase">
                      {p.concern}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-[#2C4A3B]">₹{p.price}</td>
                  <td className="p-3.5">
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        p.stock < 15
                          ? "bg-[#A85C32] text-[#EFE6D0]"
                          : "bg-emerald-800 text-emerald-100"
                      }`}
                    >
                      {p.stock} units
                    </span>
                  </td>
                  <td className="p-3.5">
                    {p.active ? (
                      <span className="text-emerald-700 font-bold">● Active</span>
                    ) : (
                      <span className="text-gray-500 font-bold">○ Inactive</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="px-2.5 py-1 bg-[#2C4A3B] text-[#D9A404] rounded font-bold hover:bg-[#1b2d23]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-2.5 py-1 bg-red-800 text-red-100 rounded font-bold hover:bg-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Drawer Modal */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-[#F4ECDC] border-l-4 border-[#2C4A3B] w-full max-w-xl h-full p-6 overflow-y-auto shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-[#DDD0B5] pb-3">
              <h2 className="font-heading text-xl font-bold text-[#2C4A3B]">
                {editingId ? `Edit Product #${editingId}` : "Create New Ayurvedic Product"}
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-[#2C4A3B] font-bold text-lg hover:text-red-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#2C4A3B] mb-1">
                    Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2C4A3B] mb-1">
                    Name (Hindi)
                  </label>
                  <input
                    type="text"
                    value={formNameHi}
                    onChange={e => setFormNameHi(e.target.value)}
                    placeholder="हिंदी नाम"
                    className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2C4A3B] mb-1">
                    Name (Marathi)
                  </label>
                  <input
                    type="text"
                    value={formNameMr}
                    onChange={e => setFormNameMr(e.target.value)}
                    placeholder="मराठी नाव"
                    className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#2C4A3B] mb-1">
                    Concern Category *
                  </label>
                  <select
                    value={formConcern}
                    onChange={e => setFormConcern(e.target.value as any)}
                    className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs font-semibold"
                  >
                    <option value="stress">Stress</option>
                    <option value="digestion">Digestion</option>
                    <option value="immunity">Immunity</option>
                    <option value="skin">Skin</option>
                    <option value="sleep">Sleep</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#2C4A3B] mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={e => setFormPrice(Number(e.target.value))}
                    className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2C4A3B] mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={e => setFormStock(Number(e.target.value))}
                    className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2C4A3B] mb-1">
                    Weight / Volume
                  </label>
                  <input
                    type="text"
                    value={formWeight}
                    onChange={e => setFormWeight(e.target.value)}
                    placeholder="e.g. 100g or 200ml"
                    className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2C4A3B] mb-1">
                    Tag / Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={formTag}
                    onChange={e => setFormTag(e.target.value)}
                    placeholder="e.g. Best Seller"
                    className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2C4A3B] mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formImage}
                  onChange={e => setFormImage(e.target.value)}
                  className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C4A3B] mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={e => setFormTagline(e.target.value)}
                  className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C4A3B] mb-1">
                  Key Ingredients (comma separated)
                </label>
                <input
                  type="text"
                  value={formIngredients}
                  onChange={e => setFormIngredients(e.target.value)}
                  placeholder="Amalaki, Haritaki, Bibhitaki"
                  className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C4A3B] mb-1">
                  Dosage Instructions
                </label>
                <input
                  type="text"
                  value={formDosage}
                  onChange={e => setFormDosage(e.target.value)}
                  className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-[#2C4A3B]">
                  Description (English / Hindi / Marathi)
                </label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  placeholder="English description..."
                  className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                />
                <textarea
                  rows={2}
                  value={formDescHi}
                  onChange={e => setFormDescHi(e.target.value)}
                  placeholder="हिंदी विवरण..."
                  className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                />
                <textarea
                  rows={2}
                  value={formDescMr}
                  onChange={e => setFormDescMr(e.target.value)}
                  placeholder="मराठी विवरण..."
                  className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="formActive"
                  checked={formActive}
                  onChange={e => setFormActive(e.target.checked)}
                  className="accent-[#2C4A3B] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="formActive" className="font-bold text-[#2C4A3B] cursor-pointer">
                  Product Active & Visible on Storefront
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2C4A3B] text-[#D9A404] rounded font-bold text-xs hover:bg-[#1b2d23]"
                >
                  {editingId ? "Save Changes" : "Publish Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
