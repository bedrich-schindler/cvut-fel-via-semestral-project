import PropType from 'prop-types';

export const ShootingRangePropType = PropType.shape({
  about: PropType.string,
  city: PropType.string.isRequired,
  foursquare_place_id: PropType.string,
  latitude: PropType.number.isRequired,
  longitude: PropType.number.isRequired,
  name: PropType.string.isRequired,
  phone: PropType.string,
  street: PropType.string.isRequired,
  web: PropType.string,
});
