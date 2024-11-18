import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductos } from "../../endpoints/types/dtos/productos/IProductos";

interface ArticuloState {
    articulos: IProductos[];
    articuloActivo: IProductos | null;
}

const initialState: ArticuloState = {
    articulos: [],
    articuloActivo: null,
};

export const articuloSlice = createSlice({
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

export const { setArticulos, setArticuloActivo } = articuloSlice.actions;
export default articuloSlice.reducer;