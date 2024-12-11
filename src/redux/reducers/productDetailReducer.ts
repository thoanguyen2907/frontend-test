import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'

import { Product } from '../../types/Product'

const API_URL = "http://localhost:8080/api/v1/products"

const initialState: {
  product: Product | null
  error?: string | unknown
  isLoading: boolean
} = {
  product: null,
  isLoading: false
}

export const fetchOneProductAsync = createAsyncThunk(
  'fetchOneProductAsync',
   async ({ id, signal }: { id: string; signal: AbortSignal }, { rejectWithValue }) => {
  try {
    const result = await axios.get<any, AxiosResponse<Product>>(
      `${API_URL}/${id}`,
      { signal }
    )
    return result.data
  } catch (err) {
    const message = err instanceof Error ? err.message : 'error occurred'
    return rejectWithValue(message)
  }
})

const productDetailSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
     clearProduct: (state) => {
      state.product = initialState.product;
      state.error = undefined;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOneProductAsync.fulfilled, (state, action) => {
      state.product = action.payload
      state.isLoading = false
      state.error = undefined
    })
    builder.addCase(fetchOneProductAsync.pending, (state, action) => {
      return {
        ...state,
        isLoading: true
      }
    })
    builder.addCase(fetchOneProductAsync.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload || 'failed to fetch products'
      }
    })
  }
})

const productDetailReducer = productDetailSlice.reducer;
export const { clearProduct } = productDetailSlice.actions;

export default productDetailReducer;
