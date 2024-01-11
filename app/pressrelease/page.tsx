import { Box } from '@chakra-ui/react';
import music from '../data/music.json';
import { sortMusic } from '../lib/logic';

export default function PressRelease() {
  //TODO: redirect when needed
  //console.log(music);
  const musicByGroup = sortMusic(music, (v) => v.Style);
  //console.log(musicByGroup);

  return (
    <Box>
      <h1>Testing</h1>
      {music.map((song, i) => (
        <Box key={i} className="flex flex-row">
          <p>
            {song.Title} by {song.Artist} - {song.Style}
          </p>
        </Box>
      ))}
    </Box>
  );
}
