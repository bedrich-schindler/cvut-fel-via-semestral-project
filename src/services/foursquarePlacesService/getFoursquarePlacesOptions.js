/* eslint-disable camelcase */
export const getFoursquarePlacesOptions = (foursquarePlacesResult) => {
  const {
    fsq_id,
    location,
    name,
  } = foursquarePlacesResult;

  const locationAddressParts = [location.address, location.locality].filter(
    (locationAddressPart) => locationAddressPart?.length > 0,
  );
  const locationAddress = locationAddressParts.length ? ` (${locationAddressParts.join(', ')})` : null;

  return ({
    label: `${name}${locationAddress}`,
    value: fsq_id,
  });
};
