import type { FieldErrors, FieldValues } from "react-hook-form";
import type { SignInSchema } from "../components/auth/schema/authSchema";
import { toast } from "react-toastify";

export const showFromErrorToast = <T extends FieldValues>(validationErrors: FieldErrors<T>) => {
    const firstError = Object.values(validationErrors)[0];
    if (firstError?.message) {
        toast.error(firstError.message as string)
    }
}