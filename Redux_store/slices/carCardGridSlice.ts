import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CarDetails } from "../../components/types/carDetails"; 

export type Car = {
  
  imageUrl: string;
  model: string;
  location: string;
  carRating: string;
  pricePerDay: string;
  status: string;
  carId:string;
  serviceRating:string
  
};

interface CarCardGridState {
  allCars:Car[];
  cars: Car[];
  showModal: boolean;
  paginationData:Array<number>;
  selectedCar:CarDetails|null;
  selectedCar_data_fetched:boolean
  is_intial_data_fetched_cars:boolean
}

// const preserved_state: CarCardGridState = {
//   allCars:[],
//   cars:[],
//   showModal: false,
//   paginationData:[1,8,1],
//   selectedCar:null,
//   selectedCar_data_fetched:false,
//   is_intial_data_fetched_cars:false
// };

const initialState: CarCardGridState = {
  allCars:[],
  cars:[],
  showModal: false,
  paginationData:[1,8,1],
  selectedCar:null,
  selectedCar_data_fetched:false,
  is_intial_data_fetched_cars:false
};

const carCardGridSlice = createSlice({
  name: 'carCardGrid',
  initialState,
  reducers: {
    
    setAllCars:(state, action:PayloadAction<Car[]>)=>{
      state.allCars = action.payload;
    },
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    set_pagination_data:(state, action:PayloadAction<Array<number>>)=>{
      state.paginationData=action.payload
    },
    setSelectedCar: (state, action: PayloadAction<CarDetails | null>) => {
      state.selectedCar = action.payload;
    },
    set_selected_car_data_fetched(state,action:PayloadAction<boolean>){
      state.selectedCar_data_fetched=action.payload
    },
    set_intial_data_fetched_cars(state,action:PayloadAction<boolean>){
      state.is_intial_data_fetched_cars=action.payload
    },
    // set_state_to_old_carcardgrid(){
    //   return JSON.parse(JSON.stringify(preserved_state))
    // }
  },
});
const carCardGridReducer=carCardGridSlice.reducer
export const { setAllCars, setCars, toggleModal, set_pagination_data, setSelectedCar ,set_selected_car_data_fetched } = carCardGridSlice.actions;
export default carCardGridReducer
