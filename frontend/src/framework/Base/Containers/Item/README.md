# Item Component

The `Item` component is a flexible item within a container that adjusts its size based on different breakpoints. It allows you to control the width, alignment, and styling of the item within the `Container`.

## Props

The `Item` component accepts the following props:

- `xs` (number): The width of the item at extra-small breakpoint (<= 600px). Default value: 12.
- `sm` (number): The width of the item at small breakpoint (> 600px). Default value: `undefined` (falls back to `xs` value).
- `md` (number): The width of the item at medium breakpoint (> 960px). Default value: `undefined` (falls back to `sm` or `xs` value).
- `lg` (number): The width of the item at large breakpoint (> 1280px). Default value: `undefined` (falls back to `md`, `sm`, or `xs` value).
- `xl` (number): The width of the item at extra-large breakpoint (> 1920px). Default value: `undefined` (falls back to `lg`, `md`, `sm`, or `xs` value).
- `justify` (string): The horizontal alignment of the item within the container. Default value: "center".
- `align` (string): The vertical alignment of the item within the container. Default value: "center".
- `children` (React.ReactNode): The content to be rendered inside the item.
- `style` (React.CSSProperties): Additional CSS styles to apply to the item.

## Usage

To use the `Item` component, import it into your project and use it like this:

```jsx
import Item from "./Item";

function App() {
  return (
    <Container>
      <Item xs={12} sm={6} md={4} lg={3} xl={2} justify="center" align="center">
        {/* Content goes here */}
      </Item>
    </Container>
  );
}
```

## Breakpoints and Widths

The `Item` component allows you to specify different widths for different breakpoints. The available breakpoints are as follows:

- Extra-small (xs): <= 600px
- Small (sm): > 600px
- Medium (md): > 960px
- Large (lg): > 1280px
- Extra-large (xl): > 1920px

You can customize the width of the item at each breakpoint by specifying the corresponding prop (e.g., `xs`, `sm`, `md`, `lg`, `xl`). If a specific breakpoint width is not provided, the item falls back to the width of the previous breakpoint or the `xs` value.

```jsx
<Item xs={12} sm={6} md={4} lg={3} xl={2} />
```

## Alignment

You can control the horizontal and vertical alignment of the item within the container using the `justify` and `align` props, respectively. The available alignment values are as follows:

- Horizontal alignment (`justify`): "flex-start", "center", "flex-end"
- Vertical alignment (`align`): "flex-start", "center", "flex-end"

```jsx
<Item justify="center" align="flex-start" />
```

## Styling

The `Item` component provides flexibility for applying custom styles to the item. You can pass a `style` prop to the `Item` component, which accepts a `React.CSSProperties` object containing CSS styles.

```jsx
<Item style={{ backgroundColor: "lightgray", padding: "20px" }} />
```

Additionally, you can override specific styles of the `Item` component by targeting the corresponding CSS classes. The `Item` component applies the CSS class `"item"` to the rendered `<div>` element, allowing you to apply custom styles using CSS.

```css
.item {
  /* Custom styles */
}
```

## License

This component is released under the [MIT License](https://opensource.org/licenses/MIT).

---
