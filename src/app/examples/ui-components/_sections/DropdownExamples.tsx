"use client";

import React, { useState } from "react";
import { Button, Dropdown } from "@/components/ui";

const DropdownExamples: React.FC = () => {
  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [selectedValue3, setSelectedValue3] = useState("");

  // User menu items
  const userMenuItems = [
    {
      label: "Profil",
      value: "profile",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      onClick: () => setSelectedValue1("profile"),
    },
    {
      label: "Ayarlar",
      value: "settings",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      onClick: () => setSelectedValue1("settings"),
    },
    {
      label: "Yardım",
      value: "help",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      onClick: () => setSelectedValue1("help"),
    },
    {
      label: "Çıkış Yap",
      value: "logout",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ),
      onClick: () => setSelectedValue1("logout"),
    },
  ];

  // Simple menu items
  const simpleMenuItems = [
    {
      label: "Seçenek 1",
      value: "option1",
      onClick: () => setSelectedValue2("option1"),
    },
    {
      label: "Seçenek 2",
      value: "option2",
      onClick: () => setSelectedValue2("option2"),
    },
    {
      label: "Seçenek 3",
      value: "option3",
      onClick: () => setSelectedValue2("option3"),
    },
    { label: "Devre Dışı Seçenek", value: "disabled", disabled: true },
  ];

  // Action menu items
  const actionMenuItems = [
    {
      label: "Düzenle",
      value: "edit",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      onClick: () => {
        setSelectedValue3("edit");
        alert("Düzenleme işlemi başlatıldı!");
      },
    },
    {
      label: "Kopyala",
      value: "copy",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      onClick: () => {
        setSelectedValue3("copy");
        alert("Kopyalama işlemi tamamlandı!");
      },
    },
    {
      label: "Sil",
      value: "delete",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
      onClick: () => {
        setSelectedValue3("delete");
        if (confirm("Bu öğeyi silmek istediğinizden emin misiniz?")) {
          alert("Silme işlemi tamamlandı!");
        }
      },
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Dropdown Komponenti
      </h2>
      <div className="space-y-6">
        {/* User Menu Dropdown */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Kullanıcı Menüsü
          </h3>
          <div className="flex gap-4 items-center">
            <Dropdown
              trigger={
                <Button variant="outline">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Kullanıcı Menüsü
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Button>
              }
              items={userMenuItems}
              placement="bottom-left"
              onSelect={(value) => setSelectedValue1(value)}
            />
            {selectedValue1 && (
              <span className="text-sm text-gray-600">
                Seçilen: <strong>{selectedValue1}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Simple Dropdown */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Basit Dropdown
          </h3>
          <div className="flex gap-4 items-center">
            <Dropdown
              trigger={
                <Button variant="secondary">
                  Seçenekler
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Button>
              }
              items={simpleMenuItems}
              placement="bottom-left"
              onSelect={(value) => setSelectedValue2(value)}
            />
            {selectedValue2 && (
              <span className="text-sm text-gray-600">
                Seçilen: <strong>{selectedValue2}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Action Menu */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Aksiyon Menüsü
          </h3>
          <div className="flex gap-4 items-center">
            <Dropdown
              trigger={
                <Button variant="ghost">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </Button>
              }
              items={actionMenuItems}
              placement="bottom-right"
              onSelect={(value) => setSelectedValue3(value)}
            />
            {selectedValue3 && (
              <span className="text-sm text-gray-600">
                Son işlem: <strong>{selectedValue3}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Placement Examples */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Konum Örnekleri
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Dropdown
              trigger={
                <Button size="sm" variant="outline">
                  Bottom Left
                </Button>
              }
              items={[
                { label: "Sol Alt", value: "bottom-left" },
                { label: "Örnek 2", value: "example2" },
              ]}
              placement="bottom-left"
            />
            <Dropdown
              trigger={
                <Button size="sm" variant="outline">
                  Bottom Right
                </Button>
              }
              items={[
                { label: "Sağ Alt", value: "bottom-right" },
                { label: "Örnek 2", value: "example2" },
              ]}
              placement="bottom-right"
            />
            <Dropdown
              trigger={
                <Button size="sm" variant="outline">
                  Top Left
                </Button>
              }
              items={[
                { label: "Sol Üst", value: "top-left" },
                { label: "Örnek 2", value: "example2" },
              ]}
              placement="top-left"
            />
            <Dropdown
              trigger={
                <Button size="sm" variant="outline">
                  Top Right
                </Button>
              }
              items={[
                { label: "Sağ Üst", value: "top-right" },
                { label: "Örnek 2", value: "example2" },
              ]}
              placement="top-right"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Kullanım:</h3>
        <pre className="text-sm text-gray-700 overflow-x-auto">
          {`import { Dropdown, Button } from '@/components/ui';

          const items = [
            { 
              label: 'Seçenek 1', 
              value: 'option1', 
              icon: <IconComponent />,
              onClick: () => handleAction(),
              disabled: false
            },
            { label: 'Seçenek 2', value: 'option2' }
          ];

          <Dropdown
            trigger={<Button>Dropdown</Button>}
            items={items}
            placement="bottom-left" // bottom-left, bottom-right, top-left, top-right
            onSelect={(value) => console.log(value)}
          />`}
        </pre>
      </div>
    </section>
  );
};

export default DropdownExamples;
