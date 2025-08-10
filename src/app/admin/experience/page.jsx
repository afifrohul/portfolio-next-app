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
import { Textarea } from "@/components/ui/textarea";

export default function Experience() {
  const [experience, setExperience] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [formData, setFormData] = useState({
    id: null,
    company: "",
    role: "",
    start_month: "",
    start_year: "",
    end_month: "",
    end_year: "",
    desc: "",
  });

  useEffect(() => {
    fetch("/internal/experiences")
      .then((res) => res.json())
      .then((data) => setExperience(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async () => {
    try {
      let res;
      if (mode === "create") {
        res = await fetch("/internal/experiences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch(`/internal/experiences/${formData.id}`, {
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
        setExperience([...experience, updated]);
      } else {
        setExperience(
          experience.map((item) => (item.id === updated.id ? updated : item))
        );
      }

      toast.success(updated.message || "Data saved successfully");
      setOpen(false);
      setFormData({
        id: null,
        company: "",
        role: "",
        start_month: "",
        start_year: "",
        end_month: "",
        end_year: "",
        desc: "",
      });
    } catch (err) {
      toast.error(err.message || "An error occurred while saving data");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/internal/experiences/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save data.");
      }

      setExperience((prev) => prev.filter((item) => item.id !== id));
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
      accessorKey: "company",
      header: "Company",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "start_month",
      header: "Start Month",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "start_year",
      header: "Start Year",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "end_month",
      header: "End Month",
      cell: (info) => (info.getValue() ? info.getValue() : "-"),
    },
    {
      accessorKey: "end_year",
      header: "End Year",
      cell: (info) => (info.getValue() ? info.getValue() : "-"),
    },
    {
      accessorKey: "desc",
      header: "Desc",
      cell: (info) =>
        info.getValue()?.length > 20 ? (
          <>{info.getValue()?.substring(0, 20)}...</>
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
            title="Delete this experience?"
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
      <SiteHeader name="Experience" />
      <div className="p-4">
        <div className="border rounded-lg p-4">
          <DataTable
            columns={columns}
            data={experience}
            createButton={
              <Button
                variant="outline"
                onClick={() => {
                  setMode("create");
                  setFormData({
                    id: null,
                    company: "",
                    role: "",
                    start_month: "",
                    start_year: "",
                    end_month: "",
                    end_year: "",
                    desc: "",
                  });
                  setOpen(true);
                }}
              >
                <FaPlusCircle className="mr-2" /> Create New Experience
              </Button>
            }
          />
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={""}>
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Create Experience" : "Edit Experience"}
            </DialogTitle>
            <DialogDescription>
              {mode === "create"
                ? "Create a new experience entry."
                : "Edit the existing experience entry."}
            </DialogDescription>
          </DialogHeader>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                value={formData.company}
                placeholder="Enter company name"
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input
                value={formData.role}
                placeholder="Enter role"
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="space-y-2 w-full">
                <Label>Start Month</Label>
                <Select
                  value={formData.start_month}
                  onValueChange={(value) =>
                    setFormData({ ...formData, start_month: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Months</SelectLabel>
                      <SelectItem value="Jan">Jan</SelectItem>
                      <SelectItem value="Feb">Feb</SelectItem>
                      <SelectItem value="Mar">Mar</SelectItem>
                      <SelectItem value="Apr">Apr</SelectItem>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="Jun">Jun</SelectItem>
                      <SelectItem value="Jul">Jul</SelectItem>
                      <SelectItem value="Aug">Aug</SelectItem>
                      <SelectItem value="Sep">Sep</SelectItem>
                      <SelectItem value="Oct">Oct</SelectItem>
                      <SelectItem value="Nov">Nov</SelectItem>
                      <SelectItem value="Dec">Dec</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-full">
                <Label>Start Year</Label>
                <Input
                  type="number"
                  placeholder="Enter start year"
                  value={formData.start_year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      start_year: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="space-y-2 w-full">
                <Label>End Month</Label>
                <Select
                  value={formData.end_month || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, end_month: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Months</SelectLabel>
                      <SelectItem value="Jan">Jan</SelectItem>
                      <SelectItem value="Feb">Feb</SelectItem>
                      <SelectItem value="Mar">Mar</SelectItem>
                      <SelectItem value="Apr">Apr</SelectItem>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="Jun">Jun</SelectItem>
                      <SelectItem value="Jul">Jul</SelectItem>
                      <SelectItem value="Aug">Aug</SelectItem>
                      <SelectItem value="Sep">Sep</SelectItem>
                      <SelectItem value="Oct">Oct</SelectItem>
                      <SelectItem value="Nov">Nov</SelectItem>
                      <SelectItem value="Dec">Dec</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-full">
                <Label>End Year</Label>
                <Input
                  type="number"
                  placeholder="Enter end year"
                  value={formData.end_year || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      end_year: Number(e.target.value),
                    })
                  }
                />
              </div>
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
