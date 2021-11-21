import { createSlice } from "@reduxjs/toolkit";
import * as transactionsOps from "./transactions-ops";

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: {
        items: [],
        error: null,
        isLoading: false,
    },
    extraReducers: {
        [transactionsOps.getExpTransactions.fulfilled]: (state, action) => {
            state.items = action.payload
        },
        [transactionsOps.getIncTransactions.fulfilled]: (state, action) => {
            state.items = action.payload
        },
        [transactionsOps.addExpTransaction.fulfilled]: (state, action) => {
            state.items.push(action.payload)
        },
        [transactionsOps.addIncTransaction.fulfilled]: (state, action) => {
            // console.log(action.payload)
            state.items.push(action.payload)
        },
        [transactionsOps.removeTransaction.fulfilled](state, action) {
            state.items = state.items.filter(({_id}) => _id !== action.payload);
        },
       
    }
})

export default transactionsSlice.reducer;