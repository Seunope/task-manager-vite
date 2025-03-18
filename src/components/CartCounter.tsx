import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { Cart } from '../config/utils/types';
import { AppDispatch, RootState } from '../config/redux/store';
import { updateCartState } from '../config/redux/reducers/cartSlice';
import { ADD_TO_CART_2, REMOVE_FROM_CART_2 } from '../config/api/http';
import { CustomAxiosErrorType, onError, onSuccess } from '../config/api/http-mthd';

interface Props {
  item: Cart;
}

const CartCounter = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);
  const [counter, setCounter] = useState<number>(props.item.quantity || 0);

  // console.log('props.item', props.item);
  // console.log('props.itemKK', items);

  useEffect(() => {
    const preloadData = () => {
      if (items.length > 0) {
        items?.map((el: Cart) => {
          if (el?.productSkuId === props?.item?.productSkuId) {
            setCounter(el.quantity || 0);
          }
        });
      }
    };
    preloadData();
  }, [items, props?.item?.productSkuId]);

  const handleAddToCart = async () => {
    try {
      const pData = props.item;
      setLoading(true);
      const input = {
        customerId: pData.businessId,
        productId: pData.productId,
        quantity: 1,
      };

      const response = await ADD_TO_CART_2(input);
      setLoading(false);
      const res = onSuccess(response);
      console.log('resSSSSS', res);
      if (res && res.status == 'success') {
        setCounter(counter + 1);
        dispatch(updateCartState(res));
      } else {
        toast.error(res.message || 'An error adding item. Try again');
      }
    } catch (e: unknown | CustomAxiosErrorType) {
      let msg = '';
      const disError = onError(e as CustomAxiosErrorType);
      msg = disError as string;
      toast.error(msg);
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (counter == 0) {
      return;
    }
    try {
      const pData = props.item;
      setLoading(true);
      const input = {
        customerId: pData.businessId,
        productId: pData.productId,
        quantity: 1,
      };

      const response = await REMOVE_FROM_CART_2(input);
      setLoading(false);
      const res = onSuccess(response);
      console.log('res', res);
      if (res && res.status == 'success') {
        setCounter(counter - 1);
        dispatch(updateCartState(res));
      } else {
        toast.error(res.message || 'An error removing item. Try again');
      }
    } catch (e: unknown) {
      let msg = null;
      const disError = onError(e as CustomAxiosErrorType);
      msg = disError as string;
      toast.error(msg);
      setLoading(false);
    }
  };

  // const handleRemoveFromCart = () => {
  //   if (counter !== 0) {
  //     const pData = props.item;
  //     //console.log("pDatapData", pData);
  //     const input = {
  //       customerId: pData.shopId,
  //       productId: pData.productId,
  //       quantity: 1,
  //     };
  //    // console.log("inputRemove", input);
  //     dispatch(removeProductFromCart(input));
  //     setCounter(counter - 1);
  //   }
  // };

  return loading ? (
    <BeatLoader color="green" />
  ) : (
    <div className=" font-semibold flex text-xl sm:text-2xl sm:justify-center">
      <div
        className="w-9 h-7 bg-SECONDARY rounded-s-xl sm:rounded-s-md 
        flex items-center justify-center cursor-pointer"
        onClick={() => handleRemoveFromCart()}
      >
        -
      </div>

      <div className="w-9 h-7 bg-SECONDARY/20 flex justify-center items-center text-base">
        {counter}
      </div>

      <div
        className="w-9 h-7 bg-SECONDARY rounded-e-xl sm:rounded-e-md 
        flex items-center justify-center cursor-pointer"
        onClick={() => handleAddToCart()}
      >
        +
      </div>
    </div>
  );
};

export default CartCounter;
