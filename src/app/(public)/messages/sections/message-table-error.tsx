import React from "react";

export function MessageTableError(): JSX.Element {
  return (
    <div className="message-table-error" role="alert">
      Mesajlar yüklenirken bir hata oluştu.
    </div>
  );
}

export default MessageTableError;
