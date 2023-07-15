"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
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
            <form onSubmit={() => {}} className="space-y-8">
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
                <Button
                  disabled={!form.getValues("back")}
                  className={`${
                    form.getValues("back") ? "" : "-translate-y-full"
                  } relative transition-all z-10 duration-500`}
                >
                  Select Design
                </Button>
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
                <Button
                  disabled={!form.getValues("front")}
                  className={`${
                    form.getValues("front") ? "" : "-translate-y-full"
                  } relative transition-all z-10 duration-500`}
                >
                  Select Design
                </Button>
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default LaptopConfigPage;
