import { signIn } from "../../../api/Auth";
import { toast } from "react-toastify";
import { useAuthSuccessFlow } from "./useAuthSuccessFlow";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signInSchema, type SignInSchema } from "../schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AuthResponse } from "../../../types/Auth";
import { handleAuthError } from "../../../utils/handleAuthError";
import { showFromErrorToast } from "../../../utils/showFormErrorToast";

export const useSignIn = () => {

    const { handleAuthSuccess } = useAuthSuccessFlow()

    const {
        register,
        handleSubmit,
        setError, // 手動でエラーセットできる関数
        formState: { errors, isSubmitting: isFormSubmitting },
    } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        mode: "onChange",
        defaultValues: {
            userName: "",
            password: ""
        }
    })

    const signInMutation = useMutation({
        mutationFn: (data: {
            userName: string,
            password: string
        }) => signIn(data.userName, data.password),

        onSuccess: (ret: AuthResponse) => {
            if (!ret?.token) {
                toast.error("ログインに失敗しました");
                return;
            }
            handleAuthSuccess(ret.token)
        },

        onError: (error: unknown) => {
            const errorMessage = handleAuthError(error, "ログインできませんでした。")
            setError("root", { type: "server", message: errorMessage });
        }
    })

    const onSubmit = async (data: {
        userName: string,
        password: string
    }) => {

        signInMutation.mutate(data)
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit, showFromErrorToast),
        errors,
        isSubmitting: isFormSubmitting || signInMutation.isPending,
    }

}