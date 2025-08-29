import BootstrapInit from "@/helper/bootstrap-init";
import RouteScrollToTop from "@/helper/route-scroll-to-top";
import LoadPhosphorIcon from "@/helper/load-phosphor-icon";

import "./font.css";
import "./globals.scss";
import { AuthProvider } from "@/contexts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <BootstrapInit />
          <LoadPhosphorIcon />
          <RouteScrollToTop />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
