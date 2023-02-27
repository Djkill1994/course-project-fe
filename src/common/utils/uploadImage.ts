export const uploadImage = async (file?: File): Promise<string> => {
  if (!file) return "";
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

  return url;
};
// todo delete ??
