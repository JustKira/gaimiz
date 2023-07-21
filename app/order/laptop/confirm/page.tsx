"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateLaptopOrderMutation } from "@/lib/redux/rtkapi/gaimizApi";
import { RootState } from "@/lib/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const ConfirmPage = () => {
  const laptopOrder = useSelector((state: RootState) => state.laptopOrder);
  const [updateLaptopOrder, updateLaptopOrderQuery] =
    useUpdateLaptopOrderMutation();
  const { toast } = useToast();
  const router = useRouter();
  React.useEffect(() => {
    if (!laptopOrder.company) {
      if (laptopOrder.verified) {
        return router.push("/order/laptop");
      } else {
        return router.push("/order/laptop/new");
      }
    }
    if (!laptopOrder.back && !laptopOrder.front) {
      return router.push("/order/laptop/config");
    }
    if (
      !laptopOrder.verified &&
      (!laptopOrder.laptopBackImg || !laptopOrder.laptopFrontImg)
    ) {
      return router.push("/order/laptop/upload");
    }
  }, []);
  return (
    <main className="flex items-center justify-center w-full">
      <Card className="w-full transition-all duration-300 lg:w-[900px] ">
        <CardHeader className="flex items-center ">
          <CardTitle className="relative text-5xl font-black transition-all duration-300 md:text-7xl">
            <span className="relative z-10">CONFRIM</span>
            <span className="absolute top-0 left-0 opacity-75 blur-2xl animate-pulse">
              CONFRIM
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative flex flex-col items-center py-12 space-y-2 transition-all duration-300 md:py-24">
          <div className="flex flex-col gap-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Laptop Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h1 className="flex flex-col gap-1 font-medium">
                  Company
                  <span className="font-light">{laptopOrder.company}</span>
                </h1>
                <h1 className="flex flex-col gap-1 font-medium">
                  Model <span className="font-light"> {laptopOrder.model}</span>
                </h1>
                <h1 className="flex flex-col gap-1 font-medium">
                  Year
                  <span className="font-light">
                    {laptopOrder.year?.toString()}
                  </span>
                </h1>
                <h1 className="flex flex-col gap-1 font-medium">
                  WithLogo
                  <span className="font-light">{`${laptopOrder.withLogo}`}</span>
                </h1>
              </CardContent>
            </Card>
            {laptopOrder.back && laptopOrder.backDesignDownUrl ? (
              <>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Back Design</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <img
                      alt=""
                      className="rounded-md"
                      src={laptopOrder.backDesignDownUrl}
                    />
                  </CardContent>
                </Card>
              </>
            ) : (
              <></>
            )}
            {laptopOrder.front && laptopOrder.frontDesignDownUrl ? (
              <>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Front Design</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <img
                      alt=""
                      className="rounded-md"
                      src={laptopOrder.frontDesignDownUrl}
                    />
                  </CardContent>
                </Card>
              </>
            ) : (
              <></>
            )}
            {laptopOrder.front && laptopOrder.frontDesignDownUrl ? (
              <>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Front Design</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <img
                      alt=""
                      className="rounded-md"
                      src={laptopOrder.frontDesignDownUrl}
                    />
                  </CardContent>
                </Card>
              </>
            ) : (
              <></>
            )}
            {laptopOrder.laptopFrontImg ? (
              <>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Laptop Front Image</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <img
                      alt=""
                      className="rounded-md"
                      src={laptopOrder.laptopFrontImg}
                    />
                  </CardContent>
                </Card>
              </>
            ) : (
              <></>
            )}
            {laptopOrder.laptopBackImg ? (
              <>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Laptop Back Image</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <img
                      alt=""
                      className="rounded-md"
                      src={laptopOrder.laptopBackImg}
                    />
                  </CardContent>
                </Card>
              </>
            ) : (
              <></>
            )}
          </div>

          <Button
            disabled={updateLaptopOrderQuery.isLoading}
            onClick={async () => {
              await updateLaptopOrder({
                did: laptopOrder.docid,
                body: {
                  company: laptopOrder.company,
                  back: laptopOrder.back,
                  backDesign: laptopOrder.backDesign,
                  front: laptopOrder.front,
                  frontDesign: laptopOrder.frontDesign,
                  laptopBackImg: laptopOrder.laptopBackImg,
                  laptopFrontImg: laptopOrder.laptopFrontImg,
                  withLogo: laptopOrder.withLogo,
                  temp: false,
                  verified: laptopOrder.verified,
                  model: laptopOrder.model,
                  year: laptopOrder.year,
                },
              });

              if (updateLaptopOrderQuery.error) {
                return toast({
                  variant: "destructive",
                  title: "Error",
                  description: "Something went wronge",
                });
              } else {
                return toast({
                  title: "Order Confirmed",
                  action: (
                    <ToastAction
                      altText="Check Orders"
                      onClick={() => router.push("/order/history")}
                    >
                      Check Orders
                    </ToastAction>
                  ),
                });
              }
            }}
          >
            Confirm Order
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default ConfirmPage;
