import Layout from "@/components/Layout";
import "@/styles/globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs';
import { shadesOfPurple } from '@clerk/themes'



export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider
      appearance={{
      baseTheme: shadesOfPurple,
    }}
    >
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </ClerkProvider>
  );
}
