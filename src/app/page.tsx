import AIrecommendButton from '@/components/common/AIrecommendButton';
import PostCard from '@/components/common/Card';
import RelatedTags from '@/components/common/RelatedTags';
import SearchBar from '@/components/common/SearchBar';

export default function page() {
  return (
    <>
      <SearchBar />
      <RelatedTags />
      <AIrecommendButton />
      <PostCard />
    </>
  );
}
