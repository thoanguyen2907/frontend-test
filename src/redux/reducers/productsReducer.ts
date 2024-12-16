import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'

import { Product, ProductEdit } from '../../types/Product'
import { PaginationQuery } from '../../types/PaginationQuery'
import { API_URL } from '@/utils/constant'


const initialState: {
  products: Product[]
  product: Product | null
  productEdit: ProductEdit | null
  error?: string | unknown
  isLoading: boolean
} = {
  products: [],
  product: null,
  productEdit: null,
  isLoading: false
}

export const fetchAllProductAsync = createAsyncThunk<Product[], PaginationQuery>(
  'fetchAllProductAsync',
  async ({ limit, offset, signal }, { rejectWithValue }) => {
    try {
      const result = await axios.get<any, AxiosResponse<Product[]>>(
        `${API_URL}/products?offset=${offset}&limit=${limit}`,
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
      const result = await axios.patch<Product>(`${API_URL}/products/${id}`, editProduct)
      return result.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'error occurred'
      return rejectWithValue(message)
    }
  }
)
export const fetchOneProductAsync = createAsyncThunk(
  'fetchOneProductAsync',
  async ({ id, signal }: { id: string; signal: AbortSignal }, { rejectWithValue }) => {
    try {
      const result = await axios.get<any, AxiosResponse<Product>>(`${API_URL}/products/${id}`, { signal })
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
  reducers: {
    clearProduct: (state) => {
      state.product = initialState.product
      state.error = undefined
      state.isLoading = false
    }
  },
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

const productReducer = productsSlice.reducer
export const { clearProduct } = productsSlice.actions
export default productReducer
