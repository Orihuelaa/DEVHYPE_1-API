import { ILocalidad } from "../endpoints/types/ILocalidad";
import { BackendClient } from "./BackendClient";

const API_URL = import.meta.env.VITE_URL_API;

export class LocalidadService extends BackendClient<ILocalidad>{
    constructor(baseUrl:string) {
        super(`${API_URL}/${baseUrl}`);
    }

    async getLocalidadesByProvinciaId(provinciaId: number){
        const response = await fetch(`${this.baseUrl}/findByProvincia/${provinciaId}`);
        if (!response.ok) {
            throw new Error('Error');
        }
        const data = await response.json();
        return data as ILocalidad[];
    }
}