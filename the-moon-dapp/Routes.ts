export const HOME_ROUTE = '/';

export const PROFILE_ROUTE = (
	first: TemplateStringsArray | string,
	username: TemplateStringsArray | string,
) => `/profile/${username}`;

export const USER_ACCOUNT_SETTINGS_ROUTE = `/user/settings`;
export const USER_ACCOUNT_SETTINGS_WALLET_ROUTE = `${USER_ACCOUNT_SETTINGS_ROUTE}/wallet`;

export const MARKETPLACE_ROUTE = `/marketplace`;
export const MARKETPLACE_CARD_ROUTE = `/marketplace/card-details`;

export const CREATORS_ROUTE = `/creators`;

export const PACKS_ROUTE = `/packs`;

export const NOT_FOUND_ROUTE = `/404`;
