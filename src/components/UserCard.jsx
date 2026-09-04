export default function UserCard({ user }) {
  return (
    <li className="todo-item">
      <div className="todo-left">
        <div className="todo-text">
          <strong>{user.name}</strong>
          <p>{user.email}</p>
          <p>@{user.username}</p>
        </div>
      </div>

      <div className="todo-meta">
        <span className="badge medium">#{user.id}</span>
      </div>
    </li>
  );
}
