import { useState } from "react";
import { createPost } from "../../../api/Post";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useQueryClient } from "@tanstack/react-query";

export const useCreatePostSection = () => {
    const [msg, setMsg] = useState("");

    const [isPosting, setIsPosting] = useState(false);

    const MAX_MESSAGE_LENGTH = 140;

    const queryClient = useQueryClient();

    const onSendClick = async () => {
        if (isPosting) return;
        setIsPosting(true);
        try {
            const res = await createPost(msg);
            if (res.success) {
                toast.success("投稿しました！");
            }

            // (学習メモ): ここに到達するということは、成功したということ
            setMsg("");
            // (学習メモ): createPost 成功 → setMsg → getPostList の順番が保証されている
        } catch (error: unknown) {
            const msg = extractErrorMessage(error, "投稿に失敗しました。");
            toast.error(msg);
        } finally {
            queryClient.invalidateQueries({ queryKey: ["post"] })
            setIsPosting(false);
        }
    };

    const onChangeMessage = (message: string) => {
        setMsg(message);
    }

    const trimmedMessage = msg.trim()

    const canSubmitMessage =
        msg.length <= MAX_MESSAGE_LENGTH
        && trimmedMessage !== ""
        && !isPosting;

    return {
        msg,
        onChangeMessage,
        onSendClick,
        canSubmitMessage
    }

}