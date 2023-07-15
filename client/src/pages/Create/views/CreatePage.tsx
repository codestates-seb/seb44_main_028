import UploadImage from '../components/UploadImage';
import WritePost from '../components/WritePost';
import { CreatePageContainer } from '../style';
function CreatePage() {
  return (
    <CreatePageContainer>
      <UploadImage />
      <WritePost />
    </CreatePageContainer>
  );
}
export default CreatePage;
