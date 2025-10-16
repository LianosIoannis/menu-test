import { Injectable } from "@angular/core";
import { baseUrl } from "../environment";

export type ApiResponse = {
	success: boolean;
	data?: any;
	error?: string;
};

@Injectable({
	providedIn: "root",
})
export class DataService {
	async getPrismaData(key: string): Promise<ApiResponse> {
		try {
			const res = await fetch(`${baseUrl}/${key}`);
			const result = (await res.json()) as ApiResponse;
			console.dir(result);
			return result;
		} catch {
			return { success: false, error: "No connection" };
		}
	}

	async deletePrismaData(key: string, id: number): Promise<ApiResponse> {
		try {
			const res = await fetch(`${baseUrl}/${key}/${id}`, {
				method: "DELETE",
			});
			const result = (await res.json()) as ApiResponse;
			console.dir(result);
			return result;
		} catch {
			return { success: false, error: "No connection" };
		}
	}

	async postPrismaData(key: string, data: any): Promise<ApiResponse> {
		try {
			const res = await fetch(`${baseUrl}/${key}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			const result = (await res.json()) as ApiResponse;
			console.dir(result);
			return result;
		} catch {
			return { success: false, error: "No connection" };
		}
	}
}
