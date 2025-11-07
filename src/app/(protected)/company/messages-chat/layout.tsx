import { MessageProvider } from "./context";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MessageProvider initialFilters={{ limit: 50 }}>
      <div>{children}</div>
    </MessageProvider>
  );
}
