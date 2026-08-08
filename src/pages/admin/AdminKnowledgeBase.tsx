import { useState, useEffect } from "react";
import { getKnowledgeBase, addKBEntry, updateKBEntry, deleteKBEntry, subscribeStore } from "../../services/store";
import type { KnowledgeEntry } from "../../data/knowledgeBase";

export default function AdminKnowledgeBase() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>(getKnowledgeBase());

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formTags, setFormTags] = useState("");
  const [formInfoEN, setFormInfoEN] = useState("");
  const [formInfoHI, setFormInfoHI] = useState("");
  const [formInfoMR, setFormInfoMR] = useState("");
  const [formProductTags, setFormProductTags] = useState("digestion");
  const [formActive, setFormActive] = useState(true);

  useEffect(() => {
    return subscribeStore(() => {
      setEntries(getKnowledgeBase());
    });
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormTags("digestion, stomach, bloating, acidity");
    setFormInfoEN("Triphala cleanses the intestinal tract gently, while Trikatu re-ignites sluggish digestion.");
    setFormInfoHI("त्रिफला आंतों की सौम्य सफाई करता है और त्रिकटु जठराग्नि को तीव्र करता है।");
    setFormInfoMR("त्रिफळा आतड्यांची सौम्य सफाई करतो आणि त्रिकटु जठराग्नि प्रदीप्त करतो.");
    setFormProductTags("digestion");
    setFormActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (entry: KnowledgeEntry) => {
    setEditingId(entry.id);
    setFormTags(entry.symptomTags.join(", "));
    setFormInfoEN(entry.infoText.EN || "");
    setFormInfoHI(entry.infoText.HI || "");
    setFormInfoMR(entry.infoText.MR || "");
    setFormProductTags(entry.productTags.join(", "));
    setFormActive(entry.active);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      symptomTags: formTags.split(",").map(s => s.trim().toLowerCase()).filter(Boolean),
      infoText: {
        EN: formInfoEN,
        HI: formInfoHI,
        MR: formInfoMR,
      },
      productTags: formProductTags.split(",").map(s => s.trim().toLowerCase()).filter(Boolean),
      active: formActive,
    };

    if (editingId) {
      updateKBEntry(editingId, payload);
    } else {
      addKBEntry(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this knowledge base entry?")) {
      deleteKBEntry(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#DDD0B5] pb-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#2C4A3B]">
            Chatbot RAG Knowledge Base Manager
          </h1>
          <p className="text-xs text-[#3F2A3D]/75 mt-0.5">
            Grounded symptom rules, multilingual text (EN/HI/MR), and linked product recommendations
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="mt-4 sm:mt-0 px-4 py-2.5 bg-[#2C4A3B] text-[#D9A404] rounded-xl font-heading font-bold text-xs hover:bg-[#1b2d23] shadow-md flex items-center space-x-1"
        >
          <span>🤖 Add Knowledge Entry</span>
        </button>
      </div>

      {/* Entries Table */}
      <div className="bg-[#F4ECDC] border-2 border-[#DDD0B5] rounded-2xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#3F2A3D]">
            <thead className="bg-[#2C4A3B] text-[#EFE6D0] font-heading font-bold uppercase text-[11px]">
              <tr>
                <th className="p-3.5">ID</th>
                <th className="p-3.5">Symptom Tags</th>
                <th className="p-3.5">Grounded Info Text (EN / HI / MR)</th>
                <th className="p-3.5">Linked Product Concern</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD0B5]">
              {entries.map(entry => (
                <tr key={entry.id} className="hover:bg-[#EFE6D0]">
                  <td className="p-3.5 font-mono text-[10px] font-bold">{entry.id}</td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {entry.symptomTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-[#EFE6D0] border border-[#DDD0B5] text-[#2C4A3B] font-semibold px-2 py-0.5 rounded text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 max-w-md">
                    <span className="font-semibold text-[#2C4A3B] block">{entry.infoText.EN}</span>
                    <span className="text-[10px] text-[#A85C32] block italic mt-0.5">
                      HI: {entry.infoText.HI || "—"}
                    </span>
                  </td>
                  <td className="p-3.5 uppercase font-bold text-[10px] text-[#2C4A3B]">
                    {entry.productTags.join(", ")}
                  </td>
                  <td className="p-3.5">
                    {entry.active ? (
                      <span className="text-emerald-700 font-bold">● Active</span>
                    ) : (
                      <span className="text-gray-500 font-bold">○ Disabled</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(entry)}
                      className="px-2.5 py-1 bg-[#2C4A3B] text-[#D9A404] rounded font-bold hover:bg-[#1b2d23]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
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

      {/* Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F4ECDC] border-4 border-[#2C4A3B] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#DDD0B5] pb-3">
              <h3 className="font-heading text-xl font-bold text-[#2C4A3B]">
                {editingId ? `Edit Entry ${editingId}` : "Create Knowledge Entry"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#2C4A3B] font-bold text-lg hover:text-red-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#2C4A3B] mb-1">
                  Symptom Tags (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={formTags}
                  onChange={e => setFormTags(e.target.value)}
                  placeholder="stress, anxiety, sleep, ताण, तनाव"
                  className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C4A3B] mb-1">
                  Grounded Classical Response (English) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formInfoEN}
                  onChange={e => setFormInfoEN(e.target.value)}
                  className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C4A3B] mb-1">
                  Grounded Response (Hindi)
                </label>
                <textarea
                  rows={2}
                  value={formInfoHI}
                  onChange={e => setFormInfoHI(e.target.value)}
                  placeholder="हिंदी उत्तर..."
                  className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C4A3B] mb-1">
                  Grounded Response (Marathi)
                </label>
                <textarea
                  rows={2}
                  value={formInfoMR}
                  onChange={e => setFormInfoMR(e.target.value)}
                  placeholder="मराठी उत्तर..."
                  className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C4A3B] mb-1">
                  Linked Product Concern Tags (e.g. stress, digestion)
                </label>
                <input
                  type="text"
                  value={formProductTags}
                  onChange={e => setFormProductTags(e.target.value)}
                  className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="kbActive"
                  checked={formActive}
                  onChange={e => setFormActive(e.target.checked)}
                  className="accent-[#2C4A3B] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="kbActive" className="font-bold text-[#2C4A3B] cursor-pointer">
                  Rule Active in AI Chatbot Engine
                </label>
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2C4A3B] text-[#D9A404] rounded font-bold text-xs hover:bg-[#1b2d23]"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
