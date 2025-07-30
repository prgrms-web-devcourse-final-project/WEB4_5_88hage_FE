'use client';
import Image from 'next/image';
import logo from '../../assets/images/logo.png';
import { useRouter } from 'next/navigation';

export default function Logo({ className }: { className?: string }) {
  const router = useRouter();
  const goHome = () => {
    router.push('/');
  };
  return (
    <>
      <button className={className} onClick={() => goHome()}>
        <Image
          onClick={() => goHome()}
          src={logo}
          alt="logo"
          width={200}
          height={200}
        />
      </button>
    </>
  );
}
