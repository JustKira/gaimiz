"use client";
import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cross, Delete, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Resizer from "react-image-file-resizer";
import { firebase_storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useCreateDesignMutation } from "@/lib/redux/rtkapi/adminApi";
function arrayToFileList(array: File[]): FileList {
  const dataList = new DataTransfer();
  array.forEach((file) => {
    dataList.items.add(file);
  });
  return dataList.files;
}

function AddDesigns(): JSX.Element {
  const [images, setImages] = useState<FileList | undefined>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [createDesign, createDesignQuery] = useCreateDesignMutation();
  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        225,
        "WEBP",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  const uploadImages = async () => {
    if (!images) return;

    setUploading(true);
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(firebase_storage, `gd/${images[i].name}`);

      const cleanedImage: any = await resizeFile(images[i]);

      const result = await uploadString(
        imageRef,
        cleanedImage,
        "data_url"
      ).catch((error) => {
        throw Error("Something went wronge while uploading");
      });
      const downloadPath = await getDownloadURL(result.ref);
      createDesign({ downloadPath: downloadPath, name: result.ref.name });
    }
    setImages(undefined);
    setUploading(false);
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
          <Button
            disabled={uploading}
            type="button"
            onClick={() => {
              uploadImages();
            }}
          >
            {uploading ? <Loader2 className="animate-spin" /> : ""}Upload
          </Button>
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
