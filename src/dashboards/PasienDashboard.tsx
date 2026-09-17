import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { rupiah, dateLong, PayBadge } from "@/lib/format";

interface PasienDashboardProps {
  activeMenu: string;
  userName: string;
}

interface InvoiceData {
  id: number;
  invoice_number: string;
  visit_date: string;
  complaint?: string | null;
  doctor: { id: number; name: string } | null;
  total: number | string;
  payment_status: string;
  items: { id: number; tarif_name: string; total: number | string }[];
}

interface DashData {
  totals: { total_visits: number; total_spent: number; outstanding_balance: number };
  visits: {
    id: number;
    invoice_number: string;
    date: string;
    doctor: string | null;
    total: number | string;
    payment_status: string;
    items: { name: string; price: number | string }[];
  }[];
}

interface DashResponse {
  success: boolean;
  data: DashData;
}

interface InvoicesResponse {
  success: boolean;
  data: { invoices: { data: InvoiceData[] } };
}

interface OutstandingResponse {
  success: boolean;
  data: {
    receivables: {
      id: number;
      total_amount: number | string;
      paid_amount: number | string;
      remaining: number | string;
      due_date: string;
      status: string;
      visit: { id: number; invoice_number: string; visit_date: string } | null;
    }[];
    total_outstanding: number;
  };
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8ea] p-5">
      <p className="text-[#94a0a6] text-xs font-semibold mb-2">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-[#94a0a6] text-xs mt-1">{sub}</p>
    </div>
  );
}

function useDashboard() {
  const [dash, setDash] = useState<DashData | null>(null);
  const [err, setErr] = useState("");

  const load = () => {
    api
      .get<DashResponse>("/dashboard")
      .then((r) => setDash(r.data))
      .catch((e) => setErr((e as { message?: string }).message || "Gagal memuat data"));
  };

  useEffect(load, []);
  return { dash, err, load };
}

function RiwayatView() {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);

  useEffect(() => {
    api
      .get<InvoicesResponse>("/customer/invoices?per_page=50")
      .then((r) => setInvoices(r.data.invoices.data))
      .catch(() => setInvoices([]));
  }, []);

  return (
    <div className="p-6 max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#172126]">Riwayat Pemeriksaan</h1>
        <p className="text-[#94a0a6] text-sm">Semua rekam medis kunjungan Anda</p>
      </div>
      <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f5f8f9] text-[#94a0a6] text-xs font-semibold">
            <tr>
              {["Tanggal", "Keluhan", "Perawatan", "Dokter", "Total", "Status"].map((h) => (
                <th key={h} className="text-left px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            {invoices.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-[#94a0a6]">Belum ada data pemeriksaan.</td></tr>
            ) : (
              invoices.map((r) => (
                <tr key={r.id} className="hover:bg-[#f5f8f9] transition">
                  <td className="px-5 py-3 text-[#65737a]">{dateLong(r.visit_date)}</td>
                  <td className="px-5 py-3 text-[#172126] font-medium">{r.complaint ?? "-"}</td>
                  <td className="px-5 py-3 text-[#65737a]">{r.items.length ? firstItemOf(r.items) : "-"}</td>
                  <td className="px-5 py-3 text-[#65737a]">{r.doctor?.name ?? "-"}</td>
                  <td className="px-5 py-3 font-semibold text-[#172126]">{rupiah(r.total)}</td>
                  <td className="px-5 py-3"><PayBadge status={r.payment_status} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TagihanView({ onNotice }: { onNotice: (msg: string) => void }) {
  const [out, setOut] = useState<OutstandingResponse["data"] | null>(null);

  useEffect(() => {
    api
      .get<OutstandingResponse>("/customer/outstanding")
      .then((r) => setOut(r.data))
      .catch(() => setOut(null));
  }, []);

  const list = out?.receivables ?? [];
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#172126]">Tagihan Saya</h1>
        <p className="text-[#94a0a6] text-sm">Rincian tagihan yang belum Anda bayar</p>
      </div>
      {list.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e2e8ea] p-10 text-center">
          <p className="text-[#172126] font-semibold">Tidak ada tagihan aktif 🎉</p>
          <p className="text-[#94a0a6] text-sm mt-1">Seluruh tagihan Anda sudah lunas.</p>
        </div>
      ) : (
        list.map((inv) => (
          <div key={inv.id} className="bg-white rounded-2xl border border-[#e2e8ea] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[#172126]">{inv.visit?.invoice_number ?? `Tagihan #${inv.id}`}</p>
                <p className="text-[#94a0a6] text-sm">{inv.visit ? dateLong(inv.visit.visit_date) : dateLong(inv.due_date)}</p>
              </div>
              <PayBadge status={inv.status} />
            </div>
            <hr className="border-[#e2e8ea]" />
            <div className="flex justify-between text-sm text-[#65737a]">
              <span>Total Tagihan</span>
              <span className="font-medium text-[#172126]">{rupiah(inv.total_amount)}</span>
            </div>
            <div className="flex justify-between text-sm text-[#65737a]">
              <span>Sudah Dibayar</span>
              <span className="font-medium text-green-600">{rupiah(inv.paid_amount)}</span>
            </div>
            <hr className="border-[#e2e8ea]" />
            <div className="flex justify-between font-bold text-[#172126]">
              <span>Sisa Tagihan</span>
              <span className="text-[#1cb5bd] text-lg">{rupiah(inv.remaining)}</span>
            </div>
            <button
              onClick={() => onNotice("Pembayaran online akan tersedia di tahap berikutnya. Silakan bayar di kasir klinik atau transfer ke rekening klinik.")}
              className="w-full bg-[#1cb5bd] hover:bg-[#11858c] text-white font-semibold py-2.5 rounded-lg transition text-sm"
            >
              Bayar Sekarang
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function firstItemOf(items: { tarif_name: string }[]): string {
  return items[0]?.tarif_name ?? "-";
}

export default function PasienDashboard({ activeMenu, userName }: PasienDashboardProps) {
  const { dash } = useDashboard();
  const [showDaftar, setShowDaftar] = useState(false);
  const [notice, setNotice] = useState("");

  const firstItem = (items: { name: string }[] | { tarif_name: string }[]) =>
    (items[0] as { name?: string; tarif_name?: string })?.name ?? (items[0] as { tarif_name?: string })?.tarif_name ?? "-";

  if (activeMenu === "beranda") {
    const visits = dash?.visits ?? [];
    return (
      <div className="p-6 space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold text-[#172126]">Selamat Datang, {userName.split(" ")[0]} 👋</h1>
          <p className="text-[#94a0a6] text-sm mt-1">Berikut ringkasan informasi kesehatan gigi Anda.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Kunjungan"
            value={String(dash?.totals.total_visits ?? 0)}
            sub="Semua kunjungan Anda"
            color="text-[#1cb5bd]"
          />
          <StatCard
            label="Total Belanja"
            value={rupiah(dash?.totals.total_spent)}
            sub="Akumulasi biaya perawatan"
            color="text-[#172126]"
          />
          <StatCard
            label="Tagihan Aktif"
            value={rupiah(dash?.totals.outstanding_balance)}
            sub={(dash?.totals.outstanding_balance ?? 0) > 0 ? "Ada tagihan belum lunas" : "Semua tagihan lunas"}
            color={(dash?.totals.outstanding_balance ?? 0) > 0 ? "text-red-500" : "text-green-600"}
          />
        </div>

        <div className="bg-white rounded-xl border border-[#e2e8ea] p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-[#172126]">Riwayat Kunjungan Terakhir</p>
            <button onClick={() => setShowDaftar(true)} className="text-xs bg-[#1cb5bd] hover:bg-[#11858c] text-white px-4 py-2 rounded-lg font-semibold transition">
              + Daftar Antrean
            </button>
          </div>
          {visits.length === 0 ? (
            <p className="text-[#94a0a6] text-sm">Belum ada kunjungan tercatat.</p>
          ) : (
            visits.slice(0, 3).map((v) => (
              <div key={v.id} className="flex items-center gap-4 bg-[#f5f8f9] rounded-xl p-4 mb-3">
                <div className="size-12 rounded-xl bg-[#e8f8f8] flex items-center justify-center shrink-0">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1cb5bd" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" />
                    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#172126] text-sm">
                    {v.items.length ? firstItem(v.items) : v.invoice_number} — {v.doctor ?? "Dokter"}
                  </p>
                  <p className="text-[#94a0a6] text-xs mt-0.5">{dateLong(v.date)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#1cb5bd] text-sm">{rupiah(v.total)}</p>
                  <PayBadge status={v.payment_status} />
                </div>
              </div>
            ))
          )}
        </div>

        {showDaftar && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-bold text-[#172126] text-lg">Daftar Antrean Baru</p>
                <button onClick={() => setShowDaftar(false)} className="text-[#94a0a6] hover:text-[#65737a]">✕</button>
              </div>
              {notice ? (
                <p className="bg-[#e8f8f8] text-[#11858c] text-sm font-medium px-3 py-2 rounded-lg border border-[#1cb5bd]/20">{notice}</p>
              ) : (
                <>
                  {[
                    { label: "Tanggal Kunjungan", type: "date" },
                    { label: "Keluhan Utama", type: "text", placeholder: "Sakit gigi, gusi bengkak, dll." },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="text-xs font-semibold text-[#65737a] block mb-1.5">{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
                    </div>
                  ))}
                  <button
                    onClick={() => setNotice("Pengajuan antrean online akan tersedia di tahap berikutnya. Untuk sekarang, silakan datang langsung ke klinik atau hubungi admin.")}
                    className="w-full bg-[#1cb5bd] hover:bg-[#11858c] text-white font-semibold py-2.5 rounded-lg transition text-sm"
                  >
                    Kirim Permintaan
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (activeMenu === "antrean") {
    const visits = dash?.visits ?? [];
    return (
      <div className="p-6 max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#172126]">Riwayat & Jadwal Kunjungan</h1>
            <p className="text-[#94a0a6] text-sm">Semua kunjungan Anda di klinik</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#f5f8f9] text-[#94a0a6] text-xs font-semibold">
              <tr>
                {["No. Invoice", "Tanggal", "Perawatan", "Dokter", "Total", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f5]">
              {visits.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-[#94a0a6]">Belum ada kunjungan.</td></tr>
              ) : (
                visits.map((v) => (
                  <tr key={v.id} className="hover:bg-[#f5f8f9] transition">
                    <td className="px-5 py-3 font-bold text-[#1cb5bd]">{v.invoice_number}</td>
                    <td className="px-5 py-3 text-[#172126]">{dateLong(v.date)}</td>
                    <td className="px-5 py-3 text-[#65737a]">{v.items.length ? firstItem(v.items) : "-"}</td>
                    <td className="px-5 py-3 text-[#172126]">{v.doctor ?? "-"}</td>
                    <td className="px-5 py-3 font-semibold text-[#172126]">{rupiah(v.total)}</td>
                    <td className="px-5 py-3"><PayBadge status={v.payment_status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeMenu === "riwayat") {
    return <RiwayatView />;
  }

  if (activeMenu === "tagihan") {
    return <TagihanView onNotice={setNotice} />;
  }

  return null;
}