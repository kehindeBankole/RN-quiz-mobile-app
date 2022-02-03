import { StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import window from "../constants/Layout";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const Square = ({ isLight, selected }: { isLight: any; selected: any }) => {
    // let backgroundColor;
    // if (isLight) {
    //   backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
    // } else {
    //   backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
    // }
    return (
      <View
        style={{
          width: 16,
          height: 16,
          marginHorizontal: 3,
          borderRadius: 100,
          backgroundColor: selected ? "black" : "white",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Onboarding
        DotComponent={Square}
        pages={[
          {
            backgroundColor: "#D8D1EA",
            image: <Image source={require("../assets/images/Group1.png")} />,
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#D8D1EA",
            image: <Image source={require("../assets/images/Group4.png")} />,
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
        ]}
        transitionAnimationDuration={100}
        // showNext={false}
        // showSkip={true}
        containerStyles={{ position: "relative" }}
        bottomBarColor="transparent"
        onSkip={() => navigation.navigate("Second")}
        onDone={() => navigation.navigate("Second")}
        // SkipButtonComponent={({ isLight, skipLabel, ...props }) => (
        //   <TouchableOpacity
        //     style={{
        //       backgroundColor: "red",
        //       marginLeft: 30,
        //       marginBottom: 50,
        //       height: 50,
        //       width: 100,
        //     }}
        //     onPress={() => null}
        //   >
        //     <Text>{skipLabel}</Text>
        //   </TouchableOpacity>
        // )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
