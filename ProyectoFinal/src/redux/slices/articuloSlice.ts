import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductos } from "../../endpoints/types/dtos/productos/IProductos";

interface ArticulosState {
    articulos: IProductos[];
    articuloActivo: IProductos | null;
}

const initialState: ArticulosState = {
    articulos: [],
    articuloActivo: null,
};

export const articulosSlice = createSlice({
    name: "articulos",
    initialState,
    reducers: {
        setArticulos: (state, action: PayloadAction<IProductos[]>) => {
            state.articulos = action.payload;
        },
        setArticuloActivo: (state, action: PayloadAction<IProductos | null>) => {
            state.articuloActivo = action.payload;
        },
    },
});

export const { setArticulos, setArticuloActivo } = articulosSlice.actions;
export default articulosSlice.reducer;
