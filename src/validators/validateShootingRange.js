export const validateShootingRange = (data) => {
  const formValidity = {
    elements: {
      name: null,
    },
    isValid: true,
  };

  const emptyCheck = [
    'name',
  ];

  emptyCheck.forEach((element) => {
    if (data[element].toString().trim() === '') {
      formValidity.elements[element] = 'Field is required.';
      formValidity.isValid = false;
    }
  });

  if (formValidity.elements.name === null && data.name.length < 2) {
    formValidity.elements.name = 'Must be at least 2 characters long';
    formValidity.isValid = false;
  }

  return formValidity;
};
