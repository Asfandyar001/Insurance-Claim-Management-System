import { useState, useEffect } from "react";
import { useToast } from "../hooks/use-toast";
import axios from "axios";

export default function AddTimestamps({ open, onClose, id, onAdd, editData }) {
    const [hours, setHours] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    // Pre-fill if editing
    useEffect(() => {
        if (editData) {
            setHours(editData.hours?.toString() || "");
            setDescription(editData.description || "");
        } else {
            setHours("");
            setDescription("");
        }
    }, [editData, open]);

    const handleSave = async () => {
        if (!hours) {
            toast({ title: "Please enter time worked (hours)", variant: "destructive" });
            return;
        }

        try {
            setLoading(true);
            if (editData) {
                // ✅ PUT request (edit)
                await axios.put(
                    `http://localhost:5000/api/claims/${id}/timeline/${editData._id}`,
                    { hours: parseFloat(hours), description },
                    { withCredentials: true }
                );
                toast({ title: "Timestamp Updated!", variant: "success" });
            } else {
                // ✅ POST request (add)
                await axios.post(
                    `http://localhost:5000/api/claims/${id}/timeline`,
                    { hours: parseFloat(hours), description },
                    { withCredentials: true }
                );
                toast({ title: "Timestamp Added!", variant: "success" });
            }

            onClose();
            if (onAdd) onAdd();
        } catch (err) {
            toast({
                title: `Failed to ${editData ? "update" : "add"} timestamp`,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-200 ${open ? "visible bg-black/50" : "invisible"
                }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative bg-white rounded-xl shadow p-6 w-md h-100 flex flex-col gap-2.5 transition-all duration-200 dark:bg-slate-950 dark:border dark:border-gray-600 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    disabled={loading}
                    className="absolute top-2 right-4 p-1 rounded-lg text-gray-400 hover:text-black cursor-pointer dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="flex flex-row justify-start items-center gap-2 font-medium text-lg dark:text-white">
                    <h2>{editData ? "Edit Timestamp" : "Add Timestamp"}</h2>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 gap-5 mt-2">
                    <div className="flex flex-col justify-center items-start gap-1">
                        <p className="text-sm font-medium dark:text-white">
                            Time Worked (hours) *
                        </p>
                        <input
                            type="number"
                            placeholder="e.g 2.5"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            disabled={loading}
                            className="border rounded-md border-gray-300 w-full px-3 py-2 text-sm dark:text-white"
                        />
                    </div>

                    <div className="flex flex-col justify-center items-start gap-1">
                        <p className="text-sm font-medium dark:text-white">
                            Activity Description
                        </p>
                        <textarea
                            placeholder="Describe the work performed..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={loading}
                            className="border rounded-md border-gray-300 w-full h-39 px-3 py-2 text-sm dark:text-white"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="text-sm font-medium flex flex-row justify-end items-center gap-2">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-md py-2 px-3 cursor-pointer bg-white border border-gray-400/30 hover:bg-gray-200 dark:bg-slate-950 dark:hover:bg-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-black text-white rounded-md py-2 px-3 dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? editData
                                ? "Updating..."
                                : "Adding..."
                            : editData
                                ? "Update Timestamp"
                                : "Add Timestamp"}
                    </button>
                </div>
            </div>
        </div>
    );
}