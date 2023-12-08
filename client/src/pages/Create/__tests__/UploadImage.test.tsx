import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadImages from '../components/UploadImage';
import ModalMain from '../../../common/components/Modal/ModalMain';
import PreImage from '../components/PreImage';

describe('UploadImages', () => {
  test('사진을 5장 이상 업로드 시 모달에 해당 텍스트가 화면에 뜨는가', async () => {
    const showImages = [
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
      'image4.jpg',
      'image5.jpg',
    ];
    const setShowImages = jest.fn();
    const setUploadImages = jest.fn();

    let isOpen = false;

    render(
      <UploadImages
        setUploadImages={setUploadImages}
        showImages={showImages}
        setShowImages={setShowImages}
      />,
    );

    const file = new File(['fackImage'], 'fackImage.png', {
      type: 'image/png',
    });
    const input = screen.getByTestId('input-file');
    userEvent.upload(input, file);
    isOpen = true;

    const { getByText } = render(
      <ModalMain isOpen={isOpen}>
        <ModalMain.Title>이미지는 최대 5까지 첨부할 수 있어요.</ModalMain.Title>
      </ModalMain>,
    );

    expect(
      getByText('이미지는 최대 5까지 첨부할 수 있어요.'),
    ).toBeInTheDocument();
  });

  test('업르드 된 사진의 갯수가 일치하는가', async () => {
    const setShowImages = jest.fn();
    const setUploadImages = jest.fn();
    const showImages: string[] = [];

    window.URL.createObjectURL = jest.fn();
    render(
      <UploadImages
        setUploadImages={setUploadImages}
        showImages={showImages}
        setShowImages={setShowImages}
      />,
    );

    const input = screen.getByTestId('input-file');

    const file = new File(['fackImage'], 'fakeImage.png', {
      type: 'image/png',
    });

    userEvent.upload(input, file);
    await waitFor(() => {
      expect(setUploadImages).toHaveBeenCalledTimes(1);
      expect(setShowImages).toHaveBeenCalledTimes(1);
    });

    const handleDeleteImage = jest.fn();
    render(
      <PreImage
        imageSrc="fakeImage.png"
        ImageId={0}
        handleDeleteImage={handleDeleteImage}
      />,
    );

    const preImageComponents = screen.getAllByAltText('Uploaded Image');
    expect(preImageComponents.length).toBe(1);
  });
});
