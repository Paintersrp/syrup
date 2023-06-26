import { faker } from '@faker-js/faker';

export type JobContent = {
  id: number | string;
  position: string;
  location: string;
  type: string;
  tagline: string;
  who_we_are: string;
  looking_for: string;
  why_apply: string;
  created_at: string;
  requirements?: string[];
  responsibilities?: string[];
  filled: boolean;
};

const generateMockJobData = () => ({
  id: faker.string.uuid(),
  position: faker.person.jobTitle(),
  location: faker.location.city(),
  type: faker.lorem.word(),
  tagline: faker.lorem.sentence(),
  who_we_are: faker.lorem.paragraph(),
  looking_for: faker.lorem.paragraph(),
  why_apply: faker.lorem.paragraph(),
  created_at: faker.date.recent().toISOString(),
  requirements: [],
  responsibilities: [],
  filled: faker.datatype.boolean(),
});

const generateMockJobDataArray = (count: number) => {
  const jobDataArray = [];
  for (let i = 0; i < count; i++) {
    const mockJobData = generateMockJobData();
    jobDataArray.push(mockJobData);
  }
  return jobDataArray;
};

export const mockJobs: JobContent[] = generateMockJobDataArray(5);
