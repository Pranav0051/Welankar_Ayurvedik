import { useState } from "react";
import { bulkImportProducts } from "../../services/store";
import type { Product } from "../../data/products";

export default function AdminBulkImport() {
  const [csvText, setCsvText] = useState("");
  const [parsedRows, setParsedRows] = useState<Partial<Product>[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [importResult, setImportResult] = useState<{ added: number; updated: number; errors: string[] } | null>(null);

  // Simple robust CSV parser
  const parseCSV = (text: string) => {
    const lines = text.split(/\r?\n/).filter(line => line.trim());
    if (lines.length === 0) return;

    const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
    const rows: Partial<Product>[] = [];
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i];
      // Regex for handling quoted fields with commas
      const values = currentLine.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || currentLine.split(",");
      const cleanValues = values.map(v => v.trim().replace(/^"|"$/g, ""));

      if (cleanValues.length < 2) continue;

      const obj: any = {};
      headers.forEach((h, idx) => {
        const val = cleanValues[idx] || "";
        if (h === "price" || h === "stock") {
          obj[h] = Number(val) || 0;
        } else if (h === "ingredients") {
          obj[h] = val.split(";").map(s => s.trim());
        } else if (h === "active") {
          obj[h] = val.toLowerCase() === "true" || val === "1";
        } else {
          obj[h] = val;
        }
      });

      if (!obj.name) {
        errors.push(`Row ${i}: Missing product name.`);
      }
      if (!obj.price || isNaN(obj.price)) {
        errors.push(`Row ${i}: Missing or invalid price.`);
      }

      rows.push(obj);
    }

    setParsedRows(rows);
    setValidationErrors(errors);
    setImportResult(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      setCsvText(content);
      parseCSV(content);
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (parsedRows.length === 0) return;
    const res = bulkImportProducts(parsedRows);
    setImportResult(res);
    setParsedRows([]);
    setCsvText("");
  };

  // Generator for 200+ row CSV batch test
  const handleGenerateSampleCSV = () => {
    const sampleConcerns: Product["concern"][] = ["stress", "digestion", "immunity", "skin", "sleep"];
    const headers = "name,name_hi,name_mr,concern,price,stock,weight,tag,tagline,ingredients,dosage,description,active\n";
    let rowsStr = headers;

    for (let i = 1; i <= 250; i++) {
      const concern = sampleConcerns[i % sampleConcerns.length];
      rowsStr += `"Ayurvedic Churna #${i}","शास्त्रीय योग #${i}","आयुर्वेदिक चूर्ण #${i}","${concern}",${200 + (i % 50) * 10},${10 + (i % 80)},"100g","Batch #${Math.floor(i / 10)}","Heritage Formula #${i}","Herbal Herb A; Herbal Herb B","1 tsp daily","Hand-ground formulation for dosha balance",true\n`;
    }

    setCsvText(rowsStr);
    parseCSV(rowsStr);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b-2 border-[#DDD0B5] pb-4">
        <h1 className="font-heading text-3xl font-bold text-[#2C4A3B]">
          Bulk CSV Import Engine
        </h1>
        <p className="text-xs text-[#3F2A3D]/75 mt-0.5">
          High-performance batch processing for 200 to 400 product inventory rows
        </p>
      </div>

      {/* Import Action Controls */}
      <div className="bg-[#F4ECDC] border-2 border-[#DDD0B5] rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-[#2C4A3B]">
              Upload CSV File or Generate 250-Row Test Dataset
            </h3>
            <p className="text-xs text-[#3F2A3D]/75">
              Columns expected: <code className="bg-[#EFE6D0] px-1 rounded">name, name_hi, name_mr, concern, price, stock, weight, ingredients, dosage, description</code>
            </p>
          </div>

          <div className="flex gap-3">
            <label className="px-4 py-2.5 bg-[#2C4A3B] text-[#D9A404] rounded-xl font-bold text-xs hover:bg-[#1b2d23] cursor-pointer shadow">
              📁 Choose CSV File
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={handleGenerateSampleCSV}
              className="px-4 py-2.5 bg-[#D9A404] text-[#2C4A3B] rounded-xl font-bold text-xs hover:bg-[#edb508] shadow"
            >
              ⚡ Load 250-Row Test Batch
            </button>
          </div>
        </div>

        {/* Validation Errors Box */}
        {validationErrors.length > 0 && (
          <div className="bg-red-100 border border-red-400 p-4 rounded-xl text-xs text-red-800 space-y-1">
            <span className="font-bold block">⚠️ Validation Warnings Detected ({validationErrors.length}):</span>
            <ul className="list-disc pl-5 max-h-32 overflow-y-auto font-mono text-[11px]">
              {validationErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Import Result Notification */}
        {importResult && (
          <div className="bg-emerald-100 border border-emerald-400 p-4 rounded-xl text-xs text-emerald-900 space-y-1">
            <span className="font-bold text-sm block">✓ Bulk Import Complete!</span>
            <p className="font-mono">
              Successfully Added: <strong>{importResult.added}</strong> products | Updated: <strong>{importResult.updated}</strong> existing products.
            </p>
          </div>
        )}
      </div>

      {/* CSV Preview Table */}
      {parsedRows.length > 0 && (
        <div className="bg-[#F4ECDC] border-2 border-[#DDD0B5] rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex justify-between items-center border-b border-[#DDD0B5] pb-3">
            <div>
              <h3 className="font-heading text-lg font-bold text-[#2C4A3B]">
                Preview Batch Data ({parsedRows.length} Rows Parsed)
              </h3>
              <p className="text-xs text-[#3F2A3D]/70">
                Review verified product records before committing batch write
              </p>
            </div>

            <button
              onClick={handleConfirmImport}
              className="px-6 py-3 bg-[#2C4A3B] text-[#D9A404] rounded-xl font-heading font-bold text-sm hover:bg-[#1b2d23] shadow-lg active:scale-95"
            >
              ✓ Confirm Batch Import ({parsedRows.length} Products)
            </button>
          </div>

          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left text-xs text-[#3F2A3D]">
              <thead className="bg-[#2C4A3B] text-[#EFE6D0] font-heading font-bold uppercase sticky top-0 text-[10px]">
                <tr>
                  <th className="p-2.5">Row</th>
                  <th className="p-2.5">Name (EN / HI / MR)</th>
                  <th className="p-2.5">Concern</th>
                  <th className="p-2.5">Price</th>
                  <th className="p-2.5">Stock</th>
                  <th className="p-2.5">Weight</th>
                  <th className="p-2.5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD0B5] font-sans">
                {parsedRows.slice(0, 50).map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#EFE6D0]">
                    <td className="p-2.5 font-mono text-[10px]">#{idx + 1}</td>
                    <td className="p-2.5 font-bold text-[#2C4A3B]">
                      {row.name}
                      <span className="text-[10px] text-[#A85C32] block font-normal">
                        {row.name_hi || "—"} / {row.name_mr || "—"}
                      </span>
                    </td>
                    <td className="p-2.5 uppercase font-semibold text-[10px]">{row.concern}</td>
                    <td className="p-2.5 font-bold text-[#2C4A3B]">₹{row.price}</td>
                    <td className="p-2.5 font-bold">{row.stock}</td>
                    <td className="p-2.5">{row.weight}</td>
                    <td className="p-2.5 truncate max-w-xs">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {parsedRows.length > 50 && (
            <p className="text-[11px] text-[#3F2A3D]/70 italic text-center">
              ... and {parsedRows.length - 50} more rows ready for batch import.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
