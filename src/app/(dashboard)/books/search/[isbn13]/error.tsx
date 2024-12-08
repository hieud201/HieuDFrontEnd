'use client';

import { Container, Alert } from 'react-bootstrap';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container>
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>Something went wrong!</Alert.Heading>
        <p>{error.message}</p>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-danger"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </Alert>
    </Container>
  );
}