import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Stack, Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import ReactPlayer from 'react-player'

import {Video, Videos} from './'
import { fetchFromApi } from '../utils/fetchFromApi';


const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([])
  const { id } = useParams();

  useEffect(() => {
    fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data) =>
      setVideos(data.items)
    );
    
  }, [id]);

  if (!videoDetail?.snippet) return "Loading...";
  const {snippet:{title,channelId,channelTitle}, statistics: {viewCount,likeCount}} = videoDetail
  // {title,channelId,channelTitle}

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "colomn", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h4" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction='row' justifyContent='space-between' sx={{color:'#fff'}} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{sm:'subtitle1',md:'h6'}} color='#fff'>{channelTitle}
                <CheckCircle sx={{fontSize:'12px',color:'gray',ml:'5px'}}/>
                </Typography>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{opacity:0.7,color:'#fff'}}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      <Box px={2} py={{md:1,xs:5}} justifyContent='center' alignItems='center'>
        <Videos videos={videos} direction='column'/>
      </Box>
      </Stack>


    </Box>
  );
}

export default VideoDetail