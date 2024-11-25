export const readableDateTransform = (date_str: string): string => {
	const date = new Date(date_str);
	const month = date.toLocaleString('default', { month: 'long' });
	return `${month} ${date.getDay()}, ${date.getFullYear()}`;
};
