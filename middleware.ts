export { default } from 'next-auth/middleware';
export const config = {
  matcher: [
    '/tickets/new',
   '/tickets/:id/edit',
   // '/tickets/:path*', // every path under /tickets
  ],
};