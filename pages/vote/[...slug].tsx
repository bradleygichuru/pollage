import type { NextPage } from "next";

const Vote: NextPage = () => {
  return (
    <div className="grid h-screen place-items-center">
      <p className="text-2xl font-titan">Pollage</p>
      <div className="flex ">
        <div className="flex flex-col m-20 ">
          <div className="bg-[#F5F5F5] justify-center flex rounded-xl border-2 border-[#808080] h-28 max-w-xs">
            afwawf
          </div>
          <p className="mt-5 font-extrabold	text-2xl font-jetbrains">
            poll description
          </p>
        </div>
        <p className="m-20 font-bold">vs</p>
        <div className="flex flex-col m-20 ">
          <div className="bg-[#F5F5F5] justify-center flex border-2 rounded-xl border-[#808080] h-28 max-w-xs">
            afwawf
          </div>
          <p className="mt-5 font-extrabold	text-2xl font-jetbrains">
            poll description
          </p>
        </div>
      </div>
    </div>
  );
};
export default Vote;
