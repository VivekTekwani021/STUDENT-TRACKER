const axios = require("axios");

exports.getYouTubeVideos = async (topic) => {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        q: topic,
        maxResults: 6,
        type: "video",
        key: process.env.YOUTUBE_API_KEY
      }
    }
  );

  return response.data.items.map((item) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    channel: item.snippet.channelTitle
  }));
};
