import React from "react";
import { Laptop2 } from "lucide-react";
import { Card } from "@/components/ui/card";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full gap-2">
      <Card className="h-fit">
        <nav className="flex flex-col items-center w-10 p-2">
          <Laptop2 />
        </nav>
      </Card>
      <Card className="flex-grow">{children}</Card>
    </div>
  );
}

export default layout;
