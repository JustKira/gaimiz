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
import React, { useEffect } from "react";
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
} from "@/lib/redux/rtkapi/gaimizApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyCid,
  setSplit1,
  setYears,
} from "@/lib/redux/slices/laptopOrderSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";
import { Input } from "@/components/ui/input";
import { getYearsArrayFrom1950 } from "../../../../lib/helpers";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      model: "",
      year: "",
    },
  });
  const years = getYearsArrayFrom1950();

  const [newCompany, setNewCompany] = React.useState<boolean>(false);

  const allCompanyRes = useGetAllCompaniesQuery();

  const dispatch = useDispatch();
  const LaptopOrder = useSelector((state: RootState) => state.laptopOrder);
  const router = useRouter();
  const onSubmit = form.handleSubmit((data) => {
    dispatch(
      setSplit1({
        ...data,
        year: Number(data.year),
        verified: false,
        newcompany: newCompany,
      })
    );
    router.push("/order/laptop/config");
  });

  useEffect(() => {
    if (LaptopOrder.company !== "") {
      form.setValue("company", LaptopOrder.company);
    }
    if (LaptopOrder.model !== "") {
      form.setValue("model", LaptopOrder.model);
    }
    if (LaptopOrder.year) {
      form.setValue("year", LaptopOrder.year.toString());
    }
    if (LaptopOrder.newcompany) {
      setNewCompany(LaptopOrder.newcompany);
    }
  }, []);

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
            <form onSubmit={onSubmit} className="space-y-8 w-[300px]">
              {newCompany ? (
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Type the name of the Company
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <>
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
                              <CommandEmpty>
                                No Laptop Company found.
                              </CommandEmpty>
                              <CommandGroup>
                                {allCompanyRes.data?.data.map((company) => (
                                  <CommandItem
                                    value={company.name}
                                    key={company.docid}
                                    onSelect={(value: string) => {
                                      const compnay =
                                        allCompanyRes.data?.data.find(
                                          (company) =>
                                            company.name.toLowerCase() ===
                                            value.toLowerCase()
                                        );

                                      if (compnay) {
                                        dispatch(setCompanyCid(company.docid));
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
                </>
              )}
              <div className="flex items-center gap-4 ">
                <Switch
                  checked={newCompany}
                  onCheckedChange={(value) => {
                    setNewCompany(value);
                    form.resetField("company");
                  }}
                />
                <h1 className="text-xs font-light">
                  can not find company click here
                </h1>
              </div>
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="ideapad-xxx" {...field} />
                    </FormControl>
                    <FormDescription>name of laptop model</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={form.getValues("year")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="YYYY" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px]">
                        {years?.map((year) => (
                          <SelectItem value={year.toString()} key={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col">
                <Button className="w-full">Next</Button>
                <Link href={"/order/laptop"}>
                  <Button variant={"link"}>
                    {"Check if your laptop is inside list"}
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

export default LaptopOrderPage;
