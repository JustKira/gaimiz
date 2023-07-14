import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Split1Payload {
  company: string;
  model: string;
  year: number;
  verified: boolean;
}

interface Split2Payload {
  back: boolean;
  front: boolean;
  backDesign?: string;
  frontDesign?: string;
  withLogo: boolean;
}

interface Split3Payload {
  laptopBackImg?: string;
  laptopFrontImg?: string;
}

const laptopOrderSlice = createSlice({
  name: "laptopOrder",
  initialState: { orderType: "Laptop" } as Omit<LaptopOrder, "docid">,
  reducers: {
    setSplit1: (state, action: PayloadAction<Split1Payload>) => {
      const { company, model, year, verified } = action.payload;
      state.company = company;
      state.model = model;
      state.year = year;
      state.verified = verified;
    },
    setSplit2: (state, action: PayloadAction<Split2Payload>) => {
      const { back, front, backDesign, frontDesign, withLogo } = action.payload;
      state.back = back;
      state.front = front;
      state.backDesign = backDesign;
      state.frontDesign = frontDesign;
      state.withLogo = withLogo;
    },
    setSplit3: (state, action: PayloadAction<Split3Payload>) => {
      const { laptopBackImg, laptopFrontImg } = action.payload;
      state.laptopBackImg = laptopBackImg;
      state.laptopFrontImg = laptopFrontImg;
    },
  },
});

export const { setSplit1, setSplit2, setSplit3 } = laptopOrderSlice.actions;

export default laptopOrderSlice.reducer;
