import { baseUrl } from "./environment";

export const createCustomerSurveyJson = {
	title: "Create Customer",
	description: "Enter the customer details below",
	pages: [
		{
			name: "customerInfo",
			elements: [
				{
					type: "text",
					name: "code",
					title: "Customer Code",
					isRequired: true,
					maxLength: 50,
					placeholder: "e.g. CUS001",
				},
				{
					type: "text",
					name: "name",
					title: "Customer Name",
					isRequired: true,
					maxLength: 200,
					placeholder: "e.g. Acme Industries",
				},
				{
					type: "text",
					name: "afm",
					title: "Tax ID (AFM)",
					isRequired: true,
					maxLength: 9, // AFM is 9 digits
					inputType: "tel", // numeric keypad; keeps string
					placeholder: "e.g. 200001001",
					validators: [{ type: "regex", regex: "^[0-9]{9}$", text: "AFM must be exactly 9 digits." }],
				},
			],
		},
	],
	showQuestionNumbers: "off",
};

export const createSupplierSurveyJson = {
	title: "Create Supplier",
	description: "Enter the supplier details below",
	pages: [
		{
			name: "supplierInfo",
			elements: [
				{
					type: "text",
					name: "code",
					title: "Supplier Code",
					isRequired: true,
					maxLength: 50,
					placeholder: "e.g. SUP001",
				},
				{
					type: "text",
					name: "name",
					title: "Supplier Name",
					isRequired: true,
					maxLength: 200,
					placeholder: "e.g. Global Supplies Ltd.",
				},
				{
					type: "text",
					name: "afm",
					title: "Tax ID (AFM)",
					isRequired: true,
					maxLength: 9, // AFM is 9 digits
					inputType: "tel", // numeric keypad; keeps string
					placeholder: "e.g. 200001001",
					validators: [{ type: "regex", regex: "^[0-9]{9}$", text: "AFM must be exactly 9 digits." }],
				},
			],
		},
	],
	showQuestionNumbers: "off",
};

export const createMatrialSurveyJson = {
	title: "Create Material",
	description: "Enter the material details below",
	pages: [
		{
			name: "materialInfo",
			elements: [
				{
					type: "text",
					name: "code",
					title: "Material Code",
					isRequired: true,
					maxLength: 50,
					placeholder: "e.g. MAT001",
				},
				{
					type: "text",
					name: "name",
					title: "Material Name",
					isRequired: true,
					maxLength: 200,
					placeholder: "e.g. Material 1",
				},
			],
		},
	],
	showQuestionNumbers: "off",
};

export const createSpecialProductSurveyJson = {
	title: "Create Special Item",
	pages: [
		{
			name: "specialItemInfo",
			elements: [
				{
					type: "text",
					name: "code",
					title: "Special Item Code",
					isRequired: true,
					maxLength: 50,
					placeholder: "e.g. MAT001",
				},
				{
					type: "text",
					name: "name",
					title: "Special Item Name",
					isRequired: true,
					maxLength: 200,
					placeholder: "e.g. Material 1",
				},
			],
		},
	],
	showQuestionNumbers: "off",
};

export const createPurchaseSurveyJson = {
	title: "Create Purchase",
	description: "Enter the purchase header and lines",
	showQuestionNumbers: "off",
	pages: [
		{
			name: "header",
			elements: [
				{
					type: "dropdown",
					name: "supplierId",
					title: "Supplier",
					isRequired: true,
					placeholder: "Select a supplier",
					choicesByUrl: {
						url: `${baseUrl}/get-suppliers`,
						path: "data",
						valueName: "id",
						titleName: "name",
					},
				},
				{
					type: "text",
					name: "number",
					title: "Document Number",
					isRequired: true,
					inputType: "number",
					min: 1,
					placeholder: "e.g. 1001",
				},
				{
					type: "text",
					name: "date",
					title: "Document Date",
					isRequired: true,
					inputType: "date",
					placeholder: "YYYY-MM-DD",
				},
				{
					type: "comment",
					name: "notes",
					title: "Notes",
					maxLength: 1000,
					placeholder: "Optional notes…",
				},
			],
		},
		{
			name: "linesPage",
			elements: [
				{
					type: "paneldynamic",
					name: "lines",
					title: "Lines",
					isRequired: true,
					minPanelCount: 1,
					panelAddText: "Add line",
					panelRemoveText: "Remove",
					renderMode: "list",
					templateElements: [
						{
							type: "dropdown",
							name: "materialId",
							title: "Material",
							isRequired: true,
							placeholder: "Select a material",
							choicesByUrl: {
								url: `${baseUrl}/get-raw-materials`,
								path: "data",
								valueName: "id",
								titleName: "name",
							},
						},
						{
							type: "text",
							name: "lot",
							title: "Lot",
							isRequired: true,
							maxLength: 100,
							placeholder: "e.g. BATCH-2025-001",
						},
						{
							type: "text",
							name: "productionDate",
							title: "Production Date",
							isRequired: true,
							inputType: "date",
							placeholder: "YYYY-MM-DD",
						},
						{
							type: "text",
							name: "expirationDate",
							title: "Expiration Date",
							isRequired: true,
							inputType: "date",
							placeholder: "YYYY-MM-DD",
						},
						{
							type: "text",
							name: "qty",
							title: "Quantity",
							isRequired: true,
							inputType: "number",
							min: 0.000001,
							placeholder: "e.g. 10",
						},
					],
				},
			],
		},
	],
};

export const createSaleSurveyJson = {
	title: "Create Sale",
	description: "Enter the sale header and lines",
	showQuestionNumbers: "off",
	pages: [
		{
			name: "header",
			elements: [
				{
					type: "dropdown",
					name: "customerId",
					title: "Customer",
					isRequired: true,
					placeholder: "Select a customer",
					choicesByUrl: {
						url: `${baseUrl}/get-customers`,
						path: "data",
						valueName: "id",
						titleName: "name",
					},
				},
				{
					type: "text",
					name: "number",
					title: "Document Number",
					isRequired: true,
					inputType: "number",
					min: 1,
					placeholder: "e.g. 2001",
				},
				{
					type: "text",
					name: "date",
					title: "Document Date",
					isRequired: true,
					inputType: "date",
					placeholder: "YYYY-MM-DD",
				},
				{
					type: "comment",
					name: "notes",
					title: "Notes",
					maxLength: 1000,
					placeholder: "Optional notes…",
				},
			],
		},
		{
			name: "linesPage",
			elements: [
				{
					type: "paneldynamic",
					name: "lines",
					title: "Lines",
					isRequired: true,
					minPanelCount: 1,
					panelAddText: "Add line",
					panelRemoveText: "Remove",
					renderMode: "list",
					templateElements: [
						{
							type: "dropdown",
							name: "materialId",
							title: "Material (filter)",
							placeholder: "Optional: choose material to filter lots",
							choicesByUrl: {
								url: `${baseUrl}/get-all-products`,
								path: "data",
								valueName: "id",
								titleName: "name",
							},
						},
						{
							type: "dropdown",
							name: "materialLotId",
							title: "Lot",
							isRequired: true,
							placeholder: "Select a lot",
							dependsOn: ["materialId"],
							choicesByUrl: {
								url: `${baseUrl}/get-material-lots/{panel.materialId}`,
								path: "data",
								valueName: "id",
								titleName: "lot",
							},
						},
						{
							type: "text",
							name: "qty",
							title: "Quantity",
							isRequired: true,
							inputType: "number",
							min: 0.000001,
							placeholder: "e.g. 5",
						},
					],
				},
			],
		},
	],
};

export const createProductionSurveyJson = {
	title: "Create Production",
	description: "Select a recipe and choose lots for each ingredient",
	showQuestionNumbers: "off",
	pages: [
		{
			name: "header",
			elements: [
				{
					type: "dropdown",
					name: "recipeId",
					title: "Recipe",
					isRequired: true,
					placeholder: "Select a recipe",
					choicesByUrl: {
						url: `${baseUrl}/get-recipes`,
						path: "data",
						valueName: "id",
						titleName: "name",
					},
				},
				{
					type: "text",
					name: "number",
					title: "Document Number",
					isRequired: true,
					inputType: "number",
					min: 1,
				},
				{ type: "text", name: "lot", title: "Finished Lot", isRequired: true, maxLength: 100 },
				{ type: "text", name: "date", title: "Production Date", isRequired: true, inputType: "date" },
				{
					type: "text",
					name: "qty",
					title: "Finished Quantity",
					isRequired: true,
					inputType: "number",
					min: 0.000001,
				},
				{ type: "comment", name: "notes", title: "Notes", maxLength: 1000 },
			],
		},
		{
			name: "ingredients",
			elements: [
				{
					type: "paneldynamic",
					name: "ingredients",
					title: "Ingredients (pick a lot for each)",
					description: "Rows are generated from the selected recipe.",
					isRequired: true,
					allowAddPanel: false,
					allowRemovePanel: false,
					panelRemoveButtonLocation: "none",
					// Show material title (we’ll seed materialTitle)
					templateTitle: "{panel.materialTitle}",
					templateElements: [
						// Hidden driver fields
						{ type: "text", name: "materialId", visible: false },
						{ type: "text", name: "materialTitle", visible: false },

						// Only the lot dropdown is visible to the user
						{
							type: "dropdown",
							name: "materialLotId",
							title: "Lot",
							isRequired: true,
							placeholder: "Select a lot",
							dependsOn: ["materialId"],
							visibleIf: "{panel.materialId} notempty",
							choicesByUrl: {
								url: `${baseUrl}/get-material-lots/{panel.materialId}`,
								path: "data",
								valueName: "id",
								titleName: "lot",
							},
						},
					],
				},
			],
		},
	],
};

export const createRecipeSurveyJson = {
	title: "Create Recipe",
	description: "Enter recipe details and its ingredient lines",
	showQuestionNumbers: "off",
	pages: [
		{
			name: "header",
			elements: [
				{
					type: "text",
					name: "name",
					title: "Recipe Name",
					isRequired: true,
					maxLength: 200,
					placeholder: "e.g. Chocolate Bar 70%",
				},
				{
					type: "dropdown",
					name: "specialItemId",
					title: "Finished Product",
					isRequired: true,
					placeholder: "Select a special item",
					choicesByUrl: {
						url: `${baseUrl}/get-special-products`,
						path: "data",
						valueName: "id",
						titleName: "name",
					},
				},
			],
		},
		{
			name: "lines",
			elements: [
				{
					type: "paneldynamic",
					name: "recipeLine",
					title: "Ingredients",
					description: "Add one or more ingredient lines",
					isRequired: true,
					minPanelCount: 1,
					panelAddText: "Add ingredient",
					panelRemoveText: "Remove",
					renderMode: "list",
					templateElements: [
						{
							type: "dropdown",
							name: "materialId",
							title: "Material",
							isRequired: true,
							placeholder: "Select a raw material",
							dependsOn: ["specialItemId"],
							choicesByUrl: {
								url: `${baseUrl}/get-all-products-except/{specialItemId}`,
								path: "data",
								valueName: "id",
								titleName: "name",
							},
						},
						{
							type: "text",
							name: "qty",
							title: "Quantity",
							isRequired: true,
							inputType: "number",
							min: 0.000001,
							placeholder: "e.g. 1.5",
						},
					],
				},
			],
		},
	],
};
