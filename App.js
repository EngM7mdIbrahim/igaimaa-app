import React, { useEffect } from "react";
import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import { Provider, useDispatch } from "react-redux";
import createStore from "./src/shared/redux/createStore";
import LoginScreen from "./src/login/screens/LoginScreen";
import ModalScreen from "./src/modal/ModalScreen";
import { AppearanceProvider } from "react-native-appearance";
import { Appearance, useColorScheme } from "react-native-appearance";
import { setBlack, setWhite } from "./src/shared/redux/features/user/userSlice";

//Stacks
const MainStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    initialRouteName: "Login",
  }
);
const RootStack = createStackNavigator(
  {
    MainStack,
    ModalScreen,
  },
  {
    initialRouteName: "MainStack",
    headerMode: "none",
    mode: "card",
    headerShown: false,
    defaultNavigationOptions: {
      ...TransitionPresets.ModalPresentationIOS,
      gestureEnabled: true,
      cardOverlayEnabled: true,
    },
  }
);
Appearance.getColorScheme();

//helper Functions
const setColorScheme = (dispatch, colorScheme) => {
  if (colorScheme === "dark") {
    dispatch(setBlack());
  } else {
    dispatch(setWhite());
  }
};

const InnerApp = createAppContainer(RootStack);

const App = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  useEffect(() => {
    setColorScheme(dispatch, colorScheme);
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(dispatch, colorScheme);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <InnerApp />
    </>
  );
};
export default () => {
  return (
    <AppearanceProvider>
      <Provider store={createStore}>
        <App />
      </Provider>
    </AppearanceProvider>
  );
};
