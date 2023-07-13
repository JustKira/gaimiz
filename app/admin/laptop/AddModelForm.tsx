"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateModelMutation,
  useGetAllCompaniesQuery,
  useGetAllModelsQuery,
} from "@/lib/redux/rtkapi/adminApi";
import { useToast } from "@/components/ui/use-toast";
const formSchema = z.object({
  companyId: z.string(),
  name: z.string().min(2, {
    message: "Model name must be at least 2 characters.",
  }),
  years: z.string().regex(/^(\d{4}\/)+\d{4}$/, {
    message:
      "Invalid model year. Please enter a valid 4-digit year or a series of 4-digit years separated by '/'",
  }),
});

export function AddModel() {
  const { toast } = useToast();
  const allCompanyRes = useGetAllCompaniesQuery();
  const [createModel, createModelRes] = useCreateModelMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyId: "",
      name: "",
      years: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    const yearsArray = Array.from(new Set(data.years.split("/").map(Number)));

    createModel({
      cid: data.companyId,
      createValues: { name: data.name, years: yearsArray },
    });

    if (createModelRes.isError) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    return toast({
      title: "Model created",
      description: "model have been added to model list",
    });
  });

  // Fake API response for companies

  if (allCompanyRes.isError || !allCompanyRes.data) {
    return <>error</>;
  }
  if (allCompanyRes.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Model</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Model</DialogTitle>
          <DialogDescription>
            You must select a company before adding a laptop model.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        {allCompanyRes.data?.data?.map((company, id) => (
                          <SelectItem key={id} value={company.docid}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select the company for the model.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter model name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the model.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="years"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter model year (e.g., 2023)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the year of the model (4-digit year).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
