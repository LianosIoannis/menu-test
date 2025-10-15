import { Injectable } from "@angular/core";
import { baseUrl } from "../environment";

@Injectable({
	providedIn: "root",
})
export class DataService {
	async getPrismaData(key: string) {
		const res = await fetch(`${baseUrl}/${key}`);
		return await res.json();
	}

  async deletePrismaData(key: string, id: number) {
    const res = await fetch(`${baseUrl}/${key}/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  }
}
