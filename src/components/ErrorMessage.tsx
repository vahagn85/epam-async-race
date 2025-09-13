function ErrorMessage({ msg }: { msg: string }) {
  return (
    <div className="bg-red-100 shadow-xl border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
      <p className="font-semibold">Something went wrong!</p>
      <p className="text-sm">{msg}</p>
    </div>
  );
}

export default ErrorMessage;
