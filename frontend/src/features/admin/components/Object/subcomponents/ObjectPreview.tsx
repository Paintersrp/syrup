import { SectionHeader, SocialButtons } from '@/components/Built';
import { Flexer } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { Icon } from '@/components/Media';
import { ImageHeader } from '@/components/Built/ImageHeader/ImageHeader';
import { Paragraph } from '@/features/about/components/Paragraph';

import { Job } from '@/features/jobs/components/Job';
import { JobDetails } from '@/features/jobs/components/JobDetails';
import { JobQualifications } from '@/features/jobs/components/JobQualifications';

import { FC } from 'react';
import { Information } from '@/features/contact/components/Information';
import { Hours } from '@/features/contact/components/Hours';
import { Member } from '@/features/contact/components/Member';

interface ObjectPreviewProps {
  modelName: string;
  formData: any;
  newImage: string | undefined;
}

const ObjectPreview: FC<ObjectPreviewProps> = ({ modelName, formData, newImage }) => {
  switch (modelName) {
    case 'HeroHeader':
      return (
        <Flexer fd="column" a="c">
          <Text t="h1" a="c" className="hero-header-title">
            {formData.title}
          </Text>
          <Text t="body1" a="c" c="#222">
            {formData.subtitle}
          </Text>
          <Text t="body1" fw="600" a="c" className="hero-header-description">
            {formData.description}
          </Text>
        </Flexer>
      );
    case 'SectionHeader':
      return <SectionHeader headerData={formData} formTitle="" />;
    // case "ServiceTier":
    //   return <Service service={formData[0]} />;
    case 'AboutHeader':
      return <ImageHeader header={formData.header} src={newImage ? newImage : formData.image} />;
    case 'MissionStatement':
    case 'CompanyHistory':
      return <Paragraph data={formData} />;
    // case "Process":
    //   return <Process step={formData} noEdit fade={false} />;
    case 'Value':
      return (
        <Flexer fd="column" j="c" a="c" w="auto" mt={18}>
          <Icon size="28px" icon={formData.icon} className="value-icon" />
          <Text className="value-title" a="c" mb={8}>
            {formData.title}
          </Text>
        </Flexer>
      );
    case 'ContactInformation':
      return <Information contactData={formData} />;
    case 'Socials':
      return (
        <Flexer j="c">
          <SocialButtons socialsData={formData} editMode={false} buttonClass="primary-button" />
        </Flexer>
      );
    case 'Hours':
      return <Hours hoursData={formData} />;
    case 'TeamMember':
      return <Member member={formData} editMode={false} newImage={newImage} mt={48} />;
    // case "Benefits":
    //   return <Benefit benefit={formData} edit={false} />;
    // case "ProcessTextItem":
    //   return <ProcessText textItem={formData} index={0} editMode={false} />;
    // case "ContentTextBlock":
    //   return (
    //     <>
    //       <Typography variant="h5" color="primary">
    //         {formData.title}
    //       </Typography>
    //       <Typography variant="body2">{formData.description}</Typography>
    //     </>
    //   );
    // case "ProcessImageItem":
    //   return (
    //     <Container>
    //       <ProcessImage imageItem={formData.image} preview={true} />
    //     </Container>
    //   );
    // case "Messages":
    //   return (
    //     <ReadMessage
    //       message={formData}
    //       goBack={false}
    //       deleteBtn={false}
    //       metadata={modelMetadata.fields}
    //       save={false}
    //     />
    //   );
    case 'JobPosting':
      return (
        <Job>
          <JobDetails job={formData} handleApplyNowClick={() => null} />
          <JobQualifications job={formData} />
        </Job>
      );
    // case "FAQ":
    //   return (
    //     <div style={{ width: "100%" }}>
    //       <AccordionQA faq={formData} edit={false} />
    //     </div>
    //   );
    default:
      return null;
  }
};

export default ObjectPreview;
