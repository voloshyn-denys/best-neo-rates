import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "../../api/reates";

export const fetchRates = createAsyncThunk('users/fetchRates',
  async () => {
    return await API.fetchRates();
  }
);