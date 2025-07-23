'use client';
import SearchAddressModal from '@/components/auth/SearchAddressModal';
import GrayButton from '@/components/button/GrayButton';
// import Tag from '@/components/common/Tag';
import CategorySelect from '@/components/layout/CategorySelect';
import WritingForm from '@/components/layout/WritingForm';
import WritingFormTags from '@/components/layout/WritingFormTags';
import AddPhotoButton from '@/components/ui/AddPhotoButton';
import { createGroup } from '@/lib/api/group';
// import { GroupCreateRequest } from '@/types/group';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function GatheringCreatePage() {
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [groupDate, setGroupDate] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const router = useRouter();
  const handleDataChange = (data: File[]) => setImages(data);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // formData
    const miniData = new FormData(e.currentTarget);
    miniData.delete('images');

    // 데이터 변환
    const newFormData: { [key: string]: any } = {};
    miniData.forEach((value, key) => {
      newFormData[key] = value;
    });
    const newData: GroupCreateRequest = {
      title: '',
      explain: '',
      simpleExplain: '',
      placeName: 'NULL',
      groupDate: '',
      address: '',
      category: 'ART',
      maxPeople: 0,
      latitude: 0,
      longitude: 0,
      hashTags: [],
      // during: 0, 선택 항목
    };
    newData.title = newFormData.title;
    newData.explain = newFormData.explain;
    newData.simpleExplain = newFormData.explain;
    newData.address = newFormData.address;
    newData.latitude = +latitude.toFixed(4);
    newData.longitude = +longitude.toFixed(4);
    newData.maxPeople = +newFormData.maxPeople;
    newData.category = newFormData.category;
    newData.groupDate = groupDate;
    newData.hashTags = tags;
    if (!!newFormData.during) newData.during = +newFormData.during;
    if (images.length > 0) newData.image = images[0];

    console.log(newData);

    // API
    createGroup(newData).then(() => {
      alert('게시글이 등록되었습니다.');
      router.push('/gathering');
    });
  };

  return (
    <>
      <div className="bg-gray-7 mb-[50px] flex h-[200px] w-full items-center justify-center">
        <div className="from-main to-text mt-10 mb-10 inline h-fit w-fit bg-gradient-to-r bg-clip-text text-center text-[24px] font-semibold text-transparent md:text-[30px] lg:text-[32px]">
          모임글 작성
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
        />

        <div className="flex w-full flex-col items-baseline gap-[20px] lg:flex-row lg:gap-6">
          <div className="w-full lg:w-1/2">
            <WritingForm
              name="address"
              title="모임 위치"
              placeholder="모임 위치를 정해주세요."
              isRequired
              isLongForm={false}
              addressValue={address}
              handleModal={(bool) => setShowModal(bool)}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <WritingForm
              name="maxPeople"
              title="최대 인원"
              placeholder="최대 인원을 작성해주세요."
              isRequired
              isLongForm={false}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-baseline gap-[20px] lg:flex-row lg:gap-6">
          <div className="w-full lg:w-1/2">
            <WritingForm
              name="groupDate"
              title="모임 날짜"
              placeholder="모임 위치를 정해주세요."
              isRequired
              sendDate={(date) => setGroupDate(date.toISOString())}
              isLongForm={false}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <WritingForm
              name="during"
              title="소요 시간"
              isRequired={false}
              placeholder="모임의 소요 시간을 작성해주세요."
              isLongForm={false}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-baseline gap-[20px] lg:flex-row lg:gap-6">
          {/* 태그 입력 영역 */}
          <div className="w-full lg:w-1/2">
            <WritingFormTags
              // name='hashTags'
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
            />
          </div>
        </div>

        <WritingForm
          name="explain"
          title="모임 소개"
          placeholder="모임에 관한 소개를 작성 해주세요."
          isRequired
          isLongForm
        />

        <AddPhotoButton
          className="mb-[60px] lg:mt-0"
          onDataChange={handleDataChange}
        />

        <GrayButton className="text-gray-disabled bg-gray-6 hover:bg-main hover:text-gray-8 fixed bottom-[20px] left-[20px] h-[52px] w-[calc(100%-40px)] text-[20px] font-medium hover:font-semibold lg:static lg:bottom-0 lg:left-0 lg:mt-10 lg:mb-[70px] lg:h-[80px] lg:w-full lg:text-[32px] lg:font-semibold">
          작성하기
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
