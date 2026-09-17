import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import Layout from "@/components/Layout";
import PasienDashboard from "@/dashboards/PasienDashboard";
import KlinikDashboard from "@/dashboards/KlinikDashboard";
import AdminDashboard from "@/dashboards/AdminDashboard";

type Role = "pasien" | "klinik" | "admin";

const defaultMenuByRole: Record<Role, string> = {
  pasien: "beranda",
  klinik: "beranda",
  admin: "beranda",
};

export default function App() {
  const [session, setSession] = useState<{ role: Role; name: string } | null>(null);
  const [activeMenu, setActiveMenu] = useState("beranda");

  const handleLogin = (role: Role, name: string) => {
    setSession({ role, name });
    setActiveMenu(defaultMenuByRole[role]);
  };

  const handleLogout = () => {
    setSession(null);
    setActiveMenu("beranda");
  };

  if (!session) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Layout
      role={session.role}
      userName={session.name}
      activeMenu={activeMenu}
      onMenuChange={setActiveMenu}
      onLogout={handleLogout}
    >
      <div className="min-h-full">
        {session.role === "pasien" && (
          <PasienDashboard activeMenu={activeMenu} userName={session.name} />
        )}
        {session.role === "klinik" && (
          <KlinikDashboard activeMenu={activeMenu} userName={session.name} />
        )}
        {session.role === "admin" && (
          <AdminDashboard activeMenu={activeMenu} userName={session.name} />
        )}
      </div>
    </Layout>
  );
}
