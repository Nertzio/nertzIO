
const DEFAULT_APP = {
  userActionIsRequired: false,
  somethingIsLoading: false,
};

const ACTION_REQUIRED = 'ACTION_REQUIRED';
const ACTION_COMPLETED = 'ACTION_COMPLETED';
const START_LOADING = 'START_LOADING';
const STOP_LOADING = 'STOP_LOADING';

export const requireUserAction = () => ({
  type: ACTION_REQUIRED,
});

export const userActionTaken = () => ({
  type: ACTION_COMPLETED,
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const stopLoading = () => ({
  type: STOP_LOADING,
})

const appReducer = (app = DEFAULT_APP, action) => {
  const {type} = action;
  switch (type) {
    case ACTION_REQUIRED:
      return {...app, userActionIsRequired: true};
    case ACTION_COMPLETED:
      return {...app, userActionIsRequired: false};
    case START_LOADING:
      return {...app, somethingIsLoading: true};
    case STOP_LOADING:
      return {...app, somethingIsLoading: false};
    default:
      return app;
  }
}

export default appReducer;
