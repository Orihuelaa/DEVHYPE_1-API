import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/store";
import { CategoriaService } from "../../../../../services/CategoriaService";
import { useForm } from "../../../../../hooks/useForm";
import { IUpdateCategoria } from "../../../../../endpoints/types/dtos/categorias/IUpdateCategoria";
import { setSubCategorias } from "../../../../../redux/slices/subCategoriaSlice";
import Button from '@mui/material/Button';
import { Stack } from "@mui/system";
export default function ActualizarSubCategoria() {

  const navigate = useNavigate();
  const { categorias, categoriaActiva } = useAppSelector((state) => state.categorias);
  const { subCategoriaActiva } = useAppSelector((state) => state.subCategorias);
  const { empresaActiva } = useAppSelector((state) => state.empresa);
  const dispatch = useAppDispatch();
  const categoriaService = new CategoriaService('categorias');

  const { values, handleChanges, resetForm } = useForm({
    id: subCategoriaActiva?.id ?? 0,
    denominacion: subCategoriaActiva?.denominacion ?? "",
    eliminado: subCategoriaActiva?.eliminado ? "Si" : "No",
    idEmpresa: empresaActiva?.id ?? 0,
    idSucursales: 0,
    idCategoriaPadre: subCategoriaActiva?.categoriaPadre?.id ?? 0
  });

  const updateCategoriaObj = async() => {

    const obj: IUpdateCategoria = {
      id: values.id,
      denominacion: values.denominacion,
      eliminado: values.eliminado === "Si" ? true : false,
      idEmpresa: values.idEmpresa,
      idSucursales: categoriaActiva?.sucursales.map((sucursal) => sucursal.id) ?? [],
      idCategoriaPadre: values.idCategoriaPadre === 0 ? null : values.idCategoriaPadre
    }

    return obj;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedCategoriaObj = await updateCategoriaObj();
      const updatedCategoria = await categoriaService.updateCategoria(values.id, updatedCategoriaObj);
      if (updatedCategoria) {
        const updatedSubCategorias = categorias.map((c) => (c.id === values.id ? updatedCategoria : c));
        dispatch(setSubCategorias(updatedSubCategorias));
        resetForm();
      } else {
        console.log("Error al crear la subcategoria");
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/admin");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Crear una subcategoria</h2>

      <label htmlFor="denominacion"></label>
      <input type="text" name="denominacion" id="denominacion" value={values.denominacion} onChange={handleChanges}/>
      
      <Stack direction="row" spacing={2}  sx={{display: 'flex',justifyContent: 'space-between', marginTop:'15px'}}>
                        <Button type="submit" className="confirmar" variant="contained" color="success" >Confirmar</Button>
                        <Button sx={{ marginLeft: 'auto' }} onClick={() => navigate('/')} className="cancelar" variant="contained" color="error">Cancelar</Button>
                    </Stack >
    </form>
  )
}
