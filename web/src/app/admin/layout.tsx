import AdminLayout from "@/components/layout/Admin/AdminLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
