import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  login: boolean;
  firstname?: string;
  role?: string;
  userImgURL?: string;
  clientId?:string;
  email?:string;
}

const initialState: UserState = {
  login: false,
  firstname: 'Anastasiуa Dobrota',
  role: '',
  userImgURL: '',
  clientId:'',
  email:'dobrota@gmail.com'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{ firstname: string; role: string; userImgURL?: string , clientId?:string, email?:string}>
    ) => {
      state.login = true;
      state.firstname = action.payload.firstname;
      state.role = action.payload.role;
      state.userImgURL = "https://pbe-team-7-backend-asset-bucket.s3.ap-southeast-2.amazonaws.com/avatar.png"//action.payload.userImgURL;
      state.clientId = action.payload.clientId;
      state.email = action.payload.email
    },
    logoutUser: (state) => {
      state.login = false;
      state.firstname = '';
      state.role = '';
      state.userImgURL = '';
      state.clientId = ''
    },
  },
});

const userReducer= userSlice.reducer;

export const { loginUser, logoutUser } = userSlice.actions;
export default userReducer;
