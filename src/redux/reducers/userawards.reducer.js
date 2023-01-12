const userAwardsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_AWARDS':
        return action.payload;
      default:
        return state;
    }
  };

  export default userAwardsReducer;