import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { AlergenoService } from "../../../../services/AlergenoService";
import { setAlergenos, setAlergenoActivo } from "../../../../redux/slices/alergenoSlice";
import { IAlergenos } from "../../../../endpoints/types/dtos/alergenos/IAlergenos";
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { common } from '@mui/material/colors';


const Alergenos = () => {

    const navigate = useNavigate();
    const { sucursalActiva } = useAppSelector((state) => state.sucursal);
    const { alergenos } = useAppSelector((state) => state.alergenos);
    const dispatch = useAppDispatch();

    // Función para eliminar alérgeno
    const handleDeleteAlergeno = async (id: number) => {
        const alergenoService = new AlergenoService("alergenos");

        try {
            await alergenoService.deleteAlergeno(id);
            const updatedAlergenos = alergenos.filter((alergeno) => alergeno.id !== id);
            dispatch(setAlergenos(updatedAlergenos));

            localStorage.setItem(`alergenos-${sucursalActiva?.id}`, JSON.stringify(updatedAlergenos));
        } catch (error) {
            console.error("Error al eliminar el alérgeno:", error);
        }
    };

    useEffect(() => {
        const fetchAlergenos = async () => {
            const alergenosFromStorage = localStorage.getItem(`alergenos-${sucursalActiva?.id}`);

            if (alergenosFromStorage) {
                dispatch(setAlergenos(JSON.parse(alergenosFromStorage)));
            } else {
                const alergenoService = new AlergenoService('alergenos');
                try {
                    const response = await alergenoService.getAll();
                    dispatch(setAlergenos(response as IAlergenos[]));
                    localStorage.setItem(`alergenos-${sucursalActiva?.id}`, JSON.stringify(response));
                } catch (error) {
                    console.log(error);
                }
            }
        };
        if (sucursalActiva) {
            fetchAlergenos();
        }
        return () => {
            localStorage.removeItem(`alergenos-${sucursalActiva?.id}`);
            dispatch(setAlergenos([]));
        };

    }, [dispatch, sucursalActiva]);

    const handleSetAlergenoActivo = (alergeno: IAlergenos, route?: string) => {
        dispatch(setAlergenoActivo(alergeno));
        if (route) navigate(route);
    };

    return (
        <>
            <div>
                <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    sx={{
                        position: 'absolute',
                        top:'100px',
                        right:'10px',
                        color: common.black,
                        backgroundColor: '#f0f0f0',
                        height: 40,
                        '&:hover': { backgroundColor: '#DBD8D8', color: '#000' },
                    }}
                    onClick={() => navigate(`/admin/crear-alergeno`)}>crear alergeno </Button>
            </div>
                <div className="container_lista">
                    {alergenos.map((alergeno) => (
                            <li key={alergeno.id} style={{paddingLeft:600}}>
                                <Stack 
                                    direction="row"
                                    width={350}
                                    spacing={2}
                                    justifyContent="end"
                                    alignItems="center" 
                                    sx={{ backgroundColor: '#B3C8CF'  }}
                                >
                                    <span>{alergeno.denominacion}</span>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            minWidth: 'unset',
                                            color: '#000000',
                                            borderColor: 'black',
                                            '&:hover': { backgroundColor: '#89A8B2', borderColor: 'black' },
                                        }}
                                        aria-label="view"
                                        size="medium"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSetAlergenoActivo(alergeno, `/admin/ver-alergeno`);
                                        }}
                                    >
                                        <VisibilityIcon fontSize="medium" />
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            minWidth: 'unset',
                                            color: '#000000',
                                            borderColor: 'black',
                                            '&:hover': { backgroundColor: '#89A8B2', borderColor: 'black' },
                                        }}
                                        aria-label="edit"
                                        size="medium"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSetAlergenoActivo(alergeno, `/admin/editar-alergeno`);
                                        }}
                                    >
                                        <EditIcon fontSize="medium" />
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            minWidth: 'unset',
                                            color: '#000000',
                                            borderColor: 'black',
                                            '&:hover': { backgroundColor: '#89A8B2', borderColor: 'black' },
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteAlergeno(alergeno.id);
                                        }}
                                    >
                                        <DeleteIcon fontSize="medium" />
                                    </Button>
                                </Stack>
                            </li>
                        ))}
                    </div>
        </>     
    );
};

export default Alergenos;
