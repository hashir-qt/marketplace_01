import {createClient} from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: '566xg87i',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-03-25',  
});

const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
    return builder.image(source);
    
}