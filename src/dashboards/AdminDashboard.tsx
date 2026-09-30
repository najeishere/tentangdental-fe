import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { rupiah, dateLong, PayBadge } from "@/lib/format";

interface AdminDashboardProps {
  activeMenu: string;
  userName: string;
}

interface Tindakan {
  id: number;
  name: string;
  price: number | string;
  komisi_persen: number | string;
  is_active: boolean;
}

interface PatientOpt {
  id: number;
  name: string;
  phone?: string;
}

interface DoctorOpt {
  id: number;
  name: string;
  specialist?: string;
}

interface PaymentType {
  id: number;
  method: string;
  status: string;
  amount: number | string;
  paid_at?: string | null;
}

export interface VisitType {
  id: number;
  invoice_number: string;
  visit_date: string;
  complaint?: string | null;
  payment_status: string;
  total: number | string;
  patient: { id: number; name: string; phone?: string } | null;
  doctor: { id: number; name: string } | null;
  items: { id: number; tindakan_id: number | null; quantity?: number; tarif_name: string; price: number | string; total: number | string }[];
  payments: PaymentType[];
}

interface DashData {
  period: { month: string; start: string; end: string };
  daily: { visits_today: number; cash_income_today: number; qris_income_today: number };
  totals: { revenue: number; doctor_commissions: number; expenses: number; net_clinic_profit: number };
  patients: number;
  doctors: number;
  open_receivables: number;
  visits_this_month: number;
  recent_visits: unknown[];
}

function useApi<T>(path: string, depsKey = "") {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const reload = () => {
    setLoading(true);
    api
      .get<{ success: boolean; data: T }>(path)
      .then((r) => setData(r.data))
      .catch((e) => setError((e as { message?: string }).message || "Gagal memuat data"))
      .finally(() => setLoading(false));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reload, [path, depsKey]);
  return { data, error, loading, reload };
}

export function confirmedSum(v: VisitType): number {
  return v.payments.filter((p) => p.status === "confirmed").reduce((s, p) => s + Number(p.amount), 0);
}

export function remainingOf(v: VisitType): number {
  return Number(v.total) - confirmedSum(v);
}

function Badge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    partial: "bg-amber-100 text-amber-700",
    unpaid: "bg-red-100 text-red-600",
    open: "bg-red-100 text-red-600",
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-[#e8f8f8] text-[#11858c]",
    cash: "bg-green-100 text-green-700",
    qris: "bg-purple-100 text-purple-700",
  };
  const label: Record<string, string> = {
    paid: "Lunas",
    partial: "Sebagian",
    unpaid: "Belum Bayar",
    open: "Belum Bayar",
    pending: "Menunggu Verifikasi",
    confirmed: "Terverifikasi",
    cash: "Tunai",
    qris: "QRIS",
  };
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${cls[status] ?? "bg-gray-100 text-gray-600"}`}>{label[status] ?? status}</span>;
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8ea] p-5">
      <p className="text-[#94a0a6] text-xs font-semibold mb-2">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-[#94a0a6] text-xs mt-1">{sub}</p>}
    </div>
  );
}

interface MenuProps {
  visits: VisitType[];
  reloadVisits: () => void;
  openPay: (v: VisitType) => void;
  openCreate: () => void;
  openEdit: (v: VisitType) => void;
  doDelete: (v: VisitType) => void;
  dash: DashData | null;
  submit: (msg: string) => void;
  toast: React.ReactNode;
}

// ─────────────────── BERANDA ───────────────────
function BerandaView({ visits, dash }: Omit<MenuProps, "reloadVisits" | "openPay" | "openCreate" | "submit" | "toast">) {
  const todayPayments = visits
    .flatMap((v) => v.payments)
    .filter((p) => p.status === "confirmed")
    .sort((a, b) => new Date(b.paid_at ?? 0).getTime() - new Date(a.paid_at ?? 0).getTime())
    .slice(0, 6);
  const unpaidVisits = visits.filter((v) => v.payment_status !== "paid");
  const kasToday = Number(dash?.daily.cash_income_today ?? 0) + Number(dash?.daily.qris_income_today ?? 0);

  return (
    <div className="p-6 max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#172126]">Dashboard Admin</h1>
        <p className="text-[#94a0a6] text-sm mt-1">{new Date().toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Kunjungan Hari Ini" value={String(dash?.daily.visits_today ?? 0)} sub="Kunjungan terdaftar" color="text-[#172126]" />
        <StatCard label="Kas Masuk Hari Ini" value={rupiah(kasToday)} sub="Tunai + QRIS terkonfirmasi" color="text-green-600" />
        <StatCard label="Piutang Terbuka" value={rupiah(dash?.open_receivables)} sub="Total tagihan belum lunas" color="text-red-500" />
        <StatCard label="Pengeluaran Bulan Ini" value={rupiah(dash?.totals.expenses)} sub="BMHP + Lab + Operasional" color="text-[#65737a]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f0f4f5] flex items-center justify-between">
            <p className="font-semibold text-[#172126]">Kas Harian Terbaru</p>
            <span className="text-xs text-[#94a0a6]">{todayPayments.length} transaksi</span>
          </div>
          <div className="divide-y divide-[#f0f4f5]">
            {todayPayments.length === 0 ? (
              <p className="px-5 py-8 text-center text-[#94a0a6] text-sm">Belum ada transaksi terkonfirmasi.</p>
            ) : (
              todayPayments.map((p) => {
                const v = visits.find((x) => x.payments.some((y) => y.id === p.id));
                return (
                  <div key={p.id} className="px-5 py-3 flex items-center justify-between hover:bg-[#f5f8f9] transition">
                    <div>
                      <p className="text-sm font-medium text-[#172126]">{v?.patient?.name ?? "Pasien"}</p>
                      <p className="text-xs text-[#94a0a6]">{v?.invoice_number ?? ""} · {dateLong(p.paid_at)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600 text-sm">{rupiah(p.amount)}</p>
                      <Badge status={p.method} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f0f4f5]">
            <p className="font-semibold text-[#172126]">Invoice Perlu Perhatian</p>
          </div>
          <div className="divide-y divide-[#f0f4f5]">
            {unpaidVisits.length === 0 ? (
              <p className="px-5 py-8 text-center text-[#94a0a6] text-sm">Semua invoice lunas 🎉</p>
            ) : (
              unpaidVisits.map((v) => (
                <div key={v.id} className="px-5 py-3 flex items-center justify-between hover:bg-[#f5f8f9] transition">
                  <div>
                    <p className="text-sm font-medium text-[#172126]">{v.patient?.name ?? "Pasien"}</p>
                    <p className="text-xs text-[#94a0a6]">{v.invoice_number} · {dateLong(v.visit_date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#172126] text-sm">{rupiah(remainingOf(v))}</p>
                    <Badge status={v.payment_status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── REGISTRASI / ANTREAN ───────────────────
function AntreanView({ visits, openPay, openCreate }: Omit<MenuProps, "reloadVisits" | "dash" | "submit" | "toast">) {
  return (
    <div className="p-6 max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#172126]">Registrasi & Antrean</h1>
          <p className="text-[#94a0a6] text-sm">Daftar kunjungan dan status pembayaran pasien</p>
        </div>
        <button onClick={openCreate} className="bg-[#1cb5bd] hover:bg-[#11858c] text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          + Pasien Baru
        </button>
      </div>
      <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f5f8f9] text-[#94a0a6] text-xs font-semibold">
            <tr>
              {["No. Invoice", "Nama Pasien", "No Telp", "Keluhan", "Tanggal", "Status", "Aksi"].map((h) => (
                <th key={h} className="text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            {visits.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-[#94a0a6]">Belum ada data kunjungan.</td></tr>
            ) : (
              visits.map((v) => (
                <tr key={v.id} className="hover:bg-[#f5f8f9] transition">
                  <td className="px-4 py-3 font-bold text-[#1cb5bd]">{v.invoice_number}</td>
                  <td className="px-4 py-3 font-medium text-[#172126]">{v.patient?.name ?? "-"}</td>
                  <td className="px-4 py-3 text-[#65737a]">{v.patient?.phone ?? "-"}</td>
                  <td className="px-4 py-3 text-[#65737a]">{v.complaint ?? "-"}</td>
                  <td className="px-4 py-3 text-[#65737a]">{dateLong(v.visit_date)}</td>
                  <td className="px-4 py-3"><Badge status={v.payment_status} /></td>
                  <td className="px-4 py-3">
                    {v.payment_status !== "paid" && (
                      <button onClick={() => openPay(v)} className="text-xs bg-[#e8f8f8] hover:bg-[#1cb5bd] hover:text-white text-[#11858c] font-semibold px-3 py-1.5 rounded-lg transition">
                        Terima Bayar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────── BILLING ───────────────────
function BillingView({ visits, openPay, openCreate, openEdit, doDelete }: Omit<MenuProps, "reloadVisits" | "dash" | "submit" | "toast">) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const totalBilled = visits.reduce((s, v) => s + Number(v.total), 0);
  const totalPaid = visits.reduce((s, v) => s + confirmedSum(v), 0);
  const totalUnpaid = totalBilled - totalPaid;

  return (
    <div className="p-6 max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#172126]">Pencatatan Tagihan (Billing)</h1>
        <p className="text-[#94a0a6] text-sm">Generate dan kelola invoice pasien dari tindakan Tim Klinik</p>
      </div>

      <div className="flex justify-end">
        <button onClick={openCreate} className="bg-[#1cb5bd] hover:bg-[#11858c] text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          + Generate Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          {visits.length === 0 ? (
            <p className="text-[#94a0a6] text-sm">Belum ada invoice terdaftar.</p>
          ) : (
            visits.map((v) => {
              const isSelected = selectedId === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedId(isSelected ? null : v.id)}
                  className={`bg-white rounded-xl border p-5 cursor-pointer transition hover:border-[#1cb5bd] ${isSelected ? "border-[#1cb5bd] ring-2 ring-[#1cb5bd]/20" : "border-[#e2e8ea]"}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-bold text-[#172126]">{v.invoice_number}</p>
                      <p className="text-[#94a0a6] text-xs mt-0.5">{v.patient?.name} · {dateLong(v.visit_date)} · {v.doctor?.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge status={v.payment_status} />
                      <button
                        onClick={(e) => { e.stopPropagation(); openEdit(v); }}
                        className="border border-[#e2e8ea] hover:border-[#1cb5bd] hover:text-[#11858c] text-[#65737a] text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                      >
                        ✎ Edit
                      </button>
                      {v.payment_status !== "paid" && v.payment_status !== "partial" && (
                        <button
                          onClick={(e) => { e.stopPropagation(); openPay(v); }}
                          className="bg-[#1cb5bd] hover:bg-[#11858c] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                        >
                          Proses Bayar
                        </button>
                      )}
                      {v.payments.length === 0 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); doDelete(v); }}
                          className="border border-red-200 hover:bg-red-50 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {v.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-[#65737a]">{item.quantity && item.quantity > 1 ? `${item.quantity}× ` : ""}{item.tarif_name}</span>
                        <span className="font-medium text-[#172126]">{rupiah(item.total)}</span>
                      </div>
                    ))}
                    {v.complaint && <div className="text-xs text-[#94a0a6] italic">Keluhan: {v.complaint}</div>}
                  </div>
                  <div className="border-t border-[#f0f4f5] mt-3 pt-3 flex justify-between font-bold text-[#172126]">
                    <span>Total</span>
                    <span className="text-[#1cb5bd] text-lg">{rupiah(v.total)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#e2e8ea] p-5 space-y-4">
            <p className="font-semibold text-[#172126]">Ringkasan Billing</p>
            <div className="flex justify-between">
              <span className="text-sm text-[#65737a]">Total Invoice</span>
              <span className="font-bold text-sm text-[#172126]">{rupiah(totalBilled)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#65737a]">Sudah Lunas</span>
              <span className="font-bold text-sm text-green-600">{rupiah(totalPaid)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#65737a]">Belum Terbayar</span>
              <span className="font-bold text-sm text-red-500">{rupiah(totalUnpaid)}</span>
            </div>
          </div>
          <div className="bg-[#11858c] rounded-xl p-5 text-white">
            <p className="font-bold text-base mb-1">Generate Invoice Baru</p>
            <p className="text-white/70 text-xs mb-4">Buat invoice otomatis dari data tindakan.</p>
            <button onClick={openCreate} className="w-full bg-white text-[#11858c] font-bold text-sm py-2.5 rounded-lg hover:bg-[#e8f8f8] transition">
              + Generate Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── PEMBAYARAN ───────────────────
function PembayaranView({ visits }: Omit<MenuProps, "reloadVisits" | "openPay" | "openCreate" | "dash" | "submit" | "toast">) {
  const payments = visits
    .flatMap((v) => v.payments.map((p) => ({ p, v })))
    .filter((x) => x.p.status === "confirmed")
    .sort((a, b) => new Date(b.p.paid_at ?? 0).getTime() - new Date(a.p.paid_at ?? 0).getTime());
  const totalPayments = payments.reduce((s, x) => s + Number(x.p.amount), 0);
  const todayCount = payments.filter((x) => x.p.paid_at && new Date(x.p.paid_at).toDateString() === new Date().toDateString()).length;

  return (
    <div className="p-6 max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#172126]">Pembayaran & Kas Masuk</h1>
        <p className="text-[#94a0a6] text-sm">Semua pembayaran yang terkonfirmasi</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Kas Masuk" value={rupiah(totalPayments)} color="text-green-600" sub="Semua transaksi terkonfirmasi" />
        <StatCard label="Jumlah Transaksi" value={String(payments.length)} color="text-[#172126]" />
        <StatCard label="Transaksi Hari Ini" value={String(todayCount)} color="text-[#65737a]" />
      </div>
      <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f5f8f9] text-[#94a0a6] text-xs font-semibold">
            <tr>
              {["Waktu", "Pasien", "Invoice", "Metode", "Nominal"].map((h) => (
                <th key={h} className="text-left px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            {payments.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-[#94a0a6]">Belum ada pembayaran terkonfirmasi.</td></tr>
            ) : (
              payments.map(({ p, v }) => (
                <tr key={p.id} className="hover:bg-[#f5f8f9] transition">
                  <td className="px-5 py-3 text-[#65737a]">{p.paid_at ? new Date(p.paid_at).toLocaleString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "-"}</td>
                  <td className="px-5 py-3 font-medium text-[#172126]">{v.patient?.name ?? "-"}</td>
                  <td className="px-5 py-3 text-[#94a0a6] text-xs">{v.invoice_number}</td>
                  <td className="px-5 py-3"><Badge status={p.method} /></td>
                  <td className="px-5 py-3 font-bold text-green-600">{rupiah(p.amount)}</td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="bg-[#f5f8f9]">
              <td colSpan={4} className="px-5 py-3 font-bold text-[#172126]">Total</td>
              <td className="px-5 py-3 font-bold text-green-600 text-base">{rupiah(totalPayments)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ─────────────────── REKONSILIASI ───────────────────
function RekonsiliasiView({ visits, reloadVisits, submit }: Omit<MenuProps, "openPay" | "openCreate" | "dash" | "toast">) {
  const pendingQris = visits.flatMap((v) => v.payments.map((p) => ({ p, v }))).filter((x) => x.p.status === "pending");
  const [verifyingId, setVerifyingId] = useState<number | null>(null);

  const doVerify = async (pid: number) => {
    setVerifyingId(pid);
    try {
      await api.post(`/payments/${pid}/verify`, {});
      submit("Pembayaran QRIS berhasil diverifikasi!");
      reloadVisits();
    } catch (e) {
      submit((e as { message?: string }).message || "Verifikasi gagal.");
    } finally {
      setVerifyingId(null);
    }
  };

  return (
    <div className="p-6 max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#172126]">Rekonsiliasi Pembayaran</h1>
        <p className="text-[#94a0a6] text-sm">Verifikasi pembayaran QRIS yang menunggu konfirmasi kasir</p>
      </div>

      <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#f0f4f5]">
          <p className="font-semibold text-[#172126]">Pembayaran QRIS Menunggu Verifikasi ({pendingQris.length})</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#f5f8f9] text-[#94a0a6] text-xs font-semibold">
            <tr>
              {["Pasien", "Invoice", "Nominal", "Status", "Aksi"].map((h) => (
                <th key={h} className="text-left px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            {pendingQris.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-[#94a0a6]">Tidak ada pembayaran menunggu verifikasi 🎉</td></tr>
            ) : (
              pendingQris.map(({ p, v }) => (
                <tr key={p.id} className="hover:bg-[#f5f8f9] transition">
                  <td className="px-5 py-3 font-medium text-[#172126]">{v.patient?.name ?? "-"}</td>
                  <td className="px-5 py-3 text-[#94a0a6] text-xs">{v.invoice_number}</td>
                  <td className="px-5 py-3 font-bold text-[#172126]">{rupiah(p.amount)}</td>
                  <td className="px-5 py-3"><Badge status={p.status} /></td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => doVerify(p.id)}
                      disabled={verifyingId === p.id}
                      className="text-xs bg-[#e8f8f8] hover:bg-[#1cb5bd] hover:text-white disabled:opacity-60 text-[#11858c] font-semibold px-3 py-1.5 rounded-lg transition"
                    >
                      {verifyingId === p.id ? "Memverifikasi..." : "Verifikasi"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl border border-[#e2e8ea] p-5">
        <p className="font-semibold text-[#172126] mb-2">Catatan Rekonsiliasi</p>
        <p className="text-[#94a0a6] text-sm">
          Setelah pembayaran QRIS terverifikasi, dana masuk tercatat otomatis di arus kas dan buku besar (lihat Laporan Keuangan → Arus Kas).
        </p>
      </div>
    </div>
  );
}

// ─────────────────── BAGI HASIL ───────────────────
function BagiHasilView() {
  const { data: perDoc } = useApi<{ doctors: { doctor_id: number; doctor_name: string; specialist: string; collected_revenue: number; total_commission: number; commission_percentage: number; clinic_share: number; visits_count: number }[]; summary: { total_collected_revenue: number; total_commission: number; clinic_share: number } }>("/admin/reports/per-doctor");
  const doctors = perDoc?.doctors ?? [];
  const summary = perDoc?.summary;

  return (
    <div className="p-6 max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#172126]">Bagi Hasil Jasa Medis</h1>
        <p className="text-[#94a0a6] text-sm">Distribusi komisi dokter dari tindakan periode berjalan</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Pendapatan Terkumpul" value={rupiah(summary?.total_collected_revenue)} color="text-[#172126]" />
        <StatCard label="Total Komisi Dokter" value={rupiah(summary?.total_commission)} color="text-[#1cb5bd]" />
        <StatCard label="Bagian Klinik" value={rupiah(summary?.clinic_share)} color="text-green-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f0f4f5] bg-[#e8f8f8]">
            <p className="font-bold text-[#11858c]">👨‍⚕️ Komisi Dokter Gigi</p>
          </div>
          <div className="divide-y divide-[#f0f4f5]">
            {doctors.length === 0 ? (
              <p className="px-5 py-8 text-center text-[#94a0a6] text-sm">Belum ada data komisi.</p>
            ) : (
              doctors.map((d) => (
                <div key={d.doctor_id} className="px-5 py-4 flex items-center justify-between hover:bg-[#f5f8f9] transition">
                  <div>
                    <p className="font-semibold text-[#172126] text-sm">{d.doctor_name}</p>
                    <p className="text-[#94a0a6] text-xs">{d.visits_count} kunjungan · Pendapatan {rupiah(d.collected_revenue)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#1cb5bd]">{rupiah(d.total_commission)}</p>
                    <p className="text-[#94a0a6] text-xs">{d.commission_percentage}%</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e2e8ea] p-5">
          <p className="font-semibold text-[#172126] mb-2">Panduan</p>
          <p className="text-[#94a0a6] text-sm leading-relaxed">
            Komisi dokter dihitung otomatis dari setiap tindakan (persentase komisi per tarif).
            Pembayaran komisi dicatat lewat payroll bulanan — lihat Laporan Keuangan → Payroll Dokter.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── LAPORAN KEUANGAN ───────────────────
function LaporanView() {
  const [tab, setTab] = useState("pnl");

  const { data: pnl } = useApi<{
    period: { from: string; to: string };
    revenue: { total_revenue: number };
    expenses: { breakdown: Record<string, number>; doctor_commissions_paid: number; total_expenses: number };
    net_profit: number;
  }>("/admin/reports/profit-and-loss");
  const { data: cf } = useApi<{ period: { from: string; to: string }; inflow: { cash: number; qris: number; total_inflow: number }; outflow: { operational_expenses: number; total_outflow: number }; net_cash_flow: number }>("/admin/reports/cash-flow");
  const { data: payrolls } = useApi<{ payrolls: { id: number; month: string; doctor: { name: string; specialist: string } | null; total_gross: number; komisi_accrued: number; deductions: number; net_paid: number; status: string }[]; total_gross: number; total_paid: number }>("/admin/reports/payrolls");
  const { data: recv } = useApi<{ receivables: { id: number; invoice_number: string; patient: string; phone: string; doctor: string; total_amount: number; paid_amount: number; remaining: number; due_date: string; status: string; days_overdue: number }[]; total_outstanding: number; total_overdue: number }>("/admin/reports/receivables");
  const { data: inv } = useApi<{ items: { id: number; code: string; name: string; unit: string; stock: number; min_stock: number; unit_cost: number; stock_value: number; low_stock: boolean }[]; total_value: number; low_stock_count: number }>("/admin/reports/inventory");

  const expEntries = Object.entries(pnl?.expenses.breakdown ?? {});
  const periode = pnl?.period ?? cf?.period;

  return (
    <div className="p-6 max-w-5xl space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#172126]">Laporan Keuangan</h1>
          <p className="text-[#94a0a6] text-sm">
            {periode ? `${dateLong(periode.from)} — ${dateLong(periode.to)}` : "Periode berjalan"}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { k: "pnl", label: "Laba Rugi" },
            { k: "arus", label: "Arus Kas" },
            { k: "payroll", label: "Payroll Dokter" },
            { k: "piutang", label: "Piutang" },
            { k: "stok", label: "Stok Barang" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`text-xs border font-semibold px-3 py-2 rounded-lg transition ${tab === t.k ? "border-[#1cb5bd] bg-[#e8f8f8] text-[#11858c]" : "border-[#e2e8ea] hover:border-[#1cb5bd] text-[#65737a]"}`}
            >
              {t.label}
            </button>
          ))}
          <button onClick={() => window.print()} className="bg-[#1cb5bd] hover:bg-[#11858c] text-white text-xs font-semibold px-4 py-2 rounded-lg transition">
            Cetak / Export PDF
          </button>
        </div>
      </div>

      {tab === "pnl" && pnl && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#11858c] text-white rounded-xl p-5">
              <p className="text-white/70 text-xs font-semibold mb-2">Total Pendapatan</p>
              <p className="text-2xl font-bold">{rupiah(pnl.revenue.total_revenue)}</p>
            </div>
            <div className="bg-white border border-[#e2e8ea] rounded-xl p-5">
              <p className="text-[#94a0a6] text-xs font-semibold mb-2">Total Beban</p>
              <p className="text-2xl font-bold text-red-500">{rupiah(pnl.expenses.total_expenses)}</p>
            </div>
            <div className={`${pnl.net_profit >= 0 ? "bg-green-500" : "bg-red-500"} text-white rounded-xl p-5`}>
              <p className="text-white/70 text-xs font-semibold mb-2">Laba Bersih</p>
              <p className="text-2xl font-bold">{rupiah(pnl.net_profit)}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#f0f4f5] bg-green-50">
                <p className="font-bold text-green-700">Pendapatan (Basis Kas)</p>
              </div>
              <div className="divide-y divide-[#f0f4f5]">
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-[#65737a]">Pembayaran terkonfirmasi</span>
                  <span className="font-semibold text-green-600">{rupiah(pnl.revenue.total_revenue)}</span>
                </div>
                <div className="px-5 py-3 flex justify-between font-bold bg-green-50">
                  <span className="text-green-700">Total Pendapatan</span>
                  <span className="text-green-700">{rupiah(pnl.revenue.total_revenue)}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#f0f4f5] bg-red-50">
                <p className="font-bold text-red-600">Beban & Pengeluaran</p>
              </div>
              <div className="divide-y divide-[#f0f4f5]">
                {expEntries.map(([acct, amt]) => (
                  <div key={acct} className="px-5 py-3 flex justify-between text-sm hover:bg-[#f5f8f9] transition">
                    <span className="text-[#65737a]">{acct}</span>
                    <span className="font-semibold text-red-500">({rupiah(amt)})</span>
                  </div>
                ))}
                <div className="px-5 py-3 flex justify-between font-bold bg-red-50">
                  <span className="text-red-600">Total Beban</span>
                  <span className="text-red-600">({rupiah(pnl.expenses.total_expenses)})</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#172126] text-white rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Laba Bersih Periode</p>
              <p className="text-3xl font-bold mt-1">{rupiah(pnl.net_profit)}</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm">Margin Laba</p>
              <p className="text-2xl font-bold text-[#1cb5bd]">
                {pnl.revenue.total_revenue > 0 ? ((pnl.net_profit / pnl.revenue.total_revenue) * 100).toFixed(1) : "0.0"}%
              </p>
            </div>
          </div>
        </>
      )}

      {tab === "arus" && cf && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#11858c] text-white rounded-xl p-5">
              <p className="text-white/70 text-xs font-semibold mb-2">Total Masuk</p>
              <p className="text-2xl font-bold">{rupiah(cf.inflow.total_inflow)}</p>
            </div>
            <div className="bg-white border border-[#e2e8ea] rounded-xl p-5">
              <p className="text-[#94a0a6] text-xs font-semibold mb-2">Total Keluar</p>
              <p className="text-2xl font-bold text-red-500">{rupiah(cf.outflow.total_outflow)}</p>
            </div>
            <div className={`${cf.net_cash_flow >= 0 ? "bg-green-500" : "bg-red-500"} text-white rounded-xl p-5`}>
              <p className="text-white/70 text-xs font-semibold mb-2">Arus Kas Bersih</p>
              <p className="text-2xl font-bold">{rupiah(cf.net_cash_flow)}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f0f4f5] bg-green-50">
              <p className="font-bold text-green-700">Arus Masuk</p>
            </div>
            <div className="divide-y divide-[#f0f4f5]">
              <div className="px-5 py-3 flex justify-between text-sm">
                <span className="text-[#65737a]">Tunai</span>
                <span className="font-semibold text-green-600">{rupiah(cf.inflow.cash)}</span>
              </div>
              <div className="px-5 py-3 flex justify-between text-sm">
                <span className="text-[#65737a]">QRIS</span>
                <span className="font-semibold text-green-600">{rupiah(cf.inflow.qris)}</span>
              </div>
              <div className="px-5 py-3 flex justify-between font-bold bg-green-50">
                <span className="text-green-700">Total Masuk</span>
                <span className="text-green-700">{rupiah(cf.inflow.total_inflow)}</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f0f4f5] bg-red-50">
              <p className="font-bold text-red-600">Arus Keluar</p>
            </div>
            <div className="divide-y divide-[#f0f4f5]">
              <div className="px-5 py-3 flex justify-between text-sm">
                <span className="text-[#65737a]">Pengeluaran operasional</span>
                <span className="font-semibold text-red-500">({rupiah(cf.outflow.operational_expenses)})</span>
              </div>
              <div className="px-5 py-3 flex justify-between font-bold bg-red-50">
                <span className="text-red-600">Total Keluar</span>
                <span className="text-red-600">({rupiah(cf.outflow.total_outflow)})</span>
              </div>
            </div>
          </div>
        </>
      )}

      {tab === "payroll" && payrolls && (
        <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#f5f8f9] text-[#94a0a6] text-xs font-semibold">
              <tr>
                {["Bulan", "Dokter", "Komisi Terakrual", "Potongan", "Net Dibayar", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f5]">
              {payrolls.payrolls.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-[#94a0a6]">Belum ada payroll tercatat.</td></tr>
              ) : (
                payrolls.payrolls.map((p) => (
                  <tr key={p.id} className="hover:bg-[#f5f8f9] transition">
                    <td className="px-5 py-3 text-[#65737a]">{p.month}</td>
                    <td className="px-5 py-3 font-medium text-[#172126]">{p.doctor?.name ?? "-"}</td>
                    <td className="px-5 py-3 text-[#172126]">{rupiah(p.komisi_accrued)}</td>
                    <td className="px-5 py-3 text-[#65737a]">({rupiah(p.deductions)})</td>
                    <td className="px-5 py-3 font-semibold text-[#172126]">{rupiah(p.net_paid)}</td>
                    <td className="px-5 py-3"><PayBadge status={p.status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "piutang" && recv && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Total Piutang Terbuka" value={rupiah(recv.total_outstanding)} color="text-red-500" />
            <StatCard label="Piutang Jatuh Tempo" value={rupiah(recv.total_overdue)} color="text-[#65737a]" />
          </div>
          <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#f5f8f9] text-[#94a0a6] text-xs font-semibold">
                <tr>
                  {["Invoice", "Pasien", "Dokter", "Jatuh Tempo", "Sisa", "Ket"].map((h) => (
                    <th key={h} className="text-left px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f5]">
                {recv.receivables.length === 0 ? (
                  <tr><td colSpan={6} className="px-5 py-8 text-center text-[#94a0a6]">Tidak ada piutang aktif 🎉</td></tr>
                ) : (
                  recv.receivables.map((r) => (
                    <tr key={r.id} className="hover:bg-[#f5f8f9] transition">
                      <td className="px-5 py-3 font-bold text-[#1cb5bd]">{r.invoice_number}</td>
                      <td className="px-5 py-3 font-medium text-[#172126]">{r.patient}</td>
                      <td className="px-5 py-3 text-[#65737a]">{r.doctor}</td>
                      <td className="px-5 py-3 text-[#65737a]">{dateLong(r.due_date)}</td>
                      <td className="px-5 py-3 font-semibold text-red-500">{rupiah(r.remaining)}</td>
                      <td className="px-5 py-3"><Badge status={r.days_overdue > 0 ? "partial" : r.status} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "stok" && inv && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Nilai Stok Total" value={rupiah(inv.total_value)} color="text-[#172126]" />
            <StatCard label="Item Stok Minim" value={String(inv.low_stock_count)} color={inv.low_stock_count > 0 ? "text-red-500" : "text-green-600"} />
          </div>
          <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#f5f8f9] text-[#94a0a6] text-xs font-semibold">
                <tr>
                  {["Kode", "Nama", "Stok", "Min", "Harga Satuan", "Nilai"].map((h) => (
                    <th key={h} className="text-left px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f5]">
                {inv.items.map((i) => (
                  <tr key={i.id} className="hover:bg-[#f5f8f9] transition">
                    <td className="px-5 py-3 text-[#94a0a6] text-xs">{i.code}</td>
                    <td className="px-5 py-3 font-medium text-[#172126]">
                      {i.name} {i.low_stock && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full ml-1">Minim</span>}
                    </td>
                    <td className="px-5 py-3 text-[#172126]">{i.stock} {i.unit}</td>
                    <td className="px-5 py-3 text-[#65737a]">{i.min_stock}</td>
                    <td className="px-5 py-3 text-[#65737a]">{rupiah(i.unit_cost)}</td>
                    <td className="px-5 py-3 font-semibold text-[#172126]">{rupiah(i.stock_value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────── ROOT ───────────────────
// ─────────────────── DOKTER (management) ───────────────────
interface DoctorRow {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  specialist: string | null;
  employee_number: string | null;
  is_active: boolean;
  doctor_visits_count: number;
}

function DoctorsView({ submit }: { submit: (msg: string) => void }) {
  const { data, reload } = useApi<{ doctors: DoctorRow[] }>("/admin/doctors");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<DoctorRow | null>(null);
  const [f, setF] = useState({ name: "", email: "", phone: "", specialist: "", employee_number: "", password: "", is_active: true });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const doctors = data?.doctors ?? [];

  const openNew = () => {
    setEditing(null);
    setF({ name: "", email: "", phone: "", specialist: "", employee_number: "", password: "", is_active: true });
    setErr("");
    setShow(true);
  };

  const openEdit = (d: DoctorRow) => {
    setEditing(d);
    setF({
      name: d.name,
      email: d.email,
      phone: d.phone ?? "",
      specialist: d.specialist ?? "",
      employee_number: d.employee_number ?? "",
      password: "",
      is_active: d.is_active,
    });
    setErr("");
    setShow(true);
  };

  const doSave = async () => {
    if (!f.name || !f.email) {
      setErr("Nama dan email wajib diisi.");
      return;
    }
    if (!editing && f.password.length < 6) {
      setErr("Password minimal 6 karakter untuk dokter baru.");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const payload = {
        name: f.name,
        email: f.email,
        phone: f.phone || null,
        specialist: f.specialist || null,
        employee_number: f.employee_number || null,
        is_active: f.is_active,
        ...(f.password ? { password: f.password } : {}),
      };
      if (editing) {
        await api.put(`/admin/doctors/${editing.id}`, payload);
        submit(`Dokter ${f.name} berhasil diperbarui.`);
      } else {
        await api.post("/admin/doctors", payload);
        submit(`Dokter ${f.name} berhasil ditambahkan.`);
      }
      setShow(false);
      reload();
    } catch (e) {
      setErr((e as { message?: string }).message || "Gagal menyimpan dokter.");
    } finally {
      setBusy(false);
    }
  };

  const doDelete = (d: DoctorRow) => {
    if (!window.confirm(`Hapus akses dokter "${d.name}"?`)) return;
    api
      .del(`/admin/doctors/${d.id}`)
      .then(() => {
        submit(`Dokter ${d.name} berhasil dihapus.`);
        reload();
      })
      .catch((e) => alert((e as { message?: string }).message || "Gagal menghapus dokter."));
  };

  const field = "w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]";

  return (
    <div className="p-6 max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#172126]">Akses Dokter</h1>
          <p className="text-[#94a0a6] text-sm">Tambah atau ubah akun login Tim Klinik</p>
        </div>
        <button onClick={openNew} className="bg-[#1cb5bd] hover:bg-[#11858c] text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          + Tambah Dokter
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f5f8f9] text-[#94a0a6] text-xs font-semibold">
            <tr>
              {["Nama", "Spesialis", "Kontak", "No. Pegawai", "Kunjungan", "Status", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            {doctors.length === 0 ? (
              <tr><td colSpan={7} className="px-5 py-8 text-center text-[#94a0a6]">Belum ada dokter terdaftar.</td></tr>
            ) : (
              doctors.map((d) => (
                <tr key={d.id} className="hover:bg-[#f5f8f9] transition">
                  <td className="px-5 py-3">
                    <p className="font-semibold text-[#172126]">{d.name}</p>
                    <p className="text-[#94a0a6] text-xs">{d.email}</p>
                    {!d.is_active && <span className="text-[10px] font-semibold text-red-500">NONAKTIF</span>}
                  </td>
                  <td className="px-5 py-3 text-[#65737a]">{d.specialist ?? "-"}</td>
                  <td className="px-5 py-3 text-[#65737a]">{d.phone ?? "-"}</td>
                  <td className="px-5 py-3 text-[#65737a]">{d.employee_number ?? "-"}</td>
                  <td className="px-5 py-3 text-[#65737a]">{d.doctor_visits_count}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${d.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {d.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(d)} className="border border-[#e2e8ea] hover:border-[#1cb5bd] hover:text-[#11858c] text-[#65737a] text-xs font-semibold px-3 py-1.5 rounded-lg transition">✎ Edit</button>
                      <button onClick={() => doDelete(d)} className="border border-red-200 hover:bg-red-50 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-lg transition">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal tambah/edit dokter */}
      {show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <p className="font-bold text-[#172126] text-lg">{editing ? `Edit Dokter — ${editing.name}` : "Tambah Dokter Baru"}</p>
              <button onClick={() => setShow(false)} className="text-[#94a0a6] hover:text-[#65737a] text-xl">✕</button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Nama Lengkap</label>
                <input className={field} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Dr. Sari Wijayanti" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Email (login)</label>
                  <input className={field} type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="dr@tentangdental.id" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#65737a] block mb-1.5">No. HP</label>
                  <input className={field} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="08xxxxxxxxxx" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Spesialis</label>
                  <input className={field} value={f.specialist} onChange={(e) => setF({ ...f, specialist: e.target.value })} placeholder="drg. Umum" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#65737a] block mb-1.5">No. Pegawai</label>
                  <input className={field} value={f.employee_number} onChange={(e) => setF({ ...f, employee_number: e.target.value })} placeholder="EMP-001" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Password {editing && "(kosongkan jika tidak diganti)"}</label>
                <input className={field} type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} placeholder={editing ? "••••••••" : "Min. 6 karakter"} />
              </div>
              <label className="flex items-center gap-2 text-sm text-[#65737a] cursor-pointer">
                <input type="checkbox" checked={f.is_active} onChange={(e) => setF({ ...f, is_active: e.target.checked })} />
                Akun aktif (bisa login)
              </label>
            </div>
            {err && <p className="text-sm text-red-500 font-medium">{err}</p>}
            <button
              onClick={doSave}
              disabled={busy}
              className="w-full bg-[#1cb5bd] hover:bg-[#11858c] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition"
            >
              {busy ? "Menyimpan..." : editing ? "Simpan Perubahan" : "Tambah Dokter"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard({ activeMenu }: AdminDashboardProps) {
  const [showMsg, setShowMsg] = useState("");
  const submit = (msg: string) => {
    setShowMsg(msg);
    setTimeout(() => setShowMsg(""), 3000);
  };
  const toast = showMsg && <div className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg font-semibold text-sm z-50">{showMsg}</div>;

  const { data: dash } = useApi<DashData>("/dashboard");
  const { data: visitsData, reload: reloadVisits } = useApi<{ visits: { data: VisitType[] } }>("/visits?per_page=100");
  const visits = useMemo(() => visitsData?.visits?.data ?? [], [visitsData]);

  // PAYMENT MODAL state
  const [payTarget, setPayTarget] = useState<VisitType | null>(null);
  const [payMethod, setPayMethod] = useState("cash");
  const [payAmount, setPayAmount] = useState("");
  const [payBusy, setPayBusy] = useState(false);
  const [payNote, setPayNote] = useState("");

  const openPay = (v: VisitType) => {
    setPayTarget(v);
    setPayAmount(String(remainingOf(v)));
    setPayMethod("cash");
    setPayNote("");
    setPayBusy(false);
  };

  const doPay = async () => {
    if (!payTarget) return;
    const amount = parseFloat(payAmount);
    if (!amount || amount <= 0) {
      setPayNote("Masukkan nominal yang valid.");
      return;
    }
    setPayBusy(true);
    setPayNote("");
    try {
      const res = await api.post<{ data: { message: string } }>("/payments", {
        visit_id: payTarget.id,
        method: payMethod,
        amount,
        paid_by: "Admin",
      });
      setPayTarget(null);
      submit(res.data.message || "Pembayaran berhasil dicatat!");
      reloadVisits();
    } catch (e) {
      setPayNote((e as { message?: string }).message || "Pembayaran gagal.");
    } finally {
      setPayBusy(false);
    }
  };

  // CREATE / EDIT VISIT MODAL state
  const { data: optsData } = useApi<{ patients: PatientOpt[]; doctors: DoctorOpt[] }>("/admin/options");
  const { data: tinData, reload: reloadTin } = useApi<{ tindakans: { data: Tindakan[] } }>("/admin/tindakans?active_only=1&per_page=200");
  const [showCreate, setShowCreate] = useState(false);
  const [editTarget, setEditTarget] = useState<VisitType | null>(null);
  const [form, setForm] = useState({ patient_id: "", doctor_id: "", visit_date: new Date().toISOString().slice(0, 10), complaint: "" });
  const [selItems, setSelItems] = useState<Record<number, number>>({});
  const [createErr, setCreateErr] = useState("");
  const [createBusy, setCreateBusy] = useState(false);

  const editingPaid = editTarget !== null && editTarget.payments.length > 0;

  const openCreate = () => {
    const patients = optsData?.patients ?? [];
    const doctors = optsData?.doctors ?? [];
    setEditTarget(null);
    setForm({
      patient_id: patients[0] ? String(patients[0].id) : "",
      doctor_id: doctors[0] ? String(doctors[0].id) : "",
      visit_date: new Date().toISOString().slice(0, 10),
      complaint: "",
    });
    setSelItems({});
    setCreateErr("");
    setCreateBusy(false);
    setShowCreate(true);
  };

  const openEdit = (v: VisitType) => {
    setEditTarget(v);
    const priceByTindakan = new Map((tinData?.tindakans?.data ?? []).map((t) => [t.id, Number(t.price)]));
    const items: Record<number, number> = {};
    v.items.forEach((it) => {
      if (it.tindakan_id === null) return;
      const unit = priceByTindakan.get(it.tindakan_id) ?? 0;
      items[it.tindakan_id] = unit > 0 ? Math.max(1, Math.round(Number(it.total) / unit)) : 1;
    });
    setForm({
      patient_id: v.patient ? String(v.patient.id) : "",
      doctor_id: v.doctor ? String(v.doctor.id) : "",
      visit_date: v.visit_date,
      complaint: v.complaint ?? "",
    });
    setSelItems(items);
    setCreateErr("");
    setCreateBusy(false);
    setShowCreate(true);
  };

  const toggleItem = (id: number) => {
    setSelItems((s) => {
      const next = { ...s };
      if (next[id]) delete next[id];
      else next[id] = 1;
      return next;
    });
  };

  const setQty = (id: number, qty: number) => {
    setSelItems((s) => ({ ...s, [id]: qty < 1 ? 1 : qty }));
  };

  const doCreate = async () => {
    const items = Object.entries(selItems).map(([id, qty]) => ({ tindakan_id: Number(id), quantity: qty }));
    if (!form.patient_id || !form.doctor_id || items.length === 0) {
      setCreateErr("Pilih pasien, dokter, dan minimal satu tindakan.");
      return;
    }
    setCreateBusy(true);
    setCreateErr("");
    try {
      const payload = {
        patient_id: Number(form.patient_id),
        doctor_id: Number(form.doctor_id),
        visit_date: form.visit_date,
        complaint: form.complaint,
        items,
      };
      if (editTarget) {
        const res = await api.put<{ data: { visit: VisitType } }>(`/visits/${editTarget.id}`, payload);
        setShowCreate(false);
        submit(`Invoice ${res.data.visit.invoice_number} berhasil diupdate!`);
      } else {
        const res = await api.post<{ data: { visit: VisitType } }>("/visits", payload);
        setShowCreate(false);
        submit(`Invoice ${res.data.visit.invoice_number} berhasil dibuat!`);
      }
      reloadVisits();
      reloadTin();
    } catch (e) {
      setCreateErr((e as { message?: string }).message || "Gagal menyimpan invoice.");
    } finally {
      setCreateBusy(false);
    }
  };

  const doDelete = (v: VisitType) => {
    const ok = window.confirm(
      `Hapus invoice ${v.invoice_number} (Total: ${rupiah(v.total)})?\n\nTindakan ini tidak dapat dibatalkan.`,
    );
    if (!ok) return;
    api
      .del<{ data: { message: string } }>(`/visits/${v.id}`)
      .then(() => {
        submit(`Invoice ${v.invoice_number} berhasil dihapus.`);
        reloadVisits();
      })
      .catch((e) => alert((e as { message?: string }).message || "Gagal menghapus invoice."));
  };

  const menuProps: MenuProps = { visits, reloadVisits, openPay, openCreate, openEdit, doDelete, dash, submit, toast };

  return (
    <>
      {activeMenu === "beranda" && <BerandaView {...menuProps} />}
      {activeMenu === "antrean" && <AntreanView {...menuProps} />}
      {activeMenu === "billing" && <BillingView {...menuProps} />}
      {activeMenu === "pembayaran" && <PembayaranView {...menuProps} />}
      {activeMenu === "rekonsiliasi" && <RekonsiliasiView {...menuProps} />}
      {activeMenu === "bagi-hasil" && <BagiHasilView />}
      {activeMenu === "laporan" && <LaporanView />}
      {activeMenu === "dokter" && <DoctorsView submit={submit} />}

      {/* Payment Modal */}
      {payTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <p className="font-bold text-[#172126] text-lg">Proses Pembayaran</p>
              <button onClick={() => setPayTarget(null)} className="text-[#94a0a6] hover:text-[#65737a] text-xl">✕</button>
            </div>
            <div className="bg-[#f5f8f9] rounded-xl p-4">
              <p className="font-semibold text-[#172126] text-sm">{payTarget.patient?.name ?? "Pasien"} — {payTarget.doctor?.name ?? ""}</p>
              <p className="text-[#94a0a6] text-xs">{payTarget.invoice_number} · {dateLong(payTarget.visit_date)}</p>
              <div className="flex justify-between mt-2">
                <span className="text-[#65737a] text-sm">Total Tagihan</span>
                <span className="text-[#172126] font-semibold text-sm">{rupiah(payTarget.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#65737a] text-sm">Sisa Tagihan</span>
                <span className="text-[#1cb5bd] font-bold text-xl">{rupiah(remainingOf(payTarget))}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#65737a] mb-2">Metode Pembayaran</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: "cash", label: "Tunai", icon: "💵" },
                  { k: "qris", label: "QRIS", icon: "📱" },
                ].map((m) => (
                  <button
                    key={m.k}
                    onClick={() => setPayMethod(m.k)}
                    className={`py-3 rounded-xl border text-sm font-semibold transition ${payMethod === m.k ? "border-[#1cb5bd] bg-[#e8f8f8] text-[#11858c]" : "border-[#e2e8ea] text-[#65737a] hover:border-[#1cb5bd]"}`}
                  >
                    {m.icon}<br />
                    <span className="text-xs">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Nominal (Rp)</label>
              <input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]"
              />
            </div>
            {payNote && <p className={`text-sm font-medium ${payNote.startsWith("Pembayaran") ? "text-green-600" : "text-red-500"}`}>{payNote}</p>}
            <button
              onClick={doPay}
              disabled={payBusy}
              className="w-full bg-[#1cb5bd] hover:bg-[#11858c] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition"
            >
              {payBusy ? "Memproses..." : "Konfirmasi Pembayaran"}
            </button>
            <p className="text-[#94a0a6] text-[11px] text-center">
              {payMethod === "cash"
                ? "Pembayaran tunai langsung terkonfirmasi dan masuk kas harian."
                : "Pembayaran QRIS menunggu verifikasi kasir di menu Rekonsiliasi."}
            </p>
          </div>
        </div>
      )}

      {/* Create / Edit Visit Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <p className="font-bold text-[#172126] text-lg">{editTarget ? `Edit Invoice ${editTarget.invoice_number}` : "Buat Invoice / Kunjungan Baru"}</p>
              <button onClick={() => setShowCreate(false)} className="text-[#94a0a6] hover:text-[#65737a] text-xl">✕</button>
            </div>
            {editingPaid && (
              <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-lg px-3 py-2">
                Invoice ini sudah ada catatan pembayaran — hanya tanggal &amp; keluhan yang bisa diubah.
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Pasien</label>
                <select disabled={editingPaid} className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm disabled:opacity-60 disabled:bg-[#f5f8f9]" value={form.patient_id} onChange={(e) => setForm({ ...form, patient_id: e.target.value })}>
                  {(optsData?.patients ?? []).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Dokter</label>
                <select disabled={editingPaid} className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm disabled:opacity-60 disabled:bg-[#f5f8f9]" value={form.doctor_id} onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}>
                  {(optsData?.doctors ?? []).map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Tanggal Kunjungan</label>
                <input type="date" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm" value={form.visit_date} onChange={(e) => setForm({ ...form, visit_date: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Keluhan</label>
                <input className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm" placeholder="Sakit gigi, kontrol, dll." value={form.complaint} onChange={(e) => setForm({ ...form, complaint: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Tindakan (centang & pilih jumlah)</label>
              <div className="max-h-56 overflow-y-auto border border-[#e2e8ea] rounded-lg divide-y divide-[#f0f4f5]">
                {(tinData?.tindakans?.data ?? []).map((t) => {
                  const checked = selItems[t.id] !== undefined;
                  return (
                    <div key={t.id} className={`flex items-center gap-3 px-3 py-2.5 text-sm ${checked ? "bg-[#e8f8f8]" : "hover:bg-[#f5f8f9]"}`}>
                      <input type="checkbox" disabled={editingPaid} checked={checked} onChange={() => toggleItem(t.id)} />
                      <div className="flex-1">
                        <p className="font-medium text-[#172126]">{t.name}</p>
                        <p className="text-[#94a0a6] text-xs">{rupiah(t.price)} · Komisi {t.komisi_persen}%</p>
                      </div>
                      {checked && (
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => setQty(t.id, (selItems[t.id] ?? 1) - 1)} className="size-6 rounded bg-white border border-[#e2e8ea] text-[#65737a]">−</button>
                          <span className="w-6 text-center font-semibold">{selItems[t.id]}</span>
                          <button onClick={() => setQty(t.id, (selItems[t.id] ?? 1) + 1)} className="size-6 rounded bg-white border border-[#e2e8ea] text-[#65737a]">+</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {createErr && <p className="text-sm text-red-500 font-medium">{createErr}</p>}
            <button
              onClick={doCreate}
              disabled={createBusy}
              className="w-full bg-[#1cb5bd] hover:bg-[#11858c] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition"
            >
              {createBusy ? "Menyimpan..." : editTarget ? "Simpan Perubahan" : "Simpan Invoice"}
            </button>
          </div>
        </div>
      )}

      {toast}
    </>
  );
}