import { configureStore } from "@reduxjs/toolkit";
import empresaReducer from "../slices/empresaSlice"
import sucursalReducer from "../slices/sucursalSlice"
import categoriaReducer from "../slices/categoriaSlice"
import paisReducer from "../slices/paisSlice"
import provinciaReducer from "../slices/provinciaSlice"
import localidadReducer from "../slices/localidadSlice"
import alergenoReducer from "../slices/alergenoSlice"
import articuloReducer from "../slices/articuloSlice"
import subCategoriaReducer from "../slices/subCategoriaSlice"

export const store = configureStore({
  reducer: {
    empresa: empresaReducer,
    sucursal: sucursalReducer,
    categorias: categoriaReducer,
    subCategorias: subCategoriaReducer,
    paises: paisReducer,
    provincias: provinciaReducer,
    localidades: localidadReducer,
    alergenos: alergenoReducer,
    articulos: articuloReducer
  },
});

// Tipos para tu store y el hook dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;