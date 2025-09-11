import { useContext, useMemo, useState } from "react";
import { PinkInput } from "../../../components/PinkInput/PinkInput";
import { ThemeContext } from "../../../context/ThemeContext";
import { ReusableFileInput } from "../../../components/FileInputs/FileInputs"; // <-- import
import LiquidButton from "../../../components/LiquidButton/LiquidButton";

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

  // Single source of truth for selected files
  const [files, setFiles] = useState<Record<FileField, File | null>>({
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

  const inputClass = useMemo(
    () =>
      `${isDarkMode ? "effect-20__night login__input__night" : "effect-20"} ${
        isDarkMode ? "has-content" : ""
      } login__input`,
    [isDarkMode]
  );

  const hasFile = (field: FileField) => !!files[field];

  const canShow = (field: FileField) => {
    switch (field) {
      case "refImageOne":
        return true;
      case "refImageTwo":
        return hasFile("refImageOne");
      case "refImageThree":
        return hasFile("refImageTwo");
      case "poseImageOne":
        return hasFile("refImageOne");
      case "poseImageTwo":
        return hasFile("poseImageOne");
      case "extraImage":
        return hasFile("refImageOne");
      default:
        return true;
    }
  };

  const formValid =
    email.trim() !== "" &&
    OC.trim() !== "" &&
    description.trim() !== "" &&
    hasFile("refImageOne");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValid) return;

    const fd = new FormData();
    fd.set("email", email);
    fd.set("commissionOC", OC);
    fd.set("commissionText", description);

    // Append files that exist
    for (const { key } of FILE_FIELDS) {
      const f = files[key];
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
      setFiles({
        refImageOne: null,
        refImageTwo: null,
        refImageThree: null,
        poseImageOne: null,
        poseImageTwo: null,
        extraImage: null,
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
      style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", marginBottom: "120px" }}
    >
      <div className="apply__info__long" style={{display: "flex", alignItems: "end", justifyContent: "space-between", width: "1040px"}}>
        <div style={{ display: "flex", flexDirection: "column", width: "min(600px, 90%)", alignItems: "center"}}>
          <div className={isDarkMode ? "apply__header__night" : "apply__header"}>How should we contact you?!</div>
          <PinkInput
            state={isDarkMode}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: "min(600px, 90%)", alignItems: "center" }}>
          <div className={isDarkMode ? "apply__header__night" : "apply__header"}>Who is the OC?!</div>
          <PinkInput
            state={isDarkMode}
            value={OC}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOC(e.target.value)}
            placeholder="Who are we drawing?!"
          />
        </div>
      </div>

      <div className="apply__info__short" style={{display: "none", flexDirection: "column", width: "100%", alignItems: "center"}}>
        <div style={{ display: "flex", flexDirection: "column", width: "min(600px, 90%)", marginBottom: "10px", alignItems: "center"}}>
          <div className={isDarkMode ? "apply__header__night" : "apply__header"}>How should we contact you?!</div>
          <PinkInput
            state={isDarkMode}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: "min(600px, 90%)", alignItems: "center" }}>
          <div className={isDarkMode ? "apply__header__night" : "apply__header"}>Who is the OC?!</div>
          <PinkInput
            state={isDarkMode}
            value={OC}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOC(e.target.value)}
            placeholder="Who are we drawing?!"
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "min(800px, 90%)", alignItems: "center" }}>
        <div className={isDarkMode ? "apply__header__night" : "apply__header"}>Describe the commission!</div>
        <textarea
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          style={{ height: 150 }}
          className={inputClass}
          placeholder="What do you think?!"
        />
      </div>

      {/* File inputs using the reusable component */}
      {FILE_FIELDS.map(({ key, label, required }) => (
        <ReusableFileInput
          key={key}
          label={label}
          file={files[key]}
          required={!!required}
          visible={canShow(key)}
          onChange={(file: any) =>
            setFiles((prev) => ({ ...prev, [key]: file }))
          }
          accept="image/*"
          disabled={submitting}
        />
      ))}

      <LiquidButton
        text={submitting ? "Submitting..." : "Submit"}
        disabled={submitting || !formValid}
      />
    </form>
  );
}

