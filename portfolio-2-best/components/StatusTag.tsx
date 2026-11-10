import type { ProjectStatus } from "@/lib/projects";
import { cx } from "@/lib/utils";

export function StatusTag({ status }: { status: ProjectStatus }) {
  const cls = status.toLowerCase().replace(/\s+/g, "-");
  return (
    <span className={cx("status-tag", `status-${cls}`)}>
      <span className="status-dot" aria-hidden="true" />
      {status}
    </span>
  );
}

export function DocBadge() {
  return <span className="doc-badge">Documentation Needed</span>;
}