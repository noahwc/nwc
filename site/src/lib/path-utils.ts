/** Basename of a glob key, extension stripped: `/src/content/photos/X.jpg` → `X` */
export const stem = (path: string) => {
	const start = path.lastIndexOf('/') + 1;
	const dot = path.lastIndexOf('.');
	return dot > start ? path.slice(start, dot) : path.slice(start);
};
