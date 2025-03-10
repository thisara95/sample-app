import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  Linking,
  Dimensions,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import { useNews } from "../api/useNewsQuery";
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "@/styles/colors";
import { NewsItem } from "../types/news";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { TYPOGRAPHY } from "@/styles/typography";
const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const { data: news, isLoading, isError, refetch } = useNews();
  const [refreshing, setRefreshing] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      const storedFirstName = await AsyncStorage.getItem("firstName");
      if (storedFirstName) setFirstName(storedFirstName);
    };
    loadUserData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItem = useCallback(({ item }: { item: NewsItem }) => {
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(item.url)}
        style={styles.card}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          transition={1000}
          contentFit="fill"
        />
        <View style={styles.cardDetails}>
          <View style={styles.cardHeaderView}>
            <Text style={styles.topContainerText}>{item.source}</Text>
            <Text style={styles.topContainerText}>
              {new Date(item.datetime * 1000).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </View>
          <View style={styles.cardBottomView}>
            <Text
              style={styles.headlineText}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {item.headline}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = useCallback((item: NewsItem) => item.id.toString(), []);

  if (isLoading)
    return (
      <View style={globalStyles.commonView}>
        <ActivityIndicator
          size="large"
          color="#4A90E2"
          style={{ marginTop: 20 }}
        />
      </View>
    );
  if (isError) return <Text style={styles.errorText}>Error loading news</Text>;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle={"light-content"} backgroundColor={COLORS.black} />
      <View style={styles.mainContainer}>
        <Text style={[globalStyles.title, styles.titleText]}>
          Hey, {firstName || "User"}!
        </Text>
        {isError ? (
          <Text style={styles.errorText}>
            Something went wrong. Please try again later.
          </Text>
        ) : (
          <FlatList
            data={news}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={renderItem}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            horizontal={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    width: width,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: responsiveWidth(5),
  },
  titleText: {
    color: COLORS.white,
    alignSelf: "flex-start",
    paddingVertical: responsiveHeight(2),
  },
  errorText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: "left",
    fontWeight: "500",
    fontFamily: "rubik",
  },
  card: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    height: responsiveHeight(15),
    marginBottom: responsiveHeight(4),
    borderRadius: 10,
  },
  image: { width: "40%", height: "100%" },
  cardDetails: {
    width: "60%",
    padding: 10,
    justifyContent: "space-between",
  },
  cardHeaderView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBottomView: {
    justifyContent: "center",
  },
  topContainerText: {
    color: COLORS.white,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
    marginBottom: 5,
    fontFamily: "rubik",
  },
  headlineText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.headline,
    lineHeight: 24,
    fontWeight: "500",
    fontFamily: "rubik",
    marginBottom: 10,
  },
});
