import { CheckBoxWrapper } from '../../style/style';

const CheckBox = ({ categoryData }: { categoryData: string }) => {
  return <CheckBoxWrapper>{categoryData}</CheckBoxWrapper>;
};

export default CheckBox;
