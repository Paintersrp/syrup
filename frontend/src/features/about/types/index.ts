export type ImageHeaderType = {
  title: string;
  image: string;
};

export type ParagraphType = {
  id: number;
  title: string;
  body: string;
};

export interface ValueType {
  id: number;
  title: string;
  icon: string;
}

export interface AboutContent {
  header: ImageHeaderType;
  missionStatement: ParagraphType;
  companyHistory: ParagraphType;
  values: ValueType[];
}

export type AboutResponse = {
  data: AboutContent;
};
