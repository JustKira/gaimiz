"use client";
import React from "react";
import { Laptop2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GaimizLoading } from "@/components/ui/loading";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/provider/authProvider";
function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading, claims } = useAuth();

  const _claims = claims as any;
  if (loading) {
    return <GaimizLoading />;
  }

  if (!user?.uid) {
    router.push("/signin");

    return <>Redirecting...</>;
  }
  if (!_claims.ADMIN) {
    router.push("/");
    return <>Redirecting...</>;
  }

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
export default Layout;
