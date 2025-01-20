import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { Category } from './category'
import { Hero } from './hero'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ product,Category,Hero],
}
