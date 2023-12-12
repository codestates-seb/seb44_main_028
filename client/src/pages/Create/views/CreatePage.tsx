import useScrollToTop from '../../../common/utils/customHooks/useScrollToTop';
import WritePost from '../components/WritePost';
import { CreatePageContainer } from '../style';
function CreatePage() {
  useScrollToTop();
  return (
    <CreatePageContainer>
      <WritePost productData="" />
    </CreatePageContainer>
  );
}
export default CreatePage;
