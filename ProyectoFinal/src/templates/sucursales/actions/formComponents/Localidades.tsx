import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { LocalidadService } from "../../../../services/LocalidadService";
import { setLocalidadActiva, setLocalidades } from "../../../../redux/slices/localidadSlice";
import { ILocalidad } from "../../../../endpoints/types/ILocalidad";
import { useForm } from "../../../../hooks/useForm";

const Localidades = () => {

    const {provinciaActiva} = useAppSelector((state) => state.provincias);
    const {localidades} = useAppSelector((state) => state.localidades);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchSucursales = async () => {
          const sucursalesFromStorage = localStorage.getItem(`localidades`);
          
          if (sucursalesFromStorage) {
            dispatch(setLocalidades(JSON.parse(sucursalesFromStorage)));
          } else {
            const localidadService = new LocalidadService('localidades');
            try {
              const localidades_all = await localidadService.getLocalidadesByProvinciaId(provinciaActiva!.id); 
              dispatch(setLocalidades(localidades_all as ILocalidad[])); 
              localStorage.setItem(`localidades`, JSON.stringify(localidades_all));
            } catch (error) {
              console.log(error);
            }
          }
        };
      
        if (provinciaActiva) {
          fetchSucursales();
        }
    
        return ()=>{
          localStorage.removeItem(`localidades`);
          dispatch(setLocalidades([]));
        }
      
      }, [dispatch, provinciaActiva]);
      
      const { handleChanges } = useForm({
        id: 0,
        nombre: '',
      })

      return (
        <>
          <label htmlFor="localidad">Localidad:</label>
          <select id="localidad" name="nombre" onChange={handleChanges} required >
            <option value="" selected disabled></option>
            {localidades.map((localidad) => (
                <option key={localidad.id} value={localidad.nombre} onClick={()=> dispatch(setLocalidadActiva(localidad))}>
                    {localidad.nombre}
                </option>
            ))}
          </select>
        </>
    )
}

export default Localidades
