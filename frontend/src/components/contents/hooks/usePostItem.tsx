import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { PostListContext } from "../../../contexts/PostListContext";
import { deletePost } from "../../../api/Post";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

export const usePostItem = () => {
    const { userInfo } = useContext(UserContext);
    const { getPostList } = useContext(PostListContext);

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

    const [isDeleting, setIsDeleting] = useState(false);
    const onClickDelete = async (postId: number) => {
        if (isDeleting) return;
        setIsDeleting(true);
        try {
            await deletePost(postId);
            await getPostList();
            toast.success("削除しました");
        } catch (error) {
            const msg = extractErrorMessage(error, "削除に失敗しました。");
            toast.error(msg);
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        getDateString,
        userInfo,
        isDeleting,
        onClickDelete,
    }
}