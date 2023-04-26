import React from "react";
import { Box, Text, Center, Heading, VStack } from "native-base";

export default function MainPageBody() {
  return (
    <Box>
      <Center flex={1}>
        <VStack space={5} alignItems="center">
          <Heading size="xl">Расписание ЮФМЛ</Heading>
          <Text fontSize="md">Введите номер группы</Text>
        </VStack>
      </Center>
    </Box>
  );
}
