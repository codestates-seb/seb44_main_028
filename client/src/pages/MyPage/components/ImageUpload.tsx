import React, { useRef, useCallback } from 'react';
import { ImageUploadType } from '../type';
import { Button } from '../style';

function ImageUpload() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      console.log(e.target.files[0].name);
    },
    [],
  );

  const onUploadButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);
  return (
    <>
      <label htmlFor="avatar">파일 선택</label>
      <input
        type="file"
        accept="image/*"
        name="avatar"
        ref={inputRef}
        onChange={onUploadImage}
      />
      <Button onClick={onUploadButtonClick} />
    </>
  );
}
export default ImageUpload;
