import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import {Videos, ChannelCard} from './'
import { fetchFromApi } from '../utils/fetchFromApi';



const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);const [videos, setVideos] = useState([])
  const {id} = useParams();

  useEffect(() => {
    fetchFromApi(`channels?part=snippet&id=${id}`).then(
      (data) => {
        console.log(data);
        setChannelDetail(data?.items[0]);
      }
    );

    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`).then((data) => {
      console.log(data);
      setVideos(data?.items);
    });
    // return () => {
    //   second
    // }
  }, [id])
  
  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 25%, rgba(9,9,121,1) 47%, rgba(0,212,255,1) 100%',zIndex:10,height:'300px'}}/>
      <ChannelCard channelDetail={channelDetail} marginTop='-93px'/>
      </Box>
      <Box display='flex' p='2'>
        <Box sx={{mr:{sm:'100px'}}}/>
        <Videos videos={videos}/>
      </Box>
    </Box>
  )
}

export default ChannelDetail