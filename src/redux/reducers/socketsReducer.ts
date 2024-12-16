import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'

import { PaginationQuery } from '../../types/PaginationQuery'
import { Socket } from '@/types/Socket'
import { API_URL } from '../../utils/constant'

const initialState: {
  sockets: Socket[]
  error?: string | unknown
  isLoading: boolean
} = {
  sockets: [],
  isLoading: false
}

export const fetchAllSocketAsync = createAsyncThunk<Socket[], PaginationQuery>(
  'fetchAllSocketAsync',
  async ({ limit, offset, signal }, { rejectWithValue }) => {
    try {
      const result = await axios.get<any, AxiosResponse<Socket[]>>(
        `${API_URL}/sockets?offset=${offset}&limit=${limit}`,
        { signal }
      )
      return result.data?.details?.records
    } catch (err) {
      const message = err instanceof Error ? err.message : 'error occurred'
      return rejectWithValue(message)
    }
  }
)

const socketsSlice = createSlice({
  name: 'sockets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSocketAsync.fulfilled, (state, action) => {
      state.sockets = action.payload
      state.isLoading = false
      state.error = undefined
    })
    builder.addCase(fetchAllSocketAsync.pending, (state, action) => {
      return {
        ...state,
        isLoading: true
      }
    })
    builder.addCase(fetchAllSocketAsync.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload || 'failed to fetch sockets'
      }
    })
  }
})

const socketReducer = socketsSlice.reducer
export default socketReducer
