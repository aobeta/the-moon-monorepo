import { PropsWithChildren } from 'react';

export type PageProps<TOtherProps> = PropsWithChildren<TOtherProps> & {
	title: string;
};

export type AuthenticatedPageProps<TOtherProps> = PageProps<TOtherProps> & {
	isAutheticated: boolean;
};
