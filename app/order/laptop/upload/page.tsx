"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { firebase_storage } from "@/lib/firebase";
import { useAuth } from "@/lib/provider/authProvider";
import {
  useLazyGetCurrentLaptopOrderQuery,
  useUpdateLaptopOrderMutation,
} from "@/lib/redux/rtkapi/gaimizApi";
import { setSplit3 } from "@/lib/redux/slices/laptopOrderSlice";
import { RootState } from "@/lib/redux/store";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import { BrowserView } from "react-device-detect";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { GaimizLoading } from "@/components/ui/loading";
import Link from "next/link";

const LaptopOrderImageUpload = () => {
  const [frontFile, setFrontFile] = React.useState<File | null>(null);
  const [backFile, setBackFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState<boolean>(false);
  const { user, loading } = useAuth();
  const laptopOrder = useSelector((state: RootState) => state.laptopOrder);
  const [updateLaptopOrder, updateLaptopOrderQuery] =
    useUpdateLaptopOrderMutation();
  const dispatch = useDispatch();
  const [getCurrentLaptop, { data, isLoading }] =
    useLazyGetCurrentLaptopOrderQuery();

  React.useEffect(() => {
    if (!loading && user?.uid) {
      getCurrentLaptop(user.uid);
    }
  }, [loading]);

  React.useEffect(() => {
    if (data?.data.laptopBackImg && data?.data.laptopFrontImg) {
      dispatch(
        setSplit3({
          laptopBackImg: data?.data.laptopBackImg,
          laptopFrontImg: data?.data.laptopFrontImg,
        })
      );
    }
  }, [data]);
  const handleFrontFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    setFrontFile(selectedFile || null);
  };

  const handleBackFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setBackFile(selectedFile || null);
  };
  if (loading) {
    return <GaimizLoading />;
  }

  const reload = async () => {
    if (!loading && user?.uid) {
      await getCurrentLaptop(user.uid);
    }
  };

  const uploadImages = async () => {
    setUploading(true);
    if (frontFile && backFile && user?.uid) {
      const frontFileRef = ref(
        firebase_storage,
        `orders/temp/${user.uid}/${laptopOrder.docid}/frontimage.${frontFile.type}`
      );
      const backFileRef = ref(
        firebase_storage,
        `orders/temp/${user.uid}/${laptopOrder.docid}/backimage.${frontFile.type}`
      );
      let lfdownloadurl: string = "";
      let lbdownloadurl: string = "";

      await uploadBytes(frontFileRef, frontFile).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then((downloadURL) => {
          lfdownloadurl = downloadURL.toString();
        });
      });
      await uploadBytes(backFileRef, backFile).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then((downloadURL) => {
          lbdownloadurl = downloadURL.toString();
        });
      });
      dispatch(
        setSplit3({
          laptopBackImg: lbdownloadurl,
          laptopFrontImg: lfdownloadurl,
        })
      );
      await updateLaptopOrder({
        did: laptopOrder.docid,
        body: { laptopBackImg: lbdownloadurl, laptopFrontImg: lfdownloadurl },
      });
    }
    setUploading(false);
  };

  return (
    <main className="flex items-center justify-center w-full">
      <Card className="w-full transition-all duration-300 md:w-[500px] ">
        <CardHeader className="flex items-center ">
          <CardTitle className="relative text-5xl font-black transition-all duration-300 md:text-7xl">
            <span className="relative z-10">CONFRIM</span>
            <span className="absolute top-0 left-0 opacity-75 blur-2xl animate-pulse">
              CONFRIM
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative flex flex-col items-center justify-center py-12 space-y-8 transition-all duration-300 md:py-24 ">
          <BrowserView>
            <div className="flex flex-col items-center">
              <h1 className="uppercase">Scan To upload from mobile</h1>
              <div className="p-4 bg-white rounded-sm w-fit h-fit">
                <QRCode
                  className="w-[200px] h-[200px]"
                  value={`${window.origin}/order/laptop/upload/mobile/${laptopOrder.docid}`}
                />
              </div>
            </div>
          </BrowserView>
          <div className="flex flex-col gap-4">
            <Label>Front Upload</Label>
            <Input
              accept="image/*"
              className="max-w-[300px]"
              type="file"
              onChange={handleFrontFileChange}
            />
          </div>
          {laptopOrder.laptopFrontImg ? (
            <img alt="" src={laptopOrder.laptopFrontImg} />
          ) : (
            <></>
          )}
          <div className="flex flex-col gap-4">
            <Label>Back Upload</Label>
            <Input
              accept="image/*"
              className="max-w-[300px]"
              type="file"
              onChange={handleBackFileChange}
            />
          </div>{" "}
          {laptopOrder.laptopBackImg ? (
            <img alt="" src={laptopOrder.laptopBackImg} />
          ) : (
            <></>
          )}
          <div className="flex gap-2">
            <Button
              disabled={uploading}
              onClick={() => {
                uploadImages();
              }}
            >
              Confirm
            </Button>
            <Button
              onClick={() => {
                reload();
              }}
            >
              Reload
            </Button>
            <Link href={"/order/laptop/confirm"}>
              <Button type="button" className="w-full">
                Next
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
export default LaptopOrderImageUpload;
