import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategorias } from "../../endpoints/types/dtos/categorias/ICategorias";

// Definimos la interfaz para el estado
interface CategoriaState {
    categorias: ICategorias[];
    categoriaActiva: ICategorias | null;
    mostrarSubCategoria: ICategorias | null;
}  
// Estado inicial corregido
const initialState: CategoriaState = {
    categorias: [],
    categoriaActiva: null,
    mostrarSubCategoria: null
};

export const categoriaSlice = createSlice({
    name: "categoria",
    initialState,
    reducers: {
        setCategorias: (state, action: PayloadAction<ICategorias[]>) => {
            state.categorias = action.payload;
        },
        setCategoriaActiva: (state, action: PayloadAction<ICategorias | null>) => {
            state.categoriaActiva = action.payload;
        },
        setShowSubCategoria: (state, action: PayloadAction<ICategorias | null>) => {
           state.mostrarSubCategoria = action.payload;
        },
    }
});

export const { setCategorias, setCategoriaActiva, setShowSubCategoria } = categoriaSlice.actions;
export default categoriaSlice.reducer;