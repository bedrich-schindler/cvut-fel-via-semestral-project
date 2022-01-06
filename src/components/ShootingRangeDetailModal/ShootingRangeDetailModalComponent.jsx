import PropTypes from 'prop-types';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  Alert,
  Grid,
  Modal,
} from '@react-ui-org/react-ui';
import { LoadingIcon } from '../LoadingIcon';
import { FoursquarePlacePropType } from '../../resources/foursquare';
import { ShootingRangePropType } from '../../resources/shootingRange';
import styles from './styles.scss';

const ShootingRangeDetailModalComponent = ({
  foursquareGetPlace,
  foursquareGetPlaceRequestState,
  foursquarePlace,
  id,
  onClose,
  shootingRange,
  shootingRangeGet,
  shootingRangeGetRequestState,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGetFailed, setIsGetFailed] = useState(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const asyncUseEffect = async () => {
      const response = await shootingRangeGet(id);

      setIsGetFailed(false);

      if (response.type.endsWith('success')) {
        if (response.payload.foursquare_place_id?.length > 0) {
          await foursquareGetPlace(response.payload.foursquare_place_id);
        }

        setIsLoaded(true);
      }

      if (response.type.endsWith('failure')) {
        setIsGetFailed(true);
      }
    };

    asyncUseEffect();
  }, []);

  return (
    <Modal
      onClose={onClose}
      size="medium"
      title="Shooting range detail"
    >
      {isGetFailed && (
      <Alert color="danger">
        <strong>Error:</strong>
        {' '}
        Unable to get shooting range due to server error.
      </Alert>
      )}
      {(shootingRangeGetRequestState === 'request' || foursquareGetPlaceRequestState === 'request') && (
        <LoadingIcon />
      )}
      {(isLoaded && !isGetFailed) && (
        <div>
          <h2 className="typography-size-1">Info</h2>
          <table className={styles.infoTable}>
            <thead>
              <tr>
                <th>Name:</th>
                <td>{shootingRange.name}</td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>
                  {shootingRange.street}
                  ,
                  {' '}
                  {shootingRange.street}
                </td>
              </tr>
              <tr>
                <th>GPS:</th>
                <td>
                  {shootingRange.latitude}
                  ,
                  {' '}
                  {shootingRange.longitude}
                </td>
              </tr>
              <tr>
                <th>Phone:</th>
                <td>{shootingRange.phone?.length > 0 ? shootingRange.phone : '–'}</td>
              </tr>
              <tr>
                <th>Web:</th>
                <td>
                  {
                    shootingRange.web?.length > 0
                      ? (
                        <a
                          href={shootingRange.web}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {shootingRange.web}
                        </a>
                      ) : '–'
                  }
                </td>
              </tr>
              <tr>
                <th>Foursquare:</th>
                <td>
                  {
                    shootingRange.foursquare_place_id?.length > 0
                      ? (
                        <a
                          href={`https://foursquare.com/v/${shootingRange.foursquare_place_id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Link to Foursquare detail
                        </a>
                      ) : '–'
                  }
                </td>
              </tr>
            </thead>
          </table>
          <h2 className="typography-size-1">About</h2>
          <p>
            {shootingRange.about?.length > 0 ? shootingRange.about : '–'}
          </p>
          {foursquarePlace != null && foursquarePlace.fsq_id === shootingRange.foursquare_place_id && (
          <>
            <h2 className="typography-size-1">Tips</h2>
            <Grid rowGap="var(--rui-spacing-2)">
              {(foursquarePlace.tips == null || foursquarePlace.tips.length === 0) && (
              <p>No tips available.</p>
              )}
              {foursquarePlace.tips?.map((placeTip) => (
                <p key={placeTip.created_at}>
                  {placeTip.text}
                </p>
              ))}
            </Grid>
            <h2 className="typography-size-1">Photos</h2>
            <Grid rowGap="var(--rui-spacing-2)">
              {(foursquarePlace.photos == null || foursquarePlace.photos.length === 0) && (
              <p>No photos available.</p>
              )}
              {foursquarePlace.photos?.map((placePhoto) => (
                <img
                  alt={shootingRange.name}
                  className={styles.image}
                  key={placePhoto.created_at}
                  src={`${placePhoto.prefix}original${placePhoto.suffix}`}
                />
              ))}
            </Grid>
          </>
          )}
        </div>
      )}
    </Modal>
  );
};

ShootingRangeDetailModalComponent.defaultProps = {
  foursquareGetPlaceRequestState: null,
  foursquarePlace: null,
  shootingRange: null,
  shootingRangeGetRequestState: null,
};

ShootingRangeDetailModalComponent.propTypes = {
  foursquareGetPlace: PropTypes.func.isRequired,
  foursquareGetPlaceRequestState: PropTypes.string,
  foursquarePlace: FoursquarePlacePropType,
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  shootingRange: ShootingRangePropType,
  shootingRangeGet: PropTypes.func.isRequired,
  shootingRangeGetRequestState: PropTypes.string,
};

export default ShootingRangeDetailModalComponent;
