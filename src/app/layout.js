import "../styles/globals.css";


import { Inter, Libre_Baskerville } from "next/font/google";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  variable: "--libre-baskerville",
  display: "swap",
});

// either Static metadata
export const metadata = {
  verification: {
    google: "2JDVOZDxUJn34Z4qyAzDGn99m2eKWO-abWlB67I1cpY",
  },
  robots: {
    index: true,
    follow: true,
  }

}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${libre_baskerville.className}`}
    > 
      <body className="overflow-x-hidden antialiased">
        <main>
          {children}
          <PrismicPreview repositoryName={repositoryName} />
        </main>
      </body>
    </html>
  );
}
