"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { CompanyForm } from "./CompanyForm";
import { AddModel } from "./AddModelForm";

import { Separator } from "@/components/ui/separator";
import LaptopTable from "./LaptopTable";

function page() {
  return (
    <>
      <CardHeader>
        <CardTitle>Laptop</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex gap-4">
          <CompanyForm />
          <AddModel />
        </div>
        <Separator className="my-4" />
        <LaptopTable />
      </CardContent>
    </>
  );
}

export default page;
