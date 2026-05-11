import { signIn } from "../../../api/Auth";
import { createUser } from "../../../api/User";
import { toast } from "react-toastify";
import { useAuthSuccessFlow } from "./useAuthSuccessFlow";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpSchema } from "../schema/authSchema";
import { handleAuthError } from "../../../utils/handleAuthError";
import { showFromErrorToast } from "../../../utils/showFormErrorToast";

export const useSignUp = () => {

    const {
        register,
        handleSubmit,
        setError, // 手動でエラーセットできる関数
        formState: { errors, isSubmitting: isFormSubmitting },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange",
        defaultValues: {
            userName: "",
            email: "",
            password: ""
        }
    })
    const { handleAuthSuccess } = useAuthSuccessFlow()

    const signUpMutation = useMutation({
        mutationFn: async (data: {
            userName: string,
            email: string,
            password: string
        }) => {
            await createUser(data.userName, data.email, data.password)
            const ret = await signIn(data.userName, data.password);
            return ret;
        },

        onSuccess: (ret) => {
            if (!ret?.token) {

                toast.error("ログインに失敗しました");
                return;
            }
            handleAuthSuccess(ret.token)
        },
        onError: (error) => {
            const errorMessage = handleAuthError(error, "ログインできませんでした。")
            setError("root", { type: "server", message: errorMessage });

        }
    })

    const onSubmit = async (data: {
        userName: string,
        email: string,
        password: string
    }) => {
        signUpMutation.mutate(data)
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit, showFromErrorToast),
        errors,
        isSubmitting: isFormSubmitting || signUpMutation.isPending,
    }
}