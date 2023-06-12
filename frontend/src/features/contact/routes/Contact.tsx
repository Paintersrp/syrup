import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { seoData } from '@/settings';
import { Page } from '@/components/Layout';
import { Item } from '@/components/Containers';
import { JobListings } from '@/features/jobs/components/JobListings';
import { usePageSetup } from '@/hooks';

import { useContacts } from '../api/useContact';
import { Contacts } from '../components/Contacts';
import { ContactForm } from '../components/ContactForm';
import { Hours } from '../components/Hours';
import { Information } from '../components/Information';
import { Members } from '../components/Members';

import { ContactData } from '../types';

export const Contact: React.FC = () => {
  const editMode = useSelector((state: any) => state.editMode.editMode);
  const { error, setError, ready, setReady } = usePageSetup();
  const [data, setData] = useState<ContactData | null>();

  useEffect(() => {
    useContacts(setData, setError);
    setReady(true);
  }, []);

  return (
    <Page seoData={seoData.contact} error={error} ready={ready}>
      {data && (
        <Fragment>
          <Members membersData={data.members} editMode={editMode} />
          <Contacts>
            <Item xs={6} style={{ flexDirection: 'column' }}>
              <Information editMode={editMode} contactData={data.contactInfo} />
              <Hours hoursData={data.hours} editMode={editMode} />
            </Item>
            <ContactForm socialData={data.socials} editMode={editMode} color="dark" />
          </Contacts>
          <JobListings jobsData={data.jobs} editMode={editMode} />
        </Fragment>
      )}
    </Page>
  );
};
