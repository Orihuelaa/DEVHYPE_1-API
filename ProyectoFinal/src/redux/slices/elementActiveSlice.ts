import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface elementState{
    elementActive: string | null
}

const initialState: elementState = {
    elementActive: null
};

export const elementActiveSlice = createSlice({
    name: "elementActive",
    initialState,
    reducers: {
        setElementActive: (state, action: PayloadAction<string | null>) => {
            state.elementActive = action.payload;
        }
    }
});

export const { setElementActive } = elementActiveSlice.actions;
export default elementActiveSlice.reducer;