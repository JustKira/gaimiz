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
} from "@/lib/redux/rtkapi/adminApi";

const formSchema = z.object({
  company: z.string({ required_error: "please select a company" }),
  model: z.string({ required_error: "please select a model" }),
  year: z.string({ required_error: "please select a year" }),
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

  const [getAllCompanyModels, allCompanyModelRes] = useLazyGetAllModelsQuery();

  const ConsoleLog = (log: any) => {
    return <></>;
  };

  return (
    <main className="flex items-center justify-center w-full">
      <Card className="w-3/4 ">
        <CardHeader className="flex items-center ">
          <CardTitle className="relative font-black text-7xl">
            <span className="relative z-10">LAPTOP</span>
            <span className="absolute top-0 left-0 opacity-75 blur-2xl animate-pulse">
              LAPTOP
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative flex flex-col items-center">
          <Form {...form}>
            <form onSubmit={() => {}} className="space-y-8">
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
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              <>
                                <ConsoleLog
                                  log={
                                    (allCompanyRes.data?.data[0], field.value)
                                  }
                                />
                                {
                                  allCompanyRes.data?.data.find(
                                    (company) =>
                                      company.docid.toLowerCase() ===
                                      field.value.toLowerCase()
                                  )?.name
                                }
                              </>
                            ) : (
                              "Select language"
                            )}
                            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search framework..." />
                          <CommandEmpty>No Laptop Company found.</CommandEmpty>
                          <CommandGroup>
                            {allCompanyRes.data?.data.map((company) => (
                              <CommandItem
                                value={company.docid}
                                key={company.docid}
                                onSelect={(value: string) => {
                                  const _cid = allCompanyRes.data?.data.find(
                                    (company) =>
                                      company.docid.toLowerCase() ===
                                      value.toLowerCase()
                                  )?.docid;
                                  console.log(_cid);
                                  if (_cid) {
                                    getAllCompanyModels({ cid: _cid });
                                    form.setValue("company", _cid);
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
                    <FormDescription>
                      Select the company for the model.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
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
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              <>
                                {
                                  allCompanyModelRes.data?.data.find(
                                    (model) =>
                                      model.docid.toLowerCase() ===
                                      field.value.toLowerCase()
                                  )?.name
                                }
                              </>
                            ) : (
                              "Select language"
                            )}
                            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
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
                                    value={model.docid}
                                    key={model.docid}
                                    onSelect={(value: string) => {
                                      form.setValue("model", value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        model.docid === field.value
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
                    <FormDescription>
                      Select the company for the model.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
