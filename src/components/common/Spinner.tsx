import { HashLoader } from "react-spinners";

export default function Spinner(){
  return (
    <>
    <div className="flex w-full h-screen items-center justify-center fixed top-0 left-0">
        <HashLoader color="#36d7b7" size={50} />
    </div>
    </>
  );
};