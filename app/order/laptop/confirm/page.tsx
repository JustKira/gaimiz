"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RootState } from "@/lib/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const ConfirmPage = () => {
  const laptopOrder = useSelector((state: RootState) => state.laptopOrder);
  return (
    <main className="flex items-center justify-center w-full">
      <Card className="w-full transition-all duration-300 md:w-3/4 ">
        <CardHeader className="flex items-center ">
          <CardTitle className="relative text-5xl font-black transition-all duration-300 md:text-7xl">
            <span className="relative z-10">CONFRIM</span>
            <span className="absolute top-0 left-0 opacity-75 blur-2xl animate-pulse">
              CONFRIM
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative flex flex-col items-center py-12 transition-all duration-300 md:py-24">
          {JSON.stringify(laptopOrder, null, "\t")}
        </CardContent>
      </Card>
    </main>
  );
};

export default ConfirmPage;
