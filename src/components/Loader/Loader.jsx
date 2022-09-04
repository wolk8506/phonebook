import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Circles } from 'react-loader-spinner';
import s from 'components/Loader/Loader.module.css';

export const Loader = () => {
  return (
    <div className={s.loader}>
      <Circles color="#00BFFF" height={80} width={80} />
    </div>
  );
};
