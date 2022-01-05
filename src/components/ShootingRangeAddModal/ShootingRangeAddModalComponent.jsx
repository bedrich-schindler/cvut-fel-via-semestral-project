import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Alert,
  FormLayout,
  Modal,
  TextField,
} from '@react-ui-org/react-ui';
import { validateShootingRange } from '../../validators/validateShootingRange';

const ShootingRangeAddModalComponent = ({
  onClose,
  shootingRangeAdd,
  shootingRangeGetAll,
}) => {
  const [isFailed, setIsFailed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });
  const [formValidity, setFormValidity] = useState({
    elements: {
      name: null,
    },
    isValid: false,
  });

  const onClick = async () => {
    const formValidity = validateShootingRange(formData);

    setIsFailed(false);
    setFormValidity(formValidity);

    if (formValidity.isValid) {
      const response = await shootingRangeAdd(formData);

      if (response.type.endsWith('success')) {
        shootingRangeGetAll();
        onClose();
        return;
      }

      if (response.type.endsWith('failure')) {
        setIsFailed(true);
      }
    }
  };

  return (
    <Modal
      actions={[
        {
          color: 'primary',
          label: 'Save',
          onClick,
        },
      ]}
      onClose={onClose}
      title="Add shooting range"
    >
      {isFailed && (
        <Alert color="danger">
          <strong>Error:</strong>
          {' '}
          Unable to add shooting range due to server error.
        </Alert>
      )}
      <FormLayout>
        <TextField
          label="Name"
          onChange={(e) => setFormData({
            ...formData, name: e.target.value,
          })}
          value={formData.name}
          validationState={formValidity.elements.name !== null ? 'invalid' : null}
          validationText={formValidity.elements.name}
        />
      </FormLayout>
    </Modal>
  );
};

ShootingRangeAddModalComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  shootingRangeAdd: PropTypes.func.isRequired,
  shootingRangeGetAll: PropTypes.func.isRequired,
};

export default ShootingRangeAddModalComponent;
