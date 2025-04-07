import type { PageLoad } from './$types';
import { gallery } from '$lib';
import type { Album } from '../../app';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(`/api/albums`);
	const albums = await response.json();
	const albumsImageInjected = albums.map((album: Album) => {
		return { ...album, meta: { ...album.meta, cover: gallery[album.meta.cover] } };
	});
	return { albums: albumsImageInjected };
};
