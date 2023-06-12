import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Text,
  TreeNode,
} from '../Elements';
import { ToggleButton, ToggleButtonGroup } from '../Buttons';
import { breakPoints, useBreakpoint } from '../../utils';
import { Carousel, Stagger } from '../Animation';
import { Flexer, Surface } from '../Containers';
import Gallery from '../Media/Gallery';
import Alert from '../Elements/Alert/Alert';
import Switch from '../Form/Switch/Switch';
import { Option, Select } from '../Form';
import { Page } from '../Layout';

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

  const leftItems = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
    { id: '4', name: 'Item 4' },
  ];

  const rightItems = [
    { id: '5', name: 'Item 5' },
    { id: '6', name: 'Item 6' },
    { id: '7', name: 'Item 7' },
  ];

  const columns = ['Name', 'Age', 'Country'];
  const data = [
    { Name: 'John Doe', Age: 25, Country: 'USA' },
    { Name: 'Jane Smith', Age: 30, Country: 'Canada' },
    { Name: 'Bob Johnson', Age: 35, Country: 'UK' },
  ];

  const [selectedValue, setSelectedValue] = useState('');
  const [formData, setFormData] = useState([]);

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const handleItemClick = (label: string) => {
    console.log(`Clicked on "${label}"`);
  };

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

  const isSmallScreen = useBreakpoint(breakPoints.sm);

  const [alert, setAlert] = useState<any>(null);

  const showAlert = (message: string, type: any) => {
    setAlert({ message, type });
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  const dispatch = useDispatch();

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

  return (
    <Page>
      <Flexer j="c" a="c" fd="column" mt={40}>
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

        {/* <Gallery images={stockImages} layout="grid" /> */}

        <Alert alert={alert} onClose={handleCloseAlert} />
        <button onClick={() => dispatch({ type: 'ALERT_SUCCESS', message: 'Data Updated' })}>
          Show Success
        </button>
        <button onClick={() => dispatch({ type: 'ALERT_FAIL', message: 'Error Updated' })}>
          Show Error
        </button>
        <button onClick={() => dispatch({ type: 'ALERT_WARNING', message: 'Warning Updated' })}>
          Show Warning
        </button>
        <button onClick={() => dispatch({ type: 'ALERT_INFO', message: 'Info Updated' })}>
          Show Info
        </button>
        {/* <TransferList leftItems={leftItems} rightItems={rightItems} /> */}
        {/* <MenuExamples /> */}

        <div style={{ marginBottom: 96 }}>
          <Select onChange={handleChange}>
            <Option value="Tacos">Tacos</Option>
            <Option value="Burritos">Burritos</Option>
            <Option value="Enchiladas">Enchiladas</Option>
            <Option value="Waffles">Waffles</Option>
            <Option value="Enchiladas">Enchiladas</Option>
            <Option value="Enchiladas">Enchiladas</Option>
            <Option value="Enchiladas">Enchiladas</Option>
          </Select>
        </div>

        {/* Carousel */}
        <Carousel autoplay style={{ marginBottom: 96 }}>
          <img src="https://source.unsplash.com/1400x901/?service" alt="Image 1" />
          <img src="https://source.unsplash.com/1400x902/?service" alt="Image 2" />
          <img src="https://source.unsplash.com/1400x903/?service" alt="Image 3" />
          <img src="https://source.unsplash.com/1400x900/?service" alt="Image 4" />
        </Carousel>

        <TableContainer mt={20} mb={40} minWidth={600}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell s="1.05rem" fw="bold" key={index}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any, index) => (
                <TableRow key={index}>
                  {columns.map((column, index) => (
                    <TableCell s="0.95rem" key={index}>
                      {row[column]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
