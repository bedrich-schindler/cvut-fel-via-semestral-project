import PropTypes from 'prop-types';
import React, {
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Alert,
  Button,
  Tabs,
  TabsItem,
} from '@react-ui-org/react-ui';
import { LoadingIcon } from '../LoadingIcon';
import { ShootingRangeAddModal } from '../ShootingRangeAddModal';
import routes from '../../routes';
import styles from './styles.scss';

const LayoutComponent = ({
  children,
  shootingRanges,
  shootingRangeGetAll,
  shootingRangeGetAllRequestState,
}) => {
  useEffect(() => {
    if (shootingRanges === null) {
      shootingRangeGetAll();
    }
  }, [shootingRanges, shootingRangeGetAll]);
  const [isShootingRangeDialogOpened, setIsShootingRangeDialogOpened] = useState(false);

  const history = useHistory();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>
          Shooting ranges
        </h1>
        <Button
          label="+ Add shooting range"
          onClick={() => setIsShootingRangeDialogOpened(true)}
          size="small"
        />
      </header>
      {(shootingRangeGetAllRequestState == null || shootingRangeGetAllRequestState === 'request') && (
        <main className={styles.content}>
          <LoadingIcon />
        </main>
      )}
      {shootingRangeGetAllRequestState === 'success' && (
        <main className={styles.content}>
          <Tabs>
            <TabsItem
              href={routes.map}
              isActive={history.location.pathname === routes.map}
              label="Map"
              onClick={(e) => {
                e.preventDefault();
                history.push(routes.map);
              }}
            />
            <TabsItem
              isActive={history.location.pathname === routes.list}
              label="List"
              onClick={(e) => {
                e.preventDefault();
                history.push(routes.list);
              }}
            />
            <TabsItem
              isActive={history.location.pathname === routes.about}
              label="About"
              onClick={(e) => {
                e.preventDefault();
                history.push(routes.about);
              }}
            />
          </Tabs>
          <div className={styles.tabContent}>
            {children}
          </div>
        </main>
      )}
      {shootingRangeGetAllRequestState === 'failure' && (
        <main className={styles.content}>
          <Alert color="danger">
            <strong>Error:</strong>
            {' '}
            Unable to fetch data from the server. Please, try it again.
          </Alert>
        </main>
      )}
      {isShootingRangeDialogOpened && (
        <ShootingRangeAddModal onClose={() => setIsShootingRangeDialogOpened(false)} />
      )}
      <footer className={styles.footer}>
        © 2022, Bedřich Schindler
      </footer>
    </div>
  );
};

LayoutComponent.defaultProps = {
  shootingRangeGetAllRequestState: null,
  shootingRanges: null,
};

LayoutComponent.propTypes = {
  children: PropTypes.node.isRequired,
  shootingRangeGetAll: PropTypes.func.isRequired,
  shootingRangeGetAllRequestState: PropTypes.string,
  shootingRanges: PropTypes.arrayOf(PropTypes.shape({})),
};

export default LayoutComponent;
