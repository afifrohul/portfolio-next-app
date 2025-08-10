"use client";

import ConfirmButton from "@/components/confirm-button";
import DataTable from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import MultiSelect from "@/components/multi-select";

export default function Project() {
  const [project, setProject] = useState([]);
  const [skill, setSkill] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    desc: "",
    project_skills: [],
  });

  useEffect(() => {
    fetch("/internal/projects")
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((err) => console.error(err));

    fetch("/internal/skills")
      .then((res) => res.json())
      .then((skill) => setSkill(skill))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async () => {
    try {
      let res;
      if (mode === "create") {
        res = await fetch("/internal/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch(`/internal/projects/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save data.");
      }

      const updated = await res.json();

      if (mode === "create") {
        setProject([...project, updated]);
      } else {
        setProject(
          project.map((item) => (item.id === updated.id ? updated : item))
        );
      }

      toast.success(updated.message || "Data saved successfully");
      setOpen(false);
      setFormData({
        id: null,
        title: "",
        desc: "",
      });
    } catch (err) {
      toast.error(err.message || "An error occurred while saving data");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/internal/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save data.");
      }

      setProject((prev) => prev.filter((item) => item.id !== id));
      toast.success("Data deleted successfully");
    } catch (err) {
      toast.error(err.message || "An error occurred while deleting data");
      console.error(err);
    }
  };

  const columns = [
    {
      id: "index",
      header: "#",
      cell: ({ row, table }) =>
        row.index +
        1 +
        table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "desc",
      header: "Description",
      cell: (info) =>
        info.getValue()?.length > 75 ? (
          <>{info.getValue()?.substring(0, 75)}...</>
        ) : (
          info.getValue()
        ),
    },
    {
      accessorKey: "project_skills",
      header: "Skills",
      cell: (info) => {
        const projectSkills = info.getValue();
        if (!projectSkills || projectSkills.length === 0) return "-";

        const skillNames = projectSkills
          .map((ps) => (ps.skill ? ps.skill.name : ps.name || ""))
          .filter(Boolean);

        return skillNames.join(", ");
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setMode("edit");
              setFormData({
                ...row.original,
                project_skills: row.original.project_skills.map((ps) =>
                  ps.skill ? ps.skill.id : ps.id
                ),
              });
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <ConfirmButton
            title="Delete this project?"
            description="This action cannot be undone. Are you sure you want to delete this?"
            onConfirm={() => handleDelete(row.original.id)}
          >
            Delete
          </ConfirmButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <SiteHeader name="Project" />
      <div className="p-4">
        <div className="border rounded-lg p-4">
          <DataTable
            columns={columns}
            data={project}
            createButton={
              <Button
                variant="outline"
                onClick={() => {
                  setMode("create");
                  setFormData({
                    id: null,
                    title: "",
                    desc: "",
                  });
                  setOpen(true);
                }}
              >
                <FaPlusCircle className="mr-2" /> Create New Project
              </Button>
            }
          />
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={""}>
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Create Project" : "Edit Project"}
            </DialogTitle>
            <DialogDescription>
              {mode === "create"
                ? "Create a new project entry."
                : "Edit the existing project entry."}
            </DialogDescription>
          </DialogHeader>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                placeholder="Enter title name"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 w-full">
              <Label>Description</Label>
              <Textarea
                placeholder="Description"
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 w-full">
              <Label>Skill</Label>
              <MultiSelect
                items={skill}
                selected={formData.project_skills}
                onChange={(value) =>
                  setFormData({ ...formData, project_skills: value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {mode === "create" ? "Create" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
