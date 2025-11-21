import BootstrapInit from "@/helper/bootstrap-init";
import RouteScrollToTop from "@/helper/route-scroll-to-top";
import LoadPhosphorIcon from "@/helper/load-phosphor-icon";

import "./font.css";
import "./globals.scss";
import { AuthProvider, SnackbarProvider } from "@/contexts";
import { SnackbarContainer } from "@/components/ui";
import SnackbarInitializer from "@/components/ui/snackbar/snackbar-initializer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" translate="no">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <SnackbarProvider>
            <SnackbarInitializer />
            <BootstrapInit />
            <LoadPhosphorIcon />
            <RouteScrollToTop />
            {children}
            <SnackbarContainer />
          </SnackbarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
