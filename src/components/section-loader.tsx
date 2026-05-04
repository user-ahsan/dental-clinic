const PageLoader: React.FC = () => {
  return (
    <div
      className="w-full animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded h-96"
      style={{ willChange: "opacity" }}
      aria-busy="true"
      role="progressbar"
      aria-label="Loading section..."
    />
  )
}

export default PageLoader