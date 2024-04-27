import { currentTimestamp } from '../utils/generalFunctions';
import { Category } from '../utils/types';

export function buildFakeCategory(): Category {
	const randomString: string = currentTimestamp().toString();
	return {
		name: 'automatedCat' + randomString,
		isSubcategory: false,
	};
}

export function buildFakeSubcategory(): Category {
	const randomString: string = currentTimestamp().toString();
	return {
		name: 'automatedCat' + randomString,
		isSubcategory: true,
		parentCategory: 'automatedCat1',
	};
}
