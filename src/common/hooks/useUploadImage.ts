import { useState } from "react";

export const useUploadImage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const uploadImage = async (file?: File): Promise<void> => {
    if (!file) return;
    setIsLoading(true);
    const img = new FormData();
    img.append("file", file);
    img.append("upload_preset", "course-prt");
    img.append("cloud_name", "djkill");
    const { url } = await fetch(
      "https://api.cloudinary.com/v1_1/djkill/image/upload",
      {
        method: "post",
        body: img,
      }
    ).then((resp) => resp.json());
    setIsLoading(false);
    setUrl(url);
  };
  return { isLoading, url, uploadImage };
};
