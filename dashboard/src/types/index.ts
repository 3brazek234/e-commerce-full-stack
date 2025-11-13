import { Control, FieldValues, Path } from "react-hook-form";

export interface ControlledInputProps<T extends FieldValues> {
  control: Control<T>; // الـ control object من useForm
  name: Path<T>; // اسم الحقل (مثلاً "name", "price")
  label: string; // الـ Label اللي هيظهر للمستخدم
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute; // نوع الـ input (text, number, email, password, file)
  step?: string; // لـ type="number"
  className?: string;
  textarea?: boolean; // عشان لو عايز تستخدم Textarea بدل Input
  rows?: number; // لـ Textarea
  accept?: string; // لـ type="file"
}
