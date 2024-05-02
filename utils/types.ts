export interface User {
	id?: string;
	userName?: string;
	email: string;
	password: string;
	roles: string[];
	firstName?: string;
	lastName?: string;
	fullName?: string;
}

export interface Category {
	name: string;
	isSubcategory: boolean;
	parentCategory?: string;
}
