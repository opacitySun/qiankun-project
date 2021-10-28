import { useDispatch, useSelector } from "react-redux";
import { increment } from '@src/store/actions/index';
import Header from '@src/components/Header';

function Home() {
  const dispatch = useDispatch();

  const count = useSelector<StateModal>(
    state => {
      return state.testReducer.count;
    }
  );

  const fnClick = () => {
    dispatch(increment());
  };

  return (
    <div className='app'>
      <Header />
      <span>{`Hello! I'm yearssss old.`}</span>
      <div>current number： {count} <button onClick={()=>fnClick()}>点击+1</button></div>
    </div>
  )
}

export default Home;