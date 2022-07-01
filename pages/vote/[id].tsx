import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { trpc } from "../../lib/trpc";
//TODO handle votes
const Vote: NextPage = (props: any) => {
  const [vote, setVote] = useState("");
  console.log(props.id);
  const { data, error, isLoading } = trpc.useQuery([
    "get-poll",
    { id: props.id as string },
  ]);
  console.log(data);
  return (
    <div className="grid h-screen place-items-center">
      <p className="text-2xl font-titan">Pollage</p>
      <div className="flex ">
        <div className="flex flex-col m-20 ">
          <div className="bg-[#F5F5F5] justify-center flex rounded-xl border-2 border-[#808080] h-28 max-w-xs">
            afwawf
          </div>
          <p className="mt-5 font-extrabold	text-2xl font-jetbrains">
            {data?.options[0].description}
          </p>
        </div>
        <p className="m-20 font-bold">vs</p>
        <div className="flex flex-col m-20 ">
          <div className="bg-[#F5F5F5] justify-center flex border-2 rounded-xl border-[#808080] h-28 max-w-xs">
            afwawf
          </div>
          <p className="mt-5 font-extrabold	text-2xl font-jetbrains">
            {data?.options[1].description}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Vote;
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let id = params?.id as string;
  console.log(id);
  return { props: { id } };
};
