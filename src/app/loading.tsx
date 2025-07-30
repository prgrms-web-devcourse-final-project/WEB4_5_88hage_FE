import { HashLoader } from 'react-spinners';

export default function loading() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <HashLoader color="#36d7b7" size={50} />
      </div>
    </>
  );
}
