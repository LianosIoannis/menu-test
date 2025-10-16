import type { Model } from "survey-core";
import {
	createCustomerSurveyJson,
	createMatrialSurveyJson,
	createProductionSurveyJson,
	createPurchaseSurveyJson,
	createRecipeSurveyJson,
	createSaleSurveyJson,
	createSpecialProductSurveyJson,
	createSupplierSurveyJson,
} from "../surveyForms";
import type { DataService } from "./prisma-service";

export const menuDataMap = () => ({
	suppliers: {
		get: "get-suppliers",
		delete: "delete-supplier",
		create: {
			surveyFunction: "",
			surveyForm: createSupplierSurveyJson,
			endpoint: "create-supplier",
		},
	},
	customers: {
		get: "get-customers",
		delete: "delete-customer",
		create: { surveyFunction: "", surveyForm: createCustomerSurveyJson, endpoint: "create-customer" },
	},
	"special-products": {
		get: "get-special-products",
		delete: "delete-special-product",
		create: { surveyFunction: "", surveyForm: createSpecialProductSurveyJson, endpoint: "create-special-product" },
	},
	"raw-materials": {
		get: "get-raw-materials",
		delete: "delete-raw-material",
		create: { surveyFunction: "", surveyForm: createMatrialSurveyJson, endpoint: "create-raw-material" },
	},
	"purchase-documents": {
		get: "get-purchase-documents",
		delete: "delete-document",
		create: { surveyFunction: "", surveyForm: createPurchaseSurveyJson, endpoint: "create-purchase-document" },
	},
	"sale-documents": {
		get: "get-sale-documents",
		delete: "delete-document",
		create: { surveyFunction: "", surveyForm: createSaleSurveyJson, endpoint: "create-sale-document" },
	},
	"production-documents": {
		get: "get-production-documents",
		delete: "delete-document",
		create: {
			surveyFunction: (surveyModel: Model, prismaService: DataService) => {
				surveyModel.onValueChanged.add(async (_, options) => {
					if (options.name === "recipeId" && options.value) {
						const lines = (await prismaService.getPrismaData(`get-recipe-materials/${options.value}`)).data || [];

						surveyModel.setValue(
							"ingredients",
							lines.map((line: any) => ({
								materialId: line.id,
								materialTitle: line.name,
							})),
						);
					}
				});
			},
			surveyForm: createProductionSurveyJson,
			endpoint: "create-production-document",
		},
	},
	"adjustment-documents": {
		get: "get-adjustment-documents",
		delete: "delete-document",
		create: { surveyFunction: "", surveyForm: "", endpoint: "" },
	},
	recipes: {
		get: "get-recipes",
		delete: "delete-recipe",
		create: {
			surveyFunction: "",
			surveyForm: createRecipeSurveyJson,
			endpoint: "create-recipe",
		},
	},
	"lot-balance": {
		get: "get-lot-balances",
		delete: "",
		create: {
			surveyFunction: "",
			surveyForm: "",
			endpoint: "",
		},
	},
});

export type MenuId = keyof ReturnType<typeof menuDataMap>;
