import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { Loading } from '@/components/Elements';
import Error from '@/components/Layout/Error';

interface RootState {
  loading: {
    loading: boolean;
  };
}

export const useLoading = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);
  const dispatch = useDispatch();
  const timerRef = useRef<any | null>(null);

  const startLoad = () => {
    dispatch({ type: 'TOGGLE_LOADING_ON' });
  };

  const endLoad = (duration: number = 0) => {
    timerRef.current = setTimeout(() => {
      dispatch({ type: 'TOGGLE_LOADING_OFF' });
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    }, duration);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { loading, startLoad, endLoad };
};
