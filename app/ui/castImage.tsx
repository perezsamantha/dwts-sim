import { AspectRatio, Box, Image } from '@chakra-ui/react';
import { Dancer } from '../store/interfaces';

export default function CastImage(props: { data: Dancer }) {
  return (
    <Box width="100%">
      <AspectRatio ratio={1}>
        <Image
          //TODO: change back to data.image
          src={props.data.image}
          alt={`${props.data.firstName} ${props.data.lastName}`}
          borderRadius={5}
          fallbackSrc="/images/mirrorball.png"
        />
      </AspectRatio>
    </Box>
  );
}
