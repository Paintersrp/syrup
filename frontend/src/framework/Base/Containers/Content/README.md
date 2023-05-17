# Content Component

The `Content` component is a reusable UI component used for creating content sections with headers and collapsible subheaders.

## Props

The `Content` component accepts the following props:

- `header` (string): The header text for the content section.
- `subheader` (string): The subheader text for the content section.
- `children` (node): The content of the section.
- `maxWidth` (number): The maximum width of the content section.
- `boxShadow` (number): The level of box shadow for the content section.
- `pad` (number): The padding value for the content section.
- `pl` (number): The left padding value for the content section.
- `pr` (number): The right padding value for the content section.
- `pt` (number): The top padding value for the content section.
- `pb` (number): The bottom padding value for the content section.
- `br` (number): The border radius value for the content section.
- `b` (string): The background color of the content section.
- `j` (string): The justify content value for aligning children within the content section.
- `a` (string): The align items value for aligning children within the content section.
- `fd` (string): The flex direction value for the layout of children within the content section.
- `collapse` (bool): Whether the content section can be collapsed or not.
- `divider` (bool): Whether to show a divider line below the header or not.
- `headerAlign` (string): The alignment of the header text. Possible values: "left", "center", "right".
- `headerVar` (string): The variant of the header text.

## Usage

To use the `Content` component, import it into your project and use it like this:

```jsx
import Content from "./Content";

function App() {
  return (
    <Content
      header="Example Content"
      subheader="Example Subheader"
      maxWidth={800}
      boxShadow={2}
      pad={2}
      pl={1}
      pr={1}
      pt={1}
      pb={1}
      br={1}
      b="#F5F5F5"
      j="flex-start"
      a="flex-start"
      fd="column"
      collapse={true}
      divider={true}
      headerAlign="center"
      headerVar="h3"
    >
      <p>This is the content of the section.</p>
    </Content>
  );
}
```

## Default Props

The `Content` component provides default values for the following props:

- `boxShadow`: 0
- `pad`: 3
- `pl`: 0
- `pr`: 0
- `pt`: 0
- `pb`: 0
- `br`: 1
- `b`: "#F5F5F5"
- `j`: "flex-start"
- `a`: "flex-start"
- `fd`: "column"
- `collapse`: false
- `divider`: false
- `headerAlign`: "center"
- `headerVar`: "h3"

Feel free to customize these props according to your needs when using the `Content` component.

## License

This component is released under the [MIT License](https://opensource.org/licenses/MIT).

---
