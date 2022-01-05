import PropTypes from 'prop-types';
import React from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import { Layout } from '../../components/Layout';

const MapPageComponent = ({
  shootingRangeGet,
  shootingRange,
  shootingRanges,
}) => {
  const center = [50.745, 14.523];
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <MapContainer center={center} zoom={10} style={containerStyle}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center}>
            <Popup>
              A pretty CSS3 popup.
              {' '}
              <br />
              {' '}
              Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </Layout>
  );
};

MapPageComponent.propTypes = {
  shootingRange: PropTypes.shape({}),
  shootingRanges: PropTypes.arrayOf(PropTypes.shape({})),
  shootingRangeGet: PropTypes.func.isRequired,
  shootingRangeGetRequestState: PropTypes.string,
};

export default MapPageComponent;
