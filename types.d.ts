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
  Order: (LaptopOrder | ConsoleOrder)[];
};

type LaptopOrder = {
  readonly docid: string;
  orderType: "Laptop";
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
