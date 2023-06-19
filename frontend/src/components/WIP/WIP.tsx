import React, { useEffect, useState } from 'react';

import { Text, TreeNode } from '../Elements';
import { ToggleButton, ToggleButtonGroup } from '../Buttons';

import { Carousel, Stagger } from '../Animation';
import { Flexer, Surface } from '../Containers';
import Gallery from '../Media/Gallery';
import Switch from '../Form/Switch/Switch';
import { Page } from '../Layout';
import { Button } from '../Buttons/Button/Button';
import { useBreakpoint } from '@/hooks';
import { useEditModeStore } from '@/stores/editmode';
import { Editable } from '../../features/editable/components/Editable';
import { PalettePreview } from './PalettePreview';
import { defaultColors } from '@/theme';

interface WIPProps {}

const WIP: React.FC<WIPProps> = ({}) => {
  const stockImages = [
    {
      url: 'images/seo/about.jpeg',
      caption: 'Mountain Landscape',
      tags: ['landscape', 'mountain'],
    },
    {
      url: 'https://source.unsplash.com/1400x900/?sunset',
      caption: 'Colorful Sunset',
      tags: ['landscape', 'sunset'],
    },
    {
      url: 'https://source.unsplash.com/1400x900/?flower',
      caption: 'Flower Blossom',
      tags: ['nature', 'flower'],
    },
    {
      url: 'https://source.unsplash.com/1400x900/?lake',
      caption: 'Calm Lake',
      tags: ['landscape', 'lake'],
    },
    {
      url: 'https://source.unsplash.com/1400x900/?city',
      caption: 'Urban City',
      tags: ['landscape', 'city'],
    },
    {
      url: 'https://source.unsplash.com/1400x900/?beach',
      caption: 'Sandy Beach',
      tags: ['landscape', 'beach'],
    },
  ];

  const [selectedValueToggle, setSelectedValueToggle] = useState<string | null>(null);

  const handleValueChange = (value: string | null) => {
    setSelectedValueToggle(value);
  };

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isSmallScreen = useBreakpoint('sm');

  const [switches, setSwitches] = useState({
    field1: false,
    field2: false,
  });

  const handleToggle = (name: string, value: boolean) => {
    setSwitches((prevSwitches) => ({
      ...prevSwitches,
      [name]: value,
    }));
  };

  const { editMode, editModeToggle } = useEditModeStore();

  console.log('default', defaultColors);

  return (
    <Page>
      <PalettePreview />
      <Editable
        name="test"
        data={{ name: 'hello', icon: null, image: null }}
        onUpdate={() => console.log('Updated')}
        endpoint="/"
        mt={96}
      >
        <Text t="h1" mt={40} a="c">
          Test
        </Text>
      </Editable>
      <Flexer j="c" a="c" fd="column" mt={40}>
        <h1>Edit Mode: {editMode ? 'On' : 'Off'}</h1>
        <button onClick={editModeToggle}>Toggle Mode</button>

        <Button size="lg" palette="dark" variant="outlined" mt={8} mb={24}>
          Test
        </Button>
        <div>
          <Switch
            name="field1"
            label="Toggle Field 1"
            value={switches.field1}
            onChange={handleToggle}
          />
          <Switch
            name="field2"
            label="Toggle Field 2"
            value={switches.field2}
            onChange={handleToggle}
          />
          <form>
            <input type="text" disabled={!switches.field1} placeholder="Field 1" />
            <input type="text" disabled={!switches.field2} placeholder="Field 2" />
            {/* Additional form fields */}
          </form>
        </div>

        <Stagger direction="left" orientation="vertical" mt={90}>
          <Surface
            j="c"
            a="c"
            maxWidth={400}
            minHeight={100}
            boxShadow={1}
            px={1.5}
            py={1.5}
            mt={1}
            mb={2}
          >
            <TreeNode label="Parent" startOpen>
              <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                Text Node Parent 1-1
              </Text>
              <TreeNode label="Child 1">
                <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                  Text Node Child 1-1
                </Text>
                <TreeNode label="Grandchild 1">
                  <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                    Text Node Grandchild 1-1
                  </Text>
                  <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                    Text Node Grandchild 1-2
                  </Text>
                </TreeNode>
                <TreeNode label="Grandchild 2">
                  <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                    Text Node Grandchild 2-1
                  </Text>
                </TreeNode>
              </TreeNode>
              <TreeNode label="Child 2">
                <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                  Text Node Child 2-1
                </Text>
                <TreeNode label="Grandchild 3">
                  <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                    Text Node Grandchild 3-1
                  </Text>
                  <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                    Text Node Grandchild 3-2
                  </Text>
                  <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                    Text Node Grandchild 3-3
                  </Text>
                </TreeNode>
              </TreeNode>
            </TreeNode>
          </Surface>
          <h1>Stock Image Gallery</h1>
          <Gallery images={stockImages} layout="masonry" />
        </Stagger>
        <Carousel autoplay style={{ marginBottom: 96 }}>
          <img src="https://source.unsplash.com/1400x901/?service" alt="Image 1" />
          <img src="https://source.unsplash.com/1400x902/?service" alt="Image 2" />
          <img src="https://source.unsplash.com/1400x903/?service" alt="Image 3" />
          <img src="https://source.unsplash.com/1400x900/?service" alt="Image 4" />
        </Carousel>

        <ToggleButtonGroup value={selectedValueToggle} onChange={handleValueChange}>
          <ToggleButton value="option1">Option 1</ToggleButton>
          <ToggleButton value="option2">Option 2</ToggleButton>
          <ToggleButton value="option3">Option 3</ToggleButton>
        </ToggleButtonGroup>
        <p className="p-l-60 p-r-60">Selected Value: {selectedValueToggle}</p>
        <div>{isSmallScreen ? <p>Small Screen</p> : <p>Large Screen</p>}</div>
        <div>{innerWidth}</div>
      </Flexer>
    </Page>
  );
};

export default WIP;
