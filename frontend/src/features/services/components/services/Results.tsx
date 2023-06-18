import { FC, useEffect, useState } from 'react';

import { Carousel } from '@/components/Animation';
import { Button } from '@/components/Buttons';
import { Flexer, Surface } from '@/components/Containers';

import { ServiceCard } from './ServiceCards';
import { ServiceType } from '../../types';
import { useBreakpoint } from '@/hooks';

type ResultItemProps = {
  index: number;
  activeIndex: number;
  handleClick: (index: number) => void;
  service: ServiceType;
};

export const ResultItem: FC<ResultItemProps> = ({ index, activeIndex, handleClick, service }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Surface
      px={0}
      py={0}
      maxWidth={325}
      minHeight={400}
      o={index === activeIndex ? 1 : hovered ? 0.8 : 0.5}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => handleClick(index)}
      outerStyle={{ maxWidth: 325, transition: 'all 0.3s ease' }}
    >
      <ServiceCard service={service} />
    </Surface>
  );
};

type ResultsProps = {
  services: ServiceType[];
  recommended: ServiceType;
  handleReset: () => void;
  editMode: boolean;
};

export const Results: FC<ResultsProps> = ({ services, recommended, handleReset }) => {
  const isSmallScreen = useBreakpoint('sm');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index = services.findIndex((service: any) => service.id === recommended.id);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [recommended, services]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Surface className="fade-in" j="c" maxWidth={1200}>
      <Flexer j="c" a="c">
        {isSmallScreen ? (
          <Carousel>
            {services.map((service, index) => (
              <ResultItem
                key={`service-${index}`}
                index={index}
                activeIndex={activeIndex}
                handleClick={handleClick}
                service={service}
              />
            ))}
          </Carousel>
        ) : (
          <Flexer j="c" gap={24}>
            {services.map((service, index) => (
              <ResultItem
                key={`service-${index}`}
                index={index}
                activeIndex={activeIndex}
                handleClick={handleClick}
                service={service}
              />
            ))}
          </Flexer>
        )}
      </Flexer>
      <Flexer fd="column" gap={6} mt={24} a="c">
        <Button size="sm" startIcon="style" w={135}>
          Book a Service
        </Button>
        <Button size="sm" onClick={handleReset} startIcon="restart_alt" w={135}>
          Reset Quiz
        </Button>
      </Flexer>
    </Surface>
  );
};
