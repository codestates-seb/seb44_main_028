import { useQuery } from 'react-query';
import axios from 'axios';
import KakaoLogin from '../components/KakaoLogin';

function LoginPage() {
  // const fetchMyData = async () => {
  //   const input = document.querySelector('#myFile') as HTMLInputElement;
  //   if (!input) return;
  //   const file = input.files ? input.files[0] : null;
  //   if (!file) return;
  //   const formData = new FormData();
  //   formData.append('imageFile', file);
  //   const response = await axios.post('https://playpack.shop/image', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  //   return response.data;
  // };
  // const fetchMyData = async () => {
  //   const response = await axios.get('https://playpack.shop/image');
  //   return response.data;
  // };

  // const { isLoading, isError, error, data }: any = useQuery(
  //   'myData',
  //   fetchMyData,
  // );
  // console.log('민환님이 보내주신 데이터', data);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <>
      <KakaoLogin />
      {/* <div>{data}</div>
      <input type="file" id="myFile" />
      <button onClick={() => fetchMyData()}>보내기</button> */}
    </>
  );
}
export default LoginPage;
