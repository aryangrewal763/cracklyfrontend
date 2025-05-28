import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videos, setVideos] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');

  // Format file size in human-readable format
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get list of existing videos
  const fetchVideos = async () => {
    try {
      const response = await axios.get('/api/videos');
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Start video recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setPreviewUrl(URL.createObjectURL(blob));

        // Upload video
        const formData = new FormData();
        formData.append('video', blob, `recording-${Date.now()}.webm`);
        console.log('Uploading video:', formData.get('video'));

        await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        fetchVideos();
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setRecording(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <video ref={videoRef} autoPlay muted className="w-full mb-4 rounded-lg bg-black" />

        <div className="flex gap-4 mb-4">
          <button
            onClick={recording ? stopRecording : startRecording}
            className={`px-4 py-2 rounded ${recording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            {recording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>

        {previewUrl && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
            <video controls src={previewUrl} className="w-full rounded-lg bg-black" />
          </div>
        )}
      </div>

      {/* Display all recorded videos */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recorded Videos</h2>
        {videos.length === 0 ? (
          <p>No videos recorded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video.filename} className="bg-white p-3 rounded-lg shadow">
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <video
                    controls
                    preload="metadata"
                    className="absolute top-0 left-0 w-full h-full rounded-lg bg-black"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      console.error('Video playback error:', e);
                      e.target.parentNode.innerHTML = '<div class="absolute top-0 left-0 w-full h-full rounded-lg bg-gray-200 flex items-center justify-center text-gray-600">Unable to play video</div>';
                    }}
                  >
                    <source src={`https://vercel.com/aryans-projects-c0da387d/cracklybackend/9r7NTg4fcsR4MEqFn6UtDPrdGoAz/uploads/video/${video.filename}`} type="video/webm" />
                    Your browser does not support HTML5 video.
                  </video>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 truncate">{video.filename}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {new Date(video.uploadDate).toLocaleString()}
                      <span className="ml-2">{formatBytes(video.size)}</span>
                    </span>
                    <a
                      href={`https://vercel.com/aryans-projects-c0da387d/cracklybackend/9r7NTg4fcsR4MEqFn6UtDPrdGoAz/uploads/video/${video.filename}`}
                      download={video.filename}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded transition-colors duration-200"
                      onClick={(e) => {
                        // Prevent default if download attribute is not supported
                        if (!('download' in document.createElement('a'))) {
                          e.preventDefault();
                          alert('Your browser does not support direct downloads. Right-click on the video and select "Save As" instead.');
                        }
                      }}
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;