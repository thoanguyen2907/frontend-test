import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'

import { Product, ProductEdit } from '../../types/Product'
import { PaginationQuery } from '../../types/PaginationQuery'

const API_URL = 'http://localhost:8080/api/v1/products'

const initialState: {
  products: Product[]
  productEdit: ProductEdit | null
  error?: string | unknown
  isLoading: boolean
} = {
  products: [],
  productEdit: null,
  isLoading: false
}

export const fetchAllProductAsync = createAsyncThunk<Product[], PaginationQuery>(
  'fetchAllProductAsync',
  async ({ limit, offset, signal }, { rejectWithValue }) => {
    try {
      const result = await axios.get<any, AxiosResponse<Product[]>>(
        `${API_URL}?offset=${offset}&limit=${limit}`,
        { signal }
      )
      return result.data?.details?.records
    } catch (err) {
      const message = err instanceof Error ? err.message : 'error occurred'
      return rejectWithValue(message)
    }
  }
)
export const editProductAsync = createAsyncThunk(
  'editProductAsync',
  async ({ editProduct, id }: { editProduct: ProductEdit; id: string }, { rejectWithValue }) => {
    try {
      const result = await axios.patch<Product>(`${API_URL}/${id}`, editProduct)
      return result.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'error occurred'
      return rejectWithValue(message)
    }
  }
)

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
    builder.addCase(editProductAsync.fulfilled, (state, action) => {
      state.products = state.products.map((item) =>
        item.id === action.payload.id ? action.payload : item
      )
    })
    builder.addCase(editProductAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(editProductAsync.rejected, (state) => {
      state.isLoading = false
    })
  }
})

const productReducer = productsSlice.reducer

export default productReducer
