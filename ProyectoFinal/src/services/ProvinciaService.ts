import { IProvincia } from "../endpoints/types/IProvincia";
import { BackendClient } from "./BackendClient";

const API_URL = import.meta.env.VITE_URL_API;

export class ProvinciaService extends BackendClient <IProvincia>{
    constructor(baseUrl : string) {
        super(`${API_URL}/${baseUrl}`);
    }

    async getProvinciasByPaisId(paisId: number): Promise<IProvincia[]> {
        const response = await fetch(`${this.baseUrl}/findByPais/${paisId} `);
        if (!response.ok) {
            throw new Error('Error');
        }
        const data = await response.json();
        return data as IProvincia[];
    }
}