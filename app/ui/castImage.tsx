import { AspectRatio, Image } from '@chakra-ui/react';
import { Person } from '../store/useStore';

export default function CastImage(props: { data: Person }) {
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
