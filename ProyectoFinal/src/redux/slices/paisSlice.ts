import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPais } from "../../endpoints/types/IPais";

interface PaisState {
    paises: IPais[];
    paisActivo: IPais | null;
}

const initialState: PaisState = {
    paises: [],
    paisActivo: null,
};

export const paisSlice = createSlice({
    name: "pais",
    initialState,
    reducers: {
        setPaises: (state, action: PayloadAction<IPais[]>) => {
            state.paises = action.payload;
        },
        setPaisActivo: (state, action: PayloadAction<IPais>) => {
            state.paisActivo = action.payload;
        },
    },
});

export const { setPaises, setPaisActivo } = paisSlice.actions;
export default paisSlice.reducer;