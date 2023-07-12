"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useCreateProfileMutation } from "@/lib/redux/rtkapi/profileApi";
import { useAuth } from "@/lib/provider/authProvider";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  phoneNumber: z.string(),
  dateOfBirth: z.date(),
  city: z.string().refine((value) => isArabicInput(value), {
    message: "City should be in Arabic",
    path: ["city"],
  }),
  area: z.string().refine((value) => isArabicInput(value), {
    message: "Area should be in Arabic",
    path: ["area"],
  }),
  streetname: z.string().refine((value) => isArabicInput(value), {
    message: "Street name should be in Arabic",
    path: ["streetname"],
  }),
  building: z.string().refine((value) => isArabicInput(value), {
    message: "Building should be in Arabic",
    path: ["building"],
  }),
});

function isArabicInput(value: string): boolean {
  // Regular expression pattern to match Arabic characters
  const arabicPattern =
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFBC1\uFE70-\uFEFF]/;

  // Test if the value contains Arabic characters
  return arabicPattern.test(value);
}
const CreateProfilePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const { user, loading } = useAuth();
  const router = useRouter();
  const [createProfile, { isError, isLoading, isSuccess, error }] =
    useCreateProfileMutation();
  const { toast } = useToast();
  const [next, setNext] = useState<boolean>(false);

  if (loading) {
    return <div>Loading...</div>;
  }
  const onSumbit = form.handleSubmit(async (data) => {
    if (user) {
      await createProfile({ uid: user.uid, updateValues: data });

      if (isError) {
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }

      return toast({
        title: "Profile created",
        description: "Now you can make Order navgiate to order page",
        action: (
          <ToastAction
            onClick={() => router.push("/")}
            altText="Try again"
            className="whitespace-nowrap"
          >
            Let&apos;s go
          </ToastAction>
        ),
      });
    }
  });
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="w-[400px] h-fit transition-all duration-300 ">
        <CardHeader>
          <CardTitle
            className={`${
              next
                ? "h-0 opacity-0 translate-x-1/2 -z-50"
                : "block translate-x-0"
            } flex flex-col space-y-2 transition-all duration-300 delay-150`}
          >
            Profile
          </CardTitle>
          <div
            className={`${
              !next
                ? "h-0 opacity-0 translate-x-1/2 -z-50"
                : "block translate-x-0"
            } flex flex-col space-y-2 transition-all duration-300 delay-150`}
          >
            <CardTitle>Location</CardTitle>
            <CardDescription>location must be in arabic</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSumbit} className="flex flex-col">
              <section className={next ? "opacity-0" : ""}>
                <div
                  className={`${
                    next
                      ? "h-0 opacity-0 translate-x-1/2 -z-50"
                      : "block translate-x-0"
                  } flex flex-col space-y-2 transition-all duration-300`}
                >
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input placeholder="..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input placeholder="..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="something cool" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (date) {
                                  field.onChange(date);
                                }
                              }}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Your date of birth is used to calculate your age.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    onClick={() => setNext(true)}
                    className="mt-4"
                  >
                    Next
                  </Button>
                </div>
              </section>
              <section className={!next ? "opacity-0" : ""}>
                <div
                  className={`${
                    !next
                      ? "h-0 opacity-0 translate-x-1/2 -z-50"
                      : "block translate-x-0"
                  } flex flex-col space-y-2 transition-all duration-300`}
                >
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area</FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="streetname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Name</FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="building"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Building</FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between gap-4 mt-4">
                    <Button
                      className="w-1/2"
                      type="button"
                      variant={"outline"}
                      onClick={() => setNext(false)}
                    >
                      Back
                    </Button>{" "}
                    <Button
                      disabled={isLoading}
                      className="w-1/2"
                      type="submit"
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : <></>}
                      Submit
                    </Button>
                  </div>
                </div>
              </section>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProfilePage;
