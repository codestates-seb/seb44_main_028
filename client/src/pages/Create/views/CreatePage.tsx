import CheckBoxList from '../../../common/components/Checkbox/CheckBoxList';
import UploadImage from '../components/UploadImage';
import WritePost from '../components/WritePost';
function CreatePage() {
  return (
    <>
      <UploadImage />
      <WritePost />
      <CheckBoxList />
    </>
  );
}
export default CreatePage;
