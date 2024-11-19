import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../endpoints/types/dtos/empresa/IEmpresa";

// Definimos la interfaz para el estado
interface EmpresaState {
    empresas: IEmpresa[];
    empresaActiva: IEmpresa | null;
  }
  
// Estado inicial corregido
const initialState: EmpresaState = {
    empresas: [],
    empresaActiva: null
};


export const empresaSlice = createSlice({
    name: "empresa",
    initialState,
    reducers: {
        setEmpresas: (state, action: PayloadAction<IEmpresa[]>) => {
            state.empresas = action.payload; // Si usaramos return, estariamos reemplazando todo el estado, no solo una parte del mismo (eliminariamos todas las demás propiedades del estado)
        },
        setEmpresaActiva:(state, action: PayloadAction<IEmpresa>)=> {
            state.empresaActiva = action.payload;
        }
    }
});

export const { setEmpresas, setEmpresaActiva } = empresaSlice.actions;
export default empresaSlice.reducer;
