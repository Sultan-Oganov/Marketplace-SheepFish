export const validate = {
  required: (value: string) => {
    let error;
    if (!value) {
      error = '* Required';
    }
    return error;
  },
};
