// import { Breadcrumb } from "@/components";
import { MessageProvider } from "./context";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MessageProvider initialFilters={{ limit: 50 }}>
      <div>
        {/* <Breadcrumb title={"Mesajlarım"} /> */}
        {children}
      </div>
    </MessageProvider>
  );
}
