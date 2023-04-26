import { Text, Center, FormControl, Input, Box } from "native-base";
import { useState } from "react";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setInvalid] = useState(false);

  const navigation = useNavigation();

  const submit = () => {
    if (
      login === Constants.expoConfig.extra.login &&
      password === Constants.expoConfig.extra.password
    ) {
      navigation.navigate("Dashboard");
    } else {
      setPassword("");
      setInvalid(true);
    }
  };

  return (
    <Box alignItems="center">
      <Center w="100%" maxWidth="30%">
        <Text> Пожалуйста, авторизуйтесь </Text>
        <FormControl isRequired>
          <FormControl.Label> Логин </FormControl.Label>
          <Input
            type="login"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            isInvalid={isInvalid}
          />
          <FormControl.Label> Пароль </FormControl.Label>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onSubmitEditing={() => submit()}
            isInvalid={isInvalid}
          />
        </FormControl>
      </Center>
    </Box>
  );
}
