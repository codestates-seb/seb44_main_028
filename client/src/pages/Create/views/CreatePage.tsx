import CheckBoxList from '../../../common/components/Checkbox/CheckBoxList';
import UploadImage from '../components/UploadImage';
import WritePost from '../components/WritePost';
import { CreatePageContainer } from '../style';
function CreatePage() {
  return (
    <CreatePageContainer>
      <UploadImage />
      <WritePost />
      <CheckBoxList />
    </CreatePageContainer>
  );
}
export default CreatePage;
