import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategorias } from "../../endpoints/types/dtos/categorias/ICategorias";

interface SubCategoriaState {
    subCategorias: ICategorias[];
    subCategoriaActiva: ICategorias | null;
}
const initialState_subcategorias: SubCategoriaState = {
    subCategorias: [],
    subCategoriaActiva: null
}

export const subCategoriaSlice = createSlice({
    name: "subcategoria",
    initialState: initialState_subcategorias,
    reducers: {
        setSubCategorias: (state, action: PayloadAction<ICategorias[]>) => {
            state.subCategorias = action.payload;
        },
        setSubCategoriaActiva: (state, action: PayloadAction<ICategorias | null>) => {
            state.subCategoriaActiva = action.payload;
        },
    },
})

export const {setSubCategorias, setSubCategoriaActiva} = subCategoriaSlice.actions
export default subCategoriaSlice.reducer