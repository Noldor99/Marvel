import React, { ReactNode } from 'react';
import Head from "next/head";
import { Box, Container, Toolbar } from '@mui/material';
import Header from '../components/Header';

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps>
  = ({
    children,
    title,
    description,
    keywords
  }) => {
    return (
      <>
        <Head>
          <title>{title || 'Marvel'}</title>
          <meta name="description" content={
            `todoList.`
            + description} />
          <meta name="robots" content="index, follow" />
          <meta name="keywords" content={keywords || "Музыка"} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Header />
        <Container>
          <Box  >
            {children}
          </Box>
        </Container>
      </>
    );
  };

export default MainLayout;
