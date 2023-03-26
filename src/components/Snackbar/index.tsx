import { FC, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../modules/hooks/redux';
import { toggleSnackbarClose } from '../../modules/redux/slices/snackbarSlice';
import styles from './style.module.css';

interface ISnackbar {
  timeout?: number;
}

export const Snackbar: FC<ISnackbar> = ({ timeout = 5000 }) => {
  const dispatch = useAppDispatch();

  const { isOpen: SHOW, message: MESSAGE } = useAppSelector((state) => state.snackbar);

  let TIMER: any;

  function handleClose() {
    clearTimeout(TIMER);
    dispatch(toggleSnackbarClose());
  }

  useEffect(() => {
    if (SHOW) {
      TIMER = setTimeout(() => {
        dispatch(toggleSnackbarClose());
      }, timeout);

      return () => {
        clearTimeout(TIMER);
      };
    }
  }, [SHOW, TIMER]);

  if (!SHOW) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <p>{MESSAGE}</p>
      <button className={styles.btn} onClick={handleClose}>
        <FiX />
      </button>
    </div>
  );
};
