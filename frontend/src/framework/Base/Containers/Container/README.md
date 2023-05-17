# Container Component

The `Container` component is a flexible container that wraps its children in a flexbox layout. It allows you to easily control the alignment, spacing, and direction of the children within the container. It should be used with the [Item](https://github.com/Paintersrp/tracker/tree/main/frontend/src/framework/Base/Containers/Item) component, which has responsiveness props and applies relevant classes for `Container`.

## Props

The `Container` component accepts the following props:

- `children` (ReactNode): The content to be rendered inside the container.
- `align` (CSSProperties["alignContent"]): The alignment of the container's content along the cross-axis. Default value: "center".
- `justify` (CSSProperties["justifyContent"]): The alignment of the container's content along the main axis. Default value: "center".
- `direction` (CSSProperties["flexDirection"]): The direction of the container's content. Default value: "row".
- `textAlign` (CSSProperties["textAlign"]): The text alignment of the container's content. Default value: "left".
- `style` (CSSProperties): Additional CSS styles to apply to the container.
- `spacing` (number): The spacing value between children elements. Default value: 0.

## Usage

To use the `Container` component, import it into your project and use it like this:

```jsx
import Container from "./Container";

function App() {
  return (
    <Container
      align="center"
      justify="center"
      direction="row"
      textAlign="left"
      style={{ backgroundColor: "#F5F5F5", padding: "20px" }}
      spacing={2}
    >
      <Item xs={12} md={6}>
        Item 1
      </Item>
      <Item xs={12} md={6}>
        Item 2
      </Item>
      <Item xs={12} sm={9} md={6}>
        Item 3
      </Item>
    </Container>
  );
}
```

## Child Elements

The `Container` component applies spacing to child elements that have a `className` containing the string "item". The spacing value is determined by the `spacing` prop.

```jsx
<Container spacing={2}>
  <Item xs={12} md={6}>
    Item 1
  </Item>
  <Item xs={12} md={6}>
    Item 2
  </Item>
  <Item xs={12} sm={9} md={6}>
    Item 3
  </Item>
</Container>
```

## Default Props

The `Container` component provides default values for the following props:

- `align`: "center"
- `justify`: "center"
- `direction`: "row"
- `textAlign`: "left"
- `spacing`: 0

Feel free to customize these props according to your needs when using the `Container` component.

## License

This component is released under the [MIT License](https://opensource.org/licenses/MIT).

---
