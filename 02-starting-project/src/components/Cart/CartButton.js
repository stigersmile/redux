import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartAmount = useSelector(state=>state.cart.totalQuantity)

  const toggleCartHandler =()=>{
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick ={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartAmount}</span>
    </button>
  );
};

export default CartButton;
