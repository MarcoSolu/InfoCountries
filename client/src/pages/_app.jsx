import React from "react";
import Layout from "../components/Layout";
import '../styles/global.css';
import Head from "next/head";
import { AuthContextProvider } from "../context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
      <Layout>
        <Head>
          <title>TravelNote</title>
          <meta name='TravelNote' content='You can you use this to keep your next travel in a digital note' />
          <link rel='icon' href='' />
        </Head>
        <Component {...pageProps} />
      </Layout>
      </QueryClientProvider>
    </AuthContextProvider>
  )
}

export default App