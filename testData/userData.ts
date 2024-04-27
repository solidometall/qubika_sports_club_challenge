import { currentTimestamp } from '../utils/generalFunctions';
import { User } from '../utils/types';

export function buildFakeUser(): User {
	const randomString: string = currentTimestamp().toString();
	return {
		email: 'fakeuser' + randomString + '@test.com',
		password: 'fakeuserpsw',
		roles: ['ROLE_ADMIN'],
	};
}
