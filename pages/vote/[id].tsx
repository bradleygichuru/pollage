import { SourceMap } from "module";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { trpc } from "../../lib/trpc";
import puff from "../../public/puff.svg";
//TODO handle votes

const Vote: NextPage = (props: any) => {
  const [voted, setVoted] = useState(false);
  const [loading,setLoading] = useState(false);
  
  console.log(props.id);
  useEffect(()=>{
    console.log("voted",voted)
  },[voted]);
  const getPoll = () =>{}
  const { data, error, isLoading } = trpc.useQuery([
    "get-poll",
    { id: props.id as string },
  ]);
  
  const castvoteMutation = trpc.useMutation(["cast-vote"]);
  const castVote = (id: string, e: any) => {
    /* e.preventDefault(); */
    castvoteMutation.mutate({ opinionId: id });
    setVoted(voted=>!voted);
  }
  console.log(data);
  if (isLoading == true) {
    return (
      <div className="grid h-screen place-items-center">
        <Image
          src={puff}
          width={64}
          height={64}
          alt="loading..."
          className=""
        />
      </div>
    );
  }
  return (
    <div className="grid h-screen place-items-center">
      <p className="text-2xl font-titan">{data?.name}</p>
      <p>{`${voted}`}</p>
      <div className="flex ">
        <div className="flex flex-col m-20 ">
          <button
            className="bg-[#F5F5F5] justify-center flex rounded-xl border-2 border-[#808080] h-28 max-w-xs btn btn-outline btn-primary"
            onClick={(e) => {
              castVote(data!.opinions[0]!.id, e);
            }}
          >
            {`Vote ${data?.opinions[0].description}`}
          </button>
          <div className="flex justify-center">
            <p className="mt-6">{data?.opinions[0].count}</p>
          </div>
        </div>
        <p className="m-20 font-bold">vs</p>
        <div className="flex flex-col m-20 ">
          <button
            className="bg-[#F5F5F5] justify-center flex border-2 rounded-xl border-[#808080] h-28 max-w-xs btn btn-outline btn-primary"
            onClick={(e) => {
              castVote(data!.opinions[1]!.id, e);
            }}
          >
            {`Vote ${data?.opinions[1].description}`}
          </button>
          <div className="flex justify-center">
            <p className="mt-6">{data?.opinions[1].count}</p>
          </div>
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
