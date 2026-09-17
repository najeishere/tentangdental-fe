import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { rupiah, dateLong, PayBadge } from "@/lib/format";

interface KlinikDashboardProps {
  activeMenu: string;
  userName: string;
}

interface TreatmentVisit {
  id: number;
  invoice_number: string;
  visit_date: string;
  complaint?: string | null;
  payment_status: string;
  total: number | string;
  patient: { id: number; name: string; phone?: string } | null;
  items: { id: number; tarif_name: string; total: number | string }[];
}

interface DoctorDash {
  doctor: { id: number; name: string; specialist: string; employee_number: string };
  totals: { total_commission: number; payout_received: number; pending_commission: number; visits_handled: number; patients_handled: number };
  monthly_commission: number;
}

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Selesai": "bg-green-100 text-green-700",
    "Dalam Periksa": "bg-[#e8f8f8] text-[#11858c]",
    "Menunggu": "bg-yellow-100 text-yellow-700",
    paid: "bg-green-100 text-green-700",
    partial: "bg-amber-100 text-amber-700",
    unpaid: "bg-red-100 text-red-600",
  };
  const label: Record<string, string> = { paid: "Lunas", partial: "Sebagian", unpaid: "Belum Bayar" };
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${map[status] ?? "bg-gray-100 text-gray-600"}`}>{label[status] ?? status}</span>;
}

function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-[#172126]">{title}</h1>
      {sub && <p className="text-[#94a0a6] text-sm mt-1">{sub}</p>}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8ea] p-5">
      <p className="text-[#94a0a6] text-xs font-semibold mb-2">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

const roadmapNote =
  "Fitur ini sedang dikembangkan pada tahap berikutnya (sesuai roadmap). Untuk sekarang, pencatatan tindakan & billing dilakukan lewat akun Admin/Kasir. Data Anda di dashboard sudah terhubung ke data nyata.";

export default function KlinikDashboard({ activeMenu, userName }: KlinikDashboardProps) {
  const [dash, setDash] = useState<DoctorDash | null>(null);
  const [treatments, setTreatments] = useState<TreatmentVisit[]>([]);
  const [notice, setNotice] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPasien, setSelectedPasien] = useState<TreatmentVisit | null>(null);
  const [bmhpSelected, setBmhpSelected] = useState<string[]>([]);
  const [tindakanType, setTindakanType] = useState<"langsung" | "lab">("langsung");

  const load = () => {
    api
      .get<{ success: boolean; data: DoctorDash }>("/dashboard")
      .then((r) => setDash(r.data))
      .catch(() => undefined);
    api
      .get<{ success: boolean; data: { visits: { data: TreatmentVisit[] } } }>("/doctor/treatments?per_page=50")
      .then((r) => setTreatments(r.data.visits.data))
      .catch(() => undefined);
  };
  useEffect(load, []);

  const toggleBmhp = (item: string) => {
    setBmhpSelected((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
  };

  const handleSubmit = (msg: string) => {
    setShowSuccess(true);
    setNotice(msg || "Data berhasil disimpan!");
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const bmhpOptions = useMemo(() => ["Komposit A2", "Komposit A3", "Bonding Agent", "Etsa Gel", "Calcium Hydroxide", "Gutta Percha", "Saline 0.9%", "Povidone Iodine", "Rubber Dam", "Matrix Band", "Kapas Steril", "Cotton Roll", "Articulating Paper"], []);

  const toast = showSuccess && (
    <div className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg font-semibold text-sm z-50">{notice}</div>
  );

  if (activeMenu === "beranda") {
    return (
      <div className="p-6 max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#172126]">Selamat Datang, {userName} 👋</h1>
          <p className="text-[#94a0a6] text-sm mt-1">{dash?.doctor.specialist ?? ""} · {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard label="Komisi Bulan Ini" value={rupiah(dash?.monthly_commission)} color="text-[#1cb5bd]" />
          <StatCard label="Total Kunjungan" value={String(dash?.totals.visits_handled ?? 0)} color="text-[#172126]" />
          <StatCard label="Pasien Ditangani" value={String(dash?.totals.patients_handled ?? 0)} color="text-[#172126]" />
          <StatCard label="Komisi Belum Cair" value={rupiah(dash?.totals.pending_commission)} color="text-yellow-600" />
        </div>
        <div className="bg-white rounded-xl border border-[#e2e8ea] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f0f4f5]">
            <p className="font-semibold text-[#172126]">Tindakan/Kunjungan Terakhir</p>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-[#f5f8f9] text-[#94a0a6] text-xs font-semibold">
              <tr>
                {["No. Invoice", "Pasien", "Perawatan", "Keluhan", "Tanggal", "Total", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f5]">
              {treatments.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-8 text-center text-[#94a0a6]">Belum ada data tindakan.</td></tr>
              ) : (
                treatments.map((t) => (
                  <tr key={t.id} className="hover:bg-[#f5f8f9] transition">
                    <td className="px-5 py-3 font-bold text-[#1cb5bd]">{t.invoice_number}</td>
                    <td className="px-5 py-3 font-medium text-[#172126]">{t.patient?.name ?? "-"}</td>
                    <td className="px-5 py-3 text-[#65737a]">{t.items[0]?.tarif_name ?? "-"}</td>
                    <td className="px-5 py-3 text-[#65737a]">{t.complaint ?? "-"}</td>
                    <td className="px-5 py-3 text-[#65737a]">{dateLong(t.visit_date)}</td>
                    <td className="px-5 py-3 font-semibold text-[#172126]">{rupiah(t.total)}</td>
                    <td className="px-5 py-3"><PayBadge status={t.payment_status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeMenu === "antrean") {
    return (
      <div className="p-6 max-w-5xl space-y-6">
        <SectionHeader title="Daftar Pasien & Kunjungan" sub="Pilih pasien untuk melihat detail pemeriksaan" />
        <div className="grid grid-cols-1 gap-3">
          {treatments.length === 0 ? (
            <p className="text-[#94a0a6] text-sm">Belum ada data kunjungan.</p>
          ) : (
            treatments.map((a) => (
              <div
                key={a.id}
                className={`bg-white rounded-xl border p-4 flex items-center gap-4 cursor-pointer transition hover:border-[#1cb5bd] ${selectedPasien?.id === a.id ? "border-[#1cb5bd] ring-2 ring-[#1cb5bd]/20" : "border-[#e2e8ea]"}`}
                onClick={() => setSelectedPasien(a)}
              >
                <div className="size-10 rounded-full bg-[#e8f8f8] flex items-center justify-center font-bold text-[#11858c] shrink-0">
                  {(a.patient?.name ?? "?").charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#172126] text-sm">{a.patient?.name ?? "Pasien"}</p>
                  <p className="text-[#65737a] text-xs mt-0.5">{a.complaint ?? "Konsultasi"} · {a.items[0]?.tarif_name ?? "-"}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[#1cb5bd] font-bold text-sm">{a.invoice_number}</p>
                  <p className="text-[#94a0a6] text-xs">{dateLong(a.visit_date)}</p>
                </div>
                <PayBadge status={a.payment_status} />
              </div>
            ))
          )}
        </div>
        {selectedPasien && (
          <div className="bg-[#e8f8f8] border border-[#1cb5bd]/30 rounded-xl p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-[#11858c]">Pasien Dipilih: {selectedPasien.patient?.name}</p>
              <p className="text-sm text-[#65737a]">{selectedPasien.invoice_number} · Total {rupiah(selectedPasien.total)}</p>
            </div>
            <button
              onClick={() => handleSubmit(roadmapNote)}
              className="bg-[#1cb5bd] hover:bg-[#11858c] text-white text-sm font-semibold px-5 py-2 rounded-lg transition shrink-0"
            >
              Mulai Pemeriksaan →
            </button>
          </div>
        )}
        {toast}
      </div>
    );
  }

  if (activeMenu === "rekam-medis") {
    return (
      <div className="p-6 max-w-3xl space-y-6">
        <SectionHeader title="Rekam Medis & Diagnosa" sub="Catat hasil pemeriksaan dan diagnosa pasien" />
        <div className="bg-white rounded-2xl border border-[#e2e8ea] p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Nama Pasien</label>
              <input placeholder="Nama pasien" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Keluhan Utama</label>
              <input placeholder="Keluhan pasien" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Pemeriksaan Objektif</label>
            <textarea rows={3} placeholder="Kondisi gigi, jaringan periodontal, oklusi, dll..." className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd] resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Diagnosa</label>
              <select className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]">
                <option>Gingivitis Kronis</option>
                <option>Karies Gigi</option>
                <option>Pulpitis Irreversibel</option>
                <option>Periodontitis</option>
                <option>Maloklusi Kelas I</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Gigi yang Terlibat</label>
              <input placeholder="Mis: 36, 37" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
            </div>
          </div>
          <button onClick={() => handleSubmit(roadmapNote)} className="bg-[#1cb5bd] hover:bg-[#11858c] text-white font-semibold px-6 py-2.5 rounded-lg transition text-sm">
            Simpan Rekam Medis
          </button>
        </div>
        {toast}
      </div>
    );
  }

  if (activeMenu === "tindakan") {
    return (
      <div className="p-6 max-w-3xl space-y-6">
        <SectionHeader title="Input Tindakan Medis" sub="Catat tindakan yang dilakukan pada pasien" />

        <div className="flex gap-2 bg-[#f5f8f9] p-1 rounded-xl w-fit">
          {(["langsung", "lab"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTindakanType(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${tindakanType === t ? "bg-white shadow text-[#172126]" : "text-[#94a0a6]"}`}
            >
              {t === "langsung" ? "Tindakan Langsung" : "Tindakan + Lab Dental"}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#e2e8ea] p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Nama Pasien</label>
              <input placeholder="Nama pasien" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Tanggal Tindakan</label>
              <input type="date" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
            </div>
          </div>

          {tindakanType === "langsung" ? (
            <>
              <div>
                <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Jenis Tindakan</label>
                <select className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]">
                  <option>Scaling Supragingival</option>
                  <option>Scaling Subgingival</option>
                  <option>Tambal Komposit</option>
                  <option>Ekstraksi Gigi Sulung</option>
                  <option>Ekstraksi Gigi Permanen</option>
                  <option>Perawatan Saluran Akar (PSA)</option>
                  <option>Pencabutan Gigi Bungsu</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Gigi yang Ditindak</label>
                  <input placeholder="Mis: 11, 21" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Tarif Tindakan (Rp)</label>
                  <input placeholder="250000" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Jenis Restorasi / Prostetik</label>
                <select className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]">
                  <option>Crown Zirconia</option>
                  <option>Crown PFM</option>
                  <option>Behel Konvensional</option>
                  <option>Behel Self-Ligating</option>
                  <option>Implan Dental (Single)</option>
                  <option>Veneer Komposit</option>
                  <option>Veneer Porselen</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Biaya Lab (Rp)</label>
                  <input placeholder="1500000" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Jasa Dokter (Rp)</label>
                  <input placeholder="500000" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Catatan Klinis</label>
            <textarea rows={2} placeholder="Catatan tambahan untuk tindakan ini..." className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd] resize-none" />
          </div>
          <button onClick={() => handleSubmit(roadmapNote)} className="bg-[#1cb5bd] hover:bg-[#11858c] text-white font-semibold px-6 py-2.5 rounded-lg transition text-sm">
            Simpan Tindakan
          </button>
        </div>
        {toast}
      </div>
    );
  }

  if (activeMenu === "lab") {
    return (
      <div className="p-6 max-w-3xl space-y-6">
        <SectionHeader title="Pengiriman Cetakan ke Lab" sub="Catat pengiriman cetakan gigi ke vendor lab dental" />
        <div className="bg-white rounded-2xl border border-[#e2e8ea] p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Nama Pasien</label>
              <input placeholder="Cari nama pasien..." className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Tanggal Pengiriman</label>
              <input type="date" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Vendor Lab</label>
              <select className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]">
                <option>Dental Lab Prima</option>
                <option>Lab Sinar Baru</option>
                <option>Medika Lab Indonesia</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Jenis Pekerjaan Lab</label>
              <select className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]">
                <option>Crown Zirconia</option>
                <option>Crown PFM</option>
                <option>Gigi Tiruan Sebagian</option>
                <option>Gigi Tiruan Penuh</option>
                <option>Alat Ortodonti</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Biaya Lab (Rp)</label>
              <input placeholder="1500000" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Status</label>
              <select className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]">
                <option>Dikirim</option>
                <option>Dalam Proses</option>
                <option>Selesai - Belum Diambil</option>
                <option>Sudah Diambil</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Instruksi Khusus</label>
            <textarea rows={3} placeholder="Instruksi detail untuk vendor lab..." className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd] resize-none" />
          </div>
          <button onClick={() => handleSubmit(roadmapNote)} className="bg-[#1cb5bd] hover:bg-[#11858c] text-white font-semibold px-6 py-2.5 rounded-lg transition text-sm">
            Catat Pengiriman Lab
          </button>
        </div>
        {toast}
      </div>
    );
  }

  if (activeMenu === "bmhp") {
    return (
      <div className="p-6 max-w-3xl space-y-6">
        <SectionHeader title="Pencatatan BMHP" sub="Bahan Medis Habis Pakai yang digunakan dalam tindakan" />
        <div className="bg-white rounded-2xl border border-[#e2e8ea] p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Pasien</label>
              <input placeholder="Nama pasien" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Tanggal Tindakan</label>
              <input type="date" className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd]" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#65737a] block mb-3">Pilih BMHP yang Digunakan</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {bmhpOptions.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer p-2.5 rounded-lg border border-[#e2e8ea] hover:border-[#1cb5bd] transition has-[:checked]:bg-[#e8f8f8] has-[:checked]:border-[#1cb5bd]">
                  <input type="checkbox" checked={bmhpSelected.includes(item)} onChange={() => toggleBmhp(item)} className="accent-[#1cb5bd]" />
                  <span className="text-xs text-[#65737a] font-medium">{item}</span>
                </label>
              ))}
            </div>
          </div>
          {bmhpSelected.length > 0 && (
            <div className="bg-[#f5f8f9] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#65737a] mb-3">Rincian BMHP Terpilih ({bmhpSelected.length} item)</p>
              <div className="space-y-2">
                {bmhpSelected.map((item) => (
                  <div key={item} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-[#e2e8ea]">
                    <span className="text-sm text-[#172126] font-medium">{item}</span>
                    <div className="flex items-center gap-3">
                      <input placeholder="Qty" className="w-16 border border-[#e2e8ea] rounded px-2 py-1 text-xs text-center focus:outline-none focus:border-[#1cb5bd]" defaultValue="1" />
                      <input placeholder="Harga" className="w-24 border border-[#e2e8ea] rounded px-2 py-1 text-xs focus:outline-none focus:border-[#1cb5bd]" defaultValue="25000" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Catatan Tambahan</label>
            <textarea rows={2} placeholder="Catatan penggunaan bahan..." className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1cb5bd] resize-none" />
          </div>
          <button onClick={() => handleSubmit(roadmapNote)} className="bg-[#1cb5bd] hover:bg-[#11858c] text-white font-semibold px-6 py-2.5 rounded-lg transition text-sm">
            Simpan Penggunaan BMHP
          </button>
        </div>
        {toast}
      </div>
    );
  }

  return null;
}