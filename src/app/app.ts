import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBars, faClose, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { SurveyModule } from "survey-angular-ui";
import { Model } from "survey-core";
import { PlainDarkPanelless } from "survey-core/themes";
import { AgTable } from "./ag-table/ag-table";
import { Menu } from "./menu/menu";
import type { MenuItemModel } from "./menu/menuItem.model";
import { menuData } from "./menuData";
import { type MenuId, menuDataMap } from "./services/dataMap";
import { DataService } from "./services/prisma-service";

@Component({
	selector: "app-root",
	imports: [Menu, FormsModule, FontAwesomeModule, AgTable, SurveyModule, NgxSpinnerModule],
	templateUrl: "./app.html",
})
export class App {
	readonly isMenuOpen = signal(true);
	readonly isCreateOpen = signal(false);

	backdropVisible = computed(() => this.isMenuOpen() || this.isCreateOpen());

	prismaService = inject(DataService);
	spinnerService = inject(NgxSpinnerService);
	toastrService = inject(ToastrService);

	surveyModel: Model = {} as Model;

	spinnerName = "app-spinner";

	private showSpinner() {
		this.spinnerService.show(this.spinnerName, {
			type: "ball-atom",
			zIndex: 20,
			bdColor: "rgba(0, 0, 0, 0.8)",
			size: "large",
			color: "#fff",
			fullScreen: true,
		});
	}

	private hideSpinner() {
		this.spinnerService.hide(this.spinnerName);
	}

	bars = faBars;
	trash = faTrash;
	plus = faPlus;
	close = faClose;

	menuData = signal(menuData);
	rowData = signal<any[]>([]);

	selectedRowData = signal<any>(null);

	selectedMneuItem = signal<MenuItemModel | null>(null);

	onBackdropClick() {
		if (this.isCreateOpen()) {
			this.isCreateOpen.set(false);
			return;
		}
		if (this.isMenuOpen()) {
			this.isMenuOpen.set(false);
		}
	}

	toggleMenu(v: boolean) {
		this.isMenuOpen.set(v);
	}

	async createClicked() {
		const surveyForm = menuDataMap[this.selectedMneuItem()?.id as MenuId].create.surveyForm;

		this.surveyModel = new Model(surveyForm);

		this.surveyModel.applyTheme(PlainDarkPanelless);
		this.isCreateOpen.set(true);
		this.surveyModel.onComplete.add(this.onSurveyComplete);

		if (this.selectedMneuItem()?.id === "production-documents") {
			this.surveyModel.onValueChanged.add(async (_, options) => {
				if (options.name === "recipeId" && options.value) {
					const lines = await this.prismaService.getPrismaData(`get-recipe-materials/${options.value}`);

					this.surveyModel.setValue(
						"ingredients",
						lines.map((line: any) => ({
							materialId: line.id,
							materialTitle: line.name,
						})),
					);
				}
			});
		}
	}

	rowClicked($event: any) {
		this.selectedRowData.set($event);
	}

	async deleteClicked() {
		if (!this.selectedRowData()) {
			return;
		}

		const id = this.selectedRowData().id;

		this.showSpinner();
		const _ = await this.prismaService.deletePrismaData(menuDataMap[this.selectedMneuItem()?.id as MenuId].delete, id);
		this.hideSpinner();

		this.toastrService.success(`Deleted item with ID ${id}`, "Item Deleted");
		await this.showData();
	}

	async menuItemClicked(item: MenuItemModel) {
		this.selectedMneuItem.set(item);
		await this.showData();
		this.toggleMenu(false);
	}

	async showData() {
		this.showSpinner();
		const data = await this.prismaService.getPrismaData(menuDataMap[this.selectedMneuItem()?.id as MenuId].get);
		this.hideSpinner();

		this.toastrService.success(`Loaded ${data.length} items`, "Data Loaded");
		this.rowData.set(data);
	}

	async sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	onSurveyComplete = async (sender: Model) => {
		const data = sender.data as Record<string, unknown>;

		console.dir(data);

		const result = await this.prismaService.postPrismaData(
			menuDataMap[this.selectedMneuItem()?.id as MenuId].create.endpoint,
			data,
		);
		if (result) {
      console.dir(result);
			await this.showData();
		} else {
			this.toastrService.error("Failed to create item", "Error");
		}

		this.isCreateOpen.set(false);

		sender.clear(false, true);
	};
}
