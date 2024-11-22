import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { CategoriaService } from "../../../../services/CategoriaService";
import { useEffect } from "react";
import { setCategoriaActiva, setCategorias, setShowSubCategoria } from "../../../../redux/slices/categoriaSlice";
import { ICategorias } from "../../../../endpoints/types/dtos/categorias/ICategorias";
import SubCategorias from "./SubCategorias";
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { common } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';


const Categorias = () => {
  
  const navigate = useNavigate();
  const {sucursalActiva} = useAppSelector((state) => state.sucursal);
  const {categorias, mostrarSubCategoria} = useAppSelector((state) => state.categorias);
  const dispatch = useAppDispatch();


  useEffect(() => {
    const fetchCategorias = async () => {
      const categoriasFromStorage = localStorage.getItem(`categorias-${sucursalActiva?.id}`);
      
      if (categoriasFromStorage) {
        dispatch(setCategorias(JSON.parse(categoriasFromStorage)));
      } else {
        const categoriaService = new CategoriaService('categorias');
        try {
          const response = await categoriaService.getAllCategoriaPadreBySucursalId(sucursalActiva!.id);
          const categorias_all = response?.filter((categoria) => (categoria as ICategorias).id !== undefined);
          
          dispatch(setCategorias(categorias_all as ICategorias[]));
          localStorage.setItem(`categorias-${sucursalActiva?.id}`, JSON.stringify(categorias_all));
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    if (sucursalActiva) {
      fetchCategorias();
    }

    return ()=>{
      localStorage.removeItem(`categorias-${sucursalActiva?.id}`);
      dispatch(setCategorias([]));
    }

  }, [dispatch, sucursalActiva]);
  

  const handleSetCategoriaActiva = (categoria: ICategorias, route?: string) => {
    dispatch(setCategoriaActiva(categoria));
    if (route) navigate(route);
  };

  const handleToggleSubCategorias = (categoria: ICategorias) => {
    if (mostrarSubCategoria?.id === categoria.id) {
      dispatch(setShowSubCategoria(null)); // Ocultar las subcategorías si ya están visibles
    } else {
      dispatch(setShowSubCategoria(categoria)); // Mostrar subcategorías
    }
  };

  return (
    <>
      <div>
        <Button variant="contained"
                    startIcon={<AddCircleIcon />}
                    sx={{
                        position: 'absolute',
                        top:'100px',
                        right:'10px',
                        color: common.black,
                        backgroundColor: '#f0f0f0',
                        height: 40,
                        '&:hover': { backgroundColor: '#DBD8D8', color: '#000' },}} 
                        onClick={() => navigate(`/admin/crear-categoria`)}>Crear Categoría</Button>
      </div>
      <ul>
      <Stack 
          direction="column"
          width={1500}
          spacing={2}
          justifyContent="end"
          alignItems="center" 
          sx={{ backgroundColor: '#B3C8CF'  }}>
             {categorias.map((categoria) => (
              <li key={categoria.id}>
                <span>{categoria.denominacion}</span>
                <Button  variant="outlined"
                                        sx={{
                                            width: 65,
                                            height: 65,
                                            minWidth: 'unset',
                                            color: '#000000',
                                            borderColor: 'black',
                                            '&:hover': { backgroundColor: '#89A8B2', borderColor: 'black' },
                                        }}
                                        aria-label="view"
                                        size="medium" onClick={(e)=> {e.stopPropagation(); handleToggleSubCategorias(categoria); handleSetCategoriaActiva(categoria)}}> {mostrarSubCategoria?.id === categoria.id } 
                                        <AssignmentReturnedIcon fontSize="medium"/> </Button>
                <Button  variant="outlined"
                                        sx={{
                                            width: 65,
                                            height: 65,
                                            minWidth: 'unset',
                                            color: '#000000',
                                            borderColor: 'black',
                                            '&:hover': { backgroundColor: '#89A8B2', borderColor: 'black' },
                                        }}
                                        aria-label="view"
                                        size="medium" onClick={(e) => {e.stopPropagation(); handleSetCategoriaActiva(categoria, `/admin/editar-categoria`);}}> <EditIcon fontSize="medium" /></Button>
                <Button  variant="outlined"
                                        sx={{
                                            width: 65,
                                            height: 65,
                                            minWidth: 'unset',
                                            color: '#000000',
                                            borderColor: 'black',
                                            '&:hover': { backgroundColor: '#89A8B2', borderColor: 'black' },
                                        }}
                                        aria-label="view"
                                        size="medium" onClick={(e) => {e.stopPropagation(); handleSetCategoriaActiva(categoria, `/admin/crear-subcategoria`);}}><AddIcon fontSize="medium" /></Button>
                {mostrarSubCategoria?.id === categoria.id && <SubCategorias />}
              </li>
          ))}
      </Stack>
         
      </ul>
    </>
  );
};

export default Categorias;