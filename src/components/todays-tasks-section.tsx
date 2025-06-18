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
import { getTasks, updateTask } from "@/lib/api";
import { toast } from "sonner";

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
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                      You can update the task details
                    </DialogDescription>
                  </DialogHeader>

                  <EditTaskForm task={task} onSuccess={fetchTasks} />
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function EditTaskForm({
  task,
  onSuccess,
}: {
  task: Task;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(task.priority);

  const handleUpdate = async () => {
    try {
      await updateTask(task.id, {
        title,
        description,
        status,
        dueDate,
        priority,
      });

      toast("Task Updated!");

      onSuccess(); // Refetch tasks
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  return (
    <form className="grid grid-cols-3 gap-4">
      <div className="col-span-3 space-y-2">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="col-span-3 space-y-2">
        <Label>Description</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="col-span-1 space-y-2">
        <Label>Status</Label>
        <Select
          value={status}
          onValueChange={(value) => setStatus(value as Task["status"])}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">Todo</SelectItem>
            <SelectItem value="in progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-1 space-y-2">
        <Label>Priority</Label>
        <Select
          value={priority}
          onValueChange={(value) => setPriority(value as Task["priority"])}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-1 space-y-2">
        <Label>Due Date</Label>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="col-span-2 mt-2">
        <button
          type="button"
          onClick={handleUpdate}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Update Task
        </button>
      </div>
    </form>
  );
}
