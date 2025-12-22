"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";
import { usePageTitle } from "@/hooks";

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  hasAttachment: boolean;
  priority: "high" | "normal" | "low";
}

const MessagesPage: React.FC = () => {
  usePageTitle("Mesajlar");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const mockMessages: Message[] = [
    {
      id: 1,
      sender: "Tedarikçi A",
      subject: "RFQ-2025-001 Hakkında",
      preview: "Teklif talebiniz için detaylı fiyat bilgilerini gönderdik...",
      timestamp: "10:30",
      isRead: false,
      hasAttachment: true,
      priority: "high",
    },
    {
      id: 2,
      sender: "Tedarikçi B",
      subject: "Ürün Stoğu Güncellendi",
      preview: "Favori listenizdeki bazı ürünler tekrar stokta...",
      timestamp: "Dün",
      isRead: true,
      hasAttachment: false,
      priority: "normal",
    },
    {
      id: 3,
      sender: "Sistem Bildirimi",
      subject: "Yeni Teklif Geldi",
      preview: "RFQ-2025-002 için yeni bir teklif aldınız...",
      timestamp: "2 gün önce",
      isRead: true,
      hasAttachment: true,
      priority: "normal",
    },
  ];

  const getPriorityIcon = (priority: Message["priority"]) => {
    const icons = {
      high: (
        <i
          className="ph-bold ph-warning text-danger-600"
          title="Yüksek Öncelik"
        ></i>
      ),
      normal: <i className="ph ph-minus text-neutral-400"></i>,
      low: <i className="ph-bold ph-arrow-down text-neutral-400"></i>,
    };
    return icons[priority];
  };

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="row mb-24">
        <div className="col-12">
          <div className="page-header d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-8">Mesajlar</h1>
              <p className="text-muted mb-0">
                Tedarikçilerle iletişime geçin ve mesajlarınızı yönetin
              </p>
            </div>
            <Button>
              <i className="ph-bold ph-pencil-simple me-8"></i>
              Yeni Mesaj
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-4 mb-24">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="w-48-px h-48-px bg-primary-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-envelope text-primary-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Toplam Mesaj</h6>
                  <h3 className="mb-0 mt-4">156</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="w-48-px h-48-px bg-warning-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-envelope-open text-warning-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Okunmamış</h6>
                  <h3 className="mb-0 mt-4">23</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="w-48-px h-48-px bg-info-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-paper-plane-tilt text-info-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Gönderilen</h6>
                  <h3 className="mb-0 mt-4">89</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="w-48-px h-48-px bg-success-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-check-circle text-success-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Yanıtlanan</h6>
                  <h3 className="mb-0 mt-4">67</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="row">
        <div className="col-12 col-lg-5 col-xl-4 mb-24 mb-lg-0">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Gelen Kutusu</h6>
                <Button size="sm" variant="outline">
                  <i className="ph-bold ph-funnel"></i>
                </Button>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`list-group-item list-group-item-action cursor-pointer ${
                      !message.isRead ? "bg-primary-25" : ""
                    } ${selectedMessage === message.id ? "active" : ""}`}
                    onClick={() => setSelectedMessage(message.id)}
                  >
                    <div className="d-flex w-100 justify-content-between align-items-start mb-8">
                      <div className="d-flex align-items-center gap-2">
                        {getPriorityIcon(message.priority)}
                        <h6 className="mb-0 fw-semibold">{message.sender}</h6>
                        {!message.isRead && (
                          <span className="badge bg-primary-600 rounded-pill px-6 py-2">
                            Yeni
                          </span>
                        )}
                      </div>
                      <small className="text-neutral-600">
                        {message.timestamp}
                      </small>
                    </div>
                    <p className="mb-8 fw-medium text-sm">{message.subject}</p>
                    <p className="mb-0 text-sm text-neutral-600 text-truncate">
                      {message.preview}
                    </p>
                    {message.hasAttachment && (
                      <div className="mt-8">
                        <span className="badge bg-neutral-100 text-neutral-700">
                          <i className="ph-bold ph-paperclip me-4"></i>
                          Ek var
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7 col-xl-8">
          <div className="card border-0 shadow-sm h-100">
            {selectedMessage ? (
              <>
                <div className="card-header bg-white border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-4">
                        {
                          mockMessages.find((m) => m.id === selectedMessage)
                            ?.subject
                        }
                      </h6>
                      <small className="text-neutral-600">
                        {
                          mockMessages.find((m) => m.id === selectedMessage)
                            ?.sender
                        }{" "}
                        •{" "}
                        {
                          mockMessages.find((m) => m.id === selectedMessage)
                            ?.timestamp
                        }
                      </small>
                    </div>
                    <div className="d-flex gap-2">
                      <Button size="sm" variant="outline">
                        <i className="ph-bold ph-arrow-bend-up-left"></i>
                      </Button>
                      <Button size="sm" variant="outline">
                        <i className="ph-bold ph-trash"></i>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p className="text-neutral-700">
                    Bu mesajın içeriği buraya gelecek. Detaylı mesaj içeriği, ek
                    bilgiler ve diğer bilgiler burada gösterilecektir.
                  </p>
                  <p className="text-neutral-700 mt-16">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>

                  {mockMessages.find((m) => m.id === selectedMessage)
                    ?.hasAttachment && (
                    <div className="mt-24">
                      <h6 className="mb-12">Ekler</h6>
                      <div className="d-flex gap-2">
                        <div className="border rounded-8 p-12 d-flex align-items-center gap-2">
                          <i className="ph-bold ph-file-pdf text-danger-600 text-xl"></i>
                          <span className="text-sm">dokuman.pdf</span>
                          <Button size="sm" variant="outline">
                            <i className="ph-bold ph-download-simple"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-white border-top">
                  <div className="d-flex gap-2">
                    <Button>
                      <i className="ph-bold ph-arrow-bend-up-left me-8"></i>
                      Yanıtla
                    </Button>
                    <Button variant="outline">
                      <i className="ph-bold ph-arrow-bend-up-right me-8"></i>
                      İlet
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="card-body d-flex flex-column align-items-center justify-content-center h-100">
                <i
                  className="ph-bold ph-envelope-simple text-neutral-300 mb-16"
                  style={{ fontSize: "64px" }}
                ></i>
                <h5 className="text-neutral-600">Mesaj Seçiniz</h5>
                <p className="text-neutral-500 mb-0">
                  Görüntülemek için sol taraftan bir mesaj seçin
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
