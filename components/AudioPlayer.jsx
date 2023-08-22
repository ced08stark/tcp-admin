import React from 'react'

function AudioPlayer({url}) {
  return (
    <div>
      <audio controls>
        <source src={url} type="audio/mpeg" />
        Votre navigateur ne supporte pas la balise audio.
      </audio>
    </div>
  );
}

export default AudioPlayer
