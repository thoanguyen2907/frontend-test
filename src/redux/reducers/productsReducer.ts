import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'

import { Product } from '../../types/Product'
import { PaginationQuery } from '../../types/PaginationQuery'

const API_URL = "http://localhost:8080/api/v1/products"
const initialState: {
  products: Product[]
  error?: string | unknown
  isLoading: boolean
} = {
  products: [],
  isLoading: false
}



export const fetchAllProductAsync = createAsyncThunk<
  Product[], // The expected resolved data type
  PaginationQuery
>('fetchAllProductAsync', async ({ limit, offset }, { rejectWithValue }) => {
  try {
    const result = await axios.get<any, AxiosResponse<Product[]>>(
      `${API_URL}?offset=${offset}&limit=${limit}`
    )
    return result.data?.details?.records
  } catch (err) {
    const message = err instanceof Error ? err.message : 'error occurred'
    return rejectWithValue(message)
  }
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductAsync.fulfilled, (state, action) => {
      state.products = action.payload
      state.isLoading = false
      state.error = undefined
    })
    builder.addCase(fetchAllProductAsync.pending, (state, action) => {
      return {
        ...state,
        isLoading: true
      }
    })
    builder.addCase(fetchAllProductAsync.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload || 'failed to fetch products'
      }
    })
  }
})

const productReducer = productsSlice.reducer;

export default productReducer;
