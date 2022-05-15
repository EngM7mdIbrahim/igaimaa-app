import { useCallback, useReducer } from "react";

export const isFormValid = (inputs,action)=>{
  let formValid = true;
  for (const inputKey in inputs) {
    formValid =
      formValid &&
      (action && inputKey === action.payload.id
        ? action.payload.isValid
        : inputs[inputKey].isValid);
  }
  return formValid
}

const formReducer = (state, action) => {
  switch (action.type) {
    case "input_change":
      let formValid = isFormValid(state.inputs,action);
      return {
        inputs: {
          ...state.inputs,
          [action.payload.id]: {
            value: action.payload.value,
            isValid: action.payload.isValid,
          },
        },
        isValid: formValid,
      };
    default:
      return { ...state };
  }
};

export default (INIT_STATE) => {
  //console.log(INIT_STATE);
  const [state, dispatch] = useReducer(formReducer, INIT_STATE);
  const inputChangeHandler = useCallback((id, isValid, value) => {
    dispatch({
      type: "input_change",
      payload: {
        id,
        isValid,
        value,
      },
    });
  }, []);

  return [state, inputChangeHandler];
};
