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
import { ShootingRangeDetailModal } from '../../components/ShootingRangeDetailModal';
import { ShootingRangeEditModal } from '../../components/ShootingRangeEditModal';
import { ShootingRangePropType } from '../../resources/shootingRange';

const ListPageComponent = ({
  shootingRanges,
}) => {
  const [shootingRangeDeleteId, setShootingRangeDeleteId] = useState(null);
  const [shootingRangeDetailId, setShootingRangeDetailId] = useState(null);
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
              format: (row) => `${row.street}, ${row.city}`,
              label: 'Address',
              name: 'address',
            },
            {
              format: (row) => (
                <ButtonGroup size="small">
                  <Button
                    label="Detail"
                    onClick={() => setShootingRangeDetailId(row.id)}
                  />
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
      {shootingRangeDeleteId !== null && (
        <ShootingRangeDeleteModal
          id={shootingRangeDeleteId}
          onClose={() => setShootingRangeDeleteId(null)}
        />
      )}
      {shootingRangeDetailId !== null && (
        <ShootingRangeDetailModal
          id={shootingRangeDetailId}
          onClose={() => setShootingRangeDetailId(null)}
        />
      )}
      {shootingRangeEditId !== null && (
        <ShootingRangeEditModal
          id={shootingRangeEditId}
          onClose={() => setShootingRangeEditId(null)}
        />
      )}
    </Layout>
  );
};

ListPageComponent.defaultProps = {
  shootingRanges: null,
};

ListPageComponent.propTypes = {
  shootingRanges: PropTypes.arrayOf(ShootingRangePropType),
};

export default ListPageComponent;
