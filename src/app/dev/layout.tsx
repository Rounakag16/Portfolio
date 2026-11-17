import { DevNav } from "@/components/dev/DevNav";
import { DevFooter } from "@/components/dev/DevFooter";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="/dev#projects" className="skip-link">Skip to projects</a>
      <DevNav />
      <main id="main">{children}</main>
      <DevFooter />
    </>
  );
}
