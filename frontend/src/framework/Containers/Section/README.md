# Section Component

The `Section` component is a reusable UI component used for creating sections with headers and collapsible content.

## Props

The `Section` component accepts the following props:

- `header` (string): The header text for the section.
- `children` (node): The content of the section.
- `maxWidth` (number): The maximum width of the section.
- `boxShadow` (number): The level of box shadow for the section.
- `mb` (number): The margin bottom value for the section.
- `mt` (number): The margin top value for the section.
- `pad` (number): The padding value for the section.
- `pl` (number): The left padding value for the section.
- `pr` (number): The right padding value for the section.
- `pt` (number): The top padding value for the section.
- `pb` (number): The bottom padding value for the section.
- `br` (number): The border radius value for the section.
- `b` (string): The background color of the section.
- `j` (string): The justify content value for aligning children within the section.
- `a` (string): The align items value for aligning children within the section.
- `fd` (string): The flex direction value for the layout of children within the section.
- `collapse` (bool): Whether the section can be collapsed or not.
- `divider` (bool): Whether to show a divider line below the header or not.
- `gutter` (bool): Whether to add a margin bottom for creating spacing between sections.
- `headerAlign` (string): The alignment of the header text. Possible values: "left", "center", "right".
- `headerVar` (string): The variant of the header text.
- `centerAlignIconPosition` (string): The position of the collapse icon when the header alignment is center. Possible values: "left", "right".

## Usage

To use the `Section` component, import it into your project and use it like this:

```jsx
import Section from "./Section";

function App() {
  return (
    <Section
      header="Example Section"
      maxWidth={800}
      boxShadow={2}
      mb={2}
      mt={2}
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
      gutter={false}
      headerAlign="center"
      headerVar="h3"
      centerAlignIconPosition="right"
    >
      <p>This is the content of the section.</p>
    </Section>
  );
}
```

## Default Props

The `Section` component provides default values for the following props:

- `maxWidth`: 0
- `boxShadow`: 0
- `mb`: 3
- `mt`: 3
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
- `gutter`: false
- `headerAlign`: "center"
- `headerVar`: "h3"
- `centerAlignIconPosition`: "right"

## License

This component is released under the [MIT License](https://opensource.org/licenses/MIT).

---
