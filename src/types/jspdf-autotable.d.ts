declare module "jspdf-autotable" {
  import { jsPDF } from "jspdf";

  export interface RowInput {
    [key: string]: any;
  }

  export interface Styles {
    fillColor?: number | string | [number, number, number];
    textColor?: number | string | [number, number, number];
    fontStyle?: "normal" | "bold" | "italic" | "bolditalic";
    fontSize?: number;
    cellPadding?: number | { top?: number; right?: number; bottom?: number; left?: number };
    halign?: "left" | "center" | "right";
    valign?: "top" | "middle" | "bottom";
    lineWidth?: number | { top?: number; right?: number; bottom?: number; left?: number };
    lineColor?: number | string | [number, number, number];
  }

  export interface CellDef {
    content?: string | number;
    colSpan?: number;
    rowSpan?: number;
    styles?: Styles;
  }

  export interface ColumnInput {
    header?: string;
    dataKey?: string;
  }

  export interface UserOptions {
    head?: (string | number | CellDef)[][];
    body?: (string | number | CellDef)[][];
    foot?: (string | number | CellDef)[][];
    columns?: ColumnInput[];
    startY?: number;
    margin?: number | { top?: number; right?: number; bottom?: number; left?: number };
    theme?: "striped" | "grid" | "plain";
    headStyles?: Styles;
    bodyStyles?: Styles;
    footStyles?: Styles;
    alternateRowStyles?: Styles;
    columnStyles?: {
      [key: string | number]: {
        cellWidth?: number | "auto" | "wrap";
        halign?: "left" | "center" | "right";
        valign?: "top" | "middle" | "bottom";
      };
    };
    didDrawPage?: (data: any) => void;
    willDrawCell?: (data: any) => void;
    didDrawCell?: (data: any) => void;
    didParseCell?: (data: any) => void;
  }

  export default function autoTable(doc: jsPDF, options: UserOptions): jsPDF;
}
