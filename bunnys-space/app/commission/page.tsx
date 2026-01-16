"use client";

import React, { useEffect, useRef, useState } from "react";
import { PinkInput } from "../components/PinkInput/PinkInput";
import "./commission.css"
type FileField =
  | "refImageOne"
  | "refImageTwo"
  | "refImageThree"
  | "poseImageOne"
  | "poseImageTwo"
  | "extraImage";

const FILE_FIELDS: { key: FileField; label: string; required?: boolean }[] = [
  { key: "refImageOne", label: "Reference Image 1 (required)*", required: true },
  { key: "refImageTwo", label: "Reference Image 2 (optional)" },
  { key: "refImageThree", label: "Reference Image 3 (optional)" },
  { key: "poseImageOne", label: "Pose Image 1 (optional)" },
  { key: "poseImageTwo", label: "Pose Image 2 (optional)" },
  { key: "extraImage", label: "Extra Image (optional)" },
];

export default function Apply() {
  const [email, setEmail] = useState("");
  const [OC, setOC] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [previews, setPreviews] = useState<Record<FileField, string | undefined>>({
    refImageOne: undefined,
    refImageTwo: undefined,
    refImageThree: undefined,
    poseImageOne: undefined,
    poseImageTwo: undefined,
    extraImage: undefined,
  });

  const fileRefs = useRef<Record<FileField, HTMLInputElement | null>>({
    refImageOne: null,
    refImageTwo: null,
    refImageThree: null,
    poseImageOne: null,
    poseImageTwo: null,
    extraImage: null,
  });

  const handleFileChange =
    (field: FileField) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      setPreviews((prev) => {
        if (prev[field]) URL.revokeObjectURL(prev[field]!);
        return { ...prev, [field]: file ? URL.createObjectURL(file) : undefined };
      });
    };

  useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredRef = fileRefs.current.refImageOne;
    if (!requiredRef?.files?.[0]) {
      alert("Please select Reference Image 1 (required).");
      return;
    }

    const fd = new FormData();
    fd.set("email", email);
    fd.set("commissionOC", OC);
    fd.set("commissionText", description);

    for (const { key } of FILE_FIELDS) {
      const f = fileRefs.current[key]?.files?.[0];
      if (f) fd.append(key, f);
    }

    try {
      setSubmitting(true);
      const res = await fetch("/commissions", { method: "POST", body: fd });
      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await res.json() : await res.text();
      if (!res.ok) throw new Error((data as any)?.error || String(data) || "Upload failed");

      alert("Commission submitted!");

      setEmail("");
      setOC("");
      setDescription("");

      FILE_FIELDS.forEach(({ key }) => {
        const ref = fileRefs.current[key];
        if (ref) ref.value = "";
      });

      setPreviews({
        refImageOne: undefined,
        refImageTwo: undefined,
        refImageThree: undefined,
        poseImageOne: undefined,
        poseImageTwo: undefined,
        extraImage: undefined,
      });
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // If you’re using Tailwind dark mode via `class="dark"` on <html>,
  // you can drop the `isDarkMode ? ... : ...` parts and just use `dark:*`.
  const panelText = "text-zinc-900";
  const panelSubtle = "text-zinc-600";
  const textareaClass = [
    "w-full rounded-xl px-4 py-3",
    "border outline-none transition",
    "min-h-[150px]",
    "bg-white border-zinc-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-zinc-900 placeholder:text-zinc-400",
  ].join(" ");

  const fileLabelClass = [
    "inline-flex items-center justify-center",
    "rounded-[10px] px-3 py-2",
    "border cursor-pointer select-none",
    "transition active:scale-[0.99]",
    "border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-900",
  ].join(" ");

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="mb-[120px] flex flex-col items-center gap-4"
    >
      {/* Email */}
      <div className="flex w-[min(600px,90%)] flex-col items-center gap-2">
        <p className={`text-lg font-medium ${panelText}`}>How should we contact you?!</p>
        <div className="flex">
          <PinkInput
            state={false}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <p className={`text-xs ${panelSubtle}`}>Use an email you check regularly.</p>
      </div>

      {/* OC */}
      <div className="flex w-[min(600px,90%)] flex-col items-center gap-2">
        <p className={`text-lg font-medium ${panelText}`}>Who is the OC?!</p>
        <div className="flex">
          <PinkInput
            state={false}
            value={OC}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOC(e.target.value)}
            placeholder="Who are we drawing?!"
          />
        </div>
      </div>

      {/* Description */}
      <div className="col-3 w-full">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What do you think?!"
          className="login__textarea"
        />
        <span className="focus-border">
          <i></i>
        </span>
      </div>

      {/* File inputs + previews */}
      {FILE_FIELDS.map(({ key, label, required }) => (
        <div
          key={key}
          className="flex w-[min(800px,90%)] flex-col items-center gap-2"
        >
          <label className={fileLabelClass}>
            <span className="text-sm font-medium">{label}</span>
            <input
              type="file"
              required={!!required}
              className="hidden"
              ref={(el) => {
                fileRefs.current[key] = el;
              }}
              onChange={handleFileChange(key)}
            />
          </label>

          {previews[key] && (
            // If you want Next/Image instead, just swap this <img> to <Image ... />
            <img
              src={previews[key]}
              width={400}
              height={400}
              alt={key}
              className="h-[400px] w-[400px] rounded-lg object-cover"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={submitting}
        className={[
          "mt-2 inline-flex items-center justify-center",
          "rounded-xl px-5 py-2.5 text-sm font-semibold",
          "transition disabled:cursor-not-allowed disabled:opacity-60",
          "bg-pink-600 text-white hover:bg-pink-700",
        ].join(" ")}
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
