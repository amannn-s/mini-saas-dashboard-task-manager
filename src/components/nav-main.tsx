"use client";

import { useState } from "react";
import { IconCirclePlus, type Icon } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DialogClose } from "@radix-ui/react-dialog";
import { createTask } from "@/lib/api"; // <-- Your Axios API function

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"todo" | "in progress" | "done">("todo");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [dueDate, setDueDate] = useState("");

  const handleCreateTask = async () => {
    if (!title || !dueDate) return toast("Title and Due Date are required");

    const newTask = {
      title,
      description,
      status,
      dueDate,
      priority,
    };

    try {
      await createTask(newTask);
      setTitle("");
      setDescription("");
      setStatus("todo");
      setDueDate("");
      toast("Yay! Task Created!");
    } catch (err) {
      console.error(err);
      toast("Oops! Error Creating Task!");
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Dialog>
              <DialogTrigger asChild className="cursor-pointer">
                <SidebarMenuButton tooltip="Quick Create">
                  <IconCirclePlus />
                  <span>Quick Create</span>
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create new task</DialogTitle>
                  <DialogDescription>
                    You can create new task with title and description
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <form className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label>Task Title</Label>
                      <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="col-span-1 space-y-2">
                      <Label>Task Priority</Label>
                      <Select
                        value={priority}
                        onValueChange={(value: "low" | "medium" | "high") =>
                          setPriority(value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 col-span-3">
                      <Label>Task Description</Label>
                      <Input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="col-span-2 space-y-2">
                      <Label>Task Status</Label>
                      <Select
                        value={status}
                        onValueChange={(
                          value: "todo" | "in progress" | "done"
                        ) => setStatus(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Todo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">Todo</SelectItem>
                          <SelectItem value="in progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 col-span-1">
                      <Label>Due Date</Label>
                      <Input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" onClick={handleCreateTask}>
                      Create
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>

          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
