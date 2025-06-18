"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTasks, deleteTask } from "@/lib/api";

// const data: Task[] = [
//   {
//     id: "task-1",
//     title: "Build login form",
//     description: "Implement UI and validation for login",
//     dueDate: "2025-06-19",
//     priority: "high",
//     status: "in progress",
//   },
//   {
//     id: "task-2",
//     title: "Write unit tests",
//     description: "Cover all major functions with unit tests",
//     dueDate: "2025-06-20",
//     priority: "medium",
//     status: "todo",
//   },
//   {
//     id: "task-3",
//     title: "Fix dark mode toggle",
//     description: "Bug in theme switching logic",
//     dueDate: "2025-06-18",
//     priority: "low",
//     status: "done",
//   },
//   {
//     id: "task-4",
//     title: "Design homepage",
//     description: "Create hero section and call-to-action buttons",
//     dueDate: "2025-06-22",
//     priority: "high",
//     status: "todo",
//   },
//   {
//     id: "task-5",
//     title: "Optimize images",
//     description: "Reduce image size without quality loss",
//     dueDate: "2025-06-21",
//     priority: "medium",
//     status: "in progress",
//   },
//   {
//     id: "task-6",
//     title: "Integrate Stripe API",
//     description: "Enable payment processing using Stripe",
//     dueDate: "2025-06-25",
//     priority: "high",
//     status: "todo",
//   },
//   {
//     id: "task-7",
//     title: "Add user avatars",
//     description: "Show profile picture in navbar and dashboard",
//     dueDate: "2025-06-19",
//     priority: "low",
//     status: "done",
//   },
//   {
//     id: "task-8",
//     title: "Fix mobile navbar",
//     description: "Menu not collapsing properly on smaller screens",
//     dueDate: "2025-06-20",
//     priority: "medium",
//     status: "in progress",
//   },
//   {
//     id: "task-9",
//     title: "Setup MongoDB backups",
//     description: "Automate daily backups with cron",
//     dueDate: "2025-06-28",
//     priority: "high",
//     status: "todo",
//   },
//   {
//     id: "task-10",
//     title: "Audit accessibility",
//     description: "Run accessibility checks using Lighthouse",
//     dueDate: "2025-06-23",
//     priority: "medium",
//     status: "in progress",
//   },
//   {
//     id: "task-11",
//     title: "Setup CI/CD pipeline",
//     description: "Automate deployment using GitHub Actions",
//     dueDate: "2025-06-24",
//     priority: "high",
//     status: "todo",
//   },
//   {
//     id: "task-12",
//     title: "Add forgot password",
//     description: "Implement password reset with email OTP",
//     dueDate: "2025-06-26",
//     priority: "medium",
//     status: "in progress",
//   },
//   {
//     id: "task-13",
//     title: "Enable dark/light toggle",
//     description: "Allow users to switch themes from settings",
//     dueDate: "2025-06-27",
//     priority: "low",
//     status: "done",
//   },
//   {
//     id: "task-14",
//     title: "Deploy to Vercel",
//     description: "Final push to production environment",
//     dueDate: "2025-06-29",
//     priority: "high",
//     status: "todo",
//   },
//   {
//     id: "task-15",
//     title: "Update README",
//     description: "Add setup instructions and project overview",
//     dueDate: "2025-06-21",
//     priority: "low",
//     status: "done",
//   },
// ];

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in progress" | "done";
};

export default function TasksTable() {
  const [data, setData] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();

        setData(tasks.data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const value = row.getValue("priority");
        return (
          <span
            className={`capitalize px-2 py-1 rounded-full text-xs font-semibold ${
              value === "high"
                ? "bg-red-100 text-red-700"
                : value === "medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => {
        const value = row.getValue("dueDate");
        return <span>{new Date(value).toLocaleDateString()}</span>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const task = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(task.id)}
              >
                Copy Task ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(task.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setData((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading tasks...</div>;
  }

  return (
    <div className="w-full px-4 lg:px-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-base font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
