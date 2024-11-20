import Swal from "sweetalert2";
import { ICategorias } from "../endpoints/types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../endpoints/types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../endpoints/types/dtos/categorias/IUpdateCategoria";
import { BackendClient } from "./BackendClient";

const API_URL = import.meta.env.VITE_URL_API;

export class CategoriaService extends BackendClient<ICategorias | ICreateCategoria | IUpdateCategoria> {
    constructor(baseUrl:string) {
        super(`${API_URL}/${baseUrl}`);
    }

    async createCategoria(element: ICreateCategoria): Promise<ICategorias | null> {
        Swal.fire({
            title: "Creando categoria...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        })
       try {
        const response = await fetch(`${this.baseUrl}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(element),
        });
        if (!response.ok) {
            throw new Error('Error')
        }
        const data = await response.json();
        return data as ICategorias;
       } finally {
        Swal.close();
       }
    }

    async getAllCategoriesByCategoriaPadre(id: number, idSucursal: number): Promise<ICategorias[]> {
        Swal.fire({
            title: "Obteniendo categorias...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        })
        try {
            const response = await fetch(`${this.baseUrl}/allSubCategoriasPorCategoriaPadre/${id}/${idSucursal}`);
            if(!response.ok) {
                throw new Error('Error')
            }
            const data = await response.json();
            return data as ICategorias[];
        } finally {
            Swal.close();
        }
    }

    async getAllSubCategoriasPorSucursal(id: number): Promise<ICategorias[]> {
        Swal.fire({
            title: "Obteniendo subcategorias...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        })
        try {
            const response = await fetch(`${this.baseUrl}/allSubCategoriasPorSucursal/${id}`);
            if(!response.ok) {
                throw new Error('Error')
            }
            const data = await response.json();
            return data as ICategorias[];
        } finally {
            Swal.close();
        }
    }

    async getAllSubCategoriasPorCategoriaPadre(idPadre: number, idSucursal: number): Promise<ICategorias[]> {
        Swal.fire({
            title: "Obteniendo categorias...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        })
        try {
            const response = await fetch(`${this.baseUrl}/allSubCategoriasPorCategoriaPadre/${idPadre}/${idSucursal}`);
            if(!response.ok) {
                throw new Error('Error')
            }
            const data = await response.json();
            return data as ICategorias[];
        } finally {
            Swal.close();
        }
    }

    async bajaPorSucursal(idCategoria: number, idSucursal: number): Promise<void> {
        Swal.fire({
            title: 'Dando de baja categoria...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })
        try {
            const response = await fetch(`${this.baseUrl}/bajaPorSucursal/${idCategoria}/${idSucursal}`, {
                method: 'PUT',
            });
            if(!response.ok) {
                throw new Error('Error')
            }
        } finally {
            Swal.close();
        }  
    }

    async updateCategoria(id: number, element: IUpdateCategoria): Promise<ICategorias | null> {
        Swal.fire({
            title: "Editando categoria...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        })
        const response = await fetch(`${this.baseUrl}/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(element),
        });
        const data = await response.json();
        return data as ICategorias;
    }

    async updateSubCategoria(idPadre: number, idSucursal: number, element: IUpdateCategoria): Promise<ICategorias | null> {
        Swal.fire({
            title: "Editando sub-categoria...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        })
        const response = await fetch(`${this.baseUrl}/allSubCategoriasPorCategoriaPadre/${idPadre}/${idSucursal}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(element),
        });
        const data = await response.json();
        return data as ICategorias;
    }

    async getAllCategoriaPadreBySucursalId(idSucursal: number): Promise<ICategorias[] | null> {
        Swal.fire({
            title: "Obteniendo categorias...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })
        try {
            const response = await fetch(`${this.baseUrl}/allCategoriasPadrePorSucursal/${idSucursal}`);
            if(!response.ok) {
                throw new Error('Error')
            }
            const data = await response.json();
            return data as ICategorias[];
        } finally {
            Swal.close();
        }
    }

    async getAllCategoriaBySucursalId(idSucursal: number): Promise<ICategorias[] | null> {
        Swal.fire({
            title: "Obteniendo categorias...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const response = await fetch(`${this.baseUrl}/allCategoriasPorSucursal/${idSucursal}`);
            if(!response.ok) {
                throw new Error('Error')
            }
            const data = await response.json();
            return data as ICategorias[];
        } finally {
            Swal.close();
        }
    }

    async getAllCategoriaByEmpresaId(idEmpresa: number): Promise<ICategorias[] | null> {
        Swal.fire({
            title: "Obteniendo categorias...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const response = await fetch(`${this.baseUrl}/allCategoriasPorEmpresa/${idEmpresa}`);
            if(!response.ok) {
                throw new Error('Error')
            }
            const data = await response.json();
            return data as ICategorias[];
        } finally {
            Swal.close();
        }
    }
}