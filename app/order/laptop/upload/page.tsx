"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/lib/redux/store";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BrowserView } from "react-device-detect";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";

const LaptopOrderImageUpload = () => {
  const pathname = usePathname();

  const laptopOrder = useSelector((state: RootState) => state.laptopOrder);
  return (
    <main className="flex items-center justify-center w-full">
      <Card className="w-full transition-all duration-300 md:w-[500px] ">
        <CardHeader className="flex items-center ">
          <CardTitle className="relative text-5xl font-black transition-all duration-300 md:text-7xl">
            <span className="relative z-10">CONFRIM</span>
            <span className="absolute top-0 left-0 opacity-75 blur-2xl animate-pulse">
              CONFRIM
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative flex flex-col items-center justify-center py-12 space-y-8 transition-all duration-300 md:py-24 ">
          <BrowserView>
            <div className="flex flex-col items-center">
              <h1 className="uppercase">Scan To upload from mobile</h1>
              <div className="p-4 bg-white rounded-sm w-fit h-fit">
                <QRCode
                  className="w-[200px] h-[200px]"
                  value={`${window.origin}/order/upload/remote/${laptopOrder.docid}`}
                />
              </div>
            </div>
          </BrowserView>
          <div className="flex flex-col gap-4">
            <Label>Upload</Label>
            <Input className="max-w-[300px]" type="file" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
export default LaptopOrderImageUpload;
