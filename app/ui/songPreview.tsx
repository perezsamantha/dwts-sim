'use client';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useState } from 'react';

export default function SongPreview(props: { uri: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <Box width="95%" display="flex" flexDirection="column" alignItems="center">
      <Text margin={1}>Song Preview</Text>
      {loading ? <Spinner size="lg" margin={4} /> : null}
      <iframe
        style={{
          borderRadius: '14px',
          opacity: loading ? '0%' : '100%',
          height: loading ? '0' : '80px',
        }}
        src={`https://open.spotify.com/embed/track/${props.uri.slice(
          14
        )}?utm_source=generator`}
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        onLoad={() => setLoading(false)}
      ></iframe>
    </Box>
  );
}
