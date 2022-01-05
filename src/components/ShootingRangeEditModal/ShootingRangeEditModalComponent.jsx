import PropTypes from 'prop-types';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  Alert,
  FormLayout,
  Modal,
  TextField,
} from '@react-ui-org/react-ui';
import { validateShootingRange } from '../../validators/validateShootingRange';

const ShootingRangeEditModalComponent = ({
  id,
  onClose,
  shootingRangeEdit,
  shootingRangeGet,
  shootingRangeGetAll,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditFailed, setIsEditFailed] = useState(false);
  const [isGetFailed, setIsGetFailed] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
  });
  const [formValidity, setFormValidity] = useState({
    elements: {
      name: null,
    },
    isValid: false,
  });

  useEffect(async () => {
    const response = await shootingRangeGet(id);

    setIsGetFailed(false);

    if (response.type.endsWith('success')) {
      setIsLoaded(true);
      setFormData({
        name: response.payload.name,
      });
    }

    if (response.type.endsWith('failure')) {
      setIsGetFailed(true);
    }
  }, []);

  const onClick = async () => {
    const formValidity = validateShootingRange(formData);

    setIsEditFailed(false);
    setFormValidity(formValidity);

    if (formValidity.isValid) {
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

  return (
    <Modal
      actions={[
        {
          color: 'primary',
          disabled: isGetFailed,
          label: 'Save',
          onClick,
        },
      ]}
      onClose={onClose}
      title="Edit shooting range"
    >
      {isGetFailed && (
        <Alert color="danger">
          <strong>Error:</strong>
          {' '}
          Unable to get shooting range due to server error.
        </Alert>
      )}
      {isEditFailed && (
        <Alert color="danger">
          <strong>Error:</strong>
          {' '}
          Unable to edit shooting range due to server error.
        </Alert>
      )}
      {(isLoaded && !isGetFailed) && (
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
      )}
    </Modal>
  );
};

ShootingRangeEditModalComponent.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  shootingRangeEdit: PropTypes.func.isRequired,
  shootingRangeGet: PropTypes.func.isRequired,
  shootingRangeGetAll: PropTypes.func.isRequired,
};

export default ShootingRangeEditModalComponent;
