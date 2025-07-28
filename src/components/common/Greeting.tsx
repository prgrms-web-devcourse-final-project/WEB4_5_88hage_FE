export default function Greeting() {
  console.log('Greeting 렌더링!');
  return (
    <>
      <h1 className="mb-[20px] text-[16px] font-extrabold text-white lg:mb-10 lg:text-[24px] xl:pl-[calc(max(0px,(100vw-1600px)*0.4079166666666667))] xl:text-[32px]">
        안녕하세요, 홍길동님 👋🏼
      </h1>
    </>
  );
}
