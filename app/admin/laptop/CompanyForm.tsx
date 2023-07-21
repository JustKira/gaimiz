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
import { useCreateCompanyMutation } from "@/lib/redux/rtkapi/gaimizApi";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
});

export function CompanyForm() {
  const [createCompany, { isLoading, isError }] = useCreateCompanyMutation();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await createCompany({ name: data.name.toLowerCase(), verified: true });
    if (isError) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    return toast({
      title: "Company created",
      description: "Now you can make Order navgiate to order page",
    });
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Company</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Add Company</DialogTitle>
              <DialogDescription>
                you must create company first before you can add laptop models
                to it
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Lenovo..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of your company.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isLoading} type="submit">
                {isLoading ? <Loader2 className="animate-spin" /> : <></>}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
