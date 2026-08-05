import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "GDM Detailing | Molise",
    description: "Detailing auto e moto, trattamenti ceramici e lucidatura correttiva in Molise.",
    openGraph: {
      title: "GDM Detailing | La cura che la tua auto merita.",
      description: "Detailing auto e moto, trattamenti ceramici e lucidatura correttiva in Molise.",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "GDM Detailing" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "GDM Detailing | La cura che la tua auto merita.",
      description: "Detailing auto e moto, trattamenti ceramici e lucidatura correttiva in Molise.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
