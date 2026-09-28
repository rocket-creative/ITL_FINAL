/**
 * |UXUIDC| Accessible data table
 *
 * Every table in the cohort/breeding cluster renders through this component so
 * the accessibility contract holds in one place:
 *   - visible <caption> describing the table
 *   - <th scope="col"> headers, optional <th scope="row"> first column
 *   - no merged cells
 *   - keyboard-reachable scroll region with an accessible name, so the
 *     horizontal scroll is operable without a pointer
 *   - stacks into per-row blocks under 640px, no horizontal scroll at 320px
 *
 * Styles live in globals.css under "Accessible data table".
 */

import type { ReactNode } from 'react';

export interface DataTableColumn {
  /** Key into each row object */
  key: string;
  /** Visible column header */
  header: string;
  /**
   * Render this column as a row header (`<th scope="row">`). Set on the
   * left-most identifying column.
   */
  rowHeader?: boolean;
}

export type DataTableRow = Record<string, ReactNode>;

export interface DataTableProps {
  /** Visible caption. Required, it is the table's accessible name. */
  caption: string;
  columns: DataTableColumn[];
  rows: DataTableRow[];
  /** Footnote rendered under the table, e.g. assumptions behind the numbers */
  note?: ReactNode;
  className?: string;
}

export function UXUIDCDataTable({
  caption,
  columns,
  rows,
  note,
  className = '',
}: DataTableProps) {
  return (
    <div className={className}>
      <div
        className="data-table-scroll"
        role="region"
        // Named after the caption rather than "scrollable table": under 640px
        // the rows stack and this region no longer scrolls.
        aria-label={caption}
        tabIndex={0}
      >
        <table className="data-table">
          <caption>{caption}</caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) =>
                  column.rowHeader ? (
                    <th key={column.key} scope="row">
                      {row[column.key]}
                    </th>
                  ) : (
                    <td key={column.key} data-label={column.header}>
                      {row[column.key]}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="data-table-note">{note}</p> : null}
    </div>
  );
}

export default UXUIDCDataTable;
