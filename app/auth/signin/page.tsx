"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signInWithGoogle } from "@/lib/auth";
import { useAuth } from "@/lib/provider/authProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SignInPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      router.push("/auth/signout");
    }
  }, [loading]);

  if (loading) {
    <div className="items-center justify-center w-full h-screen">
      Loadind...
    </div>;
  }
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card>
        <CardHeader></CardHeader>
        <CardContent className="flex gap-4">
          <div className="min-h-[400px] w-[400px] flex justify-center items-center  bg-dotted-white/50 bg-dotted-spacing-3  transition-all duration-500">
            <div className="flex flex-col items-center justify-center w-full p-8 bg-background">
              <h1 className="text-3xl font-black">GAIMIZ</h1>
              <h1 className="text-xl font-light uppercase">Game With Style</h1>

              <div className="flex flex-col items-center justify-center gap-1 my-4">
                <h1 className="font-light uppercase ">Sign in With</h1>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    signInWithGoogle(() => {
                      console.log("x");
                      router.push("/");
                    });
                  }}
                >
                  Google
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
