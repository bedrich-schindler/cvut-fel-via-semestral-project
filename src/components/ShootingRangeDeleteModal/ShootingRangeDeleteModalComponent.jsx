import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
} from '@react-ui-org/react-ui';
import { LoadingIcon } from '../LoadingIcon';

const ShootingRangeDeleteModalComponent = ({
  id,
  onClose,
  shootingRangeDelete,
  shootingRangeDeleteRequestState,
  shootingRangeGetAll,
}) => {
  const [isFailed, setIsFailed] = useState(false);
  const onClick = async () => {
    setIsFailed(false);

    const response = await shootingRangeDelete(id);

    if (response.type.endsWith('success')) {
      shootingRangeGetAll();
      onClose();
      return;
    }

    if (response.type.endsWith('failure')) {
      setIsFailed(true);
    }
  };

  return (
    <Modal
      actions={[
        {
          color: 'danger',
          feedbackIcon: shootingRangeDeleteRequestState === 'request' && <LoadingIcon />,
          label: 'Delete',
          onClick,
        },
      ]}
      onClose={onClose}
      title="Delete shooting range"
    >
      {isFailed && (
        <div className="mb-5">
          <Alert color="danger">
            <strong>Error:</strong>
            {' '}
            Unable to delete shooting range due to server error.
          </Alert>
        </div>
      )}
      Are you sure you want to delete this shooting range?
    </Modal>
  );
};

ShootingRangeDeleteModalComponent.defaultProps = {
  shootingRangeDeleteRequestState: null,
};

ShootingRangeDeleteModalComponent.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  shootingRangeDelete: PropTypes.func.isRequired,
  shootingRangeDeleteRequestState: PropTypes.string,
  shootingRangeGetAll: PropTypes.func.isRequired,
};

export default ShootingRangeDeleteModalComponent;
