import { getSession, GetSessionOptions } from 'next-auth/client';

interface PageOptions {
	title: string;
	redirectIfNotAuthenticated: boolean;
	redirect?: string;
}

export function EnsurePageIsAuthenticatedServerSide(pageOptions: PageOptions) {
	const { title, redirectIfNotAuthenticated, redirect } = pageOptions;

	const getServerSideProps = async (context: GetSessionOptions) => {
		const session = await getSession(context);

		if (session == null && redirectIfNotAuthenticated) {
			return {
				redirect: {
					destination: redirect ?? '/404',
					permanent: false,
				},
			};
		}

		return {
			props: {
				title,
				isAuthenticated: session != null,
			},
		};
	};

	return {
		getServerSideProps,
	};
}

export async function isAuthenticatedServerSide(context: GetSessionOptions) {
	const session = await getSession(context);
	return session != null;
}
