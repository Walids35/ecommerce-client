import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import OverNav from "@/components/navbar/OverNav";
import { Poppins } from 'next/font/google'

export const metadata = {
  title: "MY STORE | HOME"
};
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <OverNav />
        <NavBar />
        <div className="pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
