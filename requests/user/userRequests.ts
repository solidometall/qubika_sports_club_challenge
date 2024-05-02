import { APIRequestContext, APIResponse } from '@playwright/test';
import apiEndpoints from '../../utils/apiEndpoints';
import methods from '../../utils/apiMethods';
import { executeRequest } from '../../utils/apiRequests';
import { CONFIG } from '../../variables.config';
import { User } from '../../utils/types';

async function createUser(apiContext: APIRequestContext, userData: User): Promise<APIResponse> {
	const requestUrl = `${CONFIG.baseApiHost}${apiEndpoints.user.create}`;
	const method: string = methods.post;
	return await executeRequest(apiContext, requestUrl, method, userData);
}

export default { createUser };
