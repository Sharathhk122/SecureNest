import * as React from 'react';
import { Typography, Container } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Secure App
      </Typography>
      <Typography variant="body1">
        This is a demo of a secure full-stack application with JWT authentication.
      </Typography>
    </Container>
  );
}