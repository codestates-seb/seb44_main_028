import { CustomTapButton } from '../style';
import { TapButtonType } from '../type';

function TapButton({ tap, setTapList }: TapButtonType) {
  const handleNowTapValue = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = event;
    if (currentTarget) {
      setTapList(() => [currentTarget.innerText]);
    }
    console.log(tap);
  };

  return (
    <>
      <CustomTapButton onClick={handleNowTapValue}>{tap}</CustomTapButton>
    </>
  );
}

export default TapButton;
