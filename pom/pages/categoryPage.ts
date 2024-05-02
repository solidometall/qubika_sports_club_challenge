import { Locator, Page } from '@playwright/test';
import { strict } from 'assert';

export class CategoryPage {
	readonly page: Page;
	readonly addCategoryBtn: Locator;
	readonly newCategoryName: Locator;
	readonly newCategoryIsSub: Locator;
	readonly newSubCat: Locator;
	readonly newSubCatList: Locator;
	readonly newSubCatName: Locator;
	readonly submitBtn: Locator;
	readonly paginationBtns: Locator;
	readonly categoryItemTable: Locator;

	constructor(page: Page) {
		this.page = page;

		// elements
		this.addCategoryBtn = page.getByRole('button', { name: 'Adicionar', exact: false });
		this.newCategoryName = page.locator('//*[@formcontrolname="name"]');
		this.newCategoryIsSub = page.locator('//*[@formcontrolname="subCategory"]');
		this.newSubCat = page.getByRole('combobox');
		this.newSubCatList = page.getByRole('listbox');
		this.newSubCatName = page.locator('//*[@role="combobox"]/input');
		this.submitBtn = page.getByRole('button', { name: 'Aceptar' });
		this.paginationBtns = page.getByRole('listitem');
		this.categoryItemTable = page.getByRole('table');
	}

	async createCategory(name: string, isSubCategory = false, parentCat?: string): Promise<void> {
		await this.addCategoryBtn.click();
		await this.newCategoryName.fill(name);

		if (isSubCategory && typeof parentCat === 'string') {
			await this.newCategoryIsSub.check({ force: true });
			await this.newSubCat.click();
			await this.newSubCatName.fill(parentCat);
			await this.newSubCatList.filter({ hasText: parentCat }).click();
		}

		await this.submitBtn.click();
		await this.newCategoryName.isHidden();
	}

	async goToLastPage(): Promise<void> {
		const numerOfButtons: number = await this.paginationBtns.count();
		const lastIndexBtn: number = numerOfButtons - 2;
		await this.paginationBtns.nth(lastIndexBtn).click();
	}
}
