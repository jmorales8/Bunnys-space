import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { PinkInput } from "../../../components/PinkInput/PinkInput";
import { ThemeContext } from "../../../context/ThemeContext";

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

export function Apply() {
  const [email, setEmail] = useState("");
  const [OC, setOC] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // One previews object instead of 6 states
  const [previews, setPreviews] = useState<Record<FileField, string | undefined>>({
    refImageOne: undefined,
    refImageTwo: undefined,
    refImageThree: undefined,
    poseImageOne: undefined,
    poseImageTwo: undefined,
    extraImage: undefined,
  });

  // Single ref map for all inputs (filled via callback refs)
  const fileRefs = useRef<Record<FileField, HTMLInputElement | null>>({
    refImageOne: null,
    refImageTwo: null,
    refImageThree: null,
    poseImageOne: null,
    poseImageTwo: null,
    extraImage: null,
  });

  const themeContext = useContext(ThemeContext);
  if (!themeContext) throw new Error("DarkMode must be used within a ThemeProvider");
  const { isDarkMode } = themeContext;

  // Generic file change handler
  const handleFileChange = (field: FileField) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPreviews((prev) => {
      // revoke previous URL for this field (avoid leaks)
      if (prev[field]) URL.revokeObjectURL(prev[field]!);
      return { ...prev, [field]: file ? URL.createObjectURL(file) : undefined };
    });
  };

  // Clean up all object URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [previews]);

  // Reusable class for text inputs
  const inputClass = useMemo(
    () =>
      `${isDarkMode ? "effect-20__night login__input__night" : "effect-20"} ${
        isDarkMode ? "has-content" : ""
      } login__input`,
    [isDarkMode]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure required file present
    const requiredRef = fileRefs.current.refImageOne;
    if (!requiredRef?.files?.[0]) {
      alert("Please select Reference Image 1 (required).");
      return;
    }

    const fd = new FormData();
    // Text fields (names must match backend)
    fd.set("email", email);
    fd.set("commissionOC", OC);
    fd.set("commissionText", description);
    // If you have auth: fd.set("userID", String(userId));

    // Append files by iterating config
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

      // Reset form
      setEmail("");
      setOC("");
      setDescription("");
      FILE_FIELDS.forEach(({ key }) => {
        const ref = fileRefs.current[key];
        if (ref) ref.value = "";
      });
      // Revoke previews and reset
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

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "min(600px, 90%)", alignItems: "center"}}>
        How should we contact you?!
        <PinkInput
          state={isDarkMode}
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "min(600px, 90%)", alignItems: "center" }}>
        Who is the OC?!
        <PinkInput
          state={isDarkMode}
          value={OC}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOC(e.target.value)}
          placeholder="Who are we drawing?!"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "min(800px, 90%)", alignItems: "center" }}>
        Describe the commission!
        <textarea
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          style={{ height: 150 }}
          className={inputClass}
          placeholder="What do you think?!"
        />
      </div>

      {/* Map all file inputs & previews */}
      {FILE_FIELDS.map(({ key, label, required }) => (
        <div key={key} style={{ width: "min(800px, 90%)", display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <label>
            {label}
            <input
              type="file"
              required={!!required}
              ref={(el) => (fileRefs.current[key] = el)}
              onChange={handleFileChange(key)}
            />
          </label>
          {previews[key] && (
            <img
              src={previews[key]}
              width={400}
              height={400}
              alt={key}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          )}
        </div>
      ))}

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
