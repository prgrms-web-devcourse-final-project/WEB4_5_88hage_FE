'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { getGroupById, updateGroup } from '@/lib/api/group';

// Imports from GatheringCreatePage
import SearchAddressModal from '@/components/auth/SearchAddressModal';
import GrayButton from '@/components/button/GrayButton';
import CategorySelect from '@/components/layout/CategorySelect';
import WritingForm from '@/components/layout/WritingForm';
import WritingFormTags from '@/components/layout/WritingFormTags';
import AddPhotoButton from '@/components/ui/AddPhotoButton';

interface GatheringEditPageProps {
  params: Promise<{ gatheringId: number }>;
}

export default function GatheringEditPage({ params }: GatheringEditPageProps) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { gatheringId } = unwrappedParams;
  const [gathering, setGathering] = useState<GroupDetail | null>(null);

  // States for form fields, initialized with empty values
  const [title, setTitle] = useState('');
  const [explain, setExplain] = useState('');
  const [simpleExplain, setSimpleExplain] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [groupDate, setGroupDate] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState<GroupUpdateRequest['category'] | ''>(
    '',
  );
  const [maxPeople, setMaxPeople] = useState<number | ''>('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [during, setDuring] = useState<number | ''>('');
  const [images, setImages] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchGathering = async () => {
      try {
        const data = await getGroupById(gatheringId);
        setGathering(data);
        // Populate form fields with fetched data
        setTitle(data.title);
        setExplain(data.explain);
        setSimpleExplain(data.simpleExplain || '');
        setPlaceName(data.placeName || '');
        setGroupDate(data.groupDate || '');
        setAddress(data.address || '');
        setCategory(data.category || '');
        setMaxPeople(data.maxPeople || '');
        setLatitude(data.latitude || 0);
        setLongitude(data.longitude || 0);
        setTags(data.hashTags || []);
        setDuring(data.during || '');

        // If there's an initial image, you might need to handle it for AddPhotoButton
        // For now, we assume AddPhotoButton manages its own internal state for display
        // or you'd pass a prop like initialImageUrl={data.imageUrl}
      } catch (error) {
        console.error('Failed to fetch gathering:', error);
        // Handle error, e.g., redirect to a 404 page or show an error message
      }
    };

    if (gatheringId) {
      fetchGathering();
    }
  }, [gatheringId]);

  const handleDataChange = (data: File[]) => setImages(data);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newData: GroupUpdateRequest = {
      title: title,
      explain: explain,
      simpleExplain: simpleExplain,
      placeName: placeName,
      groupDate: groupDate,
      address: address,
      category: category as GroupUpdateRequest['category'],
      maxPeople: Number(maxPeople),
      latitude: +latitude.toFixed(4),
      longitude: +longitude.toFixed(4),
      hashTags: tags,
      during: Number(during),
      image: images.length > 0 ? images[0] : null,
    };

    try {
      await updateGroup(Number(gatheringId), newData);
      alert('모임이 성공적으로 수정되었습니다!');
      router.back();
    } catch (error) {
      console.error('Failed to update gathering:', error);
      alert('모임 수정에 실패했습니다.');
    }
  };

  if (!gathering) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-gray-7 mb-[50px] flex h-[200px] w-full items-center justify-center">
        <div className="from-main to-text mt-10 mb-10 inline h-fit w-fit bg-gradient-to-r bg-clip-text text-center text-[24px] font-semibold text-transparent md:text-[30px] lg:text-[32px]">
          모임 수정
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-10 flex w-full max-w-[1220px] flex-col gap-[20px] px-6"
      >
        <WritingForm
          name="title"
          title="모임 이름"
          placeholder="제목을 입력해 주세요."
          isRequired
          isLongForm={false}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex w-full flex-col items-baseline gap-[20px] lg:flex-row lg:gap-6">
          <div className="w-full lg:w-1/2">
            <WritingForm
              name="address"
              title="모임 위치"
              placeholder="모임 위치를 정해주세요."
              isRequired
              isLongForm={false}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <WritingForm
              name="maxPeople"
              title="최대 인원"
              placeholder="최대 인원을 작성해주세요."
              isRequired
              isLongForm={false}
              value={maxPeople}
              onChange={(e) => setMaxPeople(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-baseline gap-[20px] lg:flex-row lg:gap-6">
          <div className="w-full lg:w-1/2">
            <WritingForm
              name="groupDate"
              title="모임 날짜"
              placeholder="모임 날짜를 정해주세요."
              isRequired
              sendDate={(date) =>
                setGroupDate(date.toISOString().split('T')[0])
              }
              isLongForm={false}
              value={groupDate}
              onChange={(e) => setGroupDate(e.target.value)}
              type="date"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <WritingForm
              name="during"
              title="소요 시간"
              isRequired={false}
              placeholder="모임의 소요 시간을 작성해주세요."
              isLongForm={false}
              value={during}
              onChange={(e) => setDuring(Number(e.target.value))}
              type="number"
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-baseline gap-[20px] lg:flex-row lg:gap-6">
          {/* 태그 입력 영역 */}
          <div className="w-full lg:w-1/2">
            <WritingFormTags
              title="태그"
              isRequired
              placeholder="태그를 작성 해주세요."
              onTagsAdd={(newTag) =>
                setTags((prev) => [...new Set([...prev, newTag])])
              }
            />
            <div className="mt-[10px] flex flex-wrap justify-start gap-2 lg:mt-[20px]">
              {tags.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="t3 rounded-2xl bg-[#393939] px-2.5 py-1 text-white"
                  onClick={() =>
                    setTags((prev) => prev.filter((v) => v !== item))
                  }
                >
                  #{item}
                </button>
              ))}
            </div>
          </div>

          {/* 카테고리 선택 영역 */}
          <div className="w-full lg:w-1/2">
            <CategorySelect
              name="category"
              isRequired
              options={[
                { key: 'CULTURE', value: '문화' },
                { key: 'SPORT', value: '운동' },
                { key: 'FOOD', value: '푸드' },
                { key: 'STUDY', value: '자기개발' },
                { key: 'GAME', value: '게임' },
                { key: 'TRAVEL', value: '여행' },
                { key: 'ART', value: '예술' },
              ]}
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as GroupUpdateRequest['category'])
              }
            />
          </div>
        </div>

        <WritingForm
          name="explain"
          title="모임 소개"
          placeholder="모임에 관한 소개를 작성 해주세요."
          isRequired
          isLongForm
          value={explain}
          onChange={(e) => setExplain(e.target.value)}
        />

        <AddPhotoButton
          className="mb-[60px] lg:mt-0"
          onDataChange={handleDataChange}
        />

        <GrayButton className="text-gray-disabled bg-gray-6 hover:bg-main hover:text-gray-8 fixed bottom-[20px] left-[20px] h-[52px] w-[calc(100%-40px)] text-[20px] font-medium hover:font-semibold lg:static lg:bottom-0 lg:left-0 lg:mt-10 lg:mb-[70px] lg:h-[80px] lg:w-full lg:text-[32px] lg:font-semibold">
          수정하기
        </GrayButton>
      </form>
      {showModal && (
        <SearchAddressModal
          setShowModal={setShowModal}
          setAddress={setAddress}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
      )}
    </>
  );
}
