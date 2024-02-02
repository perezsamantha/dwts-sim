import { default as NextImage } from 'next/image';
import { Dancer } from '../store/interfaces';
import { useColorMode } from '@chakra-ui/react';
import { useState } from 'react';

export default function AvatarImage(props: { dancer: Dancer }) {
  const { dancer } = props;
  const { colorMode } = useColorMode();
  const [imgSrc, setImgSrc] = useState(dancer.image);

  const imageStyle = {
    borderRadius: '50%',
    //boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.15)',
    border: `2px solid ${colorMode === 'dark' ? '#1A202C' : 'white'}`,
  };

  return (
    <NextImage
      src={imgSrc || '/images/mirrorball.png'}
      alt={`${dancer.firstName} ${dancer.lastName}`}
      object-fit="cover"
      unoptimized={dancer.type === 'custom'}
      fill
      sizes="(max-width: 400px) 100vw"
      placeholder="blur"
      blurDataURL="/images/mirrorball.png"
      style={imageStyle}
      onError={() => setImgSrc('/images/mirrorball.png')}
    />
  );
}
