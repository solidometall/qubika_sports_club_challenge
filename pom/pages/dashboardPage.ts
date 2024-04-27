import { Page } from '@playwright/test';
import { NavigationBarComponent } from '../components/navigationBarComponent';

export class DashboardPage {
	readonly page: Page;
	readonly navigationBar: NavigationBarComponent;

	constructor(page: Page) {
		this.page = page;
		this.navigationBar = new NavigationBarComponent(page);
	}
}
