import AIrecommendButton from '@/components/common/AIrecommendButton';
import PostCard from '@/components/common/Card';
import RelatedTags from '@/components/common/RelatedTags';
import SearchBar from '@/components/common/SearchBar';
import { ChevronDown } from 'lucide-react';

export default function MeetingPage() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1440px]">
        <div className="h-[380px]">
          <SearchBar />
          <RelatedTags />
        </div>
        <div className="mb-8 flex items-center justify-between">
          <AIrecommendButton />
          <button className="t4 flex items-center text-white">
            최신순
            <ChevronDown className="ml-2 h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
}
