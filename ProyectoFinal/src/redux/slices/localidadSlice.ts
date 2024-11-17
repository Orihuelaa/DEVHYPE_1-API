import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILocalidad } from "../../endpoints/types/ILocalidad";

interface LocalidadState {
    localidades: ILocalidad[];
    localidadActiva: ILocalidad | null;
}

const initialState: LocalidadState = {
    localidades: [],
    localidadActiva: null,
};

export const localidadSlice = createSlice({
    name: "localidad",
    initialState,
    reducers: {
        setLocalidades: (state, action: PayloadAction<ILocalidad[]>) => {
            state.localidades = action.payload;
        },
        setLocalidadActiva: (state, action: PayloadAction<ILocalidad>) => {
            state.localidadActiva = action.payload;
        },
    },
});

export const { setLocalidades, setLocalidadActiva } = localidadSlice.actions;
export default localidadSlice.reducer;