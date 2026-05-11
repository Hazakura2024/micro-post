import { createPost } from "../../../api/Post";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCreatePostSection = () => {

    const MAX_MESSAGE_LENGTH = 140;

    const createPostSchema = z.object({
        message: z.string()
            .min(1, "メッセージを入力してください")
            .max(MAX_MESSAGE_LENGTH, `メッセージをは${MAX_MESSAGE_LENGTH}文字以内にしてください`)
    });
    type CreatePostSchema = z.infer<typeof createPostSchema>;

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting: isFormSubmitting, isValid },
        reset,
    } = useForm<CreatePostSchema>({
        resolver: zodResolver(createPostSchema),
        mode: "onChange",
        defaultValues: { message: "" }
    })


    // NOTE: 投稿処理をuseMutationに任せる
    const createPostMutation = useMutation({

        // 実行するAPI関数
        mutationFn: (msg: string) => createPost(msg),

        // 成功時
        onSuccess: () => {
            toast.success("投稿しました！");
            queryClient.invalidateQueries({ queryKey: ["post"] })
            reset()
        },

        // 失敗時
        onError: (error: unknown) => {
            const msg = extractErrorMessage(error, "投稿に失敗しました。");
            toast.error(msg);
        }
    })
    const onSubmit = async (data: CreatePostSchema) => {
        if (createPostMutation.isPending) return;
        // mutationを実行、.mutate
        createPostMutation.mutate(data.message);
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        isFormSubmitting: isFormSubmitting || createPostMutation.isPending,
        isDisabledButton: isFormSubmitting || !isValid,
    }
}