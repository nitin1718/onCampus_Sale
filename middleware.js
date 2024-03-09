import { getSession } from 'next-auth/react';

const withAuth = (handler) => async (context) => {
  const session = await getSession(context);

  if (!session) {
    // Redirect to login or handle unauthorized access
    context.res.writeHead(302, { Location: '/login' });
    context.res.end();
    return {};
  }

  return handler(context);
};

export default withAuth;