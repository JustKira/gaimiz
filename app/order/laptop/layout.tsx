"use client";
import { GaimizLoading } from "@/components/ui/loading";
import { useAuth } from "@/lib/provider/authProvider";
import { useLazyGetCurrentLaptopOrderQuery } from "@/lib/redux/rtkapi/gaimizApi";
import { setOrderId } from "@/lib/redux/slices/laptopOrderSlice";

import React from "react";
import { useDispatch } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const dispatch = useDispatch();
  const [getCurrentLaptop, { data, isLoading }] =
    useLazyGetCurrentLaptopOrderQuery();

  React.useEffect(() => {
    if (!loading && user?.uid) {
      getCurrentLaptop(user.uid);
    }
  }, [loading]);

  React.useEffect(() => {
    if (data?.data.docid) {
      console.log(data.data.docid);
      dispatch(setOrderId(data.data.docid));
    }
    console.log(data?.data);
  }, [data]);

  if (loading || isLoading) {
    return <GaimizLoading />;
  }

  return <>{children}</>;
};

export default Layout;
