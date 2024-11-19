// import { IAlergenos } from "./endpoints/types/dtos/alergenos/IAlergenos";
// import { ICategorias } from "./endpoints/types/dtos/categorias/ICategorias";
// import { IEmpresa } from "./endpoints/types/dtos/empresa/IEmpresa";
// import { IProductos } from "./endpoints/types/dtos/productos/IProductos";
// import { ISucursal } from "./endpoints/types/dtos/sucursal/ISucursal";
// import { ILocalidad } from "./endpoints/types/ILocalidad";
// import { IPais } from "./endpoints/types/IPais";
// import { IProvincia } from "./endpoints/types/IProvincia";

// // Sucursales

// // Datos auxiliares
// const paisArgentina: IPais = { id: 1, nombre: "Argentina" };
// const provinciaBuenosAires: IProvincia = { id: 1, nombre: "Buenos Aires", pais: paisArgentina };
// const localidad: ILocalidad = { id: 1, nombre: "CABA", provincia: provinciaBuenosAires };

// const empresaEjemplo: IEmpresa = {
//   id: 1,
//   nombre: "DevHype",
//   razonSocial: "DevHype S.A",
//   cuit: 123456789,
//   logo: null,
//   sucursales: [],
//   pais: paisArgentina
// };

// // Producto de ejemplo para las categorías
// const productoEjemplo: IProductos = {
//   id: 1,
//   denominacion: "Producto de Ejemplo",
//   precioVenta: 100,
//   descripcion: "Descripción del producto de ejemplo",
//   categoria: {} as ICategorias, // se completará al asignarlo
//   eliminado: false,
//   habilitado: true,
//   codigo: "PROD001",
//   alergenos: [],
//   imagenes: []
// };

// // Categoría de ejemplo
// const categoriaEjemplo: ICategorias = {
//   id: 1,
//   denominacion: "Categoría General",
//   eliminado: false,
//   sucursales: [],
//   subCategorias: [],
//   categoriaPadre: null,
//   articulos: productoEjemplo
// };

// export const sucursales: ISucursal[] = [
//   {
//     id: 1,
//     nombre: "Sucursal Central",
//     empresa: empresaEjemplo,
//     domicilio: {
//       id: 1,
//       calle: "Av. Principal",
//       numero: 123,
//       cp: 1000,
//       piso: 1,
//       nroDpto: 0,
//       localidad: localidad
//     },
//     calle: "Av. Principal",
//     latitud: -34.6037,
//     longitud: -58.3816,
//     categorias: [categoriaEjemplo],
//     esCasaMatriz: true,
//     horarioApertura: "09:00",
//     horarioCierre: "18:00",
//     eliminado: false,
//     logo: undefined
//   },
//   {
//     id: 2,
//     nombre: "Sucursal Norte",
//     empresa: empresaEjemplo,
//     domicilio: {
//       id: 2,
//       calle: "Av. Norte",
//       numero: 456,
//       cp: 1001,
//       piso: 2,
//       nroDpto: 5,
//       localidad: localidad
//     },
//     calle: "Av. Norte",
//     latitud: -34.6039,
//     longitud: -58.3818,
//     categorias: [categoriaEjemplo],
//     esCasaMatriz: false,
//     horarioApertura: "10:00",
//     horarioCierre: "19:00",
//     eliminado: false,
//     logo: undefined
//   },
//   {
//     id: 3,
//     nombre: "Sucursal Sur",
//     empresa: empresaEjemplo,
//     domicilio: {
//       id: 3,
//       calle: "Av. Sur",
//       numero: 789,
//       cp: 1002,
//       piso: 3,
//       nroDpto: 6,
//       localidad: localidad
//     },
//     calle: "Av. Sur",
//     latitud: -34.6040,
//     longitud: -58.3820,
//     categorias: [categoriaEjemplo],
//     esCasaMatriz: false,
//     horarioApertura: "08:00",
//     horarioCierre: "17:00",
//     eliminado: false,
//     logo: undefined
//   },
//   {
//     id: 4,
//     nombre: "Sucursal Oeste",
//     empresa: empresaEjemplo,
//     domicilio: {
//       id: 4,
//       calle: "Av. Oeste",
//       numero: 101,
//       cp: 1003,
//       piso: 4,
//       nroDpto: 7,
//       localidad: localidad
//     },
//     calle: "Av. Oeste",
//     latitud: -34.6042,
//     longitud: -58.3822,
//     categorias: [categoriaEjemplo],
//     esCasaMatriz: false,
//     horarioApertura: "09:30",
//     horarioCierre: "18:30",
//     eliminado: false,
//     logo: undefined
//   },
//   {
//     id: 5,
//     nombre: "Sucursal Este",
//     empresa: empresaEjemplo,
//     domicilio: {
//       id: 5,
//       calle: "Av. Este",
//       numero: 102,
//       cp: 1004,
//       piso: 5,
//       nroDpto: 8,
//       localidad: localidad
//     },
//     calle: "Av. Este",
//     latitud: -34.6044,
//     longitud: -58.3824,
//     categorias: [categoriaEjemplo],
//     esCasaMatriz: false,
//     horarioApertura: "10:00",
//     horarioCierre: "19:00",
//     eliminado: false,
//     logo: undefined
//   },
//   {
//     id: 6,
//     nombre: "Sucursal Centro",
//     empresa: empresaEjemplo,
//     domicilio: {
//       id: 6,
//       calle: "Av. Centro",
//       numero: 103,
//       cp: 1005,
//       piso: 6,
//       nroDpto: 9,
//       localidad: localidad
//     },
//     calle: "Av. Centro",
//     latitud: -34.6046,
//     longitud: -58.3826,
//     categorias: [categoriaEjemplo],
//     esCasaMatriz: false,
//     horarioApertura: "08:30",
//     horarioCierre: "17:30",
//     eliminado: false,
//     logo: undefined
//   }
// ];


// //Empresas


// export const empresas: IEmpresa[] = [
//     {
//       id: 1,
//       nombre: "DevHype",
//       razonSocial: "DevHype S.A",
//       cuit: 123456789,
//       logo: null,
//       sucursales: [],
//       pais: {
//         id: 1,
//         nombre: "Argentina"
//       }
//     },
//     {
//       id: 2,
//       nombre: "Bendito Rufian",
//       razonSocial: "Bendito Rufian S.A",
//       cuit: 123456789,
//       logo: null,
//       sucursales: [],
//       pais: {
//         id: 1,
//         nombre: "Argentina"
//       }
//     },
//     {
//       id: 3,
//       nombre: "Bendito Rufian",
//       razonSocial: "Bendito Rufian S.A",
//       cuit: 123456789,
//       logo: null,
//       sucursales: [],
//       pais: {
//         id: 1,
//         nombre: "Argentina"
//       }
//     }
//   ]


//   //Alergenos

//   // Ejemplo de uso
// export const alergenos: IAlergenos[] = [
//   {
//     id: 1,
//     denominacion: "Gluten",
//     imagen: {
//       id: 1,
//       name: "gluten.png",
//       url: "/images/gluten.png",
//       eliminado: false,
//     },
//   },
//   {
//     id: 2,
//     denominacion: "Lactosa",
//     imagen: {
//       id: 2,
//       name: "lactosa.png",
//       url: "/images/lactosa.png",
//       eliminado: false,
//     },
//   },
//   {
//     id: 3,
//     denominacion: "Frutos secos",
//     imagen: {
//       id: 3,
//       name: "frutos_secos.png",
//       url: "/images/frutos_secos.png",
//       eliminado: false,
//     },
//   },
// ];


// //Productos
// // Datos de ejemplo para Productos
// export const productos: IProductos[] = [
//   {
//     id: 1,
//     denominacion: "Producto 1",
//     precioVenta: 100,
//     descripcion: "Descripción del producto 1",
//     categoria: {
//       id: 1,
//       denominacion: "Categoría General",
//       eliminado: false,
//       sucursales: [],
//       subCategorias: [],
//       categoriaPadre: null,
//       articulos: null, // `articulos` es opcional y puede ser `null`
//     },
//     eliminado: false,
//     habilitado: true,
//     codigo: "P001",
//     alergenos: [
//       {
//         id: 1,
//         denominacion: "Gluten",
//         imagen: {
//           id: 1,
//           name: "gluten.png",
//           url: "/images/gluten.png",
//           eliminado: false,
//         },
//       },
//     ],
//     imagenes: [
//       {
//         id: 1,
//         name: "producto1.png",
//         url: "/images/producto1.png",
//       },
//     ],
//   },
//   // Puedes añadir más productos de ejemplo aquí
// ];


