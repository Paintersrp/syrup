import { axios } from '@/lib';
import { SetErrorFn } from '@/types';

import { ServiceContent, ServiceResponse, ServiceType } from '../types';

export type SetServicesDataFn = (data: ServiceContent) => void;
export type SetServiceDataFn = (data: ServiceType | ServiceType[]) => void;

export const getServices = (): Promise<ServiceResponse> => {
  return axios.get<ServiceContent>(`/services/`);
};

export const setServices = (data: ServiceContent, setData: SetServicesDataFn): void => {
  setData({
    services: data.services,
    servicesTable: data.servicesTable,
    contactInfo: data.contactInfo,
    socials: data.socials,
    processText: data.processText,
    processImage: data.processImage,
    competitorsTable: data.competitorsTable,
    contentText: data.contentText,
    quizData: data.quizData,
    benefits: data.benefits,
    benefitsHeader: data.benefitsHeader,
  });
};
export const setService = (
  data: ServiceContent,
  setData: SetServiceDataFn,
  setImage: any,
  id: string
): void => {
  const filteredServiceTier = data.services.filter(
    (service: ServiceType) => service.id === parseInt(id)
  )[0];
  const filteredProcessImage = data?.processImage.filter(
    (image: any) => image.servicetier === filteredServiceTier?.service_title
  )[0];
  setData(filteredServiceTier);
  setImage(filteredProcessImage);
};

export const useServices = async (
  setData: SetServicesDataFn,
  setError: SetErrorFn,
  setIndividual: SetServiceDataFn | undefined = undefined,
  setImage: any | undefined = undefined,
  id: string | undefined = undefined
) => {
  try {
    const response = await getServices();
    setServices(response.data, setData);
    if (setIndividual && id) {
      setService(response.data, setIndividual, setImage, id);
    }
  } catch (error) {
    setError(error);
  }
};
