import { useState } from "react";
import { feRoleOf, login, type Role } from "@/lib/api";

interface LoginPageProps {
  onLogin: (role: Role, name: string) => void;
}

const demoAccounts: {
  role: Role;
  label: string;
  desc: string;
  email: string;
  password: string;
  name: string;
}[] = [
  {
    role: "pasien",
    label: "Masuk sebagai Pasien",
    desc: "Lihat jadwal & riwayat pemeriksaan",
    email: "budi@example.com",
    password: "password",
    name: "Budi Santoso",
  },
  {
    role: "klinik",
    label: "Masuk sebagai Tim Klinik",
    desc: "Rekam medis & tindakan pasien",
    email: "sari@tentangdental.id",
    password: "password",
    name: "Dr. Sari Wijayanti, drg",
  },
  {
    role: "admin",
    label: "Masuk sebagai Admin",
    desc: "Billing, kasir & keuangan klinik",
    email: "admin@tentangdental.id",
    password: "password",
    name: "Admin Owner",
  },
];

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<Role>("pasien");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const doLogin = async (mail: string, pass: string) => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const user = await login(mail, pass);
      onLogin(feRoleOf(user.role), user.name);
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message || "Gagal masuk. Periksa email & kata sandi.");
      setNotice("");
      // jika login gagal, kembali ke tampilan login
      setMode("login");
    } finally {
      setBusy(false);
    }
  };

  const handleQuick = async (acc: (typeof demoAccounts)[number]) => {
    await doLogin(acc.email, acc.password);
  };

  const handleFormLogin = () => {
    if (!email.trim() || !password) {
      setError("Isi email dan kata sandi terlebih dahulu.");
      return;
    }
    doLogin(email.trim(), password);
  };

  const showRoleHint = () => {
    const acc = demoAccounts.find((d) => d.role === role);
    setEmail(acc?.email || "");
    setPassword(acc?.password || "");
    setError("");
  };

  return (
    <div className="min-h-full bg-[#f5f8f9] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left panel */}
        <div className="bg-[#11858c] p-10 flex flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-white/20 rounded-xl size-10 flex items-center justify-center">
                <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
                  <rect x="3" y="10" width="4" height="9" rx="1" fill="white" />
                  <rect x="9" y="5" width="4" height="14" rx="1" fill="white" />
                  <rect x="15" y="2" width="4" height="17" rx="1" fill="white" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-lg leading-tight">DentalFinance</p>
                <p className="text-white/60 text-xs">TENTANG DENTAL</p>
              </div>
            </div>
            <h1 className="text-3xl font-bold leading-snug mb-4">Sistem Informasi<br />Manajemen Klinik Gigi</h1>
            <p className="text-white/70 text-sm leading-relaxed">
              Platform terpadu untuk manajemen pasien, rekam medis, billing, dan keuangan klinik Anda.
            </p>
          </div>

          <div className="space-y-3 mt-10">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">Demo Cepat — Pilih Peran</p>
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                disabled={busy}
                onClick={() => handleQuick(acc)}
                className="w-full text-left bg-white/10 hover:bg-white/20 transition rounded-xl px-4 py-3 border border-white/10 disabled:opacity-60"
              >
                <p className="font-semibold text-sm">{acc.label}</p>
                <p className="text-white/50 text-xs mt-0.5">{acc.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="p-10 flex flex-col justify-center">
          <div className="flex gap-2 mb-8 p-1 bg-[#f5f8f9] rounded-xl">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                  setNotice("");
                }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${mode === m ? "bg-white shadow text-[#172126]" : "text-[#94a0a6]"}`}
              >
                {m === "login" ? "Masuk" : "Daftar"}
              </button>
            ))}
          </div>

          {mode === "login" ? (
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-[#172126]">Selamat Datang</p>
                <p className="text-[#94a0a6] text-sm mt-1">Masuk ke akun Anda</p>
              </div>

              {error && (
                <p className="bg-red-50 text-red-600 text-sm font-medium px-3 py-2 rounded-lg border border-red-100">{error}</p>
              )}

              <div>
                <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Email</label>
                <input
                  className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm text-[#172126] focus:outline-none focus:border-[#1cb5bd] focus:ring-2 focus:ring-[#1cb5bd]/20"
                  placeholder="email@klinik.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Kata Sandi</label>
                <input
                  type="password"
                  className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm text-[#172126] focus:outline-none focus:border-[#1cb5bd] focus:ring-2 focus:ring-[#1cb5bd]/20"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleFormLogin()}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#65737a] block mb-1.5">Masuk sebagai</label>
                <div className="flex gap-2">
                  <select
                    className="flex-1 border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm text-[#172126] focus:outline-none focus:border-[#1cb5bd]"
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                  >
                    <option value="pasien">Pasien</option>
                    <option value="klinik">Tim Klinik (Dokter)</option>
                    <option value="admin">Admin / Kasir</option>
                  </select>
                  <button
                    onClick={showRoleHint}
                    className="text-xs bg-[#e8f8f8] text-[#11858c] font-semibold px-3 rounded-lg transition hover:bg-[#d4f1f1]"
                    title="Isi otomatis dengan akun demo"
                  >
                    Isi Demo
                  </button>
                </div>
                <p className="text-[#94a0a6] text-[11px] mt-1">Tombol "Isi Demo" mengisi contoh email & kata sandi otomatis.</p>
              </div>
              <button
                onClick={handleFormLogin}
                disabled={busy}
                className="w-full bg-[#1cb5bd] hover:bg-[#11858c] disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition text-sm mt-2"
              >
                {busy ? "Memproses..." : "Masuk"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-[#172126]">Daftar Pasien Baru</p>
                <p className="text-[#94a0a6] text-sm mt-1">Buat akun untuk akses layanan klinik</p>
              </div>

              {notice && (
                <p className="bg-[#e8f8f8] text-[#11858c] text-sm font-medium px-3 py-2 rounded-lg border border-[#1cb5bd]/20">{notice}</p>
              )}

              {[
                { label: "Nama Lengkap", placeholder: "Nama sesuai KTP", type: "text" },
                { label: "Tanggal Lahir", placeholder: "", type: "date" },
                { label: "No. Telepon", placeholder: "08xxxxxxxxxx", type: "tel" },
                { label: "Email", placeholder: "email@gmail.com", type: "email" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-semibold text-[#65737a] block mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    className="w-full border border-[#e2e8ea] rounded-lg px-3 py-2.5 text-sm text-[#172126] focus:outline-none focus:border-[#1cb5bd] focus:ring-2 focus:ring-[#1cb5bd]/20"
                    placeholder={f.placeholder}
                    value={f.label === "Nama Lengkap" ? name : undefined}
                    onChange={f.label === "Nama Lengkap" ? (e) => setName(e.target.value) : undefined}
                  />
                </div>
              ))}
              <button
                onClick={() => setNotice("Pendaftaran pasien mandiri akan tersedia di tahap berikutnya. Untuk sekarang, silakan gunakan akun demo (kiri) atau minta admin klinik membuatkan akun.")}
                className="w-full bg-[#1cb5bd] hover:bg-[#11858c] text-white font-semibold py-2.5 rounded-lg transition text-sm mt-2"
              >
                Daftar Sekarang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}