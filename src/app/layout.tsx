import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InfrasTrackTure - San Mateo Infrastructure Reporting",
  description: "Report and track infrastructure issues in San Mateo, Rizal. A digital platform connecting citizens with local government for faster, transparent public service delivery.",
  keywords: ["infrastructure", "reporting", "San Mateo", "Rizal", "LGU", "civic engagement", "public service"],
  authors: [{ name: "InfrasTrackTure Team" }],
  openGraph: {
    title: "InfrasTrackTure - San Mateo Infrastructure Reporting",
    description: "Report and track infrastructure issues in your community",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
