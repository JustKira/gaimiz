"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { laptopModels } from "@/app/tempdata";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useGetAllCompaniesQuery,
  useLazyGetAllModelsQuery,
} from "@/lib/redux/rtkapi/adminApi";
import { useDispatch } from "react-redux";
import { setSplit1 } from "@/lib/redux/slices/laptopOrderSlice";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  company: z
    .string({ required_error: "please select a company" })
    .min(2, "please select a company"),
  model: z
    .string({ required_error: "please select a model" })
    .min(2, "please select a model"),
  year: z
    .string({ required_error: "please select a year" })
    .min(2, "please select a year"),
});

function LaptopOrderPage() {
  // const companyNames = Array.from(
  //   new Set(laptopModels.map((model) => model.company))
  // );
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      model: "",
      year: "",
    },
  });

  // const [cid, setCid] = React.useState<string>("");
  const allCompanyRes = useGetAllCompaniesQuery();
  const [model, setModel] = useState<Model | null>(null);
  const [getAllCompanyModels, allCompanyModelRes] = useLazyGetAllModelsQuery();
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = form.handleSubmit((data) => {
    dispatch(setSplit1({ ...data, year: Number(data.year), verified: true }));
    router.push("/order/laptop/config");
  });

  return (
    <main className="flex items-center justify-center w-full">
      <Card className="w-full transition-all duration-300 md:w-3/4 ">
        <CardHeader className="flex items-center ">
          <CardTitle className="relative text-5xl font-black transition-all duration-300 md:text-7xl">
            <span className="relative z-10">LAPTOP</span>
            <span className="absolute top-0 left-0 opacity-75 blur-2xl animate-pulse">
              LAPTOP
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative flex flex-col items-center py-12 transition-all duration-300 md:py-24">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Company</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[300px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              <>
                                {
                                  allCompanyRes.data?.data.find(
                                    (company) =>
                                      company.name.toLowerCase() ===
                                      field.value.toLowerCase()
                                  )?.name
                                }
                              </>
                            ) : (
                              "Select Company"
                            )}
                            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="Search comapny..." />
                          <CommandEmpty>No Laptop Company found.</CommandEmpty>
                          <CommandGroup>
                            {allCompanyRes.data?.data.map((company) => (
                              <CommandItem
                                value={company.name}
                                key={company.docid}
                                onSelect={(value: string) => {
                                  const compnay = allCompanyRes.data?.data.find(
                                    (company) =>
                                      company.name.toLowerCase() ===
                                      value.toLowerCase()
                                  );

                                  if (compnay) {
                                    getAllCompanyModels({ cid: compnay.docid });
                                    form.reset();
                                    form.setValue("company", compnay.name);
                                  }
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    company.docid === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {company.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select the Company</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Model</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={form.getValues("company") === ""}
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[300px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              <>
                                {
                                  allCompanyModelRes.data?.data.find(
                                    (model) =>
                                      model.name.toLowerCase() ===
                                      field.value.toLowerCase()
                                  )?.name
                                }
                              </>
                            ) : (
                              "Select Model"
                            )}
                            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="Search framework..." />
                          <CommandEmpty>No Laptop Company found.</CommandEmpty>
                          <CommandGroup>
                            {allCompanyModelRes.isLoading ? (
                              <CommandItem>Loading...</CommandItem>
                            ) : (
                              <>
                                {allCompanyModelRes.data?.data.map((model) => (
                                  <CommandItem
                                    value={model.name}
                                    key={model.docid}
                                    onSelect={(value: string) => {
                                      setModel(model);
                                      form.setValue("model", value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        model.name.toLowerCase() ===
                                          field.value.toLowerCase()
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {model.name}
                                  </CommandItem>
                                ))}
                              </>
                            )}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select the model.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Year</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={form.getValues("model") === ""}
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[300px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              <>
                                {model?.years.find(
                                  (year) => year.toString() === field.value
                                )}
                              </>
                            ) : (
                              "Select Year"
                            )}
                            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="Search framework..." />
                          <CommandEmpty>No Laptop Company found.</CommandEmpty>
                          <CommandGroup>
                            {allCompanyModelRes.isLoading ? (
                              <CommandItem>Loading...</CommandItem>
                            ) : (
                              <>
                                {model?.years.map((year) => (
                                  <CommandItem
                                    value={year.toString()}
                                    key={year}
                                    onSelect={(value: string) => {
                                      form.setValue("year", value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        year.toString() === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {year}
                                  </CommandItem>
                                ))}
                              </>
                            )}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select the model Year.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col">
                <Button className="w-full">Next</Button>
                <Button variant={"link"}>{"Can't find your model"}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

export default LaptopOrderPage;
{
  /* <Select onValueChange={field.onChange} defaultValue={field.value}>
  <SelectTrigger>
    <SelectValue placeholder="Select a company" />
  </SelectTrigger>
  <SelectContent>
    {companyNames.map((company) => (
      <SelectItem key={company} value={company}>
        {company}
      </SelectItem>
    ))}
  </SelectContent>
</Select>; */
}
