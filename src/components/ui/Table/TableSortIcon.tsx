function AscIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.5 17.25a.75.75 0 0 1-1.5 0V7.56l-2.22 2.22a.75.75 0 1 1-1.06-1.06l3.5-3.5a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1-1.06 1.06L18.5 7.56v9.69Zm-15.75.25a.75.75 0 0 1 0-1.5h9.5a.75.75 0 0 1 0 1.5h-9.5Zm0-5a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 0 1.5h-5.5Zm0-5a.75.75 0 0 1 0-1.5h3.5a.75.75 0 0 1 0 1.5h-3.5Z" />
    </svg>
  );
}

function DescIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.5 16.44V6.75a.75.75 0 0 0-1.5 0v9.69l-2.22-2.22a.75.75 0 1 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 1 0-1.06-1.06l-2.22 2.22ZM2 7.25a.75.75 0 0 1 .75-.75h9.5a.75.75 0 0 1 0 1.5h-9.5A.75.75 0 0 1 2 7.25Zm0 5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75Zm0 5a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z" />
    </svg>
  );
}

function NoneIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 9l4 -4l4 4m-4 -4v14" />
      <path d="M21 15l-4 4l-4 -4m4 4v-14" />
    </svg>
  );
}
function TableSortIcon({ direction }: { direction: 'asc' | 'desc' | 'none' }) {
  if (direction === 'asc')
    return (
      <span className="text-2xl">
        <AscIcon />
      </span>
    );
  if (direction === 'desc')
    return (
      <span className="text-2xl">
        <DescIcon />
      </span>
    );
  return (
    <span className="text-lg opacity-50">
      <NoneIcon />
    </span>
  );
}

export default TableSortIcon;
