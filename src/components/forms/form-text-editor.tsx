"use client";

import React, { useCallback, useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useFormField } from "@/contexts";

// ========================
// Types
// ========================

export type FormTextEditorVariant = "inline" | "outline" | "minimal";
export type FormTextEditorSize = "sm" | "md" | "lg";

export type FormTextEditorToolbarPreset =
  | "full"
  | "standard"
  | "basic"
  | "minimal";

export interface FormTextEditorProps {
  name: string;
  label?: string;
  variant?: FormTextEditorVariant;
  size?: FormTextEditorSize;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  helperText?: string;
  isRequired?: boolean;
  isRequiredText?: string;
  showWordCount?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
  minHeight?: number;
  toolbar?: FormTextEditorToolbarPreset;
  /** Editör HTML içeriği değiştiğinde */
  onContentChange?: (html: string) => void;
}

// ========================
// Toolbar Button component
// ========================

interface ToolbarButtonProps {
  icon: string;
  title: string;
  isActive?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  title,
  isActive = false,
  onClick,
  disabled = false,
}) => (
  <button
    type="button"
    className={`form-text-editor__toolbar-btn ${
      isActive ? "form-text-editor__toolbar-btn--active" : ""
    }`}
    onClick={onClick}
    disabled={disabled}
    title={title}
  >
    <i className={`ph-bold ${icon}`} />
  </button>
);

const ToolbarDivider: React.FC = () => (
  <div className="form-text-editor__toolbar-divider" />
);

// ========================
// Toolbar Config
// ========================

type ToolbarItemType = "button" | "divider" | "select" | "color";
interface ToolbarItem {
  type: ToolbarItemType;
  key: string;
}
interface ToolbarButtonItem extends ToolbarItem {
  type: "button";
  icon: string;
  title: string;
  action: string;
  isActiveCheck: string;
  attrs?: Record<string, any>;
}
interface ToolbarDividerItem extends ToolbarItem {
  type: "divider";
}

type AnyToolbarItem = ToolbarButtonItem | ToolbarDividerItem;

// Preset'e göre hangi gruplar gösterilecek
const TOOLBAR_GROUPS: Record<FormTextEditorToolbarPreset, string[]> = {
  minimal: ["textStyle"],
  basic: ["textStyle", "divider1", "list"],
  standard: [
    "heading",
    "divider0",
    "textStyle",
    "divider1",
    "list",
    "divider2",
    "alignment",
  ],
  full: [
    "heading",
    "divider0",
    "textStyle",
    "divider1",
    "list",
    "divider2",
    "alignment",
    "divider3",
    "advanced",
  ],
};

// ========================
// Toolbar Renderer
// ========================

interface EditorToolbarProps {
  editor: Editor | null;
  preset: FormTextEditorToolbarPreset;
  disabled?: boolean;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  editor,
  preset,
  disabled = false,
}) => {
  if (!editor) return null;

  const groups = TOOLBAR_GROUPS[preset];

  const handleLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL giriniz:", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleImage = () => {
    if (!editor) return;
    const url = window.prompt("Görsel URL giriniz:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const renderGroup = (groupKey: string) => {
    switch (groupKey) {
      // Dividers
      case "divider0":
      case "divider1":
      case "divider2":
      case "divider3":
      case "divider4":
        return <ToolbarDivider key={groupKey} />;

      // Heading
      case "heading":
        return (
          <div className="form-text-editor__toolbar-group" key={groupKey}>
            <select
              className="form-text-editor__toolbar-select"
              value={
                editor.isActive("heading", { level: 1 })
                  ? "1"
                  : editor.isActive("heading", { level: 2 })
                    ? "2"
                    : editor.isActive("heading", { level: 3 })
                      ? "3"
                      : "0"
              }
              onChange={(e) => {
                const level = parseInt(e.target.value);
                if (level === 0) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: level as 1 | 2 | 3 })
                    .run();
                }
              }}
              disabled={disabled}
            >
              <option value="0">Normal</option>
              <option value="1">Başlık 1</option>
              <option value="2">Başlık 2</option>
              <option value="3">Başlık 3</option>
            </select>
          </div>
        );

      // Text style (bold, italic, underline, strike, highlight, color)
      case "textStyle":
        return (
          <div className="form-text-editor__toolbar-group" key={groupKey}>
            <ToolbarButton
              icon="ph-text-b"
              title="Kalın (Ctrl+B)"
              isActive={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={disabled}
            />
            <ToolbarButton
              icon="ph-text-italic"
              title="İtalik (Ctrl+I)"
              isActive={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={disabled}
            />
            <ToolbarButton
              icon="ph-text-underline"
              title="Altı Çizili (Ctrl+U)"
              isActive={editor.isActive("underline")}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={disabled}
            />
            <ToolbarButton
              icon="ph-text-strikethrough"
              title="Üstü Çizili"
              isActive={editor.isActive("strike")}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={disabled}
            />
            {preset !== "minimal" && (
              <>
                <ToolbarButton
                  icon="ph-highlighter-circle"
                  title="Vurgula"
                  isActive={editor.isActive("highlight")}
                  onClick={() => editor.chain().focus().toggleHighlight().run()}
                  disabled={disabled}
                />
                <input
                  type="color"
                  className="form-text-editor__toolbar-color"
                  title="Yazı Rengi"
                  onInput={(e) =>
                    editor
                      .chain()
                      .focus()
                      .setColor((e.target as HTMLInputElement).value)
                      .run()
                  }
                  value={editor.getAttributes("textStyle").color || "#000000"}
                  disabled={disabled}
                />
              </>
            )}
          </div>
        );

      // Lists
      case "list":
        return (
          <div className="form-text-editor__toolbar-group" key={groupKey}>
            <ToolbarButton
              icon="ph-list-bullets"
              title="Madde Listesi"
              isActive={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              disabled={disabled}
            />
            <ToolbarButton
              icon="ph-list-numbers"
              title="Numaralı Liste"
              isActive={editor.isActive("orderedList")}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              disabled={disabled}
            />
          </div>
        );

      // Alignment
      case "alignment":
        return (
          <div className="form-text-editor__toolbar-group" key={groupKey}>
            <ToolbarButton
              icon="ph-text-align-left"
              title="Sola Hizala"
              isActive={editor.isActive({ textAlign: "left" })}
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              disabled={disabled}
            />
            <ToolbarButton
              icon="ph-text-align-center"
              title="Ortala"
              isActive={editor.isActive({ textAlign: "center" })}
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              disabled={disabled}
            />
            <ToolbarButton
              icon="ph-text-align-right"
              title="Sağa Hizala"
              isActive={editor.isActive({ textAlign: "right" })}
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              disabled={disabled}
            />
            <ToolbarButton
              icon="ph-text-align-justify"
              title="İki Yana Yasla"
              isActive={editor.isActive({ textAlign: "justify" })}
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              disabled={disabled}
            />
          </div>
        );

      // Insert (link, image, blockquote, codeBlock, horizontalRule)
      case "insert":
        return (
          <div className="form-text-editor__toolbar-group" key={groupKey}>
            <ToolbarButton
              icon="ph-link"
              title="Link Ekle"
              isActive={editor.isActive("link")}
              onClick={handleLink}
              disabled={disabled}
            />
            <ToolbarButton
              icon="ph-image"
              title="Görsel Ekle"
              isActive={false}
              onClick={handleImage}
              disabled={disabled}
            />
            <ToolbarButton
              icon="ph-quotes"
              title="Alıntı"
              isActive={editor.isActive("blockquote")}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              disabled={disabled}
            />
            <ToolbarButton
              icon="ph-code-block"
              title="Kod Bloğu"
              isActive={editor.isActive("codeBlock")}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              disabled={disabled}
            />
            <ToolbarButton
              icon="ph-minus"
              title="Yatay Çizgi"
              isActive={false}
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              disabled={disabled}
            />
          </div>
        );

      // Advanced (undo, redo, clear format)
      case "advanced":
        return (
          <div className="form-text-editor__toolbar-group" key={groupKey}>
            <ToolbarButton
              icon="ph-arrow-u-up-left"
              title="Geri Al (Ctrl+Z)"
              isActive={false}
              onClick={() => editor.chain().focus().undo().run()}
              disabled={disabled || !editor.can().undo()}
            />
            <ToolbarButton
              icon="ph-arrow-u-up-right"
              title="İleri Al (Ctrl+Y)"
              isActive={false}
              onClick={() => editor.chain().focus().redo().run()}
              disabled={disabled || !editor.can().redo()}
            />
            <ToolbarButton
              icon="ph-eraser"
              title="Formatı Temizle"
              isActive={false}
              onClick={() =>
                editor.chain().focus().clearNodes().unsetAllMarks().run()
              }
              disabled={disabled}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-text-editor__toolbar">
      {groups.map((g) => renderGroup(g))}
    </div>
  );
};

// ========================
// Main Component
// ========================

export const FormTextEditor: React.FC<FormTextEditorProps> = ({
  name,
  label,
  variant,
  size = "md",
  placeholder = "İçerik yazınız...",
  disabled = false,
  className,
  helperText,
  isRequired = false,
  isRequiredText,
  showWordCount = false,
  showCharCount = false,
  maxLength,
  minHeight,
  toolbar = "standard",
  onContentChange,
}) => {
  const { value, error, required, onChange } = useFormField(name);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: typeof value === "string" ? value : "",
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Eğer içerik boşsa boş string gönder
      const isEmpty = editor.isEmpty;
      const content = isEmpty ? "" : html;

      onChange(content);
      onContentChange?.(content);
    },
  });

  // value dışarıdan değiştiğinde editörü güncelle
  useEffect(() => {
    if (!editor) return;
    const currentContent = editor.getHTML();
    const newContent = typeof value === "string" ? value : "";

    // Sadece gerçekten farklıysa güncelle (sonsuz döngü engeli)
    if (currentContent !== newContent && newContent !== currentContent) {
      editor.commands.setContent(newContent, { emitUpdate: false });
    }
  }, [value, editor]);

  // disabled değiştiğinde
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  // İstatistikler
  const getWordCount = (): number => {
    if (!editor) return 0;
    const text = editor.state.doc.textContent;
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const getCharCount = (): number => {
    if (!editor) return 0;
    return editor.state.doc.textContent.length;
  };

  // CSS sınıfları
  const wrapperClasses = [
    "form-text-editor",
    variant ? `form-text-editor--${variant}` : "",
    size !== "md" ? `form-text-editor--${size}` : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  const innerClasses = [
    "form-text-editor__wrapper",
    error ? "form-text-editor__wrapper--error" : "",
    disabled ? "form-text-editor__wrapper--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const showFooter = showWordCount || showCharCount || maxLength;

  return (
    <div className={wrapperClasses} data-field-name={name}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="text-neutral-700 text-lg fw-medium mb-12"
        >
          {label}
          {required && <span className="text-danger-600 ms-4">*</span>}
        </label>
      )}

      {/* Editor */}
      <div className={innerClasses}>
        <EditorToolbar editor={editor} preset={toolbar} disabled={disabled} />
        <div
          className="form-text-editor__content"
          style={minHeight ? { minHeight } : undefined}
        >
          <EditorContent editor={editor} />
        </div>
        {showFooter && (
          <div className="form-text-editor__footer">
            {showWordCount && (
              <span className="form-text-editor__footer-info me-16">
                {getWordCount()} kelime
              </span>
            )}
            {showCharCount && (
              <span className="form-text-editor__footer-info me-16">
                {getCharCount()} karakter
                {maxLength ? ` / ${maxLength}` : ""}
              </span>
            )}
            {maxLength && !showCharCount && (
              <span className="form-text-editor__footer-info">
                {getCharCount()} / {maxLength}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="text-danger-600 text-sm mt-8 ms-28">{error}</div>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <small className="text-muted d-block mt-8 ms-28">{helperText}</small>
      )}

      {/* Required text */}
      {isRequired && !error && !value && (
        <small className="text-danger-600 fw-semibold d-block mt-8 ms-28">
          {isRequiredText || "* Bu alan zorunludur."}
        </small>
      )}
    </div>
  );
};
