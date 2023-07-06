import CryptoJS from 'crypto-js';

function useEncryptToken() {
  const encryptToken = (token: string) => {
    return CryptoJS.AES.encrypt(
      token,
      process.env.REACT_APP_SECRET_KEY as string,
    ).toString();
  };
  return encryptToken;
}
export default useEncryptToken;
