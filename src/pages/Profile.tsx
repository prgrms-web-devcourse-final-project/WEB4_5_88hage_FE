import Sidebar from '@/components/layout/Sidebar';
import Image from 'next/image';
import profileImg from '@/assets/images/profile_test.png';
import mapIcon from '@/assets/images/map_icon_test.png';
import {
  LucideArrowUpRight,
  LucideChevronsLeftRight,
  LucideUsers2,
} from 'lucide-react';
import 'swiper/css';
import Greeting from '@/components/common/Greeting';

export default function Profile() {
  return (
    <>
      <div className="hidden w-full flex-col gap-5 text-white lg:flex">
        <div className="flex w-full max-w-[1440px] flex-col self-center">
          <div className="mb-6 text-[28px] font-semibold">내 프로필</div>
          <div className="mb-[34px] flex gap-[calc(100%*(30/1440))]">
            <div className="bg-gray-7 flex h-90 w-[calc(100%*(400/1440))] flex-col items-center justify-center gap-2.5 rounded-[5px] p-[31px] font-medium">
              <Image
                src={profileImg}
                alt="profile"
                className="rounded-full bg-black"
              />
              <div className="text-xl">홍길동 님</div>
              <div className="flex gap-5">
                <span className="text-[#999999]">
                  팔로워 <span className="text-white">27</span>
                </span>
                <span className="text-[#999999]">
                  팔로잉 <span className="text-white">27</span>
                </span>
              </div>
              <button className="mt-[17px] w-45 rounded-[5px] bg-[#323232] p-3">
                정보 수정
              </button>
            </div>
            <div className="bg-gray-7 h-90 w-[calc(100%*(513/1440))] rounded-[5px] p-5 font-semibold">
              <div className="mb-[21px]">👍 즐겨 찾는 여가 생활</div>
              <div className="mb-8 flex flex-col gap-[9px] text-[12px]">
                <div className="flex gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-main size-3 rounded-full"></div> 예술
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="size-3 rounded-full bg-[#60c2ff]"></div>{' '}
                    게임
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="size-3 rounded-full bg-[#bd3aff]"></div>{' '}
                    여행
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="size-3 rounded-full bg-[#ff4bcc]"></div>{' '}
                    자기 개발
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="size-3 rounded-full bg-[#62ff57]"></div>{' '}
                    영화
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="size-3 rounded-full bg-[#ffd042]"></div>{' '}
                    음식
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="size-3 rounded-full bg-[#ff5457]"></div>{' '}
                    문화
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="size-3 rounded-full bg-[#546bff]"></div>{' '}
                    운동
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                  <div className="bg-main h-10 w-5 rounded-[10px]"></div>
                </div>
                <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                  <div className="h-13 w-5 rounded-[10px] bg-[#60c2ff]"></div>
                </div>
                <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                  <div className="h-16 w-5 rounded-[10px] bg-[#bd3aff]"></div>
                </div>
                <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                  <div className="h-19 w-5 rounded-[10px] bg-[#ff4bcc]"></div>
                </div>
                <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                  <div className="h-22 w-5 rounded-[10px] bg-[#62ff57]"></div>
                </div>
                <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                  <div className="h-25 w-5 rounded-[10px] bg-[#ffd042]"></div>
                </div>
                <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                  <div className="h-28 w-5 rounded-[10px] bg-[#ff5457]"></div>
                </div>
                <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                  <div className="h-30 w-5 rounded-[10px] bg-[#546bff]"></div>
                </div>
              </div>
            </div>
            <div className="bg-gray-7 h-90 w-[calc(100%*(467/1440))] rounded-[5px] px-9 py-3">
              <div className="flex justify-between pb-2 text-lg text-[#a8a8a8]">
                <div className="">July, 2025</div>
                <button className="">
                  <LucideChevronsLeftRight />
                </button>
              </div>
              {/* 달력 */}
              {/* <div className="flex flex-col gap-2.5">
                <div className="flex gap-2.5">
                  <div className="w-12 text-center text-[#ffb6b6]">일</div>
                  <div className="w-12 text-center">월</div>
                  <div className="w-12 text-center">화</div>
                  <div className="w-12 text-center">수</div>
                  <div className="w-12 text-center">목</div>
                  <div className="w-12 text-center">금</div>
                  <div className="w-12 text-center text-[#ffb6b6]">토</div>
                </div>
                <div className="flex flex-col gap-1.5 text-xl font-medium text-white">
                  <div className="flex gap-2.5">
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]">
                      1
                    </div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                    <div className="bg-gray-6 flex size-12 items-center justify-center rounded-[5px]"></div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex h-[356px] gap-[30px]">
            <div className="flex w-[calc(100%*(943/1440))] flex-col gap-[30px]">
              <div className="flex h-[50px] w-full gap-8">
                <button className="bg-gray-7 text-main t2 flex h-full w-full items-center justify-between rounded-[5px] px-2.5 font-semibold">
                  <div className="bg-gray-4 size-[31px] rounded-full"></div>
                  내가 작성한 모임 글<div />
                </button>
                <button className="bg-gray-7 t2 flex h-full w-full items-center justify-between rounded-[5px] px-2.5">
                  <div className="bg-gray-4 size-[31px] rounded-full"></div>
                  내 문의 내역
                  <div />
                </button>
                <button className="bg-gray-7 t2 flex h-full w-full items-center justify-between rounded-[5px] px-2.5">
                  <div className="bg-gray-4 size-[31px] rounded-full"></div>
                  예약한 행사
                  <div />
                </button>
              </div>
              <div className="bg-gray-7 h-[276px] w-full rounded-[5px] px-5 py-[15px]">
                <div className="mb-5 flex items-center justify-between border-b-1 border-[#4d4d4d] pb-4 text-[#a8a8a8]">
                  <div>내가 작성한 모임 글</div>
                  <button>
                    <LucideArrowUpRight />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="bg-gray-6 flex rounded-[5px] px-5 py-4">
                    <div className="w-[25%] truncate">같이 꽃놀이 가실 분</div>
                    <div className="w-[60%] truncate">
                      4월 9일에 벚꽃놀이 멤버 구합니다. 같이 돗자리 펴고
                      꽃놀이...
                    </div>
                    <div className="w-[15%] text-right">20250401</div>
                  </div>
                  <div className="bg-gray-6 flex rounded-[5px] px-5 py-4">
                    <div className="w-[25%] truncate">같이 꽃놀이 가실 분</div>
                    <div className="w-[60%] truncate">
                      4월 9일에 벚꽃놀이 멤버 구합니다. 같이 돗자리 펴고
                      꽃놀이...
                    </div>
                    <div className="w-[15%] text-right">20250401</div>
                  </div>
                  <div className="bg-gray-6 flex rounded-[5px] px-5 py-4">
                    <div className="w-[25%] truncate">같이 꽃놀이 가실 분</div>
                    <div className="w-[60%] truncate">
                      4월 9일에 벚꽃놀이 멤버 구합니다. 같이 돗자리 펴고
                      꽃놀이...
                    </div>
                    <div className="w-[15%] text-right">20250401</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-7 h-full w-[calc(100%*(467/1440))] rounded-[5px] px-5 py-[26px]">
              <div className="mb-5 flex justify-between border-b-1 border-[#4d4d4d] pb-4 text-[#a8a8a8]">
                <div>오늘의 일정</div>
                <button>
                  <LucideArrowUpRight />
                </button>
              </div>
              <div className="flex flex-col gap-[15px]">
                <div>
                  <div className="flex items-center gap-5">
                    <Image src={mapIcon} alt="icon" />
                    <div className="flex flex-col items-baseline gap-[3px]">
                      <div className="text-gray-1 font-semibold">
                        경주월드 3인 팟
                      </div>
                      <div className="text-sm font-medium text-[#7e7e7e]">
                        2025년 7월 21일
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-5">
                    <Image src={mapIcon} alt="icon" />
                    <div className="flex flex-col items-baseline gap-[3px]">
                      <div className="text-gray-1 font-semibold">
                        경주월드 3인 팟
                      </div>
                      <div className="text-sm font-medium text-[#7e7e7e]">
                        2025년 7월 21일
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-5">
                    <Image src={mapIcon} alt="icon" />
                    <div className="flex flex-col items-baseline gap-[3px]">
                      <div className="text-gray-1 font-semibold">
                        경주월드 3인 팟
                      </div>
                      <div className="text-sm font-medium text-[#7e7e7e]">
                        2025년 7월 21일
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-5">
                    <Image src={mapIcon} alt="icon" />
                    <div className="flex flex-col items-baseline gap-[3px]">
                      <div className="text-gray-1 font-semibold">
                        경주월드 3인 팟
                      </div>
                      <div className="text-sm font-medium text-[#7e7e7e]">
                        2025년 7월 21일
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen w-full flex-col overflow-scroll text-white lg:hidden">
        <div className="bg-gray-7 mb-[30px] px-5 py-5">
          {/* <div className="mb-4.5 flex w-full items-center justify-between font-extrabold">
            안녕하세요, 홍길동님 👋🏻
          </div> */}
          <div className="text-medium mb-[17px] text-xl">내 프로필</div>
          <div className="bg-gray-6 flex w-full flex-col items-center justify-center gap-2.5 rounded-[5px] p-[31px] font-medium">
            <Image
              src={profileImg}
              alt="profile"
              className="rounded-full bg-black"
            />
            <div className="text-xl">홍길동 님</div>
            <div className="flex gap-5">
              <span className="text-[#999999]">
                팔로워 <span className="text-white">27</span>
              </span>
              <span className="text-[#999999]">
                팔로잉 <span className="text-white">27</span>
              </span>
            </div>
            <button className="mt-[17px] w-45 rounded-[5px] bg-[#323232] p-3">
              정보 수정
            </button>
          </div>
          <div className="bg-gray-7 w-full rounded-[5px] p-5 font-semibold">
            <div className="mb-[21px]">👍 즐겨 찾는 여가 생활</div>
            <div className="mb-8 flex flex-col gap-[9px] text-[12px]">
              <div className="flex gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="bg-main size-3 rounded-full"></div> 예술
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="size-3 rounded-full bg-[#60c2ff]"></div> 게임
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="size-3 rounded-full bg-[#bd3aff]"></div> 여행
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="size-3 rounded-full bg-[#ff4bcc]"></div> 자기
                  개발
                </div>
              </div>
              <div className="flex gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="size-3 rounded-full bg-[#62ff57]"></div> 영화
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="size-3 rounded-full bg-[#ffd042]"></div> 음식
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="size-3 rounded-full bg-[#ff5457]"></div> 문화
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="size-3 rounded-full bg-[#546bff]"></div> 운동
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                <div className="bg-main h-10 w-5 rounded-[10px]"></div>
              </div>
              <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                <div className="h-13 w-5 rounded-[10px] bg-[#60c2ff]"></div>
              </div>
              <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                <div className="h-16 w-5 rounded-[10px] bg-[#bd3aff]"></div>
              </div>
              <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                <div className="h-19 w-5 rounded-[10px] bg-[#ff4bcc]"></div>
              </div>
              <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                <div className="h-22 w-5 rounded-[10px] bg-[#62ff57]"></div>
              </div>
              <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                <div className="h-25 w-5 rounded-[10px] bg-[#ffd042]"></div>
              </div>
              <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                <div className="h-28 w-5 rounded-[10px] bg-[#ff5457]"></div>
              </div>
              <div className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]">
                <div className="h-30 w-5 rounded-[10px] bg-[#546bff]"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-[41px] mb-[30px] h-12.5">
          {/* Swiper */}
          <button className="bg-gray-7 text-main flex h-full w-full items-center justify-between rounded-[5px] px-2.5 text-lg font-semibold">
            <div className="bg-gray-4 size-[31px] rounded-full"></div>
            내가 작성한 모임 글<div />
          </button>
        </div>
        <div className="bg-gray-7 mx-5 mb-[80px] rounded-[5px] p-4.5">
          <div className="pt-[9px] pb-[26px] font-semibold text-[#a8a8a8]">
            내가 작성한 모임 글
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-gray-6 flex w-full flex-col gap-[15px] rounded-[5px] px-[11px] py-3">
              <div className="font-semibold">같이 꽃놀이 가실 분</div>
              <div className="">
                4월 9일에 벚꽃놀이 멤버 구합니다. 같이 돗자리 펴고 꽃놀이...
              </div>
              <div className="text-gray-3 flex gap-3 text-sm">
                <div className="">20250401</div>
                <div className="flex items-center gap-1">
                  3명
                  <LucideUsers2 size={18} />
                </div>
              </div>
            </div>
            <div className="bg-gray-6 flex w-full flex-col gap-[15px] rounded-[5px] px-[11px] py-3">
              <div className="font-semibold">같이 꽃놀이 가실 분</div>
              <div className="">
                4월 9일에 벚꽃놀이 멤버 구합니다. 같이 돗자리 펴고 꽃놀이...
              </div>
              <div className="text-gray-3 flex gap-3 text-sm">
                <div className="">20250401</div>
                <div className="flex items-center gap-1">
                  3명
                  <LucideUsers2 size={18} />
                </div>
              </div>
            </div>
            <div className="bg-gray-6 flex w-full flex-col gap-[15px] rounded-[5px] px-[11px] py-3">
              <div className="font-semibold">같이 꽃놀이 가실 분</div>
              <div className="">
                4월 9일에 벚꽃놀이 멤버 구합니다. 같이 돗자리 펴고 꽃놀이...
              </div>
              <div className="text-gray-3 flex gap-3 text-sm">
                <div className="">20250401</div>
                <div className="flex items-center gap-1">
                  3명
                  <LucideUsers2 size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
