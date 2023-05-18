# Flexer Component

The `Flexer` component is a flexible container that utilizes flexbox layout to arrange its child components. It allows you to easily control alignment, justification, and spacing within a flex container.

## Usage

To use the `Flexer` component in your React application, import it and render it with the desired props.

```jsx
function App() {
  return (
    <Flexer
      j="center"
      a="center"
      fd="row"
      w="100%"
      mt={20}
      mb={10}
      pl={4}
      className="custom-flexer"
    >
      {/* Child components go here */}
    </Flexer>
  );
}
```

## Props

The `Flexer` component accepts the following props:

- `mt`: The margin-top value in pixels. (default: `0`)
- `mb`: The margin-bottom value in pixels. (default: `0`)
- `pl`: The padding-left value in pixels. (default: `0`)
- `j`: The justification value for flex items along the main axis. Valid values are `"l"`, `"fs"`, `"start"`, `"flex-start"`, `"r"`, `"fe"`, `"right"`, `"flex-end"`, `"c"`, `"center"`, `"sb"`, and `"space-between"`. (default: `"flex-start"`)
- `a`: The alignment value for flex items along the cross axis. Valid values are `"l"`, `"fs"`, `"start"`, `"flex-start"`, `"r"`, `"fe"`, `"right"`, `"flex-end"`, `"c"`, `"center"`, `"sb"`, and `"space-between"`. (default: `"center"`)
- `fd`: The flex direction value for the flex container. Valid values are `"row"`, `"column"`, `"row-reverse"`, and `"column-reverse"`. (default: `"row"`)
- `w`: The width value of the flex container. It can be a number representing pixels or a string representing a percentage or other valid CSS width value. (default: `"100%"`)
- `children`: The child components to be rendered within the flex container.
- `style`: Additional CSS styles to be applied to the flex container.
- `className`: Additional CSS class name(s) to be applied to the flex container.

## Styling

The `Flexer` component provides default flexbox styling for the container. You can further customize the component's appearance by modifying the styles using CSS.

To target the `Flexer` component, you can apply custom styles to the following CSS class:

```css
.custom-flexer {
  /* Custom styles for the Flexer component */
}
```

## License

This component is released under the [MIT License](https://opensource.org/licenses/MIT).

---
