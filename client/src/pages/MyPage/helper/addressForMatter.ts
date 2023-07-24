export const addressForMatter = (address: string) => {
  const hiddenAddress = address.replace(/^(.*\S)\s.*$/, '$1');
  return hiddenAddress;
};
