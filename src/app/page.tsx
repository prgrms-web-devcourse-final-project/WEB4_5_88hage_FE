import AIrecommendButton from '@/components/common/AIrecommendButton';
import RelatedTags from '@/components/common/RelatedTags';
import SearchBar from '@/components/common/SearchBar';

export default function page() {
  return (
    <>
      <SearchBar />
      <RelatedTags />
      <AIrecommendButton />
    </>
  );
}
