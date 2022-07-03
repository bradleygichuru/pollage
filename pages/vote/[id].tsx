import { Poll, Opinion } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { trpc } from "../../lib/trpc";
import puff from "../../public/puff.svg";
import { MdOutlineContentCopy } from "react-icons/md";
import { BsHeartFill } from "react-icons/bs";
//TODO handle votes

const Vote: NextPage = (props: any) => {
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pollData, setPollData] = useState<
    | (Poll & {
        opinions: Opinion[];
      })
    | null
  >();

  console.log(props.id);
  useEffect(() => {
    console.log("voted", voted);
  }, [voted]);
  const getPoll = () => {};
  const { data, error, isLoading } = trpc.useQuery([
    "get-poll",
    { id: props.id as string },
  ]);
  const calculatePercentage = (count:number,total:number) => {
    let percent = (count/total) * 100;
    return percent
  }
  const castvoteMutation = trpc.useMutation(["cast-vote"]);
  const castVote = (id: string, e: any) => {
    /* e.preventDefault(); */

    castvoteMutation.mutateAsync({ opinionId: id });
    navigator.clipboard.writeText("lscpi -l");
    setVoted((voted) => !voted);
  };
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
      <button className="btn gap-2">
        Copy the link to this poll
        <MdOutlineContentCopy
          onClick={(e) => {
            navigator.clipboard.writeText(
              `localhost:3000/vote/${props.id as string}`
            ); //TODO put correct url on production
          }}
        />
      </button>
      <p className="text-2xl font-titan">{data?.name}</p>
      <p>{`${voted}`}</p>
      <div className="flex ">
        <div className="flex flex-col m-20 ">
          <button
            disabled={voted}
            className="bg-[#F5F5F5] justify-center flex rounded-xl border-2 border-[#808080] h-28 max-w-xs btn btn-outline btn-primary"
            onClick={(e) => {
              castVote(data!.opinions[0]!.id, e);
            }}
          >
            {`Vote ${data?.opinions[0].description}`}
          </button>
          <div className="flex justify-center">
            <p className="mt-6">{calculatePercentage(data?.opinions[0].count!,data?.opinions[0].count! + data?.opinions[1].count!)}%</p>
          </div>
        </div>
        <p className="m-20 font-bold">vs</p>
        <div className="flex flex-col m-20 ">
          <button
            disabled={voted}
            className="bg-[#F5F5F5] justify-center flex border-2 rounded-xl border-[#808080] h-28 max-w-xs btn btn-outline btn-primary"
            onClick={(e) => {
              castVote(data!.opinions[1]!.id, e);
            }}
          >
            {`Vote ${data?.opinions[1].description}`}
          </button>
          <div className="flex justify-center">
            <p className="mt-6">{calculatePercentage(data?.opinions[1].count!,data?.opinions[0].count! + data?.opinions[1].count!)} %</p>
          </div>
        </div>
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div className="flex flex-row">
          <h3>From Github with</h3> <BsHeartFill className=" m-1"/>
        </div>
      </footer>
    </div>
  );
};
export default Vote;
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let id = params?.id as string;
  console.log(id);
  return { props: { id } };
};
