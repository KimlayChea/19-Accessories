function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-background text-foreground px-4">
      <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 flex flex-col items-center">
        <svg
          className="w-16 h-16 text-destructive mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <h1 className="text-2xl font-bold mb-2 text-destructive">
          Something went wrong ...!
        </h1>
        <p className="text-muted-foreground mb-4 text-center">
          {error.message}
        </p>

        <button
          onClick={resetErrorBoundary}
          className="py-2 px-4 rounded-2xl bg-background border-2 text-foreground font-semibold"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
