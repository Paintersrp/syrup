import { useSelector } from 'react-redux';

export const useApp = () => {
  const alert = useSelector<any, any>((state: any) => state.alert);
  const auth = useSelector<any, any>((state: any) => state.auth);
  const editMode = useSelector<any>((state: any) => state.editMode.editMode);
  const loading = useSelector<any>((state: any) => state.loading.loading);

  return {
    alert,
    auth,
    editMode,
    loading,
  };
};
