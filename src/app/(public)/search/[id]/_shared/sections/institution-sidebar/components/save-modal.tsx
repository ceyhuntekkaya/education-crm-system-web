import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@/components/ui';
import { useModal } from '@/hooks';
import { useInstitutionSidebarData } from '../hooks/useInstitutionSidebarData';
import { SAVE_OPTIONS, SaveModalData } from '../types';

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaveModal: React.FC<SaveModalProps> = ({ isOpen, onClose }) => {
  const { school } = useInstitutionSidebarData();
  const [saveOption, setSaveOption] = useState<SaveModalData['saveOption']>('favorites');
  const [note, setNote] = useState('');

  const handleSave = () => {
    const saveData: SaveModalData = {
      saveOption,
      note: note.trim() || undefined,
    };
    
    // Kaydet işlemi burada yapılacak
    console.log("Okul kaydedildi:", {
      schoolName: school.name,
      schoolId: school.id,
      ...saveData,
    });
    
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
    >
      <ModalHeader
        title="Okulu Kaydet"
        onClose={onClose}
      />
      <ModalBody>
        <div className="text-center mb-24">
          <div className="w-80 h-80 bg-main-25 rounded-circle flex-center mx-auto mb-16">
            <i className="ph-bold ph-bookmark-simple text-main-600 text-3xl" />
          </div>
          <h5 className="mb-8">{school.name}</h5>
          <p className="text-neutral-600 mb-24">
            Bu okulu kaydetmek istediğinizden emin misiniz?
          </p>
        </div>

        <div className="bg-main-25 p-16 rounded-8 mb-24">
          <h6 className="mb-12">Kaydetme Seçenekleri:</h6>
          <div className="d-flex flex-column gap-8">
            {SAVE_OPTIONS.map((option) => (
              <label key={option.value} className="d-flex align-items-center gap-12 cursor-pointer">
                <input 
                  type="radio" 
                  name="saveOption" 
                  value={option.value}
                  checked={saveOption === option.value}
                  onChange={(e) => setSaveOption(e.target.value as SaveModalData['saveOption'])}
                  className="form-radio"
                />
                <div>
                  <span className="fw-medium">{option.label}</span>
                  <p className="text-xs text-neutral-600 mb-0">
                    {option.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="border border-neutral-100 rounded-8 p-16">
          <label className="form-label mb-8">Not Ekle (Opsiyonel)</label>
          <textarea
            className="form-control"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Bu okul hakkında notlarınızı yazabilirsiniz..."
          />
        </div>
      </ModalBody>
      <ModalFooter justify="between">
        <Button variant="outline" onClick={onClose}>
          <i className="ph ph-x me-8" />
          İptal
        </Button>
        <Button 
          variant="inline"
          onClick={handleSave}
        >
          <i className="ph-bold ph-bookmark-simple me-8" />
          Kaydet
        </Button>
      </ModalFooter>
    </Modal>
  );
};