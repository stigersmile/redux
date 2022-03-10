import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  console.log("FETCH");
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-shoppingcart-21665-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Couldn't fetch cart data.");
      }

      const data = await response.json();
      console.log(data);
      return data;
    };

    try {
      // prevent to block use async (dispatch)
      const cartData = await fetchData();

      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetch cart data failed!",
        })
      );
    }
  }; // return
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-shoppingcart-21665-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
