import { useNavigate } from "react-router-dom";
import { CategoriaService } from "../../../../../services/CategoriaService";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/store";
import { useForm } from "../../../../../hooks/useForm";
import { setCategorias } from "../../../../../redux/slices/categoriaSlice";
import { IUpdateCategoria } from "../../../../../endpoints/types/dtos/categorias/IUpdateCategoria";
import styles from "../../../../../styles/templates/styles.module.css"
import Button from '@mui/material/Button';
import { Stack } from "@mui/system";

export default function ActualizarCategoria() {

  const navigate = useNavigate();
  const { categorias, categoriaActiva } = useAppSelector((state) => state.categorias);
  const { empresaActiva } = useAppSelector((state) => state.empresa);
  const dispatch = useAppDispatch();
  const categoriaService = new CategoriaService('categorias');

  const { values, handleChanges, resetForm } = useForm({
    id: categoriaActiva?.id ?? 0,
    denominacion: categoriaActiva?.denominacion ?? "",
    eliminado: categoriaActiva?.eliminado ? "Si" : "No",
    idEmpresa: empresaActiva?.id ?? 0,
    idSucursales: 0,
    idCategoriaPadre: 0
  });

  const updateCategoriaObj = async() => {
    
    const obj: IUpdateCategoria = {
      id: values.id,
      denominacion: values.denominacion,
      eliminado: values.eliminado === "Si" ? true : false,
      idEmpresa: values.idEmpresa,
      idSucursales: categoriaActiva?.sucursales.map((sucursal) => sucursal.id) ?? [],
      idCategoriaPadre: null
    }

    return obj;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedCategoriaObj = await updateCategoriaObj();
      const updatedCategoria = await categoriaService.updateCategoria(values.id, updatedCategoriaObj);
      if (updatedCategoria) {
        const updatedCategorias = categorias.map((c) => (c.id === values.id ? updatedCategoria : c));
        dispatch(setCategorias(updatedCategorias));
        resetForm();
      } else {
        console.log("Error al crear la categoria");
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/admin");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.overlay_content}>
        <form onSubmit={onSubmit}>
          <h2>Crear una categoria padre</h2>
          <label htmlFor="denominacion"></label>
          <input type="text" name="denominacion" id="denominacion" value={values.denominacion} onChange={handleChanges}/>
          <Stack direction="row" spacing={2}  sx={{display: 'flex',justifyContent: 'space-between', marginTop:'15px'}}>
            <Button type="submit" className="confirmar" variant="contained" color="success" >Confirmar</Button>
            <Button sx={{ marginLeft: 'auto' }} onClick={() => navigate('/')} className="cancelar" variant="contained" color="error">Cancelar</Button>
          </Stack >
      </form>
      </div>
    </div>
      
  )
}