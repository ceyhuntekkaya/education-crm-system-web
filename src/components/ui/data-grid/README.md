# DataGrid Component

A fully-featured, responsive DataGrid component built with TypeScript and Bootstrap 5 integration.

## Features

- ✅ **Sorting**: Click column headers to sort data
- ✅ **Pagination**: Customizable page sizes with navigation controls
- ✅ **Row Selection**: Checkbox selection with callback support
- ✅ **Custom Cell Rendering**: Use `renderCell` for custom content and actions
- ✅ **Value Getters**: Computed columns with `valueGetter`
- ✅ **Bootstrap 5 Integration**: Styled with Bootstrap components
- ✅ **Responsive Design**: Mobile-friendly layout
- ✅ **TypeScript**: Full type safety and IntelliSense support

## Installation

The DataGrid component is already integrated into your project's component system.

## Basic Usage

```tsx
import { DataGrid, GridColDef } from "@/components/ui/data-grid";

interface Person {
  id: number;
  name: string;
  age: number;
}

const columns: GridColDef<Person>[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "age", headerName: "Age", width: 110, type: "number" },
];

const rows: Person[] = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Smith", age: 30 },
];

function MyComponent() {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      checkboxSelection
    />
  );
}
```

## Advanced Usage with Actions

```tsx
const columns: GridColDef<Person>[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <div className="data-grid-actions">
        <Button
          size="xs"
          variant="outline"
          onClick={() => handleEdit(params.row)}
          className="data-grid-action-btn btn-edit"
        >
          <i className="bi bi-pencil me-1"></i>
          Edit
        </Button>
        <Button
          size="xs"
          variant="error"
          onClick={() => handleDelete(params.row)}
          className="data-grid-action-btn btn-delete"
        >
          <i className="bi bi-trash me-1"></i>
          Delete
        </Button>
      </div>
    ),
  },
];
```

## Props

### DataGridProps<T>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `T[]` | Required | Array of data objects |
| `columns` | `GridColDef<T>[]` | Required | Column definitions |
| `pageSize` | `number` | `10` | Default page size |
| `pageSizeOptions` | `number[]` | `[5, 10, 25, 50]` | Available page sizes |
| `checkboxSelection` | `boolean` | `false` | Enable row selection |
| `disableRowSelectionOnClick` | `boolean` | `false` | Disable row click selection |
| `onRowSelectionChange` | `(rows: T[]) => void` | - | Selection change callback |
| `loading` | `boolean` | `false` | Show loading state |
| `className` | `string` | `""` | Additional CSS classes |
| `height` | `number \| string` | `"auto"` | Container height |
| `initialState` | `object` | - | Initial pagination state |

### GridColDef<T>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | `keyof T \| string` | Required | Field name or identifier |
| `headerName` | `string` | Required | Column header text |
| `width` | `number` | - | Column width in pixels |
| `minWidth` | `number` | - | Minimum column width |
| `sortable` | `boolean` | `true` | Enable column sorting |
| `editable` | `boolean` | `false` | Enable cell editing (future) |
| `type` | `"string" \| "number" \| "boolean" \| "date"` | `"string"` | Data type |
| `align` | `"left" \| "center" \| "right"` | `"left"` | Cell text alignment |
| `headerAlign` | `"left" \| "center" \| "right"` | `"left"` | Header text alignment |
| `description` | `string` | - | Tooltip text |
| `valueGetter` | `(value: any, row: T) => any` | - | Computed value function |
| `renderCell` | `(params) => ReactNode` | - | Custom cell renderer |

## Styling

The component uses Bootstrap 5 classes and custom SASS styling:

- Uses `table`, `card`, `badge`, `btn` Bootstrap components
- Custom SASS file: `public/assets/sass/components/_data-grid.scss`
- Responsive breakpoints follow Bootstrap's grid system
- Dark mode support available

## File Structure

```
src/components/ui/data-grid/
├── index.ts                    # Main exports
├── data-grid.tsx              # Main component
├── data-grid-example.tsx      # Usage example
└── README.md                  # Documentation

public/assets/sass/components/
└── _data-grid.scss            # SASS styling
```

## Examples

Visit `/test-datagrid` in your application to see a live example with:
- Action buttons
- Status badges
- Email links
- Custom cell rendering
- Row selection
- Pagination

## Bootstrap Integration

The component leverages these Bootstrap 5 components:
- `table` and `table-*` classes for styling
- `card` component for container
- `badge` for status indicators
- `btn` and `btn-*` for actions
- `form-check` for checkboxes
- `spinner-border` for loading states

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE 11+ (with polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)