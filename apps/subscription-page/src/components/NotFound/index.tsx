import { Heading, Text, Center } from "@chakra-ui/react";

export const NotFound = () => (
  <Center
    flexDir={"column"}
    width={402}
    height={243}
    color={"text.primary"}
    background={"bg.third"}
    border={"5px solid"}
    borderColor={"bg.secondary"}
    shadow={"card"}
    rounded={"lg"}
  >
    <Heading fontWeight={"bold"} textAlign={"center"} size={"md"}>
      Oooops!
    </Heading>
    <Heading fontWeight={"bold"} textAlign={"center"} size={"md"} mb={4}>
      We can’t find a channel here 🧐
    </Heading>
    <Text fontWeight={"medium"} textAlign={"center"} width={300} mt={4}>
      Make sure you reach this page through the Wherever Discord bot.
    </Text>
  </Center>
);
