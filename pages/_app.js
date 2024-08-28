import Layout from "@/components/Layout";
import "@/styles/globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs';


export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider> 
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </ClerkProvider>
  );
}
