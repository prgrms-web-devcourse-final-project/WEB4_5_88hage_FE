'use client';
import Image from 'next/image';
import profileImg from '@/assets/images/profile_test.png';
import mapIcon from '@/assets/images/map_icon_test.png';
import { LucideArrowUpRight, LucideUsers2, PencilLine, List, ListTodo } from 'lucide-react';
import 'swiper/css';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { HashLoader } from 'react-spinners';
import {
  getUserInfo,
  getUserDetailInfoByEmail,
  changeNickname,
  withdrawUser,
} from '@/lib/api/user';
import { getGroupCompletedStats } from '@/lib/api/participant'; // Import the new API call
import { getLeaderMyGroups } from '@/lib/api/group'; // Import getLeaderMyGroups
import { getDailyCalendar, getCalendarForContent } from '@/lib/api/calendar'; // Import getDailyCalendar
import { getContacts } from '@/lib/api/inquiry'; // Import getContacts
import { getFollowers, getFollowings } from '@/lib/api/follow';
import basicProfileImg from '../assets/images/basicProfile.png';
import FollowListModal from '@/components/common/FollowListModal';
import DetailListModal from '@/components/common/DetailListModal';
import EditProfileModal from '@/components/EditProfileModal';
import { updateProfile } from '@/lib/api/userInfo';
import { useAuthStore } from '@/stores/UseAuthStore';
import Toast from '@/components/common/Toast';
import ConfirmModal from '@/components/common/ConfirmModal';
import ProfileCalendar from '@/components/calendar/ProfileCalendar';
import {
  CalendarContent,
  CurrentUserInfo,
  GroupStat,
  ServiceResponse,
  DailyCalendar,
} from '@/types/api';

interface UserInfo {
  nickname: string;
  followerCount: number;
  followingCount: number;
  imageUrl: string;
  introduction: string;
}

export default function Profile() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [groupStats, setGroupStats] = useState<GroupStat[]>([]);
  const [leaderGroups, setLeaderGroups] = useState<LeaderMyGroupData[]>([]);
  const [dailyEvents, setDailyEvents] = useState<DailyCalendar[]>([]);
  const [dailyEventsLoading, setDailyEventsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [myInquiries, setMyInquiries] = useState<Inquiry[]>([]);
  const [bookedEvents, setBookedEvents] = useState<CalendarContent[]>([]);
  const [activeTab, setActiveTab] = useState('myPosts'); // 'myPosts', 'myInquiries', 'bookedEvents'
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showMyPostsModal, setShowMyPostsModal] = useState(false);
  const [showMyInquiriesModal, setShowMyInquiriesModal] = useState(false);
  const [showBookedEventsModal, setShowBookedEventsModal] = useState(false);
  const [showDailyEventsModal, setShowDailyEventsModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [followings, setFollowings] = useState<Following[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWithdrawConfirmModal, setShowWithdrawConfirmModal] =
    useState(false);
  const setAuthStoreNickname = useAuthStore((state) => state.setNickname);
  const fetchFollowData = async () => {
    try {
      const followersData = await getFollowers();
      setFollowers(
        Array.isArray(followersData.data.content)
          ? followersData.data.content.map((f: Follower) => ({
              nickname: f.nickname,
              imageUrl: f.imageUrl,
              email: f.email,
              introduction: f.introduction,
              followedAt: f.followedAt,
            }))
          : [],
      );

      const followingsData = await getFollowings();
      setFollowings(
        followingsData.data.content.map((f: Following) => ({
          nickname: f.nickname,
          imageUrl: f.imageUrl,
          email: f.email,
          introduction: f.introduction,
          followedAt: f.followedAt,
        })),
      );

      // userInfo (팔로워/팔로잉 수 포함) 업데이트
      const currentUserInfo: ServiceResponse<CurrentUserInfo> =
        await getUserInfo();
      const userEmail = currentUserInfo.data.email;
      const userData = await getUserDetailInfoByEmail(userEmail);
      setUserInfo(userData.data as unknown as UserInfo);
    } catch (error) {
      console.error('Failed to fetch follow data:', error);
    }
  };

  useEffect(() => {
    console.log(myInquiries);
  }, [activeTab, myInquiries]); // test

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUserInfo: ServiceResponse<CurrentUserInfo> =
          await getUserInfo();
        const userEmail = currentUserInfo.data.email;
        const userData = await getUserDetailInfoByEmail(userEmail);
        setUserInfo(userData.data as unknown as UserInfo);

        const statsData = await getGroupCompletedStats();
        setGroupStats(statsData.data);

        const leaderGroupsData = await getLeaderMyGroups();
        setLeaderGroups(leaderGroupsData);
        console.log('LeaderGroupsData', leaderGroupsData);

        if (selectedDate) {
          setDailyEventsLoading(true);
          const year = selectedDate.getFullYear();
          const month = selectedDate.getMonth() + 1;
          const day = selectedDate.getDate();
          try {
            const dailyCalendarData = await getDailyCalendar(year, month, day);
            setDailyEvents(
              Array.isArray(dailyCalendarData.data)
                ? dailyCalendarData.data.filter(
                    (
                      event: DailyCalendar,
                      index: number,
                      self: DailyCalendar[],
                    ) =>
                      index ===
                      self.findIndex((e) => e.activityId === event.activityId),
                  )
                : [],
            );
          } catch (dailyEventsError) {
            console.error('Failed to fetch daily events:', dailyEventsError);
            setDailyEvents([]);
          } finally {
            setTimeout(() => {
              setDailyEventsLoading(false);
            }, 500);
          }
        }

        const inquiriesData = await getContacts();

        setMyInquiries(inquiriesData.data.content || []);
        console.log('inquiriesData', inquiriesData.data.content);

        const bookedEventsData = await getCalendarForContent();
        console.log('BookedEventData', bookedEventsData);
        setBookedEvents(
          Array.isArray(bookedEventsData.data.content)
            ? bookedEventsData.data.content.filter(
                (
                  event: CalendarContent,
                  index: number,
                  self: CalendarContent[],
                ) =>
                  index ===
                  self.findIndex((e) => e.contentId === event.contentId),
              )
            : [],
        );

        await fetchFollowData(); // Initial fetch of follow data
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <HashLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="h1 text-white">
        프로필을 불러오는 데 실패하였습니다 다시 실행해주시기 바랍니다.
      </div>
    );
  }

  // Helper function to map category names and assign colors
  const getCategoryDisplayInfo = (category: string) => {
    switch (category) {
      case 'ART':
        return { name: '예술', color: 'bg-main' };
      case 'TRAVEL':
        return { name: '여행', color: 'bg-[#bd3aff]' };
      case 'FOOD':
        return { name: '음식', color: 'bg-[#ffd042]' };
      case 'GAME':
        return { name: '게임', color: 'bg-[#60c2ff]' };
      case 'CULTURE':
        return { name: '문화', color: 'bg-[#ff5457]' };
      case 'SPORT':
        return { name: '운동', color: 'bg-[#546bff]' };
      case 'STUDY':
        return { name: '자기 계발', color: 'bg-[#ff4bcc]' };
      case 'MOVIE':
        return { name: '영화', color: 'bg-[#62ff57]' };
      default:
        return { name: category, color: 'bg-gray-disabled' }; // Default color for unknown categories
    }
  };

  const getInquiryCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'GENERAL':
        return '일반 문의';
      case 'REPORT':
        return '신고 문의';
      default:
        return category;
    }
  };

  const getInquiryStatusDisplayName = (status: string) => {
    switch (status) {
      case 'COMPLETE':
        return '답변 완료';
      case 'PENDING':
        return '답변 대기';
      default:
        return status;
    }
  };

  const maxCount = Math.max(...groupStats.map((stat) => stat.count), 1);

  return (
    <>
      <div className="ml-5 hidden w-full flex-col gap-5 text-white lg:flex">
        <div className="flex w-full max-w-[1440px] flex-col self-center">
          <div className="mb-6 text-[28px] font-semibold">내 프로필</div>
          <div className="mb-[34px] flex gap-[calc(100%*(30/1440))]">
            <div className="bg-gray-7 flex h-90 w-[calc(100%*(400/1440))] flex-col items-center justify-center gap-2.5 rounded-[5px] p-[31px] font-medium">
              <div className="relative h-30 w-30 overflow-hidden rounded-full">
                {userInfo.imageUrl ? (
                  <Image
                    src={userInfo.imageUrl}
                    alt={userInfo.nickname}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-500 text-xs text-white">
                    <Image
                      src={basicProfileImg}
                      alt={userInfo.nickname}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
              </div>
              <div className="text-xl">{userInfo.nickname} 님</div>
              <div className="flex gap-5">
                <button
                  onClick={() => setShowFollowerModal(true)}
                  className="text-[#999999]"
                >
                  팔로워{' '}
                  <span className="text-white">{userInfo.followerCount}</span>
                </button>
                <button
                  onClick={() => setShowFollowingModal(true)}
                  className="text-[#999999]"
                >
                  팔로잉{' '}
                  <span className="text-white">{userInfo.followingCount}</span>
                </button>
              </div>
              <button
                className="mt-[17px] w-45 rounded-[5px] bg-[#323232] p-3"
                onClick={() => setShowEditProfileModal(true)}
              >
                정보 수정
              </button>
            </div>
            <div className="bg-gray-7 h-90 w-[calc(100%*(513/1440))] rounded-[5px] p-5 font-semibold">
              <div className="mb-[21px]">👍 즐겨 찾는 여가 생활</div>
              <div className="mb-8 flex flex-wrap gap-x-2.5 gap-y-[9px] text-[12px]">
                {groupStats.map((stat, index) => {
                  const { name, color } = getCategoryDisplayInfo(stat.category);
                  return (
                    <div key={index} className="flex items-center gap-2.5">
                      <div className={`${color} size-3 rounded-full`}></div>{' '}
                      {name} ({stat.count})
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between">
                {groupStats.map((stat, index) => {
                  const { color } = getCategoryDisplayInfo(stat.category);
                  const barHeight = (stat.count / maxCount) * 50;
                  return (
                    <div
                      key={index}
                      className="flex h-50 w-5 items-end rounded-[10px] bg-[#393939]"
                    >
                      <div
                        className={`${color} w-5 rounded-[10px]`}
                        style={{ height: `${barHeight}px` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-gray-7 h-90 w-[calc(100%*(440/1440))] rounded-[5px] px-3">
              <ProfileCalendar onDateSelect={setSelectedDate} />
            </div>
          </div>
          <div className="flex h-[356px] gap-[30px]">
            <div className="flex w-[calc(100%*(943/1440))] flex-col gap-[30px]">
              <div className="flex h-[50px] w-full gap-8">
                <button
                  className={`bg-gray-7 t2 flex h-full w-full items-center justify-between rounded-[5px] px-2.5 ${activeTab === 'myPosts' ? 'text-main font-semibold' : ''}`}
                  onClick={() => setActiveTab('myPosts')}
                >
                  <div className="bg-gray-4 size-[31px] rounded-full"><PencilLine className='w-[15px] h-[15px] text-[#A8A8A8]'/></div>
                  내가 작성한 모임 글<div />
                </button>
                <button
                  className={`bg-gray-7 t2 flex h-full w-full items-center justify-between rounded-[5px] px-2.5 ${activeTab === 'myInquiries' ? 'text-main font-semibold' : ''}`}
                  onClick={() => setActiveTab('myInquiries')}
                >
                  <div className="bg-gray-4 size-[31px] rounded-full"><List className='w-[19px] h-[19px] text-[#A8A8A8]' /></div>
                  내 문의 내역
                  <div />
                </button>
                <button
                  className={`bg-gray-7 t2 flex h-full w-full items-center justify-between rounded-[5px] px-2.5 ${activeTab === 'bookedEvents' ? 'text-main font-semibold' : ''}`}
                  onClick={() => setActiveTab('bookedEvents')}
                >
                  <div className="bg-gray-4 size-[31px] rounded-full"><ListTodo className='w-[19px] h-[19px] text-[#A8A8A8]'/></div>
                  예약한 행사
                  <div />
                </button>
              </div>
              <div className="bg-gray-7 h-[276px] w-full rounded-[5px] px-5 py-[15px]">
                <div className="mb-3 flex items-center justify-between border-b-1 border-[#4d4d4d] pb-4 text-[#a8a8a8]">
                  <div>
                    {activeTab === 'myPosts' && '내가 작성한 모임 글'}
                    {activeTab === 'myInquiries' && '내 문의 내역'}
                    {activeTab === 'bookedEvents' && '예약한 행사'}
                  </div>
                  <button
                    onClick={() => {
                      if (activeTab === 'myPosts') {
                        setShowMyPostsModal(true);
                      } else if (activeTab === 'myInquiries') {
                        setShowMyInquiriesModal(true);
                      } else if (activeTab === 'bookedEvents') {
                        setShowBookedEventsModal(true);
                      }
                    }}
                  >
                    <LucideArrowUpRight />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {activeTab === 'myPosts' &&
                    leaderGroups.length > 0 &&
                    (Array.isArray(leaderGroups)
                      ? leaderGroups.slice(0, 3)
                      : []
                    ).map((group) => (
                      <button
                        onClick={() => {
                          router.push(`/gathering/${group.groupId}`);
                        }}
                        key={group.groupId}
                        className="bg-gray-6 flex rounded-[5px] px-5 py-4"
                      >
                        <div className="w-[25%] truncate text-left font-semibold">
                          {group.groupTitle}
                        </div>
                        <div className="w-[60%] truncate text-left">
                          {group.explain}
                        </div>
                        <div className="w-[15%] text-right">
                          {group.groupDate.split('T')[0].replace(/-/g, '')}
                        </div>
                      </button>
                    ))}
                  {activeTab === 'myPosts' && leaderGroups.length < 1 && (
                    <div className="py-5 text-center text-gray-400">
                      내가 작성한 모임 글이 없습니다.
                    </div>
                  )}
                  {activeTab === 'myInquiries' &&
                    // myInquiries.content.length > 0 &&
                    (Array.isArray(myInquiries)
                      ? myInquiries.slice(0, 3)
                      : []
                    ).map((inquiry) => (
                      <button
                        key={inquiry.id}
                        className="bg-gray-6 flex w-full rounded-[5px] px-5 py-4"
                        onClick={() => {
                          router.push(`/inquiry/${inquiry.id}`);
                        }}
                      >
                        <div className="w-[25%] truncate text-left font-semibold">
                          {getInquiryCategoryDisplayName(inquiry.category)}
                        </div>
                        <div className="w-[60%] truncate text-left">
                          {inquiry.title}
                        </div>
                        <div className="w-[15%] text-right">
                          {getInquiryStatusDisplayName(inquiry.status)}
                        </div>
                      </button>
                    ))}
                  {/* {activeTab === 'myInquiries' &&
                    myInquiries.content.length < 1 && (
                      <div className="py-5 text-center text-gray-400">
                        내가 작성한 문의 글이 없습니다.
                      </div>
                    )} */}
                  {activeTab === 'bookedEvents' &&
                    bookedEvents.length > 0 &&
                    (Array.isArray(bookedEvents)
                      ? bookedEvents.slice(0, 3)
                      : []
                    ).map((event) => (
                      <button
                        key={event.contentId}
                        className="bg-gray-6 flex rounded-[5px] px-5 py-4"
                        onClick={() => {
                          router.push(`/event/${event.contentId}`);
                        }}
                      >
                        <div className="w-[25%] truncate text-left font-semibold">
                          {event.category}
                        </div>
                        <div className="w-[60%] truncate text-left">
                          {event.contentTitle}
                        </div>
                        <div className="w-[15%] text-right">
                          {new Date(event.selectedDate).toLocaleDateString(
                            'ko-KR',
                            {
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                            },
                          )}
                        </div>
                      </button>
                    ))}
                  {activeTab === 'bookedEvents' && bookedEvents.length < 1 && (
                    <div className="py-5 text-center text-gray-400">
                      예약한 행사가 없습니다.
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-7 h-full w-[calc(100%*(440/1440))] rounded-[5px] px-5 py-[26px]">
              <div className="mb-5 flex justify-between border-b-1 border-[#4d4d4d] pb-4 text-[#a8a8a8]">
                <div>
                  {selectedDate
                    ? `${moment(selectedDate).format('YYYY년 MM월 DD일')} 일정`
                    : '오늘의 일정'}
                </div>
                <button onClick={() => setShowDailyEventsModal(true)}>
                  <LucideArrowUpRight />
                </button>
              </div>
              <div className="flex flex-col gap-[15px]">
                {dailyEventsLoading ? (
                  <div className="flex h-20 items-center justify-center">
                    <HashLoader color="#36d7b7" size={30} />
                  </div>
                ) : dailyEvents.length > 0 ? (
                  dailyEvents.slice(0, 4).map((event) => (
                    <div key={event.calendarId}>
                      <div className="flex items-center gap-5">
                        <div className="flex-shrink-0">
                          <Image
                            src={mapIcon}
                            alt="icon"
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="flex min-w-0 flex-grow flex-col items-baseline gap-[3px]">
                          <div className="text-gray-1 w-full truncate font-semibold">
                            {event.title}
                          </div>
                          <div className="text-sm font-medium text-[#7e7e7e]">
                            {new Date(event.selectedDate).toLocaleDateString(
                              'ko-KR',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              },
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400">
                    일정이 없습니다.
                  </div>
                )}
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
              src={userInfo.imageUrl || profileImg}
              alt="profile"
              className="rounded-full bg-black"
              width={100} // 적절한 width와 height를 지정해주세요
              height={100} // 적절한 width와 height를 지정해주세요
            />
            <div className="text-xl">{userInfo.nickname} 님</div>
            <div className="flex gap-5">
              <span className="text-[#999999]">
                팔로워{' '}
                <span className="text-white">{userInfo.followerCount}</span>
              </span>
              <span className="text-[#999999]">
                팔로잉{' '}
                <span className="text-white">{userInfo.followingCount}</span>
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
      {showFollowerModal && (
        <FollowListModal
          users={followers}
          onClose={() => setShowFollowerModal(false)}
          title="팔로워"
          onUpdate={fetchFollowData}
        />
      )}
      {showFollowingModal && (
        <FollowListModal
          users={followings}
          onClose={() => setShowFollowingModal(false)}
          title="팔로잉"
          onUpdate={fetchFollowData}
        />
      )}
      {showMyPostsModal && (
        <DetailListModal
          title="내가 작성한 모임 글"
          data={leaderGroups}
          onClose={() => setShowMyPostsModal(false)}
          renderItem={(group) => (
            <div
              key={group.groupId}
              className="bg-gray-6 flex cursor-pointer rounded-[5px] px-5 py-4"
              onClick={() => {
                router.push(`/gathering/${group.groupId}`);
                setShowMyPostsModal(false);
              }}
            >
              <div className="w-[25%] truncate font-semibold">
                {group.groupTitle}
              </div>
              <div className="w-[60%] truncate">{group.explain}</div>
              <div className="w-[15%] text-right">
                {group.groupDate.split('T')[0].replace(/-/g, '')}
              </div>
            </div>
          )}
        />
      )}
      {showMyInquiriesModal && (
        <DetailListModal
          title="내 문의 내역"
          data={myInquiries}
          onClose={() => setShowMyInquiriesModal(false)}
          renderItem={(inquiry) => (
            <button
              key={inquiry.id}
              className="bg-gray-6 flex cursor-pointer rounded-[5px] px-5 py-4"
              onClick={() => {
                router.push(`/inquiry/${inquiry.id}`);
                setShowMyInquiriesModal(false);
              }}
            >
              <div className="w-[25%] truncate text-left font-semibold">
                {getInquiryCategoryDisplayName(inquiry.category)}
              </div>
              <div className="w-[60%] truncate text-left">{inquiry.title}</div>
              <div className="w-[15%] text-right">
                {getInquiryStatusDisplayName(inquiry.status)}
              </div>
            </button>
          )}
        />
      )}
      {showBookedEventsModal && (
        <DetailListModal
          title="예약한 행사"
          data={bookedEvents}
          onClose={() => setShowBookedEventsModal(false)}
          renderItem={(event) => (
            <div
              key={event.contentId}
              className="bg-gray-6 flex cursor-pointer rounded-[5px] px-5 py-4"
              onClick={() => {
                router.push(`/event/${event.contentId}`);
                setShowBookedEventsModal(false);
              }}
            >
              <div className="w-[25%] truncate font-semibold">
                {event.category}
              </div>
              <div className="w-[60%] truncate">{event.contentTitle}</div>
              <div className="w-[15%] text-right">
                {new Date(event.selectedDate).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })}
              </div>
            </div>
          )}
        />
      )}
      {showDailyEventsModal && (
        <DetailListModal
          title={
            selectedDate
              ? `${moment(selectedDate).format('YYYY년 MM월 DD일')} 일정`
              : '오늘의 일정'
          }
          data={dailyEvents}
          onClose={() => setShowDailyEventsModal(false)}
          renderItem={(event) => (
            <div key={event.calendarId}>
              <div className="flex items-center gap-5">
                <Image src={mapIcon} alt="icon" />
                <div className="flex flex-col items-baseline gap-[3px]">
                  <div className="text-gray-1 font-semibold">{event.title}</div>
                  <div className="text-sm font-medium text-[#7e7e7e]">
                    {new Date(event.selectedDate).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      )}

      {showEditProfileModal && userInfo && (
        <EditProfileModal
          isOpen={showEditProfileModal}
          onClose={() => setShowEditProfileModal(false)}
          currentNickname={userInfo.nickname}
          currentIntroduction={userInfo.introduction || ''}
          currentImageUrl={userInfo.imageUrl || basicProfileImg.src}
          onSave={async (
            newNickname,
            newIntroduction,
            newImageUrl,
            newImageFile,
          ) => {
            try {
              const imageChanged =
                newImageFile !== undefined || newImageUrl !== userInfo.imageUrl;
              const profileRequest: ProfileRequest = {
                introduction: newIntroduction,
                imageChanged: imageChanged,
              };

              if (newImageFile) {
                profileRequest.image = newImageFile;
              } else if (
                newImageUrl === basicProfileImg.src &&
                userInfo.imageUrl !== basicProfileImg.src
              ) {
                // If image is reset to basic and was not basic before, set image to null to delete it
                profileRequest.image = null; // Or a specific value to indicate deletion
              }

              if (userInfo.nickname !== newNickname) {
                await changeNickname(newNickname);
                setAuthStoreNickname(newNickname);
              }
              await updateProfile(profileRequest);

              setUserInfo({
                ...userInfo,
                nickname: newNickname,
                introduction: newIntroduction,
                imageUrl: newImageUrl,
              });
              Toast.success('프로필이 성공적으로 업데이트되었습니다.');
            } catch (error) {
              console.error('Failed to update profile:', error);
              Toast.error('프로필 업데이트에 실패했습니다.');
            }
          }}
          onAccountDelete={() => {
            setShowWithdrawConfirmModal(true); // 확인 모달을 띄웁니다.
            setShowEditProfileModal(false); // EditProfileModal은 닫습니다.
          }}
        />
      )}

      {showWithdrawConfirmModal && (
        <ConfirmModal
          isOpen={showWithdrawConfirmModal}
          onClose={() => setShowWithdrawConfirmModal(false)}
          onConfirm={async () => {
            try {
              await withdrawUser();
              Toast.success('회원 탈퇴가 완료되었습니다.');
              router.push('/');
            } catch (error) {
              console.error('Failed to withdraw user:', error);
              Toast.error('회원 탈퇴에 실패했습니다.');
            } finally {
              setShowWithdrawConfirmModal(false); // 확인 모달 닫기
            }
          }}
          title="회원 탈퇴 확인"
          message="정말로 회원 탈퇴를 하시겠습니까? 모든 정보가 삭제됩니다."
        />
      )}
    </>
  );
}
