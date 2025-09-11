function NotFound() {
  return (
    <div className="min-h-[calc(100vh-104px)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-2">
          Sorry, the page you are looking for doesn&lsquo;t exist or has been
          moved.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
