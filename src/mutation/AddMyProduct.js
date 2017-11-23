// @flow

import { List, Map } from 'immutable';
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { MyProductConnection, getMyProducts } from '../type';
import { addMyProduct } from './MyProductHelper';

export default mutationWithClientMutationId({
  name: 'AddMyProduct',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    barcode: { type: GraphQLString },
    productPageUrl: { type: GraphQLString },
    size: { type: GraphQLString },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
    myProduct: {
      type: MyProductConnection.edgeType,
      resolve: _ => _.get('myProduct'),
    },
  },
  mutateAndGetPayload: async ({
    name, description, barcode, productPageUrl, size,
  }, { sessionToken, dataLoaders }) => {
    try {
      const myProductId = await addMyProduct(name, description, barcode, productPageUrl, size, dataLoaders, sessionToken);

      return Map({
        myProduct: (await getMyProducts(Map({ myProductIds: List.of(myProductId) }), dataLoaders, sessionToken)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
