import { FC, Fragment } from 'react';

import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';
import { Item } from '@/components/Containers';
import { JobListings } from '@/features/jobs';

import { useContacts } from '../api/useContact';
import { Contacts } from '../components/Contacts';
import { ContactForm } from '../components/ContactForm';
import { Hours } from '../components/Hours';
import { Information } from '../components/Information';
import { Members } from '../components/Members';

export const Contact: FC = () => {
  const { data, isLoading } = useContacts();

  if (isLoading || !data) {
    return <Loading load={true} />;
  }

  return (
    <Page>
      <Fragment>
        <Members membersData={data.members} />
        <Contacts>
          <Item xs={6} fd="column">
            <Information contactData={data.contactInfo} />
            <Hours hoursData={data.hours} />
          </Item>
          <ContactForm socialData={data.socials} color="dark" />
        </Contacts>
        <JobListings jobsData={data.jobs} />
      </Fragment>
    </Page>
  );
};
