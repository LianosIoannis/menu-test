import {
	createCustomerSurveyJson,
	createMatrialSurveyJson,
	createProductionSurveyJson,
	createPurchaseSurveyJson,
	createSaleSurveyJson,
	createSpecialProductSurveyJson,
	createSupplierSurveyJson,
} from "../surveyForms";

export const menuDataMap = {
	suppliers: {
		get: "get-suppliers",
		delete: "delete-supplier",
		create: { surveyFunction: "", surveyForm: createSupplierSurveyJson, endpoint: "create-supplier" },
	},
	customers: {
		get: "get-customers",
		delete: "delete-customer",
		create: { surveyFunction: "", surveyForm: createCustomerSurveyJson, endpoint: "create-customer" },
	},
	"special-products": {
		get: "get-special-products",
		delete: "delete-special-product",
		create: { surveyFunction: "", surveyForm: createSpecialProductSurveyJson, endpoint: "" },
	},
	"raw-materials": {
		get: "get-raw-materials",
		delete: "delete-raw-material",
		create: { surveyFunction: "", surveyForm: createMatrialSurveyJson, endpoint: "" },
	},
	"purchase-documents": {
		get: "get-purchase-documents",
		delete: "delete-document",
		create: { surveyFunction: "", surveyForm: createPurchaseSurveyJson, endpoint: "" },
	},
	"sale-documents": {
		get: "get-sale-documents",
		delete: "delete-document",
		create: { surveyFunction: "", surveyForm: createSaleSurveyJson, endpoint: "" },
	},
	"production-documents": {
		get: "get-production-documents",
		delete: "delete-document",
		create: { surveyFunction: "", surveyForm: createProductionSurveyJson, endpoint: "" },
	},
	"adjustment-documents": {
		get: "get-adjustment-documents",
		delete: "delete-document",
		create: { surveyFunction: "", surveyForm: "", endpoint: "" },
	},
};

export type MenuId = keyof typeof menuDataMap;
