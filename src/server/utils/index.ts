import fragmentRoutes from '../../shared/routes';

export const paths = fragmentRoutes.map(({ path }) => path);
export const isProd = process.env.NODE_ENV === 'production';
