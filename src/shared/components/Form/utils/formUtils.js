import React from "react";
import { View } from "react-native";
import IconButton from "../../IconButton/IconButton";
import FormPage from "../FormTypes/MultiPageForm/FormPage";
import InputField, {
  initInputInstance,
} from "../UIElements/Input Field/InputField";

export const FORM_TYPES = {
  text: "text",
  buttons: "stack of buttons",
  iconButton: "iconButton",
};
export const SCROLL_TO = (scroll) => {
  return (reactNode) => scroll.props.scrollToFocusedInput(reactNode);
};

export const toFormInputs = (inputInstances) => {
  let inputs = {};
  for (const input of inputInstances) {
    inputs = {
      ...inputs,
      [input.title]: {
        value: input.value || initInputInstance.value,
        isValid: input.isValid || initInputInstance.isValid,
      },
    };
  }
  return inputs;
};

export const toExportState = (formState) => {
  let state = {};
  for (const stateInput in formState.inputs) {
    state = {
      ...state,
      [stateInput]: formState.inputs[stateInput].value,
    };
  }
  return state;
};

export const toInputInstance = (
  item,
  theme,
  onInputFocus,
  inputChangeHandler
) => {
  const ONINPUT_FOCUS_EMPTY = (_, __) => {
    console.error("On Input focus is not initialized for this form!");
  };
  return (
    <InputField
      key={item.title}
      onFocus={onInputFocus || ONINPUT_FOCUS_EMPTY}
      validators={item.validators || initInputInstance.validators}
      onInputChange={inputChangeHandler}
      placeholder={item.placeholder || initInputInstance.placeholder}
      initValue={item.value || initInputInstance.value}
      errorMessage={item.errorMessage || initInputInstance.errorMessage}
      isPassword={item.isPassword || initInputInstance.isPassword}
      theme={theme}
      title={item.title}
      icon={item.icon || initInputInstance.icon}
      style={{ marginTop: 0 }}
    />
  );
};

export const toLabelledInputInstance = (
  index,
  size,
  item,
  theme,
  onInputFocus,
  inputChangeHandler
) => {
  let bordersStyle = {};
  if (index === 0) {
    bordersStyle = {
      borderTopRightRadius: 7,
      borderTopLeftRadius: 7,
    };
  }else if(index===size-1){
    bordersStyle = {
      borderBottomRightRadius: 7,
      borderBottomLeftRadius: 7,
      borderBottomWidth: 0
    };
  }
  return (
    <InputField
      key={item.title}
      isLabeled={item.isLabeled || initInputInstance.isLabeled}
      onFocus={onInputFocus || initInputInstance.onFocus}
      validators={item.validators || initInputInstance.validators}
      onInputChange={inputChangeHandler}
      placeholder={item.placeholder || initInputInstance.placeholder}
      initValue={item.value || initInputInstance.value}
      errorMessage={item.errorMessage || initInputInstance.errorMessage}
      isPassword={item.isPassword || initInputInstance.isPassword}
      theme={theme}
      title={item.title}
      icon={item.icon || initInputInstance.icon}
      style={{ marginVertical: 0, ...bordersStyle }}
    />
  );
};

export const toIconButtons = ({ items }) => {
  return (
    <View
      key={Math.random() + ""}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: 15,
        marginBottom: 10,
      }}
    >
      {items.map((item) => {
        return (
          <IconButton
            key={Math.random() + ""}
            icon={item.icon}
            isInline={item.isInline}
            onClick={item.onClick}
            disabled={item.disabled}
            color={item.color}
          />
        );
      })}
    </View>
  );
};

export const getSingleFormLoadingLayout = (inputs) => {
  title = [{ key: "title", width: 230, height: 70, margin: 15 }];
  inputsLayout = inputs.map((input) => {
    switch (input.type) {
      case FORM_TYPES.text:
        return {
          key: input.title,
          height: 50,
          width: undefined,
          marginHorizontal: 15,
          marginVertical: 5,
        };
      case FORM_TYPES.buttons:
        let children = input.items.map((_) => {
          return {
            key: Math.random(),
            height: 45,
            width: 45,
            marginHorizontal: 15,
            marginVertical: 5,
          };
        });
        return {
          flexDirection: "row",
          justifyContent: "center",
          width: undefined,
          height: undefined,
          marginHorizontal: 10,
          children,
        };
    }
    return { key: input.title, width: undefined, height: 50, margin: 15 };
  });
  const submitButton = [
    {
      key: "submit button",
      width: undefined,
      height: 50,
      marginVertical: 5,
      marginHorizontal: 15,
    },
  ];
  const layout = [...title, ...inputsLayout, ...submitButton];
  return layout;
};

export const toFormJSX = (form)=>{

  const initSingPageFormInst = {
    inputInstances: [],
    buttonText: "No Button found for this form!",
    title: "No Title found for this form!",
    subtitle: "No subtitle for this form!",
    hint: 'No hint found for this form page!',
    isLoading: false,
    onInputFocus: () => {},
    onFormSubmit: () => {},
  };
  return <FormPage
  inputInstances={form.inputInstances}
  theme={theme}
  title={getString(language, appStringskeys.signupScreen_form_page1_titleText)}
  buttonText="SignUp"
  subtitle={getString(language, appStringskeys.signupScreen_form_page1_subTitleText)}
  onInputFoucs={SCROLL_TO(scroll)}
  isLoading={false}
  hint="Hello world"
  onFormSubmit={(state) => console.log(state)}
/>
}
