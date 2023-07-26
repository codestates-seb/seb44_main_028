import useScrollToTop from '../../../common/utils/customHooks/useScrollToTop';
import ItemContent from '../components/ItemContent';

function DetailPage() {
  useScrollToTop();
  return (
    <>
      <ItemContent />
    </>
  );
}
export default DetailPage;
