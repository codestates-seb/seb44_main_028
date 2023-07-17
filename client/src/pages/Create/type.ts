export type PreImageProps = {
  imageSrc: string;
  ImageId: number;
  handleDeleteImage: (id: number) => void;
};
export type InputFieldData = {
  id: string;
  title: string;
};
export type UploadImagesProps = {
  setUploadImages: React.Dispatch<React.SetStateAction<{ images: File[] }>>;
  showImages: string[];
  setShowImages: React.Dispatch<React.SetStateAction<string[]>>;
};
export type categories = {
  categoryId: string;
  title: string;
  image: string;
};
