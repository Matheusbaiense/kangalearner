import "../../admin.css";
import { requireAdminPage } from "@/lib/auth/requireAdminPage";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminPage();
  return <>{children}</>;
}
