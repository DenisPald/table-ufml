import DayClassInfo from "./DayClassInfo";
import Constants from "expo-constants";
import { VStack } from "native-base";

export default function GroupInfo(props) {
  const getDates = (countOfDays) => {
    let dates = [];
    for (let i = 0; i < countOfDays; i++) {
      var date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const params = props.route.params;
  const host = Constants.expoConfig.extra.host;

  return (
    <VStack space={10}>
      {getDates(7).map((date) => {
        const url = host + "/schedule/" + params.group + "/" + date;
        return <DayClassInfo url={url} key={date} />;
      })}
    </VStack>
  );
}
