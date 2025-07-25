'use client'

import { useAuthStore } from "@/stores/UseAuthStore";

type Props = {
  hostName:string,
  hostEmail:string,
  tags:string[],
  hostExplain:string
}
export default function GatheringHostBox({hostName,hostEmail,tags,hostExplain}:Props) {
  const user = useAuthStore(s => s.user);

  //팔로우 기능 컴포넌트로 분리
  const follow = async (email:string)=>{
    try {
      const response = await fetch(`https://funfun.cloud/api/follows/${email}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = response.json();
    console.log('팔로우 성공 : ', data)
    } catch(error){
      console.log('팔로우 실패 : ', error)
    }
  }

  return (
    <div className="flex w-full gap-[20px] rounded-[5px] border border-[#393939] p-[20px]">
      <div className="bg-gray-3 size-[100px] rounded-full"></div>
      <div className="flex grow-1 flex-col">
        <div className="text-[18px] text-white">{hostName}</div>
        <div className="pt-[11.33px] pb-[14.33px] text-[#ababab]">
          {hostExplain}
        </div>
        <div className="flex gap-[10px] text-[14px]">
          {tags.map(data => <div key={data} className="bg-gray-4 rounded-full px-[17px] py-[4px] text-white">{data}</div>)}
        </div>
      </div>
      <div className="flex items-center justify-end">
        {hostEmail === user?.email ? '':<button onClick={()=> follow(hostEmail)} className="bg-gray-4 rounded-full px-[16px] py-[6px] text-white">
          팔로우
        </button>}
        {/* <button className="bg-gray-4 rounded-full px-[16px] py-[6px] text-white">
          팔로우
        </button> */}
      </div>
    </div>
  );
}
