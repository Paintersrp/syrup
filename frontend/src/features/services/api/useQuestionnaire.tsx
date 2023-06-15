import { axios } from '@/lib/api';

import { ServiceType } from '../types';

export const handleSkipQuiz = (
  services: ServiceType[],
  setRecommended: any,
  setActiveStep: any,
  questions: any,
  defaultRec: string = 'Standard'
) => {
  const recommendedService = services.find((service: any) => service.service_title === defaultRec);
  setRecommended(recommendedService);
  setActiveStep(questions.length);

  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

export const handleResetQuiz = (setRecommended: any) => {
  setRecommended(undefined);
  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

export const handleAnswerChange = (
  setSelectedValues: any,
  selectedValues: any,
  value: string,
  slug: string
) => {
  setSelectedValues((prevState: any) => {
    let updatedValues;

    if (slug.includes('features')) {
      const isValueIncluded = prevState[slug].includes(value);
      updatedValues = isValueIncluded
        ? prevState[slug].filter((item: any) => item !== value)
        : [...prevState[slug], value];
    } else {
      updatedValues = value;
    }

    return {
      ...selectedValues,
      [slug]: updatedValues,
    };
  });
};

export const calculateScore = (services: any, hourlyBudget: any, preferredFeatures: any) => {
  const newScores: any = {};

  services.forEach((service: any) => {
    let score = 0;
    if (service.price <= hourlyBudget) {
      score++;
    }
    service.features.forEach((feature: any) => {
      if (preferredFeatures.includes(feature.detail)) {
        score++;
      }
    });

    if (service.price > hourlyBudget) {
      score = score - 2;
    }
    newScores[service.service_title] = score;
  });

  const recommendedService = services.reduce((prev: any, current: any) =>
    newScores[prev.service_title] > newScores[current.service_title] ? prev : current
  );

  const unrecommendedServices = services.filter(
    (service: any) => service.service_title !== recommendedService.service_title
  );

  return { newScores, recommendedService, unrecommendedServices };
};

// Needs work - and should be more dynamic?
export const handleSubmitQuiz = (
  services: ServiceType[],
  selectedValues: any,
  setRecommended: any,
  questions: any,
  values: any
) => {
  const { newScores, recommendedService, unrecommendedServices } = calculateScore(
    services,
    selectedValues.budget,
    selectedValues.features
  );

  setRecommended(recommendedService);

  const formData: any = new FormData();
  formData.append('questionnaire', 1);
  formData.append(
    'results',
    JSON.stringify({
      [questions[0].id]: selectedValues.type,
      [questions[1].id]: selectedValues.size,
      [questions[2].id]: selectedValues.budget,
      [questions[3].id]: selectedValues.features,
    })
  );
  formData.append('contact_name', values.fullName);
  formData.append('contact_email', values.email);
  formData.append('contact_phone', values.phone);
  formData.append('contact_state', values.state);

  axios
    .post(`/questionnaireresults/`, formData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
