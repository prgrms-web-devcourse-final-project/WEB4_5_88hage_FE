import { SiNaver } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';

export default function LoginButton({ type }: { type: string }) {
  const buttonStyles =
    'relative flex w-full items-center justify-center rounded py-3 t3 font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#00FFD1]';

  const naverStyles = 'bg-[#03C75A] text-white';
  const googleStyles = 'bg-white text-black';
  const iconWrapperStyles = 'absolute left-4';

  return (
    <>
      {type === 'naver' && (
        <button className={`${buttonStyles} ${naverStyles}`}>
          <span className={iconWrapperStyles}>
            <SiNaver size={16} />
          </span>
          <span>NAVER 로그인</span>
        </button>
      )}
      {type === 'google' && (
        <button className={`${buttonStyles} ${googleStyles}`}>
          <span className={iconWrapperStyles}>
            <FcGoogle size={20} />
          </span>
          <span>Google 로그인</span>
        </button>
      )}
    </>
  );
}
