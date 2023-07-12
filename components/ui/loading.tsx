import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "./card";

const GaimizLoading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card>
        <CardHeader className="items-center justify-center ">
          <CardTitle className="text-3xl uppercase animate-pulse">
            gaimiz
          </CardTitle>
          <Loader2 className="animate-spin" />
        </CardHeader>
      </Card>
    </div>
  );
};

export { GaimizLoading };
