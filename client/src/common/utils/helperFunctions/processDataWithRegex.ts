export function processDataWithRegex(params: string) {
  const dateRegex = /\d{4}-\d{2}-\d{2}/g;
  const matches = params.match(dateRegex);

  if (!matches || matches.length < 2) {
    throw new Error('날짜 데이터를 찾을 수 없습니다.');
  }

  const startDate = matches[0].split('=')[1];
  const endDate = matches[1].split('=')[1];

  return {
    startDate,
    endDate,
  };
}
