import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ContactInformationData } from '../../contact/routes/Contact';
import { seoData, SocialType } from '@/settings';

import { axios } from '@/lib';

import Hero from '../components/Hero';
import Services from '../components/Services';
import Processes from '../components/Processes';
import LatestPosts from '../components/LatestPosts';
import IconScroller from '../components/IconScroller';
import { Page } from '@/components/Layout';

import { useLoading } from '@/components/Elements';
import { PostType } from '@/features/posts/routes/Posts';
import { SectionHeaderData } from '@/components/Built';

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
}
export interface ProcessData {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
  const dispatch: any = useDispatch();
  const { loading, startLoad, endLoad } = useLoading();
  const editMode: boolean = useSelector((state: any) => state.editMode.editMode);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<any>(null);

  const [serviceData, setServiceData] = useState<any>({});
  const [heroData, setHeroData] = useState<HeroData | any>({});
  const [socialsData, setSocialsData] = useState<SocialType | any>({});
  const [contactData, setContactData] = useState<ContactInformationData | any>({});
  const [processData, setProcessData] = useState<ProcessData | any>({});
  const [processHeader, setProcessHeader] = useState<SectionHeaderData | any>([]);
  const [postsData, setPostsData] = useState<PostType | any>({});
  const [postsHeader, setPostsHeader] = useState<SectionHeaderData | any>([]);

  useEffect(() => {
    startLoad();
    const fetchData = async () => {
      try {
        const response = await axios.get('/landing/');
        setHeroData(response.data.HeroHeader);

        setContactData(response.data.ContactInformation);
        setSocialsData(response.data.Socials);

        setServiceData(response.data.ServiceTier);

        setProcessData(response.data.Process);
        setProcessHeader(response.data.SectionHeader.find((tb: any) => tb.name === 'process'));

        setPostsData(response.data.Post);
        setPostsHeader(response.data.SectionHeader.find((tb: any) => tb.name === 'news'));
        setReady(true);
        endLoad();
      } catch (err: any) {
        setError(err.error);
        setReady(true);
        endLoad(0);
      }
    };
    fetchData();
  }, [dispatch]);

  if (!ready) {
    return null;
  }

  return (
    <Page seoData={seoData.landing} error={error}>
      <Hero
        data={heroData}
        editMode={editMode}
        contactData={contactData}
        socialsData={socialsData}
      />
      {/* <Services serviceData={serviceData} />  */}
      <Services />
      <Processes processData={processData} headerData={processHeader} editMode={editMode} />
      <LatestPosts postsData={postsData} headerData={postsHeader} editMode={editMode} />
      <IconScroller />
    </Page>
  );
};

export default Landing;
