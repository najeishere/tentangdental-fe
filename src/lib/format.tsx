export function rupiah(n: number | string | null | undefined): string {
  const v = typeof n === "string" ? parseFloat(n) : (n ?? 0);
  return "Rp " + v.toLocaleString("id-ID", { maximumFractionDigits: 0 });
}

export function dateLong(d: string | null | undefined): string {
  if (!d) return "-";
  const dt = new Date(d + (d.length === 10 ? "T00:00:00" : ""));
  return dt.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export function timeHM(d: string | null | undefined): string {
  if (!d) return "-";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "-";
  return dt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export const payStatus: Record<string, { label: string; cls: string }> = {
  paid: { label: "Lunas", cls: "bg-green-100 text-green-700" },
  partial: { label: "Sebagian", cls: "bg-amber-100 text-amber-700" },
  unpaid: { label: "Belum", cls: "bg-red-100 text-red-600" },
  open: { label: "Belum", cls: "bg-red-100 text-red-600" },
  settled: { label: "Lunas", cls: "bg-green-100 text-green-700" },
};

export function PayBadge({ status }: { status: string }) {
  const s = payStatus[status] ?? { label: status, cls: "bg-gray-100 text-gray-600" };
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.cls}`}>{s.label}</span>;
}