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
export default function TabTwoScreen() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>([]);
  const [current, setCurrent] = useState<any>([]);
  useEffect(() => {
    setLoading(true);
    fetch(`https://opentdb.com/api.php?amount=10`, {
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
      {data && (
        <FlatList
          horizontal={true}
          data={data?.results}
          initialNumToRender={1}
          renderItem={({ item }) => (
            <View>
              <View style={styles.titleCard}>
                <Text
                  style={{
                    fontFamily: "mercado",
                    fontSize: 25,
                    lineHeight: 40,
                    fontWeight: "600",
                  }}
                >
                  {item.question}
                </Text>
              </View>
              {[...item.incorrect_answers, item.correct_answer]
                .sort((a, b) => 0.5 - 5)
                .map((answer, index) => (
                  <TouchableOpacity
                    style={{
                      width: Dimensions.get("window").width - 50,
                      backgroundColor: current.includes(answer + index)
                        ? "red"
                        : "#0A3200",
                      marginTop: 30,
                      height: 60,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 25,
                    }}
                    onPress={() => {
                      setSelected((prev: any) => [...prev, answer]);
                      current.push(answer + index);
                      console.log(index);
                      // console.log(item);
                      // console.log(answer);
                      item.incorrect_answers.includes(answer)
                        ? console.log("wrong")
                        : console.log("right");
                      //  console.log(item.correct_answer);
                      console.log(current);
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
              <Button title="click" onPress={() => console.log(current)} />
            </View>
          )}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={{
            width: Dimensions.get("window").width,
            height: "100%",
            paddingLeft: 25,
          }}
          legacyImplementation={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar?.currentHeight && +50,
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
    marginRight: 50,
  },
});
