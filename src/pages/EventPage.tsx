import AIrecommendButton from '@/components/common/AIrecommendButton';
import PostCard from '@/components/common/Card';
import SearchBar from '@/components/common/SearchBar';

export default function EventPage() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1440px]">
        <div className="h-[380px]">
          <SearchBar />
        </div>
        <div className="mb-8 flex items-center justify-between">
          <AIrecommendButton />
          <button className="t4 rounded-[4px] border border-gray-600 px-3 py-1.5 font-semibold text-white">
            최신순
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
