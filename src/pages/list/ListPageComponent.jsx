import PropTypes from 'prop-types';
import React, {
  useState,
} from 'react';
import {
  Button,
  ButtonGroup,
  ScrollView,
  Table,
} from '@react-ui-org/react-ui';
import { Layout } from '../../components/Layout';
import { ShootingRangeDeleteModal } from '../../components/ShootingRangeDeleteModal';
import { ShootingRangeEditModal } from '../../components/ShootingRangeEditModal';

const ListPageComponent = ({
  shootingRanges,
}) => {
  const [shootingRangeDeleteId, setShootingRangeDeleteId] = useState(null);
  const [shootingRangeEditId, setShootingRangeEditId] = useState(null);

  return (
    <Layout>
      <ScrollView direction="horizontal" shadowSize="50px">
        <Table
          columns={[
            {
              label: 'ID',
              name: 'id',
            },
            {
              label: 'Name',
              name: 'name',
            },
            {
              format: (row) => (
                <ButtonGroup size="small">
                  <Button
                    label="Edit"
                    onClick={() => setShootingRangeEditId(row.id)}
                  />
                  <Button
                    color="danger"
                    label="Delete"
                    onClick={() => setShootingRangeDeleteId(row.id)}
                  />
                </ButtonGroup>
              ),
              label: 'Actions',
              name: 'actions',
            },
          ]}
          rows={shootingRanges}
        />
      </ScrollView>
      {shootingRangeEditId !== null && (
        <ShootingRangeEditModal
          id={shootingRangeEditId}
          onClose={() => setShootingRangeEditId(null)}
        />
      )}
      {shootingRangeDeleteId !== null && (
        <ShootingRangeDeleteModal
          id={shootingRangeDeleteId}
          onClose={() => setShootingRangeDeleteId(null)}
        />
      )}
    </Layout>
  );
};

ListPageComponent.propTypes = {
  shootingRanges: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ListPageComponent;
