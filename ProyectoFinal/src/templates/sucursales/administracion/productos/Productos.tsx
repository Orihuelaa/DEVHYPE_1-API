// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
// import { useEffect, useState } from "react";
// import { setArticuloActivo, setArticulos } from "../../../../redux/slices/articuloSlice";
// import { ArticuloService } from "../../../../services/ArticuloService";
// import { IProductos } from "../../../../endpoints/types/dtos/productos/IProductos";
// import { useForm } from "../../../../hooks/useForm";
// import { setCategoriaActiva } from "../../../../redux/slices/categoriaSlice";

const Productos = () => {
  // const navigate = useNavigate();
  // const {categoriaActiva} = useAppSelector((state) => state.categorias);
  // const { articulos } = useAppSelector((state) => state.articulos);
  // const { sucursalActiva } = useAppSelector((state) => state.sucursal);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const fetchArticulos = async () => {
  //     const articulosFromStorage = localStorage.getItem(`articulos-${sucursalActiva?.id}`);
  //     const articuloService = new ArticuloService('articulos');
  //     if (articulosFromStorage) {
  //       dispatch(setArticulos(JSON.parse(articulosFromStorage)));
  //     } else {
  //       try {
  //         const response = await articuloService.getArticulosBySucursal(sucursalActiva!.id);
  //         const articulos_all = response?.filter((articulo) => (articulo as IProductos).id !== undefined);
          
  //         dispatch(setArticulos(articulos_all as IProductos[]));
  //         localStorage.setItem(`articulos-${sucursalActiva?.id}`, JSON.stringify(articulos_all));
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  
  //   if (sucursalActiva) {
  //     fetchArticulos();
  //   }

  //   return ()=>{
  //     localStorage.removeItem(`articulos-${sucursalActiva?.id}`);
  //     dispatch(setArticulos([]));
  //   }

  // }, [dispatch, sucursalActiva]);

  // const {values, handleChanges} = useForm({
  //   categorias: "",
  // });

  // const handleEliminarProducto = async (id: number) => {
  //   const articuloService = new ArticuloService('articulos');

  //   const confirmDelete = window.confirm("¿Estás seguro de eliminar este producto?");
  //   if (confirmDelete) {
  //     try {
  //       await articuloService.deleteArticuloById(id);
  //       dispatch(setArticulos(articulos.filter((articulo) => articulo.id !== id)));
  //     } catch (error) {
  //       console.error("Error al eliminar el producto:", error);
  //     }
  //   }
  // }

  // const handleSetArticuloActivo = (articulo: IProductos, route?: string) => {
  //   dispatch(setArticuloActivo(articulo));
  //   if (route) navigate(route);
  // };

  // return (
  //   <>
  //     <div>
  //       <button onClick={() => navigate(`/admin/crear-producto`)}>Crear Producto</button>
  //     </div>
  //     <div>
  //       <h3>Filtrar por categoria:</h3>
  //       <label htmlFor="categorias"></label>
  //       <select id="categorias" name="categorias" value={values.categorias} onChange={handleChanges} required >
  //         <option value="" disabled>-Todas las Categorias-</option>
  //         {productosPaginaActual.map((articulo) => (
  //           <option key={articulo.id} value={articulo.categoria.denominacion} onClick={()=> dispatch(setCategoriaActiva(articulo.categoria))}>
  //             {articulo.categoria.denominacion}
  //           </option>
  //         ))}
  //       </select> 
  //     </div>
  //     <div>
  //       {categoriaActiva && (
  //         <table>
  //           <thead>
  //             <tr>
  //               <th>Nombre</th>
  //               <th>Precio</th>
  //               <th>Descripcion</th>
  //               <th>Categoria</th>
  //               <th>Habilitado</th>
  //               <th>Acciones</th>
  //             </tr>
  //           </thead>
          
  //         <tbody>
  //           {productosPaginaActual.filter((articulo) => articulo.categoria.denominacion === categoriaActiva.denominacion).map((articulo) => (
  //             <tr key={articulo.id} onClick={() => handleSetArticuloActivo(articulo)}>
  //               <td>{articulo.denominacion}</td>
  //               <td>{articulo.precioVenta}</td>
  //               <td>{articulo.descripcion}</td>
  //               <td>{articulo.categoria.denominacion}</td>
  //               <td>{articulo.habilitado}</td>
  //               <td>
  //                 <button onClick={(e) =>{ e.stopPropagation(); handleSetArticuloActivo(articulo, `/admin/ver-producto`)}}>Ver</button>
  //                 <button onClick={(e) => {e.stopPropagation(); handleSetArticuloActivo(articulo, `/admin/editar-producto`)}}>Editar</button>
  //                 <button onClick={()=> handleEliminarProducto(articulo.id)}>Eliminar</button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
            
  //         <tfoot>
  //           <tr>
  //             <td colSpan={6}>
  //               <button onClick={handlePaginaAnterior} disabled={paginaActual === 1}>{"<"}</button>
  //               <span>Página {paginaActual} de {totalPaginas}</span>
  //               <button onClick={handlePaginaSiguiente} disabled={paginaActual === totalPaginas}>{">"}</button>
  //             </td>
  //           </tr>
  //         </tfoot>
  //       </table>  
  //       )}
  //     </div>
  //   </>
  // );
};

export default Productos;
