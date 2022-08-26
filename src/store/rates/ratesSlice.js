import { createSlice } from "@reduxjs/toolkit"
import { fetchRates } from "./thunks";

const initialState = {
  loading: true,
  rates: [],
  nodes: [],
};

const ratesReducer = createSlice({
    name: 'rates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchRates.fulfilled, (state, action) => {
        state.loading = false;
        
        const rates = action.payload;
        const nodes = action.payload.flatMap((item) => {
          const { 
            fromCurrencyCode, 
            fromCurrencyName, 
            toCurrencyCode, 
            toCurrencyName 
          } = item;
      
          return [
            { value: fromCurrencyCode, name: fromCurrencyName },
            { value: toCurrencyCode, name: toCurrencyName },
          ];
        });
      
        const uniqueNodes = [
          ...new Map(nodes.map((item) => [item['value'], item])).values(),
        ];

        state.nodes = uniqueNodes;
        state.rates = rates;
      })
    },
  })
  

const { reducer } = ratesReducer;
export const ratesSelector = (state) => state.rates;

export default reducer;
