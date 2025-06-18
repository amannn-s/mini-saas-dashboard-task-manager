import {
  IconCalendar,
  IconClipboardText,
  IconPencil,
} from "@tabler/icons-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { getTasks } from "@/lib/api";

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in progress" | "done";
};

export function SectionCards() {
  const [tasks, setTasks] = useState<Task[] | []>([]);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data.slice(0, 3));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
      {/* Summary Card */}
      <Card className="@container/card rounded-3xl shadow-none bg-gradient-to-r from-gray-50 border-gray-200">
        <CardHeader>
          <CardDescription>Total Tasks</CardDescription>
          <CardTitle className="text-3xl font-semibold">
            {tasks.length}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconClipboardText className="mr-1" /> Overview
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium">
            {tasks.filter((t) => t.status === "done").length} Completed
          </div>
          <div className="text-muted-foreground">
            {tasks.filter((t) => t.status !== "done").length} Remaining
          </div>
        </CardFooter>
      </Card>

      {/* Map over tasks */}
      {tasks.map((task) => (
        <Card
          key={task.id}
          className={`@container/card rounded-3xl shadow-none bg-gradient-to-r ${
            task.status === "todo"
              ? "from-red-50 border-red-100"
              : task.status === "in progress"
              ? "from-blue-50 border-blue-100"
              : "from-green-50 border-green-100"
          }`}
        >
          <CardHeader>
            <CardDescription
              className={`capitalize bg-black w-max px-2 py-0.5 text-white rounded ${
                task.status === "todo"
                  ? "bg-red-500"
                  : task.status === "in progress"
                  ? "bg-blue-500"
                  : "bg-green-600"
              }`}
            >
              {task.status}
            </CardDescription>
            <CardTitle
              className={`text-xl font-medium line-clamp-1 ${
                task.status === "done" ? "line-through text-neutral-600" : ""
              }`}
            >
              {task.title}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconCalendar className="mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-2">{task.description}</div>
            <div className="mt-2">
              <Dialog>
                <DialogTrigger className="cursor-pointer">
                  <IconPencil className="w-4 h-4 text-blue-500" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Want to edit your task?</DialogTitle>
                    <DialogDescription>
                      You can update your task title and description
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <form className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label>Task Title</Label>
                        <Input type="text" value={task.title} />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label>Task Description</Label>
                        <Input type="text" value={task.description} />
                      </div>
                      <div className="col-span-1 space-y-2">
                        <Label>Task Status</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Todo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Todo">Todo</SelectItem>
                            <SelectItem value="In Progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 col-span-1">
                        <Label>Due Date</Label>
                        <Input type="date" value={task.dueDate} />
                      </div>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
