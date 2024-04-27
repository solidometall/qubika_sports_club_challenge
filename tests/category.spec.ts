import { expect, test } from '../fixtures/fixtureBuilder';
import { CategoryPage } from '../pom/pages/categoryPage';
import { DashboardPage } from '../pom/pages/dashboardPage';
import { buildFakeCategory, buildFakeSubcategory } from '../testData/categoryData';
import { Category, User } from "../utils/types";

test.describe.serial('Category suite', () => {
	test('should create a new category', async ({ createUser, loginPage }) => {
		const user: User = createUser;
		const fakeCategory: Category = buildFakeCategory();
		const dashboardPage: DashboardPage = await loginPage.doLogin(user.email, user.password);
		const categoryPage: CategoryPage = await dashboardPage.navigationBar.goTocategoryPage();
		await categoryPage.createCategory(fakeCategory.name, fakeCategory.isSubcategory);
		await categoryPage.goToLastPage();
		await expect(categoryPage.categoryItems).toContainText(fakeCategory.name);
	});

	test('should create a new sub-category', async ({ createUser, loginPage }) => {
		const user: User = createUser;
		const fakeCategory: Category = buildFakeSubcategory();
		const dashboardPage: DashboardPage = await loginPage.doLogin(user.email, user.password);
		const categoryPage: CategoryPage = await dashboardPage.navigationBar.goTocategoryPage();
		await categoryPage.createCategory(fakeCategory.name, fakeCategory.isSubcategory);
		await categoryPage.goToLastPage();
		await expect(categoryPage.categoryItems).toContainText(fakeCategory.name);
	});
});
