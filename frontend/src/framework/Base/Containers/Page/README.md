# Page Component

The `Page` component is a reusable component that represents a page layout with an optional header and content area.

## Installation

Install the `Page` component using npm or yarn:

```shell
npm install page-component

# or

yarn add page-component
```

## Usage

To use the `Page` component in your React application, import it and render it with the desired props.

```jsx
import Page from "page-component";

function App() {
  return (
    <Page
      header="Welcome to My App"
      headerAlign="center"
      headerType="h2"
      backgroundColor="#F5F5F5"
    >
      {/* Content goes here */}
    </Page>
  );
}
```

## Props

The `Page` component accepts the following props:

- `children` (required): The content to be rendered within the page. It can include any valid React nodes.
- `header`: The text to be displayed as the header of the page. (default: `null`)
- `backgroundColor`: The background color of the page. (default: `#F5F5F5`)
- `headerType`: The HTML heading element type for the header. Valid values are `"h1"`, `"h2"`, `"h3"`, `"h4"`, `"h5"`, and `"h6"`. (default: `"h1"`)
- `headerAlign`: The alignment of the header text. Valid values are `"l"`, `"r"`, `"c"`, `"left"`, `"right"`, and `"center"`. (default: `"center"`)

## Styling

The `Page` component provides default styling for the page layout. You can further customize the component's appearance by modifying the styles using CSS.

To target the `Page` component, you can apply custom styles to the following CSS class:

```css
.page-root {
  /* Custom styles for the page */
}

.page-content {
  /* Custom styles for the page content */
}
```

## License

This component is released under the [MIT License](https://opensource.org/licenses/MIT).

---
