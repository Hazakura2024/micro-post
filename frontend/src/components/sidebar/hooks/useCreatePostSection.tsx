import { useState } from "react";
import { createPost } from "../../../api/Post";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePostSection = () => {
    const [msg, setMsg] = useState("");

    const MAX_MESSAGE_LENGTH = 140;

    const queryClient = useQueryClient();

    // NOTE: 投稿処理をuseMutationに任せる
    const createPostMutation = useMutation({

        // 実行するAPI関数
        mutationFn: (msg: string) => createPost(msg),

        // 成功時
        onSuccess: () => {
            toast.success("投稿しました！");
            setMsg("");
            queryClient.invalidateQueries({ queryKey: ["post"] })
        },

        // 失敗時
        onError: (error: unknown) => {
            const msg = extractErrorMessage(error, "投稿に失敗しました。");
            toast.error(msg);
        }
    })

    const onSendClick = async () => {
        if (createPostMutation.isPending) return;
        // mutationを実行、.mutate
        createPostMutation.mutate(msg);
    };

    const onChangeMessage = (message: string) => {
        setMsg(message);
    }

    const trimmedMessage = msg.trim()

    const canSubmitMessage =
        msg.length <= MAX_MESSAGE_LENGTH
        && trimmedMessage !== ""
        && !createPostMutation.isPending;

    return {
        msg,
        onChangeMessage,
        onSendClick,
        canSubmitMessage
    }

}