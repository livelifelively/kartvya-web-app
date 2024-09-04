import { useSession } from 'next-auth/react';
import { FullScreenLoaderWithAppShell } from '../app-shell/full-screen-loader-with-app-shell';

function AuthPageWrapper({ children }: { children: any }) {
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <FullScreenLoaderWithAppShell />;
  }

  return children;
}

export default AuthPageWrapper;
