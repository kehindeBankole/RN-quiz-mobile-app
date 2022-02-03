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
} from "react-native";
import Markdown from "react-native-simple-markdown";
export default function TabTwoScreen() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);
  // useEffect(() => {
  //   da
  // }, [data]);
  return (
    <View style={styles.container}>
      {/**/}
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
                .sort((a, b) => 0.5 - Math.random())
                .map((answer, index) => (
                  <TouchableOpacity
                    style={{
                      width: Dimensions.get("window").width - 50,
                      backgroundColor: "#0A3200",
                      marginTop: 30,
                      height: 60,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 25,
                    }}
                    onPress={() => {
                      console.log(item);
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
          //  snapToInterval={Dimensions.get("window").width}
          // extraData={selectedId}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    paddingTop: StatusBar?.currentHeight + 50,
  },
  titleCard: {
    width: Dimensions.get("window").width - 50,
    padding: 15,
    backgroundColor: "white",
    height: 200,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginRight: 50,
  },
});
