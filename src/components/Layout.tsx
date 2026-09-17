import { ReactNode, useState } from "react";
import svgPaths from "@/imports/TentangDentalFinanceDashboard/svg-oyrgrh1ok6";
import { applyTheme, loadTheme, type Theme } from "@/lib/theme";

type Role = "pasien" | "klinik" | "admin";

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

interface LayoutProps {
  role: Role;
  userName: string;
  activeMenu: string;
  onMenuChange: (id: string) => void;
  onLogout: () => void;
  children: ReactNode;
}

function Icon({ path, color = "#65737A" }: { path: string; color?: string }) {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
      <path d={path} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function DarkModeToggle() {
  const [dark, setDark] = useState(() => loadTheme() === "dark");
  const toggle = () => {
    const next: Theme = dark ? "light" : "dark";
    setDark(!dark);
    applyTheme(next);
  };
  return (
    <button
      onClick={toggle}
      className="text-[#94a0a6] hover:text-[#65737a] transition"
      title={dark ? "Mode Terang" : "Mode Gelap"}
    >
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        {dark ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        )}
      </svg>
    </button>
  );
}

const navByRole: Record<Role, { group: string; items: { id: string; label: string; iconPath: string }[] }[]> = {
  pasien: [
    {
      group: "Menu Pasien",
      items: [
        { id: "beranda", label: "Beranda", iconPath: svgPaths.p2f7c3ff0 },
        { id: "antrean", label: "Antrean & Jadwal", iconPath: svgPaths.p227fbfb0 },
        { id: "riwayat", label: "Riwayat Pemeriksaan", iconPath: svgPaths.p208bcd00 },
        { id: "tagihan", label: "Tagihan Saya", iconPath: svgPaths.p326d5a40 },
      ],
    },
  ],
  klinik: [
    {
      group: "Medis",
      items: [
        { id: "beranda", label: "Dashboard", iconPath: svgPaths.p2f7c3ff0 },
        { id: "antrean", label: "Antrean Hari Ini", iconPath: svgPaths.p227fbfb0 },
        { id: "rekam-medis", label: "Rekam Medis", iconPath: svgPaths.p208bcd00 },
        { id: "tindakan", label: "Tindakan", iconPath: svgPaths.p3c2c66e0 },
      ],
    },
    {
      group: "Pendukung",
      items: [
        { id: "lab", label: "Pengiriman Lab", iconPath: svgPaths.p3d000a80 },
        { id: "bmhp", label: "BMHP", iconPath: svgPaths.p1ce9800 },
      ],
    },
  ],
  admin: [
    {
      group: "Overview",
      items: [
        { id: "beranda", label: "Dashboard", iconPath: svgPaths.p2f7c3ff0 },
        { id: "antrean", label: "Registrasi & Antrean", iconPath: svgPaths.p4264400 },
      ],
    },
    {
      group: "Finance",
      items: [
        { id: "billing", label: "Pencatatan Tagihan", iconPath: svgPaths.p326d5a40 },
        { id: "pembayaran", label: "Pembayaran", iconPath: svgPaths.p33eb6300 },
        { id: "rekonsiliasi", label: "Rekonsiliasi", iconPath: svgPaths.p208bcd00 },
        { id: "bagi-hasil", label: "Bagi Hasil", iconPath: svgPaths.p3c2c66e0 },
      ],
    },
    {
      group: "Reports",
      items: [
        { id: "laporan", label: "Laporan Keuangan", iconPath: svgPaths.p3d000a80 },
      ],
    },
    {
      group: "Pengaturan",
      items: [
        { id: "dokter", label: "Akses Dokter", iconPath: svgPaths.p1f61bb80 },
      ],
    },
  ],
};

const roleLabels: Record<Role, string> = {
  pasien: "Pasien",
  klinik: "Tim Klinik",
  admin: "Admin",
};

const roleColors: Record<Role, string> = {
  pasien: "bg-[#e8f8f8] text-[#11858c]",
  klinik: "bg-[#f0f4ff] text-[#3b5bdb]",
  admin: "bg-[#fff4f0] text-[#c2410c]",
};

export default function Layout({ role, userName, activeMenu, onMenuChange, onLogout, children }: LayoutProps) {
  const nav = navByRole[role];

  return (
    <div className="flex h-full bg-[#f5f8f9]">
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 bg-white border-r border-[#e2e8ea] flex flex-col h-full">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-[#e2e8ea]">
          <div className="flex items-center gap-3">
            <div className="bg-[#1cb5bd] rounded-xl size-9 flex items-center justify-center shrink-0">
              <svg width="18" height="18" fill="none" viewBox="0 0 22 22">
                <rect x="3" y="10" width="4" height="9" rx="1" fill="white"/>
                <rect x="9" y="5" width="4" height="14" rx="1" fill="white"/>
                <rect x="15" y="2" width="4" height="17" rx="1" fill="white"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-[#172126] text-[15px] leading-tight">DentalFinance</p>
              <p className="text-[#94a0a6] text-[10px] font-medium">TENTANG DENTAL</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {nav.map((group) => (
            <div key={group.group}>
              <p className="text-[#94a0a6] text-[10px] font-bold uppercase tracking-wider mb-2 px-3">{group.group}</p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = activeMenu === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onMenuChange(item.id)}
                      className={`w-full flex items-center gap-3 h-10 px-3 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? "bg-[#e8f8f8] text-[#11858c] font-semibold"
                          : "text-[#65737a] hover:bg-[#f5f8f9]"
                      }`}
                    >
                      <Icon path={item.iconPath} color={active ? "#11858c" : "#65737a"} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {active && <div className="w-[3px] h-[18px] bg-[#1cb5bd] rounded-full" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User info */}
        <div className="border-t border-[#e2e8ea] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-[#1cb5bd] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {userName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#172126] text-sm font-semibold truncate">{userName}</p>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${roleColors[role]}`}>{roleLabels[role]}</span>
            </div>
            <DarkModeToggle />
            <button onClick={onLogout} className="text-[#94a0a6] hover:text-[#65737a] transition" title="Logout">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
