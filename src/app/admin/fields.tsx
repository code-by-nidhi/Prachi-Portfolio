"use client";

import { useId, useRef, useState } from "react";
import { uploadFile } from "./actions";

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-[15px] outline-none transition-colors focus:border-black";

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="block">
      <span className="text-sm font-medium">{label}</span>
      {hint && <span className="ml-2 text-xs text-muted">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

type TextProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number; // > 1 renders a textarea
  placeholder?: string;
};

export function Text({ label, value, onChange, hint, rows = 1, placeholder }: TextProps) {
  const id = useId();
  return (
    <Field label={label} hint={hint}>
      {rows > 1 ? (
        <textarea
          id={id}
          aria-label={label}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} resize-y leading-relaxed`}
        />
      ) : (
        <input
          id={id}
          aria-label={label}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
    </Field>
  );
}

// Uploads to Supabase Storage through the server action; returns the public URL.
function useUpload(onUploaded: (url: string) => void) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setError(null);
    if (file.size > 9 * 1024 * 1024) return setError("File is too large (max 9MB).");
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadFile(fd).catch(() => ({ ok: false as const, error: "Upload failed." }));
    setBusy(false);
    if (res.ok && res.url) onUploaded(res.url);
    else if (!res.ok) setError(res.error);
  }

  return { busy, error, upload };
}

function UploadButton({ accept, label, onUploaded }: { accept: string; label: string; onUploaded: (url: string) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const { busy, error, upload } = useUpload(onUploaded);
  return (
    <>
      <button
        type="button"
        disabled={busy}
        onClick={() => input.current?.click()}
        className="shrink-0 rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium transition-colors hover:bg-surface disabled:opacity-60"
      >
        {busy ? "Uploading…" : label}
      </button>
      <input
        ref={input}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = "";
        }}
      />
      {error && <p className="basis-full text-sm text-red-600">{error}</p>}
    </>
  );
}

export function ImageInput({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <Field label={label} hint={hint}>
      <div className="flex items-start gap-4">
        <div className="size-24 shrink-0 overflow-hidden rounded-lg bg-surface ring-1 ring-line">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element -- plain preview of any URL, no optimization needed
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <span className="grid size-full place-items-center text-xs text-muted">No image</span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-wrap gap-2">
          <input
            aria-label={`${label} URL`}
            value={value}
            placeholder="Upload, or paste an image URL"
            onChange={(e) => onChange(e.target.value)}
            className={`${inputClass} min-w-0 flex-1 basis-60`}
          />
          <UploadButton accept="image/jpeg,image/png,image/webp,image/gif,image/avif" label="Upload image" onUploaded={onChange} />
        </div>
      </div>
    </Field>
  );
}

// A link field that can also take an uploaded file (e.g. the resume PDF).
export function UrlInput({ label, value, onChange, hint, uploadPdf }: { label: string; value: string; onChange: (v: string) => void; hint?: string; uploadPdf?: boolean }) {
  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-wrap gap-2">
        <input
          aria-label={label}
          value={value}
          placeholder="https://… or /page"
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} min-w-0 flex-1 basis-60`}
        />
        {uploadPdf && <UploadButton accept="application/pdf" label="Upload PDF" onUploaded={onChange} />}
        {value && (
          <a href={value} target="_blank" rel="noreferrer" className="self-center text-sm text-muted underline underline-offset-4 hover:text-black">
            Open
          </a>
        )}
      </div>
    </Field>
  );
}

type ListProps<T> = {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  addLabel: string;
  itemLabel?: (item: T, index: number) => string;
  children: (item: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode;
};

// Editable list with add / remove / move up / move down.
export function List<T>({ items, onChange, newItem, addLabel, itemLabel, children }: ListProps<T>) {
  const move = (from: number, to: number) => {
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-line bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              {itemLabel ? itemLabel(item, i) : `#${i + 1}`}
            </span>
            <div className="flex gap-1">
              <IconButton label="Move up" disabled={i === 0} onClick={() => move(i, i - 1)}>↑</IconButton>
              <IconButton label="Move down" disabled={i === items.length - 1} onClick={() => move(i, i + 1)}>↓</IconButton>
              <IconButton label="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))} danger>
                ✕
              </IconButton>
            </div>
          </div>
          <div className="space-y-3">
            {children(item, (patch) => onChange(items.map((it, j) => (j === i ? { ...it, ...patch } : it))), i)}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, newItem()])}
        className="w-full rounded-xl border border-dashed border-neutral-300 py-3 text-sm font-medium text-muted transition-colors hover:border-black hover:text-black"
      >
        + {addLabel}
      </button>
    </div>
  );
}

function IconButton({ label, onClick, disabled, danger, children }: { label: string; onClick: () => void; disabled?: boolean; danger?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`grid size-7 place-items-center rounded-md text-sm transition-colors disabled:opacity-30 ${
        danger ? "text-red-600 hover:bg-red-50" : "hover:bg-surface"
      }`}
    >
      {children}
    </button>
  );
}
