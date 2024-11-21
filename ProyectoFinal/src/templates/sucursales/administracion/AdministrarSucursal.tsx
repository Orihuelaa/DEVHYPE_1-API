import { useState } from "react";
import Alergenos from "./alergenos/Alergenos";
import Categorias from "./categorias/Categorias";
import Productos from "./productos/Productos";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/store";
//import styles from "../../../styles/templates/styles.module.css"
import Button from '@mui/material/Button';
import { Stack } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function AdministrarSucursal() {
    const navigate = useNavigate();
    const [active, setActive] = useState<string>('');
    const {sucursalActiva} = useAppSelector((state)=> state.sucursal)

    const handleRenderComponent = (active: string) => {
        switch (active) {
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
                    <Link to={'/'}>Home</Link> {/* Este deberia ser un voton flecha para volver */}
                </nav>
                <h2>{sucursalActiva?.empresa.nombre}</h2>
           </div>
        </header>
        <div>
            <aside>
                <h2>Administracion</h2>

                <Stack direction="column" spacing={2}>
                    <Button variant="contained" sx={{width:100}} onClick={() => (setActive('Categorias'))} type="button">Categorias</Button>
                    <Button variant="contained" sx={{width:100}} onClick={() => (setActive('Productos'))} type="button">Productos</Button>
                    <Button variant="contained" sx={{width:100}} onClick={() => (setActive('Alergenos'))} type="button">Alergenos</Button>
                </Stack>
                
            </aside>
            <main>
                {handleRenderComponent(active)}
            </main>
        </div>
        <footer>
        <Button className="boton-volver" variant="contained" startIcon={<ArrowBackIcon/>} onClick={() => navigate('/')}>Volver</Button>
        </footer>
      </>
    );
}
