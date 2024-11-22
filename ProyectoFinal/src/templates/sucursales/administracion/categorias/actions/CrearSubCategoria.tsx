import { useNavigate } from "react-router-dom";
import { ICreateCategoria } from "../../../../../endpoints/types/dtos/categorias/ICreateCategoria";
import { CategoriaService } from "../../../../../services/CategoriaService";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/store";
import { useForm } from "../../../../../hooks/useForm";
import { setSubCategorias } from "../../../../../redux/slices/subCategoriaSlice";
import Button from '@mui/material/Button';
import { Stack } from "@mui/system";
export default function CrearSubCategoria() {

  const navigate = useNavigate();
  const {empresaActiva} = useAppSelector((state) => state.empresa);
  const {sucursalActiva} = useAppSelector((state) => state.sucursal);
  const {categoriaActiva} = useAppSelector((state) => state.categorias);
  const {subCategorias} = useAppSelector((state) => state.subCategorias);
  const dispatch = useAppDispatch();
  const categoriaService = new CategoriaService('categorias');

  const { values, handleChanges, resetForm } = useForm({
    denominacion: "",
    idEmpresa:  empresaActiva?.id ?? 0,
    idCategoriaPadre: categoriaActiva?.id ?? 0
  });

  const createCategoriaObj = () => {
    
    const categoriaObj: ICreateCategoria = {
      denominacion: values.denominacion,
      idEmpresa: values.idEmpresa,
      idCategoriaPadre: values.idCategoriaPadre
    };
    
    return categoriaObj;
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const categoriaObj = createCategoriaObj();
    const categoriaData: ICreateCategoria = {...categoriaObj};
    try {
      const nuevaCategoria = await categoriaService.createCategoria(categoriaData);
      if (nuevaCategoria !== null) {
        dispatch(setSubCategorias([...subCategorias, nuevaCategoria]));
        localStorage.setItem(`subcategories-${sucursalActiva?.id}`, JSON.stringify([...subCategorias, nuevaCategoria]));
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
    <>
      <form onSubmit={onSubmit}>
        <h2>Crear una subcategoria</h2>

        <label htmlFor="denominacion">Denominacion</label>
        <input type="text" name="denominacion" id="denominacion" value={values.denominacion} onChange={handleChanges} required/>
        
        <Stack direction="row" spacing={2}  sx={{display: 'flex',justifyContent: 'space-between', marginTop:'15px'}}>
                        <Button type="submit" className="confirmar" variant="contained" color="success" >Confirmar</Button>
                        <Button sx={{ marginLeft: 'auto' }} onClick={() => navigate('/')} className="cancelar" variant="contained" color="error">Cancelar</Button>
                    </Stack >
      </form>
    </>
  );
}