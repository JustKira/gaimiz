"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { CompanyForm } from "./CompanyForm";
import { AddModel } from "./AddModelForm";
import { LaptopTable } from "@/components/tables/LaptopTable";
import { LaptopColumns } from "@/components/tables/LaptopColums";
import { laptopModels } from "@/app/tempdata";
import { Separator } from "@/components/ui/separator";

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
        <LaptopTable columns={LaptopColumns} data={laptopModels} />
      </CardContent>
    </>
  );
}

export default page;
