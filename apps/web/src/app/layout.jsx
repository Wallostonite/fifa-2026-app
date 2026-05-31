import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Nav from '@/components/Nav';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Nav>{children}</Nav>
    </QueryClientProvider>
  );
}