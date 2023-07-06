import CryptoJS from 'crypto-js';

function useDecryptToken() {
  const decryptToken = (encryptedToken: string) => {
    const bytes = CryptoJS.AES.decrypt(
      encryptedToken,
      process.env.REACT_APP_SECRET_KEY as string,
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  return decryptToken;
}
export default useDecryptToken;
