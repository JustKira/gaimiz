"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Gallary from "@/components/Gallary";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setSplit2 } from "@/lib/redux/slices/laptopOrderSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";
const formSchema = z.object({
  back: z.boolean().refine((value) => value === true, {
    message: "Back must be set to true",
  }),
  front: z.boolean().refine((value) => value === true, {
    message: "Front must be set to true",
  }),
  backDesign: z.string(),

  frontDesign: z.string(),
  withLogo: z.boolean(),
});
const LaptopConfigPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      back: false,
      front: false,
      backDesign: "",
      frontDesign: "",
      withLogo: true,
    },
  });

  const [backD, setBackD] = useState<string>();
  const [backDUrl, setBackDUrl] = useState<string | null>();
  const [frontD, setFrontD] = useState<string>();
  const [frontDUrl, setFrontDUrl] = useState<string | null>();
  const router = useRouter();
  const dispatch = useDispatch();

  const laptopOrder = useSelector((state: RootState) => state.laptopOrder);
  const onSubmit = form.handleSubmit((data) => {
    dispatch(setSplit2(data));
    if (laptopOrder.verified) {
      router.push("/order/laptop/confirm");
    } else {
      router.push("/order/laptop/upload");
    }
  });

  React.useEffect(() => {
    if (laptopOrder.back !== undefined) {
      form.setValue("back", laptopOrder.back);
    }
    if (laptopOrder.backDesign) {
      form.setValue("backDesign", laptopOrder.backDesign);
    }
    if (laptopOrder.front !== undefined) {
      form.setValue("front", laptopOrder.front);
    }
    if (laptopOrder.frontDesign) {
      form.setValue("frontDesign", laptopOrder.frontDesign);
    }
    if (laptopOrder.withLogo !== undefined) {
      form.setValue("withLogo", laptopOrder.withLogo);
    }
  }, []);

  return (
    <main className="flex items-center justify-center w-full">
      <Card className="w-full transition-all duration-300 md:w-3/4 ">
        <CardHeader className="flex items-center ">
          <CardTitle className="relative text-5xl font-black transition-all duration-300 md:text-7xl">
            <span className="relative z-10">CONFIG</span>
            <span className="absolute top-0 left-0 opacity-75 blur-2xl animate-pulse">
              CONFIG
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative flex flex-col items-center py-12 transition-all duration-300 md:py-24">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="back"
                  render={({ field }) => (
                    <FormItem className="relative z-30 flex flex-row items-center justify-between p-4 border rounded-lg bg-background">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Back part</FormLabel>
                        <FormDescription className="mr-4">
                          add skin to back of your laptop screen
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button
                      type="button"
                      disabled={!form.getValues("back")}
                      className={`${
                        form.getValues("back")
                          ? "-translate-y-1/3"
                          : "-translate-y-full"
                      } relative transition-all rounded-t-none z-10 duration-500 w-full`}
                    >
                      Select Design
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <Gallary
                      selectedName={backD}
                      onImgClick={(image) => {
                        form.setValue("backDesign", image.name);
                        setBackD(image.name);
                        setBackDUrl(image.downloadPath);
                      }}
                    />
                  </DialogContent>
                </Dialog>

                {form.getValues("back") && backDUrl ? (
                  <div className="relative transition-all duration-300 group">
                    <h1 className="absolute z-50 text-3xl font-black text-white uppercase duration-300 -translate-x-1/2 -translate-y-1/2 opacity-100 group-hover:opacity-0 top-1/2 left-1/2">
                      Selected
                    </h1>
                    <img
                      alt=""
                      className="duration-300 brightness-50 group-hover:brightness-100"
                      src={backDUrl}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>{" "}
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="front"
                  render={({ field }) => (
                    <FormItem className="relative z-30 flex flex-row items-center justify-between p-4 border rounded-lg bg-background">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Front part</FormLabel>
                        <FormDescription>
                          add skin to your keyboard
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button
                      type="button"
                      disabled={!form.getValues("front")}
                      className={`${
                        form.getValues("front")
                          ? "-translate-y-1/3"
                          : "-translate-y-full"
                      } relative transition-all rounded-t-none z-10 duration-500 w-full`}
                    >
                      Select Design
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <Gallary
                      selectedName={frontD}
                      onImgClick={(image) => {
                        form.setValue("frontDesign", image.name);
                        setFrontD(image.name);
                        setFrontDUrl(image.downloadPath);
                      }}
                    />
                  </DialogContent>
                </Dialog>

                {form.getValues("front") && frontDUrl ? (
                  <div className="relative transition-all duration-300 group">
                    <h1 className="absolute z-50 text-3xl font-black text-white uppercase duration-300 -translate-x-1/2 -translate-y-1/2 opacity-100 group-hover:opacity-0 top-1/2 left-1/2">
                      Selected
                    </h1>
                    <img
                      alt=""
                      className="duration-300 brightness-50 group-hover:brightness-100"
                      src={frontDUrl}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <FormField
                control={form.control}
                name="withLogo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">With Logo</FormLabel>
                      <FormDescription>
                        Gaimiz Logo added to design
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                {laptopOrder.verified ? (
                  <Link href={"/order/laptop"}>
                    <Button type="button" className="w-full">
                      Back
                    </Button>
                  </Link>
                ) : (
                  <Link href={"/order/laptop/new"}>
                    <Button type="button" className="w-full">
                      Back
                    </Button>
                  </Link>
                )}

                <Button>Next</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default LaptopConfigPage;
