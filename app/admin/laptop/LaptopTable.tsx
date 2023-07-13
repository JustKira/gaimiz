import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAllCompaniesQuery,
  useGetAllModelsQuery,
} from "@/lib/redux/rtkapi/adminApi";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const LaptopTable = () => {
  const allCompanyRes = useGetAllCompaniesQuery();
  const [cid, setCid] = React.useState<string>("");

  const allCompanyModelRes = useGetAllModelsQuery(
    { cid: cid },
    { skip: cid == "" }
  );

  return (
    <Card>
      <CardHeader>
        <Select onValueChange={(v) => setCid(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Company" />
          </SelectTrigger>
          <SelectContent>
            {allCompanyRes.data?.data.map((comapny, id) => (
              <SelectItem key={id} value={comapny.docid}>
                {comapny.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Years</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {allCompanyModelRes.data?.data.map((model, id) => (
                <>
                  <TableCell>{model.name}</TableCell>
                  <TableCell>{model.years}</TableCell>
                </>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LaptopTable;
