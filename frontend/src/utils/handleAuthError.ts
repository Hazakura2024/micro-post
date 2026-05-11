import { toast } from "react-toastify";
import { extractErrorMessage } from "./extractErrorMessage";

export const handleAuthError = (error: unknown, message: string) => {
    const msg = extractErrorMessage(error, message);
    toast.error(msg);
    return msg;
}