import * as React from 'react';
import { Typography, Container } from '@mui/material';
import request from '../utils/request';
import { useEffect, useState } from 'react';

export default function User() {
  const [content, setContent] = useState('');

  useEffect(() => {
    request.get('/test/user').then(
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
        User Page
      </Typography>
      <Typography variant="body1">{content}</Typography>
    </Container>
  );
}