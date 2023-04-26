import {
  Text,
  Center,
  View,
  Box,
  Button,
  VStack,
  FormControl,
  Input,
  Modal,
} from "native-base";
import { useState } from "react";
import useFetch from "react-fetch-hook";
import Constants from "expo-constants";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [time, setTime] = useState("");
  const [group, setGroup] = useState("");
  const [date, setDate] = useState("");
  const [audience, setAudience] = useState("");

  // (id:int, name:str)
  const [lessons, setLessons] = useState([]);

  const createNewLesson = () => {};

  return (
    <>
      <View
        alignItems="center"
        display="flex"
        justifyContent="center"
        height="100vh"
      >
        <Center>
          <FormControl isRequired>
            <VStack space={5}>
              <Box>
                <FormControl.Label> Номер группы </FormControl.Label>
                <Input
                  value={group}
                  onChange={(event) => setGroup(event.target.value)}
                />
              </Box>

              <Box>
                <FormControl.Label> Дата (ГГГГ:ММ:ДД) </FormControl.Label>
                <Input
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </Box>

              <Box>
                {lessons.map((lesson) => {
                  return <Text key={lesson[0]}>{lesson[1]}</Text>;
                })}
                <Box maxWidth="50%">
                  <Button onPress={() => setShowModal(true)}>Новый урок</Button>
                </Box>
              </Box>
              <Button
                colorScheme="success"
                onPress={() => {
                  const url =
                    Constants.expoConfig.extra.host + "/schedule/create";
                  fetch(url, {
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                      lessons_id: lessons.map((item) => item[0]),
                      group: group,
                      date: date,
                    }),
                    method: "POST",
                  })
                    .then((data) => data.json())
                    .then((data) => console.log(data));
                }}
              >
                Готово
              </Button>
            </VStack>
          </FormControl>
        </Center>
      </View>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Новый урок</Modal.Header>
          <Modal.Body>
            <FormControl isRequired>
              <VStack space={5}>
                <Box>
                  <FormControl.Label>Предмет</FormControl.Label>
                  <Input
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                  />
                </Box>
                <Box>
                  <FormControl.Label>Учитель</FormControl.Label>
                  <Input
                    value={teacher}
                    onChange={(event) => setTeacher(event.target.value)}
                  />
                </Box>
                <Box>
                  <FormControl.Label>Время</FormControl.Label>
                  <Input
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                  />
                </Box>
                <Box>
                  <FormControl.Label>Аудитория</FormControl.Label>
                  <Input
                    value={audience}
                    onChange={(event) => setAudience(event.target.value)}
                  />
                </Box>
                <Button
                  colorScheme="success"
                  onPress={() => {
                    const url =
                      Constants.expoConfig.extra.host + "/lesson/create";
                    fetch(url, {
                      mode: "cors",
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },

                      body: JSON.stringify({
                        subject: subject,
                        teacher: teacher,
                        time: time,
                        audience: audience,
                      }),
                    })
                      .then((data) => data.json())
                      .then((data) => {
                        const l = [...lessons, [data.id, subject]];
                        setLessons(l);
                      });
                    setShowModal(false);
                    setSubject("");
                    setTeacher("");
                    setTime("");
                    setAudience("");
                  }}
                >
                  Готово
                </Button>
              </VStack>
            </FormControl>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
