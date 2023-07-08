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
const formSchema = z.object({
  companyId: z.number(),
  modelName: z.string().min(2, {
    message: "Model name must be at least 2 characters.",
  }),
  modelYear: z.string().regex(/^\d{4}$/, {
    message: "Invalid model year. Please enter a 4-digit year.",
  }),
});

export function AddModel() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyId: "",
      modelName: "",
      modelYear: "",
    },
  });

  const onSubmit = form.handleSubmit((formValues) => {
    console.log(formValues);
  });

  // Fake API response for companies
  const fetchCompanies = () =>
    Promise.resolve([
      { id: 1, name: "Company 1" },
      { id: 2, name: "Company 2" },
      { id: 3, name: "Company 3" },
    ]);

  const [companies, setCompanies] = React.useState<
    { id: number; name: string }[]
  >([]);

  React.useEffect(() => {
    fetchCompanies().then((data) => {
      setCompanies(data);
    });
  }, []);

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
                        {companies.map((company) => (
                          <SelectItem
                            key={company.id}
                            value={company.id.toString()}
                          >
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
              name="modelName"
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
              name="modelYear"
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
