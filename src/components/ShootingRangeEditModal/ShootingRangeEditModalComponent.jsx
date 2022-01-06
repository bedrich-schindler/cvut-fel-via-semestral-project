import PropTypes from 'prop-types';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  Alert,
  Button,
  FormLayout,
  Grid,
  Modal,
  SelectField,
  TextArea,
  TextField,
} from '@react-ui-org/react-ui';
import { FoursquarePlacesPropType } from '../../resources/foursquare';
import { getFoursquarePlacesOptions } from '../../services/foursquarePlacesService/getFoursquarePlacesOptions';
import { validateShootingRange } from '../../validators/validateShootingRange';
import { LoadingIcon } from '../LoadingIcon';

const ShootingRangeEditModalComponent = ({
  foursquarePlaces,
  foursquareSearchPlaces,
  foursquareSearchPlacesRequestState,
  id,
  onClose,
  openStreetMapsGetDetail,
  shootingRangeEdit,
  shootingRangeEditRequestState,
  shootingRangeGet,
  shootingRangeGetRequestState,
  shootingRangeGetAll,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditFailed, setIsEditFailed] = useState(false);
  const [isGetFailed, setIsGetFailed] = useState(false);

  const [formData, setFormData] = useState({
    about: '',
    city: '',
    foursquare_place_id: '',
    latitude: '',
    longitude: '',
    name: '',
    phone: '',
    street: '',
    web: '',
  });
  const [formValidity, setFormValidity] = useState({
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
    isValid: false,
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const asyncUseEffect = async () => {
      const response = await shootingRangeGet(id);

      setIsGetFailed(false);

      if (response.type.endsWith('success')) {
        setIsLoaded(true);
        setFormData(response.payload);

        if (response.payload.foursquare_place_id) {
          await foursquareSearchPlaces({
            name: response.payload.name,
            place: response.payload.city,
          });
        }
      }

      if (response.type.endsWith('failure')) {
        setIsGetFailed(true);
      }
    };

    asyncUseEffect();
  }, []);

  const onClick = async () => {
    const iFormValidity = validateShootingRange(formData);

    setIsEditFailed(false);
    setFormValidity(iFormValidity);

    if (iFormValidity.isValid) {
      const response = await shootingRangeEdit(id, formData);

      if (response.type.endsWith('success')) {
        shootingRangeGetAll();
        onClose();
        return;
      }

      if (response.type.endsWith('failure')) {
        setIsEditFailed(true);
      }
    }
  };
  const onSearchClick = () => {
    foursquareSearchPlaces({
      name: formData.name,
      place: formData.city,
    });
  };
  const onGuessGps = async () => {
    if (formData.street?.length > 0 && formData.city?.length) {
      const response = await openStreetMapsGetDetail({
        city: formData.city,
        street: formData.street,
      });

      if (response.type.endsWith('success') && response.payload?.length > 0) {
        setFormData({
          ...formData,
          latitude: response.payload[0].lat,
          longitude: response.payload[0].lon,
        });
      }
    }
  };
  const onFillClick = () => {
    if (foursquarePlaces?.results == null || foursquarePlaces?.results?.length === 0) {
      return;
    }

    const place = foursquarePlaces.results.find((v) => v.fsq_id === formData.foursquare_place_id)
      || foursquarePlaces.results[0];

    setFormData({
      ...formData,
      city: place.location.locality || formData.city,
      latitude: place.geocodes.main.latitude || formData.latitude,
      longitude: place.geocodes.main.longitude || formData.longitude,
      phone: place.tel || formData.phone,
      street: place.location.address || formData.street,
      web: place.website || formData.web,
    });
  };

  return (
    <Modal
      actions={[
        {
          color: 'primary',
          disabled: isGetFailed || shootingRangeGetRequestState === 'request',
          feedbackIcon: shootingRangeEditRequestState === 'request' && <LoadingIcon />,
          label: 'Save',
          onClick,
        },
      ]}
      onClose={onClose}
      size="medium"
      title="Edit shooting range"
    >
      {isGetFailed && (
        <div className="mb-5">
          <Alert color="danger">
            <strong>Error:</strong>
            {' '}
            Unable to get shooting range due to server error.
          </Alert>
        </div>
      )}
      {isEditFailed && (
        <div className="mb-5">
          <Alert color="danger">
            <strong>Error:</strong>
            {' '}
            Unable to edit shooting range due to server error.
          </Alert>
        </div>
      )}
      {shootingRangeGetRequestState === 'request' && (
        <LoadingIcon />
      )}
      {(isLoaded && !isGetFailed) && (
        <Grid
          columns={{
            lg: '1fr 1fr',
            xs: '1fr',
          }}
          columnGap={{
            lg: 'var(--rui-spacing-5)',
            md: 'var(--rui-spacing-2)',
          }}
        >
          <div>
            <FormLayout>
              <TextField
                fullWidth
                label="Name"
                onChange={(e) => setFormData({
                  ...formData, name: e.target.value,
                })}
                size="small"
                value={formData.name}
                validationState={formValidity.elements.name !== null ? 'invalid' : null}
                validationText={formValidity.elements.name}
              />
              <TextField
                fullWidth
                label="Street"
                onChange={(e) => setFormData({
                  ...formData, street: e.target.value,
                })}
                size="small"
                value={formData.street}
                validationState={formValidity.elements.street !== null ? 'invalid' : null}
                validationText={formValidity.elements.street}
              />
              <TextField
                fullWidth
                label="City"
                onChange={(e) => setFormData({
                  ...formData, city: e.target.value,
                })}
                size="small"
                value={formData.city}
                validationState={formValidity.elements.city !== null ? 'invalid' : null}
                validationText={formValidity.elements.city}
              />
              <TextField
                fullWidth
                label="Latitude"
                onChange={(e) => setFormData({
                  ...formData, latitude: e.target.value,
                })}
                size="small"
                type="number"
                value={formData.latitude}
                validationState={formValidity.elements.latitude !== null ? 'invalid' : null}
                validationText={formValidity.elements.latitude}
              />
              <TextField
                fullWidth
                label="Longitude"
                onChange={(e) => setFormData({
                  ...formData, longitude: e.target.value,
                })}
                size="small"
                type="number"
                value={formData.longitude}
                validationState={formValidity.elements.longitude !== null ? 'invalid' : null}
                validationText={formValidity.elements.longitude}
              />
              <Button
                block
                disabled={formData.street?.length === 0 || formData.city?.length === 0}
                label="Guess coordinates"
                onClick={onGuessGps}
              />
              <SelectField
                fullWidth
                disabled={foursquarePlaces == null || foursquarePlaces.length === 0}
                helpText="Fill name and city to enable the search"
                label="Foursquare place"
                onChange={(e) => setFormData({
                  ...formData, foursquare_place_id: e.target.value,
                })}
                options={[
                  {
                    label: '–',
                    value: '',
                  },
                  ...(foursquarePlaces != null ? foursquarePlaces.results.map(getFoursquarePlacesOptions) : []),
                ]}
                size="small"
                value={formData.foursquare_place_id}
                validationState={formValidity.elements.foursquare_place_id !== null ? 'invalid' : null}
                validationText={formValidity.elements.foursquare_place_id}
              />
              <Button
                block
                disabled={formData.name?.length === 0 || formData.city?.length === 0}
                feedbackIcon={foursquareSearchPlacesRequestState === 'request' && <LoadingIcon />}
                label="Search on Foursquare"
                onClick={onSearchClick}
              />
            </FormLayout>
          </div>
          <div>
            <FormLayout>
              <TextField
                fullWidth
                label="Phone"
                onChange={(e) => setFormData({
                  ...formData, phone: e.target.value,
                })}
                size="small"
                value={formData.phone}
                validationState={formValidity.elements.phone !== null ? 'invalid' : null}
                validationText={formValidity.elements.phone}
              />
              <TextField
                fullWidth
                label="Web"
                onChange={(e) => setFormData({
                  ...formData, web: e.target.value,
                })}
                size="small"
                value={formData.web}
                validationState={formValidity.elements.web !== null ? 'invalid' : null}
                validationText={formValidity.elements.web}
              />
              <TextArea
                fullWidth
                label="About shooting range"
                onChange={(e) => setFormData({
                  ...formData, about: e.target.value,
                })}
                rows={13}
                size="small"
                value={formData.about}
                validationState={formValidity.elements.about !== null ? 'invalid' : null}
                validationText={formValidity.elements.about}
              />
              <Button
                block
                disabled={formData.foursquare_place_id == null || formData.foursquare_place_id.length === 0}
                label="Fill from Foursquare"
                onClick={onFillClick}
              />
            </FormLayout>
          </div>
        </Grid>
      )}
    </Modal>
  );
};

ShootingRangeEditModalComponent.defaultProps = {
  foursquarePlaces: null,
  foursquareSearchPlacesRequestState: null,
  shootingRangeEditRequestState: null,
  shootingRangeGetRequestState: null,
};

ShootingRangeEditModalComponent.propTypes = {
  foursquarePlaces: FoursquarePlacesPropType,
  foursquareSearchPlaces: PropTypes.func.isRequired,
  foursquareSearchPlacesRequestState: PropTypes.string,
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  openStreetMapsGetDetail: PropTypes.func.isRequired,
  shootingRangeEdit: PropTypes.func.isRequired,
  shootingRangeEditRequestState: PropTypes.string,
  shootingRangeGet: PropTypes.func.isRequired,
  shootingRangeGetAll: PropTypes.func.isRequired,
  shootingRangeGetRequestState: PropTypes.string,
};

export default ShootingRangeEditModalComponent;
