import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata = {
  title: "Afif Rohul",
  description: "Personal portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NextTopLoader color="#64748b" />
        {children}
      </body>
    </html>
  );
}
