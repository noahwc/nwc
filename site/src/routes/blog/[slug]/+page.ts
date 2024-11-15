export async function load({ params }) {
	try {
		const post = await import(`../${params.slug}.md`);
		console.log(post);
		const { title, date } = post.metadata;
		const body = post.default;
		return {
			body,
			title,
			date
		};
	} catch (error) {
		console.log('Error loading post! \n', error);
	}
}
