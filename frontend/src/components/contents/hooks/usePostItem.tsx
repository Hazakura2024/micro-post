import { deletePost } from "../../../api/Post";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

export const usePostItem = () => {
    const {userInfo} = useCurrentUser();

    const queryClient = useQueryClient()

    // const isMyPost =  userName === userInfo.id;

    // FIX: localhostだとUTCになってrenderだとJTCになるっぽい？
    // NOTE: サーバーがZをつけて、UTCであるという指定をしていないので、ここでつける
    // const dateString = post.created_at.toString().endsWith("Z")
    //   ? post.created_at
    //   : `${post.created_at.toString().replace(" ", "T")}Z`;
    const getDateString = (dateObj: Date) => {
        // const dateObj = new Date(createdAt)
        return dateObj.toLocaleString();
    };

    const deletePostMutation = useMutation({

        mutationFn: (postId: number) => deletePost(postId),
        onSuccess: () => {
            toast.success("削除しました");
            queryClient.invalidateQueries({ queryKey: ["post"] })
        },
        onError: (error) => {
            const msg = extractErrorMessage(error, "削除に失敗しました。");
            toast.error(msg);
        }

    })

    const onClickDelete = async (postId: number) => {
        if (deletePostMutation.isPending) return;
        deletePostMutation.mutate(postId);
    };

    const isDeleting = deletePostMutation.isPending;

    return {
        getDateString,
        userInfo,
        isDeleting,
        onClickDelete,
    }
}