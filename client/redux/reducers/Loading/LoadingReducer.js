
const LOADING = 'LOADING';
const NOT_LOADING = 'NOT_LOADING';

export const setToLoading = () => ({
  type: LOADING,
})

export const setToNotLoading = () => ({
  type: NOT_LOADING,
})

const LoadingReducer = (state = false, action) => {
  switch (action.type) {
    case LOADING:
      return true;
    case NOT_LOADING:
      return false
    default:
      return state;
  }
}

export default LoadingReducer;
