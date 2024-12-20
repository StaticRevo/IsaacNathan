// expo-router.d.ts
import 'expo-router';

declare module 'expo-router' {
  export type RootRouteParams = {
    '/frontpage': undefined;
    '/wishlist': undefined;
    '/cart': undefined;
    '/search': undefined;
    '/settings': undefined;
    '/profile': undefined;
    '/category/[categoryName]': { categoryName: string };
  };
}
