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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function Skill() {
  const [skill, setSkill] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    fetch("/internal/skills")
      .then((res) => res.json())
      .then((data) => setSkill(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async () => {
    try {
      let res;
      if (mode === "create") {
        res = await fetch("/internal/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch(`/internal/skills/${formData.id}`, {
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
        setSkill([...skill, updated]);
      } else {
        setSkill(
          skill.map((item) => (item.id === updated.id ? updated : item))
        );
      }

      toast.success(updated.message || "Data saved successfully");
      setOpen(false);
      setFormData({
        id: null,
        name: "",
      });
    } catch (err) {
      toast.error(err.message || "An error occurred while saving data");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/internal/skills/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save data.");
      }

      setSkill((prev) => prev.filter((item) => item.id !== id));
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
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
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
              setFormData(row.original);
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <ConfirmButton
            title="Delete this skill?"
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
      <SiteHeader name="Skill" />
      <div className="p-4">
        <div className="border rounded-lg p-4">
          <DataTable
            columns={columns}
            data={skill}
            createButton={
              <Button
                variant="outline"
                onClick={() => {
                  setMode("create");
                  setFormData({
                    id: null,
                    name: "",
                  });
                  setOpen(true);
                }}
              >
                <FaPlusCircle className="mr-2" /> Create New Skill
              </Button>
            }
          />
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={""}>
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Create Skill" : "Edit Skill"}
            </DialogTitle>
            <DialogDescription>
              {mode === "create"
                ? "Create a new skill entry."
                : "Edit the existing skill entry."}
            </DialogDescription>
          </DialogHeader>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                placeholder="Enter name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
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
