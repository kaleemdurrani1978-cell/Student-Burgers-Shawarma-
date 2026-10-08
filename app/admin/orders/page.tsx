'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  Phone,
  Download,
  Clock,
  Eye,
  CheckCircle2,
  XCircle,
  ChefHat,
  MessageSquare,
  Bike,
  Utensils,
  RefreshCw,
} from 'lucide-react';
import { Order, OrderStatus } from '@/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tableFilter, setTableFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [prepTimeInput, setPrepTimeInput] = useState<string>('');
  const [notesInput, setNotesInput] = useState<string>('');

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          statusNotes: notesInput || undefined,
          estimatedMinutes: prepTimeInput ? parseInt(prepTimeInput, 10) : undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
        setSelectedOrder(data.order);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = [
      'Order ID',
      'Created At',
      'Customer Name',
      'Customer Phone',
      'Order Type',
      'Table Number',
      'Delivery Address',
      'Status',
      'Items Subtotal',
      'Delivery Charges',
      'Grand Total',
    ];

    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleString(),
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      o.orderType,
      o.tableNumber || '',
      `"${(o.deliveryAddress || '').replace(/"/g, '""')}"`,
      o.status,
      o.itemsSubtotal,
      o.deliveryCharges,
      o.grandTotal,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `student_shawarma_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      if (tableFilter !== 'all' && o.tableNumber?.toUpperCase() !== tableFilter.toUpperCase())
        return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = o.customerName.toLowerCase().includes(q);
        const matchesPhone = o.customerPhone.includes(q);
        const matchesId = o.id.toLowerCase().includes(q);
        return matchesName || matchesPhone || matchesId;
      }
      return true;
    });
  }, [orders, statusFilter, tableFilter, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Order Management</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Track kitchen preparation, open WhatsApp chats, and update order fulfillment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={fetchOrders}
            className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
          <input
            type="text"
            placeholder="Search order ID, customer name, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 font-bold focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="awaiting_whatsapp">Awaiting WhatsApp</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Table filter */}
          <select
            value={tableFilter}
            onChange={(e) => setTableFilter(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 font-bold focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Tables &amp; Orders</option>
            <option value="T01">Table T01</option>
            <option value="T02">Table T02</option>
            <option value="T03">Table T03</option>
            <option value="T04">Table T04</option>
            <option value="T05">Table T05</option>
            <option value="T06">Table T06</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-zinc-500 text-xs">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 text-xs">
            No orders match the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-950/80 text-zinc-400 uppercase text-[10px] font-black border-b border-zinc-800">
                <tr>
                  <th className="px-5 py-4">Order ID &amp; Time</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Type &amp; Destination</th>
                  <th className="px-5 py-4">Items</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono font-bold text-white block">{ord.id}</span>
                      <span className="text-[10px] text-zinc-500">
                        {new Date(ord.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        • {new Date(ord.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-bold text-white block">{ord.customerName}</span>
                      <a
                        href={`https://wa.me/${ord.customerPhone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{ord.customerPhone}</span>
                      </a>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase mb-1 ${
                          ord.orderType === 'dine_in'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : ord.orderType === 'delivery'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-zinc-800 text-zinc-300'
                        }`}
                      >
                        {ord.orderType === 'dine_in'
                          ? `Dine-In • Table ${ord.tableNumber || '-'}`
                          : ord.orderType === 'delivery'
                          ? 'Delivery'
                          : 'Takeaway'}
                      </span>
                      {ord.deliveryAddress && (
                        <p className="text-[10px] text-zinc-400 line-clamp-1 max-w-xs">
                          {ord.deliveryAddress}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <p className="line-clamp-2 max-w-xs text-[11px] text-zinc-200">
                        {ord.items.map((i) => `${i.nameEn} × ${i.quantity}`).join(', ')}
                      </p>
                      {ord.specialInstructions && (
                        <p className="text-[10px] text-amber-400 italic">
                          Note: {ord.specialInstructions}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 font-black text-amber-400 text-sm whitespace-nowrap">
                      Rs. {ord.grandTotal}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                          ord.status === 'confirmed'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : ord.status === 'preparing'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800 animate-pulse'
                            : ord.status === 'ready'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : ord.status === 'completed'
                            ? 'bg-zinc-800 text-zinc-400'
                            : ord.status === 'cancelled'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : 'bg-zinc-900 text-amber-400 border border-zinc-700'
                        }`}
                      >
                        {ord.status.replace(/_/g, ' ')}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedOrder(ord);
                            setPrepTimeInput(ord.estimatedMinutes?.toString() || '');
                            setNotesInput(ord.statusNotes || '');
                          }}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                          title="View Details & Update"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a
                          href={`https://wa.me/${ord.customerPhone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 hover:bg-emerald-900"
                          title="Open WhatsApp"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Full Order View & Status Editor */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold">Order Details</span>
                <h3 className="text-xl font-black text-white">{selectedOrder.id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-zinc-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Customer Contact */}
            <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Customer Name:</span>
                <span className="text-white font-bold">{selectedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Contact Phone:</span>
                <a
                  href={`https://wa.me/${selectedOrder.customerPhone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-bold hover:underline"
                >
                  {selectedOrder.customerPhone} (Open WhatsApp)
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Order Service:</span>
                <span className="text-amber-400 font-bold uppercase">
                  {selectedOrder.orderType.replace(/_/g, ' ')}
                  {selectedOrder.tableNumber ? ` (Table ${selectedOrder.tableNumber})` : ''}
                </span>
              </div>
              {selectedOrder.deliveryAddress && (
                <div className="pt-2 border-t border-zinc-800">
                  <span className="text-zinc-400 block mb-0.5">Delivery Address:</span>
                  <span className="text-zinc-200">{selectedOrder.deliveryAddress}</span>
                </div>
              )}
            </div>

            {/* Line Items */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-zinc-300">Ordered Items:</h4>
              <div className="bg-zinc-900 p-3 rounded-2xl divide-y divide-zinc-800">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="py-2 flex justify-between">
                    <div>
                      <span className="font-bold text-white">
                        {it.nameEn} × {it.quantity}
                      </span>
                      {it.addons && it.addons.length > 0 && (
                        <p className="text-[11px] text-amber-400">
                          +{it.addons.map((a) => a.nameEn).join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-amber-400">Rs. {it.subtotal}</span>
                  </div>
                ))}
                <div className="pt-2 flex justify-between font-black text-white text-sm">
                  <span>Grand Total:</span>
                  <span className="text-amber-400">Rs. {selectedOrder.grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Status Change & Estimated Prep Time */}
            <div className="space-y-4 pt-2 border-t border-zinc-800">
              <h4 className="font-bold text-zinc-300 text-xs">Update Kitchen Status:</h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">Status</label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) =>
                      handleUpdateStatus(selectedOrder.id, e.target.value as OrderStatus)
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold"
                  >
                    <option value="awaiting_whatsapp">Awaiting WhatsApp</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Estimated Prep (Mins)</label>
                  <input
                    type="number"
                    placeholder="e.g. 20"
                    value={prepTimeInput}
                    onChange={(e) => setPrepTimeInput(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 text-xs block mb-1">Internal Kitchen Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Extra spicy requested, dispatched rider Ali..."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() =>
                    handleUpdateStatus(selectedOrder.id, selectedOrder.status)
                  }
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black py-2.5 rounded-xl text-xs transition-colors"
                >
                  Save Changes
                </button>
                <a
                  href={`https://wa.me/${selectedOrder.customerPhone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
