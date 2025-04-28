import "./globals.css";
import Sidebar from "./components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Sidebar/>
        {children}
      </body>
    </html>
  );
}
