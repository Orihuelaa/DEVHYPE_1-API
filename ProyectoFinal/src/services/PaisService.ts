import { IPais } from "../endpoints/types/IPais";
import { BackendClient } from "./BackendClient";

const API_URL = import.meta.env.VITE_URL_API;

export class PaisService extends BackendClient<IPais> {
    constructor(baseUrl:string) {
        super(`${API_URL}${baseUrl}`);
    }
}
