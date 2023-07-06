import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';
import { ProfileWapper } from '../style';
import TapButton from '../components/TapButton';

type User = {
  name: string;
  email: string;
};

const MyPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [nowActivatedTabValue, setNowActivatedTabValue] = useState<string>('');

  // 사용자 정보 가져오기 (임시로 작성된 코드)
  const fetchUserInfo = () => {
    // API 호출 또는 데이터베이스에서 사용자 정보를 가져온다고 가정
    const userInfo: User = {
      name: '김민트',
      email: 'johndoe@example.com',
    };
    setUser(userInfo);
  };

  // 마이페이지 컴포넌트가 처음 렌더링될 때 사용자 정보를 가져옴
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleNowActivatedTabValue = (inputValue: string) => {
    setNowActivatedTabValue(inputValue);
    // 탭 버튼이 클릭되면 다른 동작을 수행하거나 상태를 업데이트할 수 있습니다.
    console.log('Activated tab value:', inputValue);
  };

  return (
    <div>
      <h2>My Page</h2>
      <TapButton
        nowActivatedTabValue={nowActivatedTabValue}
        handleNowActivatedTabValue={handleNowActivatedTabValue}
      />
      <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
        솔직한 별점을 남겨주세요.
      </Modal>
      <ProfileWapper>{/* <ImageUpload /> */}</ProfileWapper>
      {user ? (
        <div>
          <p>닉네임: {user.name}</p>
          <p>내 동네 찾기: {user.email}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default MyPage;
