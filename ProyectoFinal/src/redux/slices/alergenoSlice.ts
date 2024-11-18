import { createSlice } from "@reduxjs/toolkit";
import { IAlergenos } from "../../endpoints/types/dtos/alergenos/IAlergenos";



interface AlergenoState {
    alergenos: IAlergenos[];
    alergenoActivo: IAlergenos | null;
}

const initialState: AlergenoState = {
    alergenos: [],
    alergenoActivo: null
}

export const alergenoSlice = createSlice({
    name: "alergeno",
    initialState,
    reducers: {
        setAlergenos: (state, action) => {
            state.alergenos = action.payload;
        },
        setAlergenoActivo: (state, action) => {
            state.alergenoActivo = action.payload;
        }
    }
});

export const { setAlergenos, setAlergenoActivo } = alergenoSlice.actions;
export default alergenoSlice.reducer;