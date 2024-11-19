/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import qs from 'query-string';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useSocket } from '@/components/providers/socketProvider';
import axios from 'axios';

type Props = {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useChatQuery = ({queryKey,apiUrl,paramKey,paramValue}:Props) => {
  const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = undefined}) => {
    console.log("pageParam",pageParam,"apiUrl",apiUrl,"paramKey",paramKey,"paramValue",paramValue)
    const url = qs.stringifyUrl({
      url:apiUrl,
      query:{
        cursor: pageParam,
        [paramKey]: paramValue,
      }
    }, { skipNull:true })
    console.log("url",url)
    const res = await fetch(url,{cache:'no-store'});
    const data = await res.json() || { messages: [], nextCursor: null };

    return data
  }

  
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  status
} = useInfiniteQuery({
  queryKey: [queryKey],
  queryFn: fetchMessages,
  getNextPageParam: (lastPage:any) => lastPage?.nextCursor,
  refetchInterval: isConnected ? false : 1000,
}as any);

return {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  status
}

}