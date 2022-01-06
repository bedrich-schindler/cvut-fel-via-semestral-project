import PropType from 'prop-types';

export const FoursquarePlacePropType = PropType.shape({
  fsq_id: PropType.string.isRequired,
  photos: PropType.arrayOf(PropType.shape({})),
  tips: PropType.arrayOf(PropType.shape({})),
});

export const FoursquarePlacesPropType = PropType.shape({
  results: PropType.arrayOf(FoursquarePlacePropType).isRequired,
});
