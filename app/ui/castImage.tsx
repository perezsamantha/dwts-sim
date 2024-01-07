import { AspectRatio, Image } from '@chakra-ui/react';

export default function CastImage() {
  return (
    <AspectRatio ratio={1}>
      <Image
        src="https://media.allure.com/photos/6127ac0b238beb835812ce4c/4:3/w_2247,h_1685,c_limit/Ariana%20Grande%20Allure%20Cover%20No%20Coverlines.jpg"
        //src="/pros/dani.jpeg"
        alt="ariana grande"
        borderRadius={5}
      />
    </AspectRatio>
  );
}
