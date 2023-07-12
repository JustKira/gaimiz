"use client";
import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cross, Delete } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function arrayToFileList(array: File[]): FileList {
  const dataList = new DataTransfer();
  array.forEach((file) => {
    dataList.items.add(file);
  });
  return dataList.files;
}

function AddDesigns(): JSX.Element {
  const [images, setImages] = useState<FileList | undefined>();
  const [uploading, setUploading] = useState<boolean>();
  const [imageLoader, setImageLoader] = useState<number>(0);

  const uploadImages = async () => {
    if (!images) return;
    setUploading(true);
    // for (let i = 0; i < images.length; i++) {
    //   const imageRef = ref(
    //     FIREBASE_STORAGE,
    //     `gaimiz_designs/${images[i].name}`
    //   );

    //   const cleanedImage: any = await resizeFile(images[i]);
    //   console.log(cleanedImage);
    //   const result = await uploadString(
    //     imageRef,
    //     cleanedImage,
    //     "data_url"
    //   ).catch((error) => {
    //     throw Error("Something went wronge while uploading");
    //   });
    //   setImageLoader(i + 1);
    // }

    // setUploading(false);
  };

  const removeImage = (index: number): void => {
    const updatedImages = Array.from(images || []);
    updatedImages.splice(index, 1);
    setImages(arrayToFileList(updatedImages));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setImages(arrayToFileList(Array.from(e.target.files)));
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Designs</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center w-full max-w-sm space-x-2">
          <Input
            title="designs upload"
            type="file"
            id="designs"
            multiple
            onChange={handleImageChange}
          />
          <Button type="submit">Upload</Button>
        </div>
        <Separator className="my-4" />
        <div className="w-full transition-all duration-300 columns-3">
          {Array.from(images || []).map((file, id) => (
            <div key={id} className="relative group">
              <Cross
                size={52}
                className="absolute z-50 p-2 transition-all duration-300 rotate-45 -translate-x-1/2 rounded-full opacity-10 top-1/2 left-1/2 bg-background group-hover:opacity-90"
              />
              <img
                alt={file.name}
                src={URL.createObjectURL(file)}
                className="transition-all duration-300 group-hover:saturate-0"
                onClick={() => removeImage(id)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
}

export default AddDesigns;
