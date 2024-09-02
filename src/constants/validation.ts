export const validateName = {
  required: 'Name is required',
  minLength: {
    value: 5,
    message: 'Name must be longer than 5 characters'
  },
  maxLength: {
    value: 50,
    message: 'Name must be shorter than 50 characters'
  }
};

export const validateEmail = {
  required: 'Email is required',
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Please enter a valid email'
  }
};

export const validateStatus = {
  maxLength: {
    value: 120,
    message: 'Status must be shorter than 120 characters'
  }
};

export const validateTg = {
  pattern: {
    value: /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/,
    message: 'Please enter a valid telegramm username'
  }
};

export const validatePassword = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be longer than 7 characters'
  },
  maxLength: {
    value: 50,
    message: 'Password must be shorter than 50 characters'
  }
};

export const validateTweetText = {
  required: 'Text is required',
  maxLength: {
    value: 1500,
    message: 'Message must be shorter than 1500 characters'
  }
};
