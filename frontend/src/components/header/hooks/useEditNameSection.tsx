import { useContext, useState } from "react";
import { PostListContext } from "../../../contexts/PostListContext";
import { UserContext } from "../../../contexts/UserContext";
import { editUser } from "../../../api/User";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

export const useEditNameSection = () => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [editingName, setEditingName] = useState("")
    const [isSubmittingName, setIsSubmittingName] = useState(false)
    const { refreshCurrent } = useContext(PostListContext)
    const { userInfo, saveInfoWithName } = useContext(UserContext);


    const onClickEdit = () => {
        setIsEditingName((prev) => !prev)
        setEditingName("")
    }
    const onClickSend = async () => {
        setIsSubmittingName(true)
        try {
            await editUser(editingName)
            setEditingName("")

            await saveInfoWithName(userInfo.id)
            toast.success("名前の変更に成功しました！")
            setIsEditingName(false)
            refreshCurrent()

        } catch (error) {
            const msg = extractErrorMessage(error, "名前の変更に失敗しました")
            toast.error(msg)
        } finally {
            setIsSubmittingName(false)
        }
    }

    return { isEditingName, editingName, setEditingName, onClickSend, isSubmittingName, userInfo, onClickEdit }
}