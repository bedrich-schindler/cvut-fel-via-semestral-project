import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
} from 'react-leaflet';
import { Layout } from '../../components/Layout';
import { ShootingRangeDetailModal } from '../../components/ShootingRangeDetailModal';
import { ShootingRangePropType } from '../../resources/shootingRange';

const center = [49.85, 15.35];
const containerStyle = {
  height: '500px',
  width: '100%',
};

const MapPageComponent = ({ shootingRanges }) => {
  const [shootingRangeDetailId, setShootingRangeDetailId] = useState(null);

  return (
    <Layout>
      <div style={containerStyle}>
        <MapContainer center={center} zoom={7} style={containerStyle}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {shootingRanges?.map((shootingRange) => (
            <Marker
              eventHandlers={{ click: () => setShootingRangeDetailId(shootingRange.id) }}
              key={shootingRange.id}
              position={[shootingRange.latitude, shootingRange.longitude]}
            />
          ))}
        </MapContainer>
      </div>
      {shootingRangeDetailId !== null && (
        <ShootingRangeDetailModal
          id={shootingRangeDetailId}
          onClose={() => setShootingRangeDetailId(null)}
        />
      )}
    </Layout>
  );
};

MapPageComponent.defaultProps = {
  shootingRanges: null,
};

MapPageComponent.propTypes = {
  shootingRanges: PropTypes.arrayOf(ShootingRangePropType),
};

export default MapPageComponent;
