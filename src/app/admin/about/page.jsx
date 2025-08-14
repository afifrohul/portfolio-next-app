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
import axios from "axios";

export default function About() {
  const [about, setAbout] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [formData, setFormData] = useState({ id: null, desc: "" });

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await axios.get("/internal/abouts");
        setAbout(res.data);
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

    fetchAbout();
  }, []);

  const handleSubmit = async () => {
    try {
      let res;
      if (mode === "create") {
        res = await axios.post("/internal/abouts", formData);
      } else {
        res = await axios.put(`/internal/abouts/${formData.id}`, formData);
      }

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to save data.");
      }

      const updated = res.data.data;

      if (mode === "create") {
        setAbout([...about, updated]);
      } else {
        setAbout(
          about.map((item) => (item.id === updated.id ? updated : item))
        );
      }

      toast.success(res.data.message || "Data saved successfully");
      setOpen(false);
      setFormData({ id: null, desc: "" });
    } catch (err) {
      toast.error(err.message || "An error occurred while saving data");
      console.error("Submit error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/internal/abouts/${id}`);

      setAbout((prev) => prev.filter((item) => item.id !== id));
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
