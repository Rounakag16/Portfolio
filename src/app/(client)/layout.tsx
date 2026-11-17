import { ClientNav } from "@/components/client/ClientNav";
import { ClientFooter } from "@/components/client/ClientFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ClientNav />
      <main id="main">{children}</main>
      <ClientFooter />
      <WhatsAppFloat />
    </>
  );
}
