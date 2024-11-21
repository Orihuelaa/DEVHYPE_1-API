import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { AlergenoService } from "../../../../services/AlergenoService";
import { setAlergenos, setAlergenoActivo } from "../../../../redux/slices/alergenoSlice";
import { IAlergenos } from "../../../../endpoints/types/dtos/alergenos/IAlergenos";

const Alergenos = () => {
    
    const navigate = useNavigate();
    const {sucursalActiva} = useAppSelector((state) => state.sucursal);
    const { alergenos } = useAppSelector((state) => state.alergenos);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchAlergenos = async () => {
            const alergenosFromStorage = localStorage.getItem(`alergenos-${sucursalActiva?.id}`); 

            if (alergenosFromStorage) {
              dispatch(setAlergenos(JSON.parse(alergenosFromStorage)));
            }else{
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
        return ()=>{
          localStorage.removeItem(`alergenos-${sucursalActiva?.id}`);
          dispatch(setAlergenos([]));
        }

    }, [dispatch, sucursalActiva]);

    const handleSetAlergenoActivo = (alergeno: IAlergenos, route?: string) => {
        dispatch(setAlergenoActivo(alergeno));
        if (route) navigate(route);
    };

    return (
        <div>
            <button onClick={() => navigate(`/admin/crear-alergeno`) }>Crear Alergeno</button>
            <ul>
                {alergenos.map((alergeno) => (
                    <li key={alergeno.id}>
                        <span>{alergeno.denominacion}</span>
                        <button onClick={(e)=> {e.stopPropagation(); handleSetAlergenoActivo(alergeno, `/admin/ver-alergeno`);}}> Ver</button>
                        <button onClick={(e) => {e.stopPropagation(); handleSetAlergenoActivo(alergeno, `/admin/editar-alergeno`);}}>Actualizar</button>
                        {/* <button onClick={() => {}>Eliminar</button> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Alergenos;