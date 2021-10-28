interface Action {
  type: string;
  payload?: any;
}

const initialState = {
  count: 0
};

const testReducer = (state = initialState, action: Action) => {
  switch(action.type) {
    case 'INCREMENT': 
      state.count += 1;
      return { ...state };
    default: return state;
  }
};

export default testReducer;