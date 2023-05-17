# Surface Component

The `Surface` component is a reusable React component that provides a styled container with customizable properties such as width, padding, margin, background color, and more.

## Usage

You can use the `Surface` component in your JSX code:

```jsx
<Surface
  maxWidth={500}
  background="#EFEFEF"
  paddingX={2}
  paddingY={2}
  borderRadius={2}
>
  <h1>Hello, Surface!</h1>
  <p>This is a sample content inside the Surface component.</p>
</Surface>
```

## Props

The `Surface` component accepts the following props:

- `children` (PropTypes.node): The content to be displayed inside the Surface component.
- `maxWidth` (PropTypes.number): The maximum width of the Surface component.
- `boxShadow` (PropTypes.number): The level of box shadow to apply to the Surface component.
- `marginBottom` (PropTypes.number): The bottom margin of the Surface component.
- `marginTop` (PropTypes.number): The top margin of the Surface component.
- `paddingX` (PropTypes.number): The inner horizontal padding of the Surface component.
- `paddingY` (PropTypes.number): The inner vertical padding of the Surface component.
- `paddingLeft` (PropTypes.number): The outer left padding of the Surface component.
- `paddingRight` (PropTypes.number): The outer right padding of the Surface component.
- `paddingTop` (PropTypes.number): The outer top padding of the Surface component.
- `paddingBottom` (PropTypes.number): The outer bottom padding of the Surface component.
- `borderRadius` (PropTypes.node): The border radius of the Surface component.
- `background` (PropTypes.string): The background color of the Surface component.
- `justifyChildren` (PropTypes.string): The justify-content property for aligning children horizontally.
- `alignChildren` (PropTypes.string): The align-items property for aligning children vertically.
- `flexDirection` (PropTypes.string): The flex-direction property for controlling the direction of the children.
- `gutter` (PropTypes.bool): Specifies whether to add a bottom margin to the Surface component.
- `fillHeight` (PropTypes.bool): Specifies whether the Surface component should fill the available height.
- `className` (PropTypes.string): Additional CSS class name(s) to be applied to the Surface component.

## Default Props

The `Surface` component has the following default props:

```jsx
Surface.defaultProps = {
  children: null,
  maxWidth: undefined,
  boxShadow: 0,
  marginBottom: 3,
  marginTop: 3,
  paddingX: 3,
  paddingY: 3,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  borderRadius: 1,
  background: "#F5F5F5",
  justifyChildren: "flex-start",
  alignChildren: "flex-start",
  flexDirection: "column",
  gutter: false,
  fillHeight: false,
  className: undefined,
};
```

## License

This component is released under the [MIT License](https://opensource.org/licenses/MIT).

---
