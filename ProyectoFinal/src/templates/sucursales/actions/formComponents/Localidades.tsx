import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { LocalidadService } from "../../../../services/LocalidadService";

const Localidades = () => {

    const localidadService = new LocalidadService('localidades');
    const {localidades, localidadActiva} = useAppSelector((state) => state.localidades);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchSucursales = async () => {
          const sucursalesFromStorage = localStorage.getItem(`sucursales-${empresaActiva?.id}`);
          
          if (sucursalesFromStorage) {
            dispatch(setSucursales(JSON.parse(sucursalesFromStorage)));
          } else {
            const sucursalService = new SucursalService(`sucursales`);
            try {
              const sucursales_all = await sucursalService.getAllSucursalesPorEmpresaId(empresaActiva!.id); 
              dispatch(setSucursales(sucursales_all as ISucursal[])); 
              localStorage.setItem(`sucursales-${empresaActiva?.id}`, JSON.stringify(sucursales_all));
            } catch (error) {
              console.log(error);
            }
          }
        };
      
        if (empresaActiva) {
          fetchSucursales();
        }
    
        return ()=>{
          localStorage.removeItem(`sucursales-${empresaActiva?.id}`);
          dispatch(setSucursales([]));
        }
      
      }, [dispatch, empresaActiva]);
      

    return (
        <div>
        
        </div>
  )
}

export default Localidades
