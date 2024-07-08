import React, { useState } from 'react';

export default function Embed() {
  const [videoUrl, setVideoUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');

  const handleChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const standardUrlPattern = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const shortUrlPattern = /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/;
    let match = videoUrl.match(standardUrlPattern);
    if (!match) {
      match = videoUrl.match(shortUrlPattern);
    }
    if (match && match[1]) {
      const newURL = `https://www.youtube.com/embed/${match[1]}`;
      setEmbedUrl(newURL);
    } else {
      alert('Invalid YouTube URL');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control url"
          placeholder="Paste YouTube Video URL"
          value={videoUrl}
          onChange={handleChange}
        />
        <button className="btn btn-success" type="submit">
          Show Video
        </button>
      </form>
      {embedUrl && (
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          ></iframe>
        </div>
      )}
    </div>
  );
}
