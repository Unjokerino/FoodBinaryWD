/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Cart from "../assets/Icons/Cart";
import Chicken from "../assets/Icons/Chicken";
import HeaderLeft from "../components/HeaderLeft";
import TabBar from "../components/TabBar";
import { View, Text } from "../components/Themed";
import {
  BOTTOM_TAB,
  FOOD_ITEM,
  HOME,
  SEARCH_SCREEN,
  SHOPING_BAG,
  TITLE,
  USER_SCREEN,
} from "../constants";

import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Typography from "../constants/Typography";
import useColorScheme from "../hooks/useColorScheme";
import FoodItemScreen from "../screens/FoodItemScreen";
import HomeScreen from "../screens/HomeScreen";
import ModalScreen from "../screens/ModalScreen";
import SearchScreen from "../screens/SearchScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

const defaultOptions = ({
  navigation,
}: RootTabScreenProps<keyof RootTabParamList>) => {
  return {
    headerTitle: () => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Chicken />
        <Text style={[Typography.title, { paddingLeft: 8 }]}>{TITLE}</Text>
      </View>
    ),
    headerStyle: {
      elevation: 0,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0,
    },
    headerTitleAlign: "center",
    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
    headerLeft: () => <HeaderLeft onPress={() => navigation.openDrawer()} />,
    headerRight: () => (
      <Pressable
        onPress={() => navigation.navigate("Modal")}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
          marginRight: Layout.horizontalSpacing,
        })}
      >
        <Cart />
      </Pressable>
    ),
  };
};

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createSharedElementStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function RootNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        options={{ headerShown: false }}
        name="Root"
        component={StackNavigator}
      />
    </Drawer.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name={BOTTOM_TAB} component={BottomTabNavigator} />
      <Stack.Screen
        name={FOOD_ITEM}
        component={FoodItemScreen}
        sharedElements={(route) => {
          return [
            {
              id: route.params.item.name,
              animation: "fade",
              align: "right-top",
            },
          ];
        }}
      />
      <Stack.Screen name="Modal" component={ModalScreen} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName={HOME}
      tabBar={(props) => (
        <TabBar
          state={props.state}
          descriptors={props.descriptors}
          navigation={props.navigation}
        />
      )}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name={HOME}
        component={HomeScreen}
        options={(props: RootTabScreenProps<typeof HOME>) => ({
          ...defaultOptions(props),
        })}
      />
      <BottomTab.Screen
        name={SEARCH_SCREEN}
        component={SearchScreen}
        options={(props: RootTabScreenProps<typeof SEARCH_SCREEN>) => ({
          ...defaultOptions(props),
        })}
      />
      <BottomTab.Screen
        name={SHOPING_BAG}
        component={SearchScreen}
        options={(props: RootTabScreenProps<typeof SHOPING_BAG>) => ({
          ...defaultOptions(props),
        })}
      />
      <BottomTab.Screen
        name={USER_SCREEN}
        component={SearchScreen}
        options={(props: RootTabScreenProps<typeof USER_SCREEN>) => ({
          ...defaultOptions(props),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
