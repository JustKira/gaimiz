type Model = {
  readonly docid: string;
  name: string;
  years: number[];
  verified: boolean;
};

type Company = {
  readonly docid: string;
  name: string;
  verified: boolean;
};

type Order = {
  readonly docid: string;
  cycle: number;
  createdAt: Date;
  Orders: (LaptopOrder | ConsoleOrder)[];
};

type ConsoleOrder = {
  readonly docid: string;
  orderType: "Console";
};

type Profile = {
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  dateOfBirth: Date;
  city: string;
  area: string;
  streetname: string;
  building: string;
};

type LaptopOrder = {
  readonly docid: string;
  orderType: "Laptop";
  //split1
  company: string;
  model: string;
  year: number;
  verified: boolean;
  //split2
  back?: boolean;
  front?: boolean;
  backDesign?: string;
  frontDesign?: string;
  withLogo: boolean;
  //split3
  laptopBackImg?: string;
  laptopFrontImg?: string;
};

type Design = {
  readonly docid: string;
  name: string;
  downloadPath: string;
};
