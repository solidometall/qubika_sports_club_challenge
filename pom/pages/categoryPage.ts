import { Locator, Page } from "@playwright/test";
import { strict } from "assert";

export class CategoryPage {
    readonly page: Page;
    readonly addCategoryBtn: Locator;
    readonly newCategoryName: Locator;
    readonly newCategoryIsSub: Locator;
    readonly newSubCat: Locator;
    readonly newSubCatName: Locator;
    readonly submitBtn: Locator;
    readonly paginationBtns: Locator;
    readonly categoryItems: Locator;

    constructor(page: Page) {
        this.page = page;

        // elements
        this.addCategoryBtn = page.getByRole('button', { name: 'Adicionar', exact: false });
        this.newCategoryName = page.locator('//*[@formcontrolname="name"]');
        this.newCategoryIsSub = page.locator('//*[@formcontrolname="subCategory"]');
        this.newSubCat = page.getByRole('combobox');
        this.newSubCatName = page.locator('//*[@role="combobox"]/input');
        this.submitBtn = page.getByRole('button', { name:'Aceptar' });
				this.paginationBtns = page.getByRole('listitem');
				this.categoryItems = page.getByRole('table');
    }

    async createCategory(name: string, isSubCategory: boolean = false, parentCat?: string): Promise<void> {
        await this.addCategoryBtn.click();
        await this.newCategoryName.fill(name);

        if (isSubCategory && typeof parentCat === 'string') {
					await this.newCategoryIsSub.check();
					await this.newSubCat.click();
					await this.newSubCatName.fill(parentCat);
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
