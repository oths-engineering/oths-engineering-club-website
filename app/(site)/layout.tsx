import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SanityLive } from "@/sanity/lib/live";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <SanityLive />
    </>
  );
}
