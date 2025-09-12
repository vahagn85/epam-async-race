function EmptyTableText({ colSpan, text }: { colSpan: number; text: string }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-6 py-10 text-center text-sm text-white"
      >
        {text}
      </td>
    </tr>
  );
}

export default EmptyTableText;
