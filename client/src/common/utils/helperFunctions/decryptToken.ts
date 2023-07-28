import CryptoJS from 'crypto-js';

export const decryptToken = (encryptedToken: string) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedToken,
    process.env.REACT_APP_SECRET_KEY as string,
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};
