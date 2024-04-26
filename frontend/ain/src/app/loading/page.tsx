'use client'
import useCreateStore from "@/store/createStore";

export default function LoadingPage() {

  const { mergeInput } = useCreateStore();

  console.log(mergeInput)

    return <div>
      <img src="" alt="" />
    </div>;
  }
  