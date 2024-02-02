import { AspectRatio, Box, Image } from '@chakra-ui/react';
import { Dancer } from '../store/interfaces';
import { default as NextImage } from 'next/image';
import { useEffect, useState } from 'react';

export default function CastImage(props: { data: Dancer; elim: boolean }) {
  const [imgSrc, setImgSrc] = useState(props.data.image);

  useEffect(() => {
    setImgSrc(props.data.image);
  }, [props.data.image]);

  const imageStyle = {
    borderRadius: 10,
    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.15)',
    filter: props.elim ? 'grayscale(95%)' : 'grayscale(0)',
  };

  return (
    <Box width="100%">
      <AspectRatio ratio={1}>
        {/* <Image
          src={props.data.image}
          alt={`${props.data.firstName} ${props.data.lastName}`}
          fallbackSrc="/images/mirrorball.png"
          style={imageStyle}
        /> */}

        <NextImage
          src={imgSrc || '/images/mirrorball.png'}
          alt={`${props.data.firstName} ${props.data.lastName}`}
          object-fit="cover"
          unoptimized={props.data.type === 'custom'}
          fill
          sizes="(max-width: 400px) 100vw"
          placeholder="blur"
          blurDataURL="/images/mirrorball.png"
          style={imageStyle}
          onError={() => setImgSrc('/images/mirrorball.png')}
        />
      </AspectRatio>
    </Box>
  );
}
