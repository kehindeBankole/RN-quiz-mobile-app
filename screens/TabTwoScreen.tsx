import { useState } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Button,
} from "react-native";
export default function TabTwoScreen({ navigation }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>([]);
  const [current, setCurrent] = useState<any>(0);
  const [a, seta] = useState<any>(null);
  const [done, setdone] = useState(false);
  const [score, setscore] = useState(0);
  useEffect(() => {
    setLoading(true);
    fetch(`https://opentdb.com/api.php?amount=5&type=multiple`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false), 4000;
        console.log(data);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {});
  if (loading === true)
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>loading</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      {done === true && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            backgroundColor: "red",
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>{score}</Text>
        </View>
      )}
      {data && (
        <>
          <View style={styles.titleCard}>
            <Text
              style={{
                fontFamily: "mercado",
                fontSize: 25,
                lineHeight: 40,
                fontWeight: "600",
              }}
            >
              {data?.results[current].question}
            </Text>
          </View>

          {[
            ...data?.results[current].incorrect_answers,
            data?.results[current].correct_answer,
          ]
            .sort((a, b) => 0.5 - Math.random())
            .map((answer, index) => (
              <TouchableOpacity
                style={{
                  width: Dimensions.get("window").width - 50,
                  backgroundColor:
                    data?.results[current].incorrect_answers.includes(a) &&
                    a === answer
                      ? "red"
                      : "#0A3200",
                  marginTop: 30,
                  height: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                }}
                onPress={() => {
                  seta(answer);
                  data?.results[current].incorrect_answers.includes(answer)
                    ? null
                    : setscore((prev) => prev + 1);

                  current === data?.results.length - 1 && setdone(true);
                }}
              >
                <Text
                  style={{
                    fontFamily: "poppins",
                    color: "white",
                  }}
                >
                  {answer}
                </Text>
              </TouchableOpacity>
            ))}

          <TouchableOpacity
            style={{
              marginTop: 50,
              backgroundColor: "blue",
              width: Dimensions.get("window").width - 150,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
            }}
            onPress={() => {
              current === data?.results?.length - 1
                ? null
                : setCurrent(current + 1);
            }}
          >
            <Text
              style={{
                fontFamily: "poppins",
                color: "white",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar?.currentHeight && +50,
    alignItems: "center",
  },
  titleCard: {
    width: Dimensions.get("window").width - 50,
    padding: 15,
    backgroundColor: "#379634",
    height: 200,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
