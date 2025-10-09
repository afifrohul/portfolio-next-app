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
import axios from "axios";
import LoaderButton from "@/components/loader-button";

export default function Skill() {
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    async function fetchSkill() {
      try {
        const res = await axios.get("/internal/skills");
        setSkill(res.data);
      } catch (err) {
        if (err.response) {
          console.error(
            "Server error:",
            err.response.status,
            err.response.data
          );
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error setting up request:", err.message);
        }
      }
    }

    fetchSkill();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let res;
      if (mode === "create") {
        res = await axios.post("/internal/skills", formData);
      } else {
        res = await axios.put(`/internal/skills/${formData.id}`, formData);
      }

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to save data.");
      }

      const updated = res.data.data;

      if (mode === "create") {
        setSkill([...skill, updated]);
      } else {
        setSkill(
          skill.map((item) => (item.id === updated.id ? updated : item))
        );
      }

      toast.success(res.data.message || "Data saved successfully");
      setOpen(false);
      setFormData({ id: null, name: "" });
    } catch (err) {
      toast.error(err.message || "An error occurred while saving data");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/internal/skills/${id}`);

      setSkill((prev) => prev.filter((item) => item.id !== id));
      toast.success(res.data.message || "Data deleted successfully");
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "An error occurred while deleting data";
      toast.error(message);
      console.error(message);
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
            {!loading ? (
              <Button onClick={handleSubmit}>
                {mode === "create" ? "Create" : "Save Changes"}
              </Button>
            ) : (
              <LoaderButton />
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
