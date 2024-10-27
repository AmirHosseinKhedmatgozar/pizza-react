import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../SERVICES/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  },
);

const initialState = {
  userName: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.address = action.payload.address;
        state.position = action.payload.position;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.error = 'there was problem get your address';
        state.status = 'failed';
      })
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      });
  },
});
export const user = (state) => state.user;
export const { updateName } = userSlice.actions;
export default userSlice.reducer;
