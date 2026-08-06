import type { Metadata } from "next";
import { headers } from "next/headers";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: ["500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "V Detail Center | Detailing profesional en Valladolid",
    description: "Detailing profesional, protección cerámica, PPF y corrección de pintura en Valladolid.",
    icons: {
      icon: [{ url: "/images/vdetail/vdetail-logo.jpg", type: "image/jpeg" }],
      shortcut: ["/images/vdetail/vdetail-logo.jpg"],
      apple: [{ url: "/images/vdetail/vdetail-logo.jpg", type: "image/jpeg" }],
    },
    openGraph: {
      title: "V Detail Center | Detailing profesional en Valladolid",
      description: "Detailing profesional, protección cerámica, PPF y corrección de pintura en Valladolid.",
      images: [{ url: "/images/vdetail/vdetail-bmw-turquoise-after.jpg", width: 1080, height: 1080, alt: "BMW tratado por V Detail Center" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "V Detail Center | Detailing profesional en Valladolid",
      description: "Detailing profesional, protección cerámica, PPF y corrección de pintura en Valladolid.",
      images: ["/images/vdetail/vdetail-bmw-turquoise-after.jpg"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${dmSans.variable} ${barlowCondensed.variable}`}>{children}</body></html>;
}
