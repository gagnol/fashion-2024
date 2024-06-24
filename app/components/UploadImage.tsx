"use client"
import { Button } from "@radix-ui/themes";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { FaPlus, FaTrash } from "react-icons/fa";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button type="button" onClick={() => onRemove(url)} size="3" className="bg-red-1 text-white">
                <FaTrash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>

      <CldUploadWidget uploadPreset="dps8xubee" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button type="button" onClick={() => open()} className="bg-grey-1 text-white">
              <FaPlus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;