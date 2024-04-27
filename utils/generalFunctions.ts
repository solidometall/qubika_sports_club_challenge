import { APIResponse } from '@playwright/test';
import { User } from './types';

export const currentTimestamp = () => Date.now();

export async function parseUserFromResponse(data: APIResponse): Promise<User> {
	const userData = await data.json();
	return userData as User;
}
