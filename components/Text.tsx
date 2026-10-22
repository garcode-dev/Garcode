import { isTodo, type Copy } from "@/content/site";

// Renders a piece of copy. If Garcode hasn't supplied it yet (todo(...) in content/site.ts),
// shows a dashed "To confirm" box instead, so missing content is obvious before launch.
export default function Text({ value }: { value: Copy }) {
  if (isTodo(value)) {
    return (
      <span className="todo">
        <span className="todo-tag">To confirm</span>
        {value.todo}
      </span>
    );
  }
  return <>{value}</>;
}
