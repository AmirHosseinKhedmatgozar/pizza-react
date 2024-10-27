// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../SERVICES/apiRestaurant';
import Button from '../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCard, getCard, getTotalPrice } from '../CARD/cardSlice';
import EmptyCart from '../CARD/EmptyCart';
import store from '../../store';
import { useState } from 'react';
import { formatCurrency } from '../../UTILS/helpers';
import { fetchAddress, user } from '../USER/userSlice';

// import Loader from "../../UI/Loader";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const errors = useActionData();

  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector(user);

  const submmiting = navigation.state === 'submitting';
  const isLoadingAddress = addressStatus === 'loading';

  const classLable = 'sm:basis-40';
  const classDiv = 'mb-5 flex flex-col gap-2 sm:flex-row sm:items-center';

  const cart = useSelector(getCard);

  const totalCartPrice = useSelector(getTotalPrice);
  const totalPrice = withPriority
    ? totalCartPrice * 0.2 + totalCartPrice
    : totalCartPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className={classDiv}>
          <label className={classLable}>First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={userName}
            className="input grow"
            required
          />
        </div>

        <div className={classDiv}>
          <label className={classLable}>Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {errors?.phone && (
              <p className="rounded-md bg-red-100 p-1.5 text-xs text-red-700">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className={`${classDiv} relative`}>
          <label className={classLable}>Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === 'failed' && (
              <p className="rounded-md bg-red-100 p-1.5 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[2.2rem] z-50 sm:top-[0.2rem] md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <Button disabalede={submmiting || isLoadingAddress} type="primary">
            {submmiting
              ? 'Placing Order ...'
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  //2 khate bala hefz nemikhad konim va faghat yek dastoor amal ast...
  const order = {
    ...data,
    priority: data.priority === 'true',
    cart: JSON.parse(data.cart),
  };

  const error = {};
  if (!isValidPhone(order.phone)) error.phone = 'your number is not current';
  if (Object.keys(error).length > 0) return error;
  const newOrder = await createOrder(order);
  store.dispatch(clearCard());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
