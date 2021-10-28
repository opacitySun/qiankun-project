interface Action {
  type: string;
  payload?: any;
}

const initialState = {
  planList: []
};

const planReducer = (state = initialState, action: Action) => {
  switch(action.type) {
    case 'GetPlanList': 
      state.planList = action.payload.planList;
      return { ...state };
    default: return state;
  }
};

export default planReducer;