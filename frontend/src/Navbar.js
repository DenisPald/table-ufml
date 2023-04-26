import { Box, Heading, HStack, Input, Center } from "native-base";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Navbar() {
  const [text, setText] = useState("");
  const navigation = useNavigation();
  return (
    <Box py={4} mb={5} shadow={5}>
      <HStack justifyContent="space-between" alignItems="center">
        <Center>
          <Heading size="md" mx={4} onPress={() => navigation.navigate("Home")}>
            Расписание ЮФМЛ
          </Heading>
        </Center>
        <Center position="absolute" right="0" left="0" mx="auto" w="50%">
          <Input
            shadow={3}
            minW="100%"
            placeholder="Введите номер группы"
            value={text}
            onChange={(event) => setText(event.target.value)}
            onSubmitEditing={() => {
              navigation.navigate("Group", { group: text });
              setText("");
            }}
          />
        </Center>
      </HStack>
    </Box>
  );
}
