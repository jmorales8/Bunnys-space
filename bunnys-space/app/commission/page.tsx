"use client";

import React, { useEffect, useRef, useState, useContext } from "react";
import { Forminit } from "forminit";
import { PinkInput } from "../components/PinkInput/PinkInput";
import "./commission.css";
import LiquidButton from "../components/LiquidButton/LiquidButton"; // adjust import
import { ThemeContext } from "../context/ThemeContext"; // if you already use it

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
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.isDarkMode ?? false;

  const [email, setEmail] = useState("");
  const [OC, setOC] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

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

  // Forminit client instance (proxyUrl matches your API route)
  const forminit = new Forminit({ proxyUrl: "/api/forminit" });

  const handleFileChange =
    (field: FileField) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      setPreviews((prev) => {
        if (prev[field]) URL.revokeObjectURL(prev[field]!);
        return { ...prev, [field]: file ? URL.createObjectURL(file) : undefined };
      });
    };

  const clearImage = (field: FileField) => {
    const ref = fileRefs.current[field];
    if (ref) ref.value = "";

    setPreviews((prev) => {
      const url = prev[field];
      if (url) URL.revokeObjectURL(url);
      return { ...prev, [field]: undefined };
    });
  };

  useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [previews]);

  const isRefMissing = !previews.refImageOne;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Keep your required image guard (nice UX)
    const requiredRef = fileRefs.current.refImageOne;
    if (!requiredRef?.files?.[0]) {
      alert("Please select Reference Image 1 (required).");
      return;
    }

    try {
      setStatus("loading");
      setError(null);

      // Build FormData with Forminit's "fi-" keys (NO UI changes required)
      const fd = new FormData();

      // Sender block (at least email)
      fd.set("fi-sender-email", email);

      // Text blocks (you can name them whatever you want after fi-text-)
      fd.set("fi-text-oc", OC);
      fd.set("fi-text-description", description);

      // File blocks (must be fi-file-{name})
      for (const { key } of FILE_FIELDS) {
        const f = fileRefs.current[key]?.files?.[0];
        if (f) fd.append(`fi-file-${key}`, f);
      }

      const { error } = await forminit.submit("gxknqn5bs23", fd);

      if (error) {
        setStatus("error");
        setError(error.message || "Submission failed");
        return;
      }

      setStatus("success");
      alert("Commission submitted!");

      // Reset your existing UI state exactly like before
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
      setStatus("error");
      setError(err?.message || "Something went wrong");
      alert(err?.message || "Something went wrong");
    }
  };

  // Keep your original styling variables/classes
  const panelText = "text-zinc-900";
  const panelSubtle = "text-zinc-600";
  const fileLabelClass = [
    "inline-flex items-center justify-center",
    "rounded-[10px] px-3 py-2",
    "border cursor-pointer select-none",
    "transition active:scale-[0.99]",
    "border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-900",
  ].join(" ");

  if (status === "success") {
    // Optional: keep same page and show success message (no redirect)
    return (
      <div className="mb-[120px] flex flex-col items-center gap-4">
        <p className={`text-lg font-medium ${panelText}`}>Thanks for the commission! ✅</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="mb-[120px] flex flex-col items-center gap-4"
    >
      <div className="flex w-[min(600px,90%)] flex-col items-center gap-2">
        <p className={`text-lg font-medium ${panelText}`}>How should we contact you?!</p>
        <p className={`text-xs ${panelSubtle}`}>Use an email you check regularly.</p>
        <div className="flex">
          <PinkInput
            state={isDarkMode}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            name="email" // not used by Forminit here, but fine to keep
          />
        </div>
      </div>

      <div className="flex w-[min(600px,90%)] flex-col items-center gap-2">
        <p className={`text-lg font-medium ${panelText}`}>Who is the OC?!</p>
        <p className={`text-xs ${panelSubtle}`}>Whats the name of the character?</p>

        <div className="flex">
          <PinkInput
            state={isDarkMode}
            value={OC}
            onChange={(e) => setOC(e.target.value)}
            placeholder="Who are we drawing?!"
            name="oc"
            type="text"
          />
        </div>
      </div>

      <p className={`text-lg font-medium ${panelText}`}>Describe the commission and what you want!</p>
      <p className={`text-xs ${panelSubtle}`}>
        Describe what you want and how we should use the images to help you
      </p>

      <div className="flex w-[min(600px,90%)] flex-col items-center gap-2">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What do you think?!"
          className="login__textarea"
          name="description"
        />
        <span className="focus-border">
          <i></i>
        </span>
      </div>

      {FILE_FIELDS.map(({ key, label, required }) => (
        <div key={key} className="flex w-[min(800px,90%)] flex-col items-center gap-2">
          <label className={fileLabelClass}>
            <span className="text-sm font-medium">{label}</span>
            <input
              type="file"
              accept="image/*"
              required={!!required}
              className="hidden"
              ref={(el) => {
                fileRefs.current[key] = el;
              }}
              onChange={handleFileChange(key)}
            />
          </label>

          {previews[key] && (
            <div className="relative">
              <button
                type="button"
                onClick={() => clearImage(key)}
                aria-label={`Remove ${label}`}
                className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white text-lg leading-none hover:bg-black/80"
              >
                X
              </button>
              <img
                src={previews[key]}
                width={400}
                height={400}
                alt={key}
                className="h-[400px] w-[400px] rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      ))}

      {status === "error" && (
        <p className="text-sm text-red-600">{error ?? "Something went wrong"}</p>
      )}

      <LiquidButton
        type="submit"
        text={status === "loading" ? "Submitting..." : "Submit"}
        disabled={!email || !OC || !description || isRefMissing || status === "loading"}
      />
    </form>
  );
}
