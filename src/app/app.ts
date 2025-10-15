import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBars, faClose, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { SurveyModule } from "survey-angular-ui";
import { Model } from "survey-core";
import { AgTable } from "./ag-table/ag-table";
import { Menu } from "./menu/menu";
import type { MenuItemModel } from "./menu/menuItem.model";
import { menuData } from "./menuData";
import { DataService } from "./services/prisma-service";

const createSurveyJson = {
	title: "Create item",
	description: "Fill in the details below",
	pages: [
		{
			name: "p1",
			elements: [
				{ type: "text", name: "name", title: "Name", isRequired: true, maxLength: 100 },
				{ type: "text", name: "code", title: "Code", isRequired: true },
				{
					type: "dropdown",
					name: "category",
					title: "Category",
					isRequired: true,
					choices: [
						{ value: "A", text: "Category A – Standard" },
						{ value: "B", text: "Category B – Premium" },
						{ value: "C", text: "Category C – Limited" },
					],
					hasOther: true,
					otherText: "Other (please specify)",
				},

				// ⬇️ Add this block
				{
					type: "paneldynamic",
					name: "reasons",
					title: "Reasons",
					description: "Add one or more reasons",
					minPanelCount: 1,
					maxPanelCount: 10,
					allowAddPanel: true,
					allowRemovePanel: true,
					panelAddText: "Add reason",
					panelRemoveText: "Remove",
					templateTitle: "Reason #{panelIndex}",
					templateElements: [
						{ type: "text", name: "reasonText", title: "Reason", isRequired: true, maxLength: 300 },
						{
							type: "dropdown",
							name: "reasonType",
							title: "Type",
							isRequired: true,
							choices: [
								{ value: "Q", text: "Quality" },
								{ value: "C", text: "Cost" },
								{ value: "T", text: "Timing" },
							],
							hasOther: true,
							otherText: "Other (specify)",
						},
					],
				},

				{ type: "comment", name: "notes", title: "Notes" },
			],
		},
	],
	showQuestionNumbers: "off",
};

const menuDataGetMap = {
	suppliers: "get-suppliers",
	customers: "get-customers",
	"special-products": "get-special-products",
	"raw-materials": "get-raw-materials",
	"purchase-documents": "get-purchase-documents",
	"sale-documents": "get-sale-documents",
	"production-documents": "get-production-documents",
	"adjustment-documents": "get-adjustment-documents",
};

const menuDataDeleteMap = {
	suppliers: "delete-supplier",
	customers: "delete-customer",
	"special-products": "delete-special-product",
	"raw-materials": "delete-raw-material",
	"purchase-documents": "delete-document",
	"sale-documents": "delete-document",
	"production-documents": "delete-document",
	"adjustment-documents": "delete-document",
};

type MenuId = keyof typeof menuDataGetMap;

@Component({
	selector: "app-root",
	imports: [Menu, FormsModule, FontAwesomeModule, AgTable, SurveyModule],
	templateUrl: "./app.html",
})
export class App {
	readonly isMenuOpen = signal(true);
	readonly isCreateOpen = signal(false);

	surveyModel = new Model(createSurveyJson);

	backdropVisible = computed(() => this.isMenuOpen() || this.isCreateOpen());

	prismaService = inject(DataService);

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

	createClicked() {
		this.isCreateOpen.set(true);
		this.surveyModel.onComplete.add(this.onSurveyComplete);
	}

	rowClicked($event: any) {
		this.selectedRowData.set($event);
	}

	async deleteClicked() {
		if (!this.selectedRowData()) {
			return;
		}

		const id = this.selectedRowData().id;

		const _ = await this.prismaService.deletePrismaData(menuDataDeleteMap[this.selectedMneuItem()?.id as MenuId], id);

		await this.showData();
	}

	async menuItemClicked(item: MenuItemModel) {
		this.selectedMneuItem.set(item);
		await this.showData();
		this.toggleMenu(false);
	}

	async showData() {
		const data = await this.prismaService.getPrismaData(menuDataGetMap[this.selectedMneuItem()?.id as MenuId]);
		this.rowData.set(data);
	}

	onSurveyComplete = (sender: Model) => {
		const data = sender.data as Record<string, unknown>;

		console.dir(data);

		this.isCreateOpen.set(false);

		sender.clear(false, true);
	};
}
