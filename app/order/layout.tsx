"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { GaimizLoading } from "@/components/ui/loading";
import { useAuth } from "@/lib/provider/authProvider";
import { useGetProfileQuery } from "@/lib/redux/rtkapi/profileApi";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  const skipCondition = user ? false : true;
  const { data, isLoading, isError } = useGetProfileQuery(
    user?.uid ? user.uid : "",
    {
      skip: skipCondition,
    }
  );
  if (loading || isLoading) {
    return <GaimizLoading />;
  }

  if (!user) {
    router.push("/auth/signin");
  }

  if (isError || data?.firstname) {
    if (data?.firstname) {
      router.push("/profile/create");
    } else {
      router.push("/");
    }
    return <>Redirecting...</>;
  }
  return <>{children}</>;
};

export default Layout;
