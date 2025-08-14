import { Component, computed, input, output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MenuItem } from "./menu-item/menu-item";
import type { MenuItemModel } from "./menuItem.model";

@Component({
	selector: "app-menu",
	imports: [MenuItem, FormsModule, FontAwesomeModule],
	templateUrl: "./menu.html",
	host: {
		class: "min-h-0",
	},
})
export class Menu {
	menuData = input<MenuItemModel[]>([]);
	mainHeaderText = input("Main Header");
	subHeaderText = input("Sub Header");

	filter = signal("");

	onItemClicked = output<MenuItemModel>();
	onCloseClicked = output();
	onLogoutClicked = output();
	onProfileClicked = output();

	menuDataFiltered(menuData: MenuItemModel[], filter: string) {
		const filterToLowerCase = filter.toLowerCase();

		return menuData.reduce((result: MenuItemModel[], currMenuItem: MenuItemModel) => {
			const filteredKids = currMenuItem.isFolder ? this.menuDataFiltered(currMenuItem.items, filter) : [];

			const itemIncludesFilter = (item: MenuItemModel): boolean => {
				return (
					filterToLowerCase === "" ||
					(!item.isFolder && item.text.toLowerCase().includes(filterToLowerCase)) ||
					(item.isFolder && item.items.some((item) => itemIncludesFilter(item))) ||
					false
				);
			};

			const matches = itemIncludesFilter(currMenuItem);

			if (matches || filteredKids.length) {
				result.push({
					...currMenuItem,
					...(currMenuItem.isFolder ? { items: filteredKids } : {}),
				});
			}

			return result;
		}, [] as MenuItemModel[]);
	}

	itemClicked(menuItem: MenuItemModel) {
		this.onItemClicked.emit(menuItem);
	}

	closeClicked() {
		this.onCloseClicked.emit();
	}

	logoutClicked() {
		this.onLogoutClicked.emit();
	}

	profileClicked() {
		this.onProfileClicked.emit();
	}

	filteredItems = computed(() => this.menuDataFiltered(this.menuData(), this.filter()));
}
