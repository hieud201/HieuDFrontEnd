'use client';

import { Container } from 'react-bootstrap';
import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
      <CircularProgress />
    </Container>
  );
}