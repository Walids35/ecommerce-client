import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import OverNav from "@/components/navbar/OverNav";

export const metadata = {
  title: "MY STORE | HOME"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
