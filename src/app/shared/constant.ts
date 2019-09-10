

export const CONSTANTS  = {
  HEADINGS : {
    LOGIN: 'Sign In',
    SIGN_UP: 'Sign Up',
    HOME_PAGE: 'Table Data',
    STUDENT_DATA: 'Student Data'
  },

  COMMON: {

  },

  LOGIN: {
    PLACEHOLDER: {
      EMAIL: 'Enter your email',
      PASSWORD: 'Password'
    }
  },

  SIGN_UP: {
    PLACEHOLDER: {
      EMAIL: 'Enter your email',
      PASSWORD: 'Password',
      FIRST_NAME: 'First Name',
      LAST_NAME: 'Last Name',
      CONFIRM_PASSWORD: 'Confirm Password'
    }
  },

  BUTTONS: {
    SIGN_UP: 'Sign Up',
    SIGN_IN: 'Sign In',
    LOGIN: 'Login',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
    CANCEL: 'Cancel',
    ADD: 'Add',
    UPDATE: 'Update'
  },

  HOME_PAGE: {
    SEARCH: 'Search',
    COLUMN: {
      ID: 'ID',
      NAME: 'Name',
      AGE: 'Age',
      GENDER: 'Gender',
      PERCENTAGE: 'Percentage'
    }
  },

  STUDENT_DATA: {
    NAME:'Name',
    ENROLLMENT_ID:'ID',
    AGE:'Age',
    PERCENTAGE: 'Percentage'
  }
}

export const ERROR_MESSAGES = {

  COMMON: {
    REQUIRED: 'You must enter a value',
    EMAIL: 'Not a valid email'
  },
  SIGN_UP: {
    PASSWORD_LENGTH: 'Minimum 6 characters required',
    PASSWORD_MATCH: 'Password Donot match'
  },
  LOGIN: {
    EMAIL_EXISTS: 'This email exists already',
    EMAIL_NOT_FOUND: 'This email does not exist.',
    INVALID_PASSWORD: 'This password is not correct.',
    STATIC_ERROR: 'An unknown error occurred!'
  },
  HOME_PAGE: {
    DELETE: 'Are you sure you want to delete'
  }
}

