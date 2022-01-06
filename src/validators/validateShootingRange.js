export const validateShootingRange = (data) => {
  const formValidity = {
    elements: {
      about: null,
      city: null,
      foursquare_place_id: null,
      latitude: null,
      longitude: null,
      name: null,
      phone: null,
      street: null,
      web: null,
    },
    isValid: true,
  };

  const emptyCheck = [
    'city',
    'latitude',
    'longitude',
    'name',
    'street',
  ];

  emptyCheck.forEach((element) => {
    if (data[element].toString().trim() === '') {
      formValidity.elements[element] = 'Field is required.';
      formValidity.isValid = false;
    }
  });

  return formValidity;
};
