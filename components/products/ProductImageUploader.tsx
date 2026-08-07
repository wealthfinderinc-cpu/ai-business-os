"use client";

import { ImagePlus } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ProductImageUploader({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-3">

      <label className="text-sm font-medium">
        Product Image URL
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-md border p-2"
        placeholder="https://..."
      />

      {value ? (
        <img
          src={value}
          alt="Preview"
          className="h-40 w-full rounded-lg border object-cover"
        />
      ) : (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">

          <div className="text-center">

            <ImagePlus
              size={40}
              className="mx-auto text-slate-400"
            />

            <p className="mt-2 text-slate-500">
              Image Preview
            </p>

          </div>

        </div>
      )}

    </div>
  );
}