import { APIRequestContext, APIResponse, request, expect, test as base } from '@playwright/test';
import { CONFIG } from '../variables.config';
import { buildFakeUser } from '../testData/userData';
import { User } from '../utils/types';
import userRequests from '../requests/user/userRequests';
import { parseUserFromResponse } from '../utils/generalFunctions';
import { LoginPage } from '../pom/pages/loginPage';

// declare the types of the fixtures
interface MyFixtures {
	apiContext: APIRequestContext;
	createUser: User;
    loginPage: LoginPage,
}

// extend base test to be used in multiple test files. Each of them will get the fixtures
export const test = base.extend<MyFixtures>({
	// eslint-disable-next-line no-empty-pattern
	async apiContext({}, use) {
		// Set up the fixture
		const apiContext: APIRequestContext = await request.newContext({
			baseURL: CONFIG.baseHost,
			extraHTTPHeaders: {
				Accept: 'application/json',
				'Content-type': 'application/json',
			},
		});

		// Use the fixture value in the test
		await use(apiContext);

		// Clean up the fixture
		await apiContext.dispose();
	},

	// create a new user returning it as an object
	createUser: async ({ apiContext }, use) => {
		// Set up the fixture
		const userData: User = buildFakeUser();
		const response: APIResponse = await userRequests.createUser(apiContext, userData);
		expect(response.ok()).toBeTruthy();
		const newUser: User = await parseUserFromResponse(response);
        // We have to set the original password as the one in the response is encrypted
        newUser.password = userData.password;
		// Use the fixture value in the test
		await use(newUser);
	},

    loginPage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

});

export { expect } from '@playwright/test';
