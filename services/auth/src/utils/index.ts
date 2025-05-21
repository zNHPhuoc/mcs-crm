import { ERROR_CODE } from '../common/error-code';

export const paginationQuery = ({
  page = 1,
  limit = 10,
}: Pagination): Pagination => {
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const mapErrorCodesToSwaggerSchema = () => {
  const errorSchema = {
    type: 'object',
    properties: {},
  };

  for (const key in ERROR_CODE) {
    if (ERROR_CODE.hasOwnProperty(key)) {
      errorSchema.properties[key] = {
        type: ERROR_CODE[key],
      };
    }
  }

  return errorSchema;
};
