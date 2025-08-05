import * as React from 'react';
import { Typography, Container } from '@mui/material';
import request from '../utils/request';
import { useEffect, useState } from 'react';

export default function Admin() {
  const [content, setContent] = useState('');

  useEffect(() => {
    request.get('/test/admin').then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Page
      </Typography>
      <Typography variant="body1">{content}</Typography>
    </Container>
  );
}