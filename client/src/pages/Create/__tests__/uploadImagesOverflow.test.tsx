import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadImages from '../components/UploadImage';
import ModalMain from '../../../common/components/Modal/ModalMain';

describe('UploadImages', () => {
  test('Checking if modal appears when uploading more than 5 images', async () => {
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
});