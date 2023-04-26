import { Box, Text } from "native-base";
import { SingleClassInfo, ClassInfoRow } from "./SingleClassInfo";
import useFetch from "react-fetch-hook";

const daysOfWeek = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

export default function DayClassInfo({ url }) {
  const { isLoading, data, error } = useFetch(url, { mode: "cors" });

  if (error || isLoading) {
    return <></>;
  }

  return (
    <Box>
      <Text>
        {data.schedule.date} {daysOfWeek[data.schedule.day_of_week - 1]}
      </Text>
      <ClassInfoRow />

      {data.schedule.lessons_id.map((lesson_id) => (
        <SingleClassInfo key={lesson_id} lesson_id={lesson_id} />
      ))}
    </Box>
  );
}
