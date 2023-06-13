export const calculateQuizScore = (services: any, hourlyBudget: any, preferredFeatures: any) => {
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
