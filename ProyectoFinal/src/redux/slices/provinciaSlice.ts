import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProvincia } from "../../endpoints/types/IProvincia";

interface ProvinciaState {
    provincias: IProvincia[];
    provinciaActiva: IProvincia | null;
}

const initialState: ProvinciaState = {
    provincias: [],
    provinciaActiva: null,
};

export const provinciaSlice = createSlice({
    name: "provincia",
    initialState,
    reducers: {
        setProvincias: (state, action: PayloadAction<IProvincia[]>) => {
            state.provincias = action.payload;
        },
        setProvinciaActiva: (state, action: PayloadAction<IProvincia>) => {
            state.provinciaActiva = action.payload;
        },
    },
});

export const { setProvincias, setProvinciaActiva } = provinciaSlice.actions;
export default provinciaSlice.reducer;