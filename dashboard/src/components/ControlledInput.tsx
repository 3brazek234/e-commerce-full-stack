// components/forms/ControlledInput.tsx
import { FieldValues } from "react-hook-form"; // 🚨🚨
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ControlledInputProps } from "@/types";
import { Textarea } from "./ui/textarea";

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text", // Default type is 'text'
  step,
  className,
  textarea,
  rows,
  accept,
}: ControlledInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            {textarea ? (
              <Textarea
                id={name}
                placeholder={placeholder}
                rows={rows}
                {...field}
              />
            ) : type === "file" ? (
              // 🚨🚨 معالجة خاصة لـ type="file"
              <Input
                id={name}
                type="file"
                accept={accept}
                {...field}
                value={undefined} // 🚨🚨 مهم: عشان الـ input type="file" ما يحتفظش بالقيمة القديمة
                onChange={(event) => {
                  field.onChange(event.target.files && event.target.files[0]);
                }}
              />
            ) : (
              <Input
                id={name}
                type={type}
                step={step}
                placeholder={placeholder}
                {...field}
                // 🚨🚨 معالجة خاصة للـ number input عشان يعرض القيم صح
                onChange={(e) => field.onChange(e.target.value)}
                value={field.value} // تأكد إن القيمة هي الـ string اللي جاي من الـ field
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
