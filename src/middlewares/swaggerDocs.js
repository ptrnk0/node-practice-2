import createHttpError from 'http-errors';
import fs from 'node:fs';
import path from 'node:path';
import swaggerUI from 'swagger-ui-express';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'docs', 'swagger.json').toString(),
      ),
    );
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    return (req, res, next) =>
      next(createHttpError(500, 'cant load swagger docs'));
  }
};
