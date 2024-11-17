import { configureStore } from "@reduxjs/toolkit";
import empresaReducer from "../slices/empresaSlice"
import sucursalReducer from "../slices/sucursalSlice"
import categoriaReducer from "../slices/categoriaSlice"
import paisReducer from "../slices/paisSlice"
import provinciaReducer from "../slices/provinciaSlice"
import localidadReducer from "../slices/localidadSlice"


export const store = configureStore({
  reducer: {
    empresa: empresaReducer,
    sucursal: sucursalReducer,
    categorias: categoriaReducer,
    paises: paisReducer,
    provincias: provinciaReducer,
    localidades: localidadReducer
  },
});

// Tipos para tu store y el hook dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;