import { useState, useEffect } from "react";
import { getOrders, updateOrderStatus, subscribeStore } from "../../services/store";
import type { Order } from "../../services/store";

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(getOrders());
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    return subscribeStore(() => {
      setOrders(getOrders());
    });
  }, []);

  const filteredOrders = orders.filter(o => {
    if (filterStatus === "all") return true;
    return o.orderStatus.toLowerCase() === filterStatus.toLowerCase();
  });

  const handleStatusChange = (orderId: string, newStatus: Order["orderStatus"]) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#DDD0B5] pb-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#2C4A3B]">
            Customer Order & Fulfillment Manager
          </h1>
          <p className="text-xs text-[#3F2A3D]/75 mt-0.5">
            Razorpay payment verification, customer dispatch addresses, and order lifecycle
          </p>
        </div>

        {/* Filter */}
        <div className="mt-4 sm:mt-0 flex items-center space-x-2 text-xs">
          <span className="font-bold text-[#2C4A3B]">Filter Status:</span>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-[#F4ECDC] border border-[#DDD0B5] rounded-lg p-2 font-semibold text-[#2C4A3B]"
          >
            <option value="all">All Orders ({orders.length})</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#F4ECDC] border-2 border-[#DDD0B5] rounded-2xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#3F2A3D]">
            <thead className="bg-[#2C4A3B] text-[#EFE6D0] font-heading font-bold uppercase text-[11px]">
              <tr>
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Items</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Order Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD0B5]">
              {filteredOrders.map(o => (
                <tr key={o.id} className="hover:bg-[#EFE6D0]">
                  <td className="p-3.5 font-bold font-mono text-[#2C4A3B]">{o.id}</td>
                  <td className="p-3.5">
                    <span className="font-bold text-[#2C4A3B] block">{o.customerName}</span>
                    <span className="text-[10px] text-[#3F2A3D]/70">{o.email}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold">{o.items.length} item(s)</span>
                  </td>
                  <td className="p-3.5 font-bold text-[#2C4A3B]">₹{o.total}</td>
                  <td className="p-3.5">
                    <span className="bg-emerald-800 text-emerald-100 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                      ✓ {o.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <select
                      value={o.orderStatus}
                      onChange={e => handleStatusChange(o.id, e.target.value as any)}
                      className="bg-[#EFE6D0] border border-[#DDD0B5] rounded px-2 py-1 font-bold text-xs text-[#2C4A3B]"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="px-3 py-1 bg-[#2C4A3B] text-[#D9A404] rounded font-bold text-xs hover:bg-[#1b2d23]"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F4ECDC] border-4 border-[#2C4A3B] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#DDD0B5] pb-3">
              <div>
                <h3 className="font-heading text-xl font-bold text-[#2C4A3B]">
                  Order Details #{selectedOrder.id}
                </h3>
                <span className="text-[10px] text-[#3F2A3D]/70 font-mono">
                  Created: {new Date(selectedOrder.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-[#2C4A3B] font-bold text-lg hover:text-red-700"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#FFFDF9] p-4 rounded-xl border border-[#DDD0B5] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="font-bold text-[#2C4A3B]">Customer Name:</span>
                <span>{selectedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-[#2C4A3B]">Email / Phone:</span>
                <span>{selectedOrder.email} | {selectedOrder.phone}</span>
              </div>
              <div>
                <span className="font-bold text-[#2C4A3B] block">Delivery Address:</span>
                <span className="text-[#3F2A3D]/90 italic">{selectedOrder.address}</span>
              </div>
              <div className="flex justify-between border-t border-[#DDD0B5] pt-2">
                <span className="font-bold text-[#2C4A3B]">Razorpay Ref ID:</span>
                <span className="font-mono text-[#A85C32]">{selectedOrder.paymentId || "rzp_simulated"}</span>
              </div>
            </div>

            {/* Purchased Items List */}
            <div>
              <h4 className="font-heading text-xs font-bold text-[#2C4A3B] uppercase mb-2">
                📦 Purchased Remedies
              </h4>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#EFE6D0] p-2.5 rounded-lg border border-[#DDD0B5] flex justify-between items-center text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#2C4A3B]">{item.name}</span>
                      <span className="text-[10px] text-[#3F2A3D]/70 block">
                        Qty: {item.qty} × ₹{item.price}
                      </span>
                    </div>
                    <span className="font-bold text-[#2C4A3B]">
                      ₹{item.qty * item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-[#DDD0B5]">
              <span className="font-heading text-lg font-bold text-[#2C4A3B]">
                Total: ₹{selectedOrder.total}
              </span>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-[#2C4A3B] text-[#D9A404] rounded-lg font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
