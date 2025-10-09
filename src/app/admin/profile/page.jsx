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
import ConfirmButton from "@/components/confirm-button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LoaderButton from "@/components/loader-button";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [formData, setFormData] = useState({ id: null, src: "" });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get("/internal/profiles");
        setProfile(res.data);
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

    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      if (formData.src instanceof File) {
        form.append("file", formData.src);
      }

      let res;
      if (mode === "create") {
        res = await axios.post("/internal/profiles", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.put(`/internal/profiles/${formData.id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (!res.data.success) throw new Error(res.data.message);

      const updated = res.data.data;
      if (mode === "create") {
        setProfile([...profile, updated]);
      } else {
        setProfile(profile.map((p) => (p.id === updated.id ? updated : p)));
      }

      toast.success(res.data.message);
      setOpen(false);
      setFormData({ id: null, src: "" });
    } catch (err) {
      toast.error(err.message || "Failed to save profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/internal/profiles/${id}`);

      setProfile((prev) => prev.filter((item) => item.id !== id));
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
      accessorKey: "src",
      header: "Image",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Image
            src={row.original.src}
            alt="Profile"
            className="object-cover rounded-full"
            width={64}
            height={64}
          />
        </div>
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
            title="Delete this profile?"
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
      <SiteHeader name="Profile" />
      <div className="p-4">
        <div className="border rounded-lg p-4">
          <DataTable
            columns={columns}
            data={profile}
            createButton={
              <Button
                variant="outline"
                onClick={() => {
                  setMode("create");
                  setFormData({ id: null, src: "" });
                  setOpen(true);
                }}
              >
                <FaPlusCircle className="mr-2" /> Create New Profile
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
              {mode === "create" ? "Create Profile" : "Edit Profile"}
            </DialogTitle>
            <DialogDescription>
              {mode === "create"
                ? "Create a new profile entry."
                : "Edit the existing profile entry."}
            </DialogDescription>
          </DialogHeader>

          <Separator />

          <div className="space-y-4">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="picture">Image</Label>
              <Input
                id="picture"
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, src: e.target.files[0] })
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
