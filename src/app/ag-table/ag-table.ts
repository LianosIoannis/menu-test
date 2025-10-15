import { Component, computed, input, output, type Signal } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import {
	AllCommunityModule,
	type ColDef,
	colorSchemeDarkBlue,
	type GridOptions,
	ModuleRegistry,
	type RowClickedEvent,
	type RowSelectionOptions,
	themeAlpine,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
	selector: "app-ag-table",
	imports: [AgGridAngular],
	templateUrl: "./ag-table.html",
})
export class AgTable<T extends object> {
	themeAlpine = themeAlpine.withPart(colorSchemeDarkBlue);

	rowClicked = output<T>();

	inputRowData = input<T[]>([]);

	columnDefs: Signal<ColDef[]> = computed(() => {
		const rowData = this.inputRowData();
		if (rowData.length === 0) {
			return [];
		}
		return Object.keys(this.inputRowData()[0]).map((key) => ({
			field: key,
			filter: true,
			sortable: true,
			editable: false,
			flex: 1,
		}));
	});

	rowSelection: RowSelectionOptions = {
		mode: "singleRow",
		enableClickSelection: true,
		checkboxes: false,
	};

	gridOptions: GridOptions = {
		theme: this.themeAlpine,
		suppressCellFocus: true,
		pagination: true,
		paginationPageSize: 10,
		paginationPageSizeSelector: [10, 15, 20, 50],
	};

	onRowClicked(event: RowClickedEvent) {
		this.rowClicked.emit(event.data);
	}
}
