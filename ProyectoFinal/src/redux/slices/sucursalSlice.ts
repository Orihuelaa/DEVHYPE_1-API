import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../endpoints/types/dtos/sucursal/ISucursal";

// Definimos el estado inicial
interface SucursalState {
  sucursales: ISucursal[];
  sucursalActiva: ISucursal | null;
}

const initialState: SucursalState = {
  sucursales: [
    {
      id: 0,
      nombre: "",
      empresa: {
        id: 0,
        nombre: "",
        razonSocial: "",
        cuit: 0,
        logo: null,
        sucursales: [],
        pais: { id: 0, nombre: "" }
      },
      domicilio: {
        calle: "",
        numero: 0,
        localidad: {
          id: 0,
          nombre: "",
          provincia: {
            id: 0,
            nombre: "",
            pais: { id: 0, nombre: "" }
          }
        },
        id: 0,
        cp: 0,
        piso: 0,
        nroDpto: 0
      },
      calle: "",
      latitud: 0,
      longitud: 0,
      categorias: [],
      esCasaMatriz: false,
      horarioApertura: "",
      horarioCierre: "",
      eliminado: false,
      logo: ''
    }
  ],
  sucursalActiva: null
};

export const sucursalSlice = createSlice({
  name: "sucursal",
  initialState,
  reducers: {
    setSucursales: (state, action: PayloadAction<ISucursal[]>) => {
      state.sucursales = action.payload;
    },
    setSucursalActiva: (state, action: PayloadAction<ISucursal>) => {
      state.sucursalActiva = action.payload;
    }
  }
});

export const { setSucursales, setSucursalActiva } = sucursalSlice.actions;
export default sucursalSlice.reducer;
