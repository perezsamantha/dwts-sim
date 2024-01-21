import { AspectRatio, Box, Image } from '@chakra-ui/react';
import { Dancer } from '../store/useStore';

export default function CastImage(props: { data: Dancer }) {
  return (
    <AspectRatio ratio={1}>
      <Image
        src={props.data.image}
        alt={`${props.data.firstName} ${props.data.lastName}`}
        borderRadius={5}
        fallbackSrc="/mirrorball.png"
      />
    </AspectRatio>
  );
}
