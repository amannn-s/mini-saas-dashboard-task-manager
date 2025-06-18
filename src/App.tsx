import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/todays-tasks-section";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TasksTable from "./components/data-table";
import { useEffect, useState } from "react";
import { getTasks } from "./lib/api";
import { Toaster } from "@/components/ui/sonner";

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in progress" | "done";
};

export default function Page() {
  const data = {
    user: {
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      avatar:
        "https://images.pexels.com/photos/3760376/pexels-photo-3760376.jpeg",
    },
  };

  const [tasks, setTasks] = useState<Task[] | []>([]);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  console.log(tasks);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader user={data.user} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h2 className="text-4xl font-bold">Your todays tasks</h2>
              </div>
              <SectionCards />
              <div className="px-4 lg:px-6">
                <h2 className="text-4xl font-bold">All tasks</h2>
              </div>
              <TasksTable />
            </div>
          </div>
        </div>
        <Toaster position="top-center" />
      </SidebarInset>
    </SidebarProvider>
  );
}
