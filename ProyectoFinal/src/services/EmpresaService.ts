import Swal from "sweetalert2";
import { ICreateEmpresaDto } from "../endpoints/types/dtos/empresa/ICreateEmpresaDto";
import { IEmpresa } from "../endpoints/types/dtos/empresa/IEmpresa";
import { IUpdateEmpresaDto } from "../endpoints/types/dtos/empresa/IUpdateEmpresaDto";
import { BackendClient } from "./BackendClient";

const API_URL = import.meta.env.VITE_URL_API;

export class EmpresaService extends BackendClient<IEmpresa |ICreateEmpresaDto | IUpdateEmpresaDto> {

    constructor(baseUrl: string) {
        super (`${API_URL}/${baseUrl}`);
    }

    async createEmpresa(element: ICreateEmpresaDto): Promise<IEmpresa | null> {
        Swal.fire({
            title: "Creando empresa...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(Swal.getDenyButton());
            },
        });
        try {
            const response = await fetch(`${this.baseUrl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(element),
            });
            if (!response.ok) {
                throw new Error(`Error`);
            }
            const newData = await response.json();
            return newData as IEmpresa;
        } finally {
            Swal.close();
        }
    }

    async updateEmpresa(id: number, element: IUpdateEmpresaDto): Promise<IEmpresa | null> {
        Swal.fire({
            title: "Editando empresa...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(Swal.getDenyButton());
            },
        });
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(element),
            });
            if (!response.ok) {
                throw new Error(`Error`);
            }
            const newData = await response.json();
            return newData as IEmpresa;
        } finally {
            Swal.close();
        }
    }

}

