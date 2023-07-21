import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Split1Payload {
  company: string;
  model: string;
  year: number;
  verified: boolean;
  newcompany?: boolean;
}

interface Split2Payload {
  back: boolean;
  front: boolean;
  backDesign?: string;
  frontDesign?: string;
  backDesignDownUrl?: string | null;
  frontDesignDownUrl?: string | null;
  withLogo: boolean;
}

interface Split3Payload {
  laptopBackImg?: string;
  laptopFrontImg?: string;
}

const laptopOrderSlice = createSlice({
  name: "laptopOrder",
  initialState: { orderType: "Laptop" } as LaptopOrder & {
    cid?: string | null;
    years: number[] | null;
    newcompany?: boolean;
    backDesignDownUrl?: string | null;
    frontDesignDownUrl?: string | null;
  },
  reducers: {
    setOrderId: (state, action: PayloadAction<string>) => {
      state.docid = action.payload;
    },
    setCompanyCid: (state, action: PayloadAction<string>) => {
      state.cid = action.payload;
    },
    setYears: (state, action: PayloadAction<Array<number>>) => {
      state.years = action.payload;
    },
    setSplit1: (state, action: PayloadAction<Split1Payload>) => {
      const { company, model, year, verified, newcompany } = action.payload;
      state.company = company;
      state.model = model;
      state.year = year;
      state.verified = verified;
      state.newcompany = newcompany;
    },
    setSplit2: (state, action: PayloadAction<Split2Payload>) => {
      const {
        back,
        front,
        backDesign,
        frontDesign,
        withLogo,
        backDesignDownUrl,
        frontDesignDownUrl,
      } = action.payload;
      state.back = back;
      state.front = front;
      state.backDesign = backDesign;
      state.frontDesign = frontDesign;
      state.backDesignDownUrl = backDesignDownUrl;
      state.frontDesignDownUrl = frontDesignDownUrl;
      state.withLogo = withLogo;
    },
    setSplit3: (state, action: PayloadAction<Split3Payload>) => {
      const { laptopBackImg, laptopFrontImg } = action.payload;
      state.laptopBackImg = laptopBackImg;
      state.laptopFrontImg = laptopFrontImg;
    },
  },
});

export const {
  setSplit1,
  setSplit2,
  setSplit3,
  setCompanyCid,
  setYears,
  setOrderId,
} = laptopOrderSlice.actions;

export default laptopOrderSlice.reducer;
