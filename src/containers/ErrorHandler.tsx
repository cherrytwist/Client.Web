import React, { FC, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { ErrorBoundary } from './ErrorBoundary';

export const ErrorHandler: FC = ({ children }) => {
  const [show, setShow] = useState(true);

  const closeMessage = () => {
    setShow(false);
  };

  const message = 'Test test test';

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'relative',
          minHeight: '0px',
          zIndex: 999,
        }}
      >
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <Toast show={show} onClose={closeMessage}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
              <span>{message}</span>
            </Toast.Header>
          </Toast>
        </div>
      </div>
      <ErrorBoundary>{children}</ErrorBoundary>
    </>
  );
};
