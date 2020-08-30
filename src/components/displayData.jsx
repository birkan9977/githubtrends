export default function Display(state) {
  const { fetchOption, manualSubmit } = state;
  const displayData =
    fetchOption === 'fetchonchange' ||
    (fetchOption === 'manual' && manualSubmit);

  return displayData;
}
