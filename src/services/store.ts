import { Product, initialProducts } from "../data/products";
import { KnowledgeEntry, initialKnowledgeBase } from "../data/knowledgeBase";
import { Language } from "../data/i18n";

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  paymentStatus: "paid" | "pending" | "failed";
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered";
  createdAt: string;
  paymentId?: string;
}

const PRODUCTS_KEY = "ayurveda_products_v7";
const KB_KEY = "ayurveda_kb_v2";
const ORDERS_KEY = "ayurveda_orders_v2";
const LANG_KEY = "ayurveda_lang_v2";
const AUTH_KEY = "ayurveda_admin_auth_v2";

const listeners: Array<() => void> = [];

export function subscribeStore(listener: () => void) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

function notifyStore() {
  listeners.forEach(fn => fn());
}

// ---------------- PRODUCTS ----------------

export function getProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
      return initialProducts;
    }
    const parsed: Product[] = JSON.parse(raw);
    // Auto-sync image URLs with initialProducts bundled ESM assets
    const synced = parsed.map(p => {
      const match = initialProducts.find(ip => ip.id === p.id);
      if (match) {
        return { ...p, image: match.image };
      }
      return p;
    });
    return synced;
  } catch {
    return initialProducts;
  }
}

export function saveProducts(prods: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(prods));
  notifyStore();
}

export function addProduct(prod: Omit<Product, "id">): Product {
  const all = getProducts();
  const nextId = all.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;
  const newProduct: Product = { ...prod, id: nextId };
  saveProducts([...all, newProduct]);
  return newProduct;
}

export function updateProduct(id: number, updates: Partial<Product>) {
  const all = getProducts();
  const updated = all.map(p => (p.id === id ? { ...p, ...updates } : p));
  saveProducts(updated);
}

export function deleteProduct(id: number) {
  const all = getProducts();
  saveProducts(all.filter(p => p.id !== id));
}

export function bulkImportProducts(parsedRows: Partial<Product>[]): { added: number; updated: number; errors: string[] } {
  const existing = getProducts();
  let added = 0;
  let updated = 0;
  const errors: string[] = [];
  const existingMap = new Map<string, Product>();
  
  existing.forEach(p => {
    existingMap.set(p.slug.toLowerCase(), p);
    existingMap.set(p.name.toLowerCase(), p);
  });

  const nextIdStart = existing.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;
  let currentId = nextIdStart;

  const newProds = [...existing];

  parsedRows.forEach((row, idx) => {
    if (!row.name || !row.price) {
      errors.push(`Row ${idx + 1}: Missing name or price.`);
      return;
    }
    const slug = (row.slug || row.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")).replace(/(^-|-$)/g, "");
    const match = existingMap.get(slug) || existingMap.get(row.name.toLowerCase());

    const item: Product = {
      id: match ? match.id : currentId++,
      name: row.name,
      name_hi: row.name_hi || match?.name_hi || "",
      name_mr: row.name_mr || match?.name_mr || "",
      slug: slug,
      concern: (row.concern as any) || match?.concern || "digestion",
      price: Number(row.price) || 100,
      stock: Number(row.stock ?? 20),
      weight: row.weight || match?.weight || "100g",
      image: row.image || match?.image || "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&h=400&fit=crop&auto=format",
      tag: row.tag || match?.tag || "",
      tagline: row.tagline || match?.tagline || "Classical formulation",
      ingredients: Array.isArray(row.ingredients) ? row.ingredients : (row.ingredients ? String(row.ingredients).split(",") : ["Classical Herbs"]),
      dosage: row.dosage || match?.dosage || "As directed by physician",
      description: row.description || match?.description || "",
      description_hi: row.description_hi || match?.description_hi || "",
      description_mr: row.description_mr || match?.description_mr || "",
      longDescription: row.longDescription || match?.longDescription || row.description || "",
      active: row.active !== undefined ? Boolean(row.active) : true,
    };

    if (match) {
      const index = newProds.findIndex(p => p.id === match.id);
      if (index > -1) newProds[index] = item;
      updated++;
    } else {
      newProds.push(item);
      added++;
    }
  });

  saveProducts(newProds);
  return { added, updated, errors };
}

// ---------------- KNOWLEDGE BASE ----------------

export function getKnowledgeBase(): KnowledgeEntry[] {
  try {
    const raw = localStorage.getItem(KB_KEY);
    if (!raw) {
      localStorage.setItem(KB_KEY, JSON.stringify(initialKnowledgeBase));
      return initialKnowledgeBase;
    }
    const parsed: KnowledgeEntry[] = JSON.parse(raw);
    // Ensure all fresh initial entries exist in stored list
    const existingIds = new Set(parsed.map(e => e.id));
    let updated = false;
    const merged = [...parsed];
    initialKnowledgeBase.forEach(initEntry => {
      if (!existingIds.has(initEntry.id)) {
        merged.push(initEntry);
        updated = true;
      }
    });
    if (updated) {
      localStorage.setItem(KB_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch {
    return initialKnowledgeBase;
  }
}

export function saveKnowledgeBase(entries: KnowledgeEntry[]) {
  localStorage.setItem(KB_KEY, JSON.stringify(entries));
  notifyStore();
}

export function addKBEntry(entry: Omit<KnowledgeEntry, "id">): KnowledgeEntry {
  const all = getKnowledgeBase();
  const newEntry: KnowledgeEntry = { ...entry, id: `kb-${Date.now()}` };
  saveKnowledgeBase([...all, newEntry]);
  return newEntry;
}

export function updateKBEntry(id: string, updates: Partial<KnowledgeEntry>) {
  const all = getKnowledgeBase();
  saveKnowledgeBase(all.map(e => (e.id === id ? { ...e, ...updates } : e)));
}

export function deleteKBEntry(id: string) {
  const all = getKnowledgeBase();
  saveKnowledgeBase(all.filter(e => e.id !== id));
}

// ---------------- ORDERS ----------------

const initialOrders: Order[] = [
  {
    id: "AYUR-9821",
    customerName: "Dr. Ananya Sharma",
    email: "ananya@example.com",
    phone: "+91 98765 43210",
    address: "42 Heritage Marg, Malabar Hill, Mumbai, 400006",
    items: [
      { productId: 1, name: "Ashwagandha Root Powder", price: 349, qty: 2 },
      { productId: 4, name: "Brahmi Mind Oil", price: 580, qty: 1 }
    ],
    total: 1278,
    paymentStatus: "paid",
    orderStatus: "Processing",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    paymentId: "pay_Rzp982104"
  },
  {
    id: "AYUR-9820",
    customerName: "Vikram Patel",
    email: "vikram.p@example.com",
    phone: "+91 91234 56789",
    address: "18 Vasant Kunj, Sector B, New Delhi, 110070",
    items: [
      { productId: 6, name: "Chyawanprash Reserve", price: 890, qty: 1 }
    ],
    total: 890,
    paymentStatus: "paid",
    orderStatus: "Shipped",
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    paymentId: "pay_Rzp982088"
  }
];

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(initialOrders));
      return initialOrders;
    }
    return JSON.parse(raw);
  } catch {
    return initialOrders;
  }
}

export function createOrder(orderData: Omit<Order, "id" | "createdAt">): Order {
  const all = getOrders();
  const id = `AYUR-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder: Order = {
    ...orderData,
    id,
    createdAt: new Date().toISOString(),
  };
  
  // Deduct stock
  const prods = getProducts();
  orderData.items.forEach(item => {
    const p = prods.find(pr => pr.id === item.productId);
    if (p) {
      p.stock = Math.max(0, p.stock - item.qty);
    }
  });
  saveProducts(prods);

  localStorage.setItem(ORDERS_KEY, JSON.stringify([newOrder, ...all]));
  notifyStore();
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: Order["orderStatus"]) {
  const all = getOrders();
  const updated = all.map(o => (o.id === orderId ? { ...o, orderStatus: status } : o));
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  notifyStore();
}

// ---------------- LANGUAGE & AUTH ----------------

export function getLanguage(): Language {
  return (localStorage.getItem(LANG_KEY) as Language) || "EN";
}

export function setLanguage(lang: Language) {
  localStorage.setItem(LANG_KEY, lang);
  notifyStore();
}

export function isAdminAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function setAdminAuth(auth: boolean) {
  if (auth) {
    localStorage.setItem(AUTH_KEY, "true");
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
  notifyStore();
}
