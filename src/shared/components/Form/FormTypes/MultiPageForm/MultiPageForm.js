import React from "react";
import { StyleSheet } from "react-native";

const onBackPressed = (stack) => {};

const MultiPageForm = (theme, formPageInstances, backButtonText) => {
  const MainStack = createStackNavigator();
  const forms = formPageInstances.map(form=>{
      return {key: Math.random(), ...form}
  })
  let formScreens={}
  for (const form in forms){

    const currentFormJSX = toFormJSX(form)
    formScreens={...formScreens,
    [form.key]: form.key}
  }

  return (
    <>
      <MainStack />
      <ButtonField
        onClick={(_) => {
          onBackPressed(MainStack);
        }}
        theme={theme}
        isInline={false}
        isDanger={false}
        text={backButtonText}
      />
    </>
  );
};

const styles = StyleSheet.create({});
export default MultiPageForm;
