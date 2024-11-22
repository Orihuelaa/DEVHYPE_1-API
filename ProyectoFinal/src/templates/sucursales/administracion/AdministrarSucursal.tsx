import Alergenos from "./alergenos/Alergenos";
import Categorias from "./categorias/Categorias";
import Productos from "./productos/Productos";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import styles from "../../../styles/templates/styles.module.css";
import Button from '@mui/material/Button';
import { Stack } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { setElementActive } from "../../../redux/slices/elementActiveSlice";

export default function AdministrarSucursal() {
    const {elementActive} = useAppSelector((state) => state.elementActive);
    const dispatch = useAppDispatch();
    const {sucursalActiva} = useAppSelector((state)=> state.sucursal)

    const handleRenderComponent = () => {
        switch (elementActive) {
            case 'Categorias':
                return <Categorias />;
            case 'Alergenos':
                return <Alergenos />
            case 'Productos':
                return <Productos />
            default:
                return <Categorias />
        }
    }

    return (
        <>
            <header>
            <div>
                    <nav>
                            <Button variant="contained" startIcon={<ArrowBackIcon/>} sx={{ position: "absolute",top: "10px", right: "10px",
                            backgroundColor:'white',color:'black',
                            '&:hover': { backgroundColor: '#dadada', borderColor: 'black', },}} component={Link} to="/">Home</Button>
                    </nav>
                    <h2>{sucursalActiva?.empresa.nombre}</h2>
            </div>
            </header>
            <div  className={styles.overlay_content}>
                <aside>
                    <h2>Administracion</h2>

                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" sx={{width:100, fontSize:'10px', color:'black', 
                                    backgroundColor: '#f0f0f0', height: 40,
                                    '&:hover': {backgroundColor: '#DBD8D8',color: '#000' },}} onClick={() => (dispatch(setElementActive('Categorias')))} type="button">Categorias</Button>
                        <Button variant="contained" sx={{width:100, fontSize:'10px', color:'black', 
                                    backgroundColor: '#f0f0f0', height: 40,
                                    '&:hover': {backgroundColor: '#DBD8D8', fontSize:'10px', color: '#000' },}} onClick={() => (dispatch(setElementActive('Productos')))} type="button">Productos</Button>
                        <Button variant="contained" sx={{width:100, color:'black', 
                                    backgroundColor: '#f0f0f0', height: 40,
                                    '&:hover': {backgroundColor: '#DBD8D8',color: '#000' },}} onClick={() => (dispatch(setElementActive('Alergenos')))} type="button">Alergenos</Button>
                    </Stack>
                    
                </aside>
                <main>
                    {handleRenderComponent()}
                </main>
            </div>
        </>
    )
}