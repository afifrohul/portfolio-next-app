"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import DataTable from "@/components/data-table";
import { FaPlusCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import ConfirmButton from "@/components/confirm-button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function About() {
  const [about, setAbout] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [formData, setFormData] = useState({ id: null, desc: "" });

  useEffect(() => {
    fetch("/internal/abouts")
      .then((res) => res.json())
      .then((data) => setAbout(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async () => {
    try {
      let res;
      if (mode === "create") {
        res = await fetch("/internal/abouts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch(`/internal/abouts/${formData.id}`, {
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
        setAbout([...about, updated]);
      } else {
        setAbout(
          about.map((item) => (item.id === updated.id ? updated : item))
        );
      }

      toast.success(updated.message || "Data saved successfully");
      setOpen(false);
      setFormData({ id: null, desc: "" });
    } catch (err) {
      toast.error(err.message || "An error occurred while saving data");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/internal/abouts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save data.");
      }

      setAbout((prev) => prev.filter((item) => item.id !== id));
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
            title="Delete this about?"
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
      <SiteHeader name="About" />
      <div className="p-4">
        <div className="border rounded-lg p-4">
          <DataTable
            columns={columns}
            data={about}
            createButton={
              <Button
                variant="outline"
                onClick={() => {
                  setMode("create");
                  setFormData({ id: null, desc: "" });
                  setOpen(true);
                }}
              >
                <FaPlusCircle className="mr-2" /> Create New About
              </Button>
            }
          />
        </div>
      </div>

      {/* Modal Create/Edit */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Create About" : "Edit About"}
            </DialogTitle>
            <DialogDescription>
              {mode === "create"
                ? "Create a new about entry."
                : "Edit the existing about entry."}
            </DialogDescription>
          </DialogHeader>

          <Separator />

          <div className="space-y-4">
            <Textarea
              placeholder="Description"
              value={formData.desc}
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
            />
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
