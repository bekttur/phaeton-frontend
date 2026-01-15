import { useLocation, useParams } from 'react-router-dom';
import SearchHeader from '../product-page/SearchHeader';
import Reviews from '../product-page/Reviews';
import ProductTabs from './ProductTabs';
import ProductGallery from './ProductGallery';
import { useArticleDetails } from '../../../../hooks/useModel';

const ArticlesProductPage = () => {
  const location = useLocation();
  const { id } = useParams();

  const state = location.state as {
    id?: number;
    ktype?: number;
    number?: string;
    mfrId?: number;
  };

  const { data, isLoading } = useArticleDetails({
    articleId: state?.id ?? Number(id),
    ktype: state?.ktype,
    number: state?.number,
    mfrId: state?.mfrId,
  });

  if (isLoading) {
    return (
      <div className='fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center'>
        <div className='w-12 h-12 p-1 bg-white rounded-full'>
          <div className='w-10 h-10 border-[3px] border-t-[#4EBC73] border-l-[#4EBC73] border-b-[#4EBC73] border-white rounded-full animate-spin'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 pt-14'>
      <SearchHeader />
      <ProductGallery product={data} />
      <ProductTabs product={data} />
      <Reviews />
    </div>
  );
};

export default ArticlesProductPage;
