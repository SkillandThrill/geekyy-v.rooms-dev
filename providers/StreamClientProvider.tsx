'use client'

import { tokenProvider } from '@/actions/stream.actions';
import { useUser } from '@clerk/nextjs';
import {
    StreamVideo,
    StreamVideoClient
  } from '@stream-io/video-react-sdk';
import Loader from '@/components/Loader';
import { ReactNode, useEffect, useState } from 'react';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

   const StreamVideoProvider = ({children}:{children: ReactNode}) => {
    const[videoCLient,setVideoClient] = useState<StreamVideoClient>()
    const {user,isLoaded} = useUser();
    useEffect(()=>{
      if(!isLoaded ||!user) return;
      if(!apiKey) throw new Error('Stream api key missing ')
      const client = new StreamVideoClient({
        apiKey,
        user:{
          id: user?.id,
          name:user?.username || user?.id,
          image:user?.imageUrl,
        },
        tokenProvider,
      })
      setVideoClient(client);
    },[user,isLoaded]);

    if(!videoCLient) return <Loader/>


    return (
      <StreamVideo client={videoCLient}>
        {children}
      </StreamVideo>
    );
  };

  export default StreamVideoProvider;
