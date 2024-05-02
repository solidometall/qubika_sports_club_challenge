import { Locator, Page } from '@playwright/test';
import { DashboardPage } from '../pages/dashboardPage';
import { CategoryPage } from '../pages/categoryPage';

export class NavigationBarComponent {
	readonly page: Page;
	readonly categoryPageBtn: Locator;

	constructor(page: Page) {
		this.page = page;

		// elements
		this.categoryPageBtn = page.locator('//*[@href="#/category-type"]');
	}

	async goTocategoryPage(): Promise<CategoryPage> {
		await this.categoryPageBtn.click();
		return new CategoryPage(this.page);
	}
}
