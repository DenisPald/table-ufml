import { HStack, Box, Center } from "native-base";
import useFetch from "react-fetch-hook";
import Constants from "expo-constants";

export function SingleClassInfo({ lesson_id }) {
  const host = Constants.expoConfig.extra.host;
  const url = host + "/lesson/" + lesson_id;
  const { isLoading, data, error } = useFetch(url, { mode: "cors" });

  if (error || isLoading) {
    return <></>;
  }

  return (
    <Box
      _dark={{ bg: "muted.800" }}
      borderColor="muted.500"
      py="2"
      borderBottomWidth="1px"
      borderLeftWidth="1px"
      borderRightWidth="1px"
    >
      <HStack justifyContent="space-around">
        <Center flex={1}>{data.lesson.time}</Center>

        <Center flex={1}>{data.lesson.subject}</Center>

        <Center flex={1}>{data.lesson.teacher}</Center>

        <Center flex={1}>{data.lesson.audience}</Center>
      </HStack>
    </Box>
  );
}

export function ClassInfoRow() {
  return (
    <Box
      _dark={{ bg: "muted.800" }}
      borderColor="muted.500"
      py="2"
      borderWidth="1px"
      borderTopRadius="lg"
    >
      <HStack justifyContent="space-around">
        <Center flex={1}>Время</Center>

        <Center flex={1}>Предмет</Center>

        <Center flex={1}>Преподаватель</Center>

        <Center flex={1}>Аудитория</Center>
      </HStack>
    </Box>
  );
}
