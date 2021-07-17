import * as React from "react";

interface ErrorBoundaryState {
  hasError : boolean;
}

class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("something went wrong: " + JSON.stringify(errorInfo));
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <p>Oops! Something went terribly wrong!!</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;