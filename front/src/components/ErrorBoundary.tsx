import React, { ReactNode } from 'react';
import { Spinner } from 'react-bootstrap';

interface ErrorBoundaryProps {
  children: ReactNode;  // 'children' prop의 타입을 ReactNode로 정의
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 에러 로깅
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Spinner animation="border" variant="primary" />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
