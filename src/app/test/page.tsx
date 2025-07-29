'use client'
import ProfileCalendar from "@/components/calendar/ProfileCalendar";
import 'moment-timezone';

export default function page(){
  return (
    <>
    <div className="w-[467px] h-[360px] overflow-hidden">
        <ProfileCalendar/>
    </div>

    </>
  );
};