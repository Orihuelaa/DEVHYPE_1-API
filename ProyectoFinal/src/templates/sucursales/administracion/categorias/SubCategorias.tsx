import { useEffect } from "react";
import { CategoriaService } from "../../../../services/CategoriaService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { ICategorias } from "../../../../endpoints/types/dtos/categorias/ICategorias";
import { setSubCategoriaActiva, setSubCategorias } from "../../../../redux/slices/subCategoriaSlice";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
const SubCategorias = () => {

    const {sucursalActiva} = useAppSelector((state) => state.sucursal); 
    const {categoriaActiva} = useAppSelector((state) => state.categorias);
    const {subCategorias} = useAppSelector((state) => state.subCategorias);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubCategorias = async () => {
          const subCategoriasFromStorage = localStorage.getItem(`subcategorias-${categoriaActiva?.id}-${sucursalActiva?.id}`);
          
          if (subCategoriasFromStorage) {
            dispatch(setSubCategorias(JSON.parse(subCategoriasFromStorage)));
          } else {
            const categoriaService = new CategoriaService('categorias');
            try {
              const response = await categoriaService.getAllCategoriesByCategoriaPadre(categoriaActiva!.id, sucursalActiva!.id);
              const sub_categorias = response.filter((sub_categoria) => (sub_categoria as ICategorias).id !== undefined);
              dispatch(setSubCategorias(sub_categorias as ICategorias[]));
              localStorage.setItem(`subcategorias-${categoriaActiva?.id}-${sucursalActiva?.id}`, JSON.stringify(sub_categorias));
            } catch (error) {
              console.log(error);
            }
          }
        };
        
        if (categoriaActiva && sucursalActiva) {
          fetchSubCategorias();
        }

        return ()=>{
            localStorage.removeItem(`subcategorias-${categoriaActiva?.id}-${sucursalActiva?.id}`);
            dispatch(setSubCategorias([]));
        }

      }, [dispatch, sucursalActiva, categoriaActiva]);
      

    return (
        <ul>
            {subCategorias.map((subCategoria) => (
            <li key={subCategoria.id}>
                <span>{subCategoria.denominacion}</span>
                <Button sx={{ color:'#000000',
                  borderColor: 'black',
                  '&:hover': {backgroundColor: '#89A8B2', border: 'black',}, }} onClick={() =>{dispatch(setSubCategoriaActiva(subCategoria)) ; navigate(`/admin/editar-subcategoria`)}}>Editar Subcategoría</Button>
            </li>
            ))}
        </ul>
    )
}

export default SubCategorias
