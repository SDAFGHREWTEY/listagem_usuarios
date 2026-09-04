export default function EmptyState({ message }) {
  return (
    <li className="empty-state">
      <div className="empty-icon" aria-hidden="true">
        🔎
      </div>
      {message}
    </li>
  );
}
