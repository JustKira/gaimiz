import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

export const LaptopColumns: ColumnDef<Model>[] = [
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "name",
    header: "Model",
  },
  {
    accessorKey: "years",
    header: "Years",
    cell: ({ getValue }) => {
      const years = getValue() as number[];

      return (
        <div className="flex gap-1">
          {years.map((v, id) => (
            <Badge key={id}>{v}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "verified",
    header: "Verified",
  },
];
