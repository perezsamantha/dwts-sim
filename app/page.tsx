'use client';
import { Box, Button, Tag, TagLabel, Text, Wrap } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Header from './ui/header';
import { sortStyles } from './lib/logic';

export default function Home() {
  const router = useRouter();
  const styles = sortStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={8}>
      <Header type="home" week={0} />
      <Text>DWTS Simulator</Text>
      <Text>tips</Text>
      <Text>- invalid images will use a fallback image of a mirrorball</Text>
      <Text>Featured Styles</Text>
      <Wrap justify="center">
        {styles.map((style) => (
          <Tag key={style} size="md" borderRadius="full">
            <TagLabel>{style}</TagLabel>
          </Tag>
        ))}
      </Wrap>
      <Button onClick={() => router.push('/setup')}>Setup</Button>
    </Box>
  );
}
