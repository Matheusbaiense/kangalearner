import { redirect } from "next/navigation";

export const metadata = {
  title: "Progress",
  alternates: { canonical: "https://kangalearner.com.au/dashboard" }
};

/** Authenticated progress lives on /dashboard (cloud stats). This URL stays as a bookmark. */
export default function ProgressPage() {
  redirect("/dashboard");
}
