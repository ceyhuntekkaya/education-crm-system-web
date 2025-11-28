import BootstrapInit from "@/helper/bootstrap-init";
import RouteScrollToTop from "@/helper/route-scroll-to-top";
import LoadPhosphorIcon from "@/helper/load-phosphor-icon";

import "./font.css";
import "./globals.scss";
import { AuthProvider, DataProvider, SnackbarProvider } from "@/contexts";
import { SnackbarContainer } from "@/components/ui";
import SnackbarInitializer from "@/components/ui/snackbar/snackbar-initializer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Eğitim İste",
    template: "%s | Eğitim İste",
  },
  description: "Eğitim kurumlarını keşfedin ve karşılaştırın",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" translate="no">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <DataProvider>
            <SnackbarProvider>
              <SnackbarInitializer />
              <BootstrapInit />
              <LoadPhosphorIcon />
              <RouteScrollToTop />
              {children}
              <SnackbarContainer />
            </SnackbarProvider>
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
