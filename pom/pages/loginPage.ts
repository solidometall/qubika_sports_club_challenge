import { Locator, Page } from '@playwright/test';
import { DashboardPage } from './dashboardPage';

export class LoginPage {
	readonly page: Page;
	readonly link: string;
	readonly username: Locator;
	readonly password: Locator;
	readonly submitBtn: Locator;

	constructor(page: Page) {
		this.page = page;
		this.link = '/#/auth/login';

		// elements
		this.username = page.locator('//*[@formcontrolname="email"]');
		this.password = page.locator('//*[@formcontrolname="password"]');
		this.submitBtn = page.getByRole('button', { name: 'Autenticar' });
	}

	async navigateTo(): Promise<void> {
		await this.page.goto(this.link);
	}

	async doLogin(username: string, password: string): Promise<DashboardPage> {
		await this.navigateTo();
		await this.username.fill(username);
		await this.password.fill(password);
		await this.submitBtn.click();
		return new DashboardPage(this.page);
	}
}
