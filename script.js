// Replace 'YOUR_CHANNEL_ID' with the actual YouTube channel ID
const channelID = 'UCdHsLCS-XLKAn4igkvswxYg';
const apiKey = 'AIzaSyDiAN6V5Vu3sp_08BYfq4U8XQzzIQCJY9U';

const videoList = document.getElementById('video-list');
const filterButton = document.getElementById('filter-button');
const videoFilter = document.getElementById('video-filter');
const maxResults = 500; // Adjust the number as needed;
let nextPageToken = '';

// Function to fetch and display YouTube channel videos
function fetchYouTubeVideos() {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${maxResults}`)
        .then(response => response.json())
        .then(data => {
            const videos = data.items;
            videoList.innerHTML = '';

            videos.forEach(video => {
                const videoItem = document.createElement('div');
                videoItem.classList.add('video-item');
                videoItem.innerHTML = `
                    <h3>${video.snippet.title}</h3>
                    <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                        <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
                    </a>
                `;
                videoList.appendChild(videoItem);
            });
        })
        .catch(error => console.error('Error fetching videos:', error));
}
 // If there are more results, update nextPageToken and call fetchVideos() again
      if (data.nextPageToken) {
        nextPageToken = data.nextPageToken;
        fetchVideos();
      }
filterButton.addEventListener('click', () => {
    const filterText = videoFilter.value.toLowerCase();
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(videoItem => {
        const title = videoItem.querySelector('h3').textContent.toLowerCase();
        if (title.includes(filterText)) {
            videoItem.style.display = 'block';
        } else {
            videoItem.style.display = 'none';
        }
    });
});

fetchYouTubeVideos();
