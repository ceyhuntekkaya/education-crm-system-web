# Button Component

A comprehensive, flexible Button component built for the CRM template with support for multiple variants, icons, sizes, and Next.js Link integration.

## Features

- ✅ Multiple variants (main, outline-main, white, outline-white, link)
- ✅ Icon support (left and right icons using Phosphor Icons)
- ✅ Size variants (sm, md)
- ✅ Loading states with spinner
- ✅ Disabled states
- ✅ Next.js Link integration
- ✅ TypeScript support with proper typing
- ✅ AOS animation support
- ✅ Existing SASS styling integration

## Basic Usage

```tsx
import { Button } from '@/components/ui/button';

// Basic button
<Button variant="main">Click Me</Button>

// Button with icon
<Button variant="main" rightIcon="ph-arrow-right">
  Continue
</Button>

// Link button
<Button href="/dashboard" variant="main">
  Go to Dashboard
</Button>
```

## Variants

### Main Variants
- `main` - Primary button with main color background
- `outline-main` - Outlined button with main color border
- `white` - White background button
- `outline-white` - Outlined button with white border
- `link` - Renders as Next.js Link component

```tsx
<Button variant="main">Main Button</Button>
<Button variant="outline-main">Outline Main</Button>
<Button variant="white">White Button</Button>
<Button variant="outline-white">Outline White</Button>
```

## Icons

The component supports Phosphor Icons on both left and right sides:

```tsx
// Left icon
<Button variant="main" leftIcon="ph-plus">
  Add New
</Button>

// Right icon
<Button variant="main" rightIcon="ph-arrow-right">
  Continue
</Button>

// Both icons
<Button variant="main" leftIcon="ph-download" rightIcon="ph-arrow-down">
  Download
</Button>
```

## Sizes

Two size variants are available:

```tsx
<Button variant="main" size="sm">Small Button</Button>
<Button variant="main" size="md">Medium Button</Button> {/* Default */}
```

## States

### Loading State
```tsx
<Button variant="main" loading={true}>
  Processing...
</Button>
```

### Disabled State
```tsx
<Button variant="main" disabled={true}>
  Disabled Button
</Button>
```

## Link Integration

When `href` prop is provided or `variant="link"` is used, the component renders as a Next.js Link:

```tsx
// Using href prop
<Button href="/courses" variant="main">
  Browse Courses
</Button>

// Using link variant
<Button variant="link" href="/about">
  About Us
</Button>
```

## Props

### ButtonProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Button content |
| `variant` | `'main' \| 'outline-main' \| 'white' \| 'outline-white' \| 'link'` | `'main'` | Button variant |
| `size` | `'sm' \| 'md'` | `'md'` | Button size |
| `leftIcon` | `string` | - | Phosphor icon class for left icon |
| `rightIcon` | `string` | - | Phosphor icon class for right icon |
| `className` | `string` | `''` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Whether button is disabled |
| `loading` | `boolean` | `false` | Whether button is in loading state |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type (for regular buttons) |
| `onClick` | `(e: MouseEvent) => void` | - | Click handler (for regular buttons) |
| `href` | `string` | - | URL for link buttons |

## Examples

### Form Submit Button
```tsx
<Button type="submit" variant="main" loading={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit Form'}
</Button>
```

### Navigation Button
```tsx
<Button href="/dashboard" variant="main" rightIcon="ph-arrow-right">
  Go to Dashboard
</Button>
```

### Action Button with Icon
```tsx
<Button 
  variant="outline-main" 
  leftIcon="ph-pencil" 
  size="sm"
  onClick={handleEdit}
>
  Edit
</Button>
```

### Loading Button
```tsx
<Button 
  variant="main" 
  loading={isProcessing}
  disabled={isProcessing}
>
  {isProcessing ? 'Processing...' : 'Process'}
</Button>
```

## Styling

The component uses existing SASS classes from the template:
- `.btn` - Base button styles
- `.btn-main` - Main variant styles
- `.btn-outline-main` - Outline main variant styles
- `.btn-white` - White variant styles
- `.btn-outline-white` - Outline white variant styles
- `.btn-sm` - Small size styles

## TypeScript Support

The component is fully typed with TypeScript and includes:
- Discriminated unions for button vs link props
- Proper typing for all variants and sizes
- IntelliSense support for all props

## Accessibility

- Proper button semantics
- Disabled state handling
- Loading state with appropriate text
- Keyboard navigation support

## Browser Support

Compatible with all modern browsers that support:
- ES6+ features
- CSS Grid and Flexbox
- Next.js Link component
