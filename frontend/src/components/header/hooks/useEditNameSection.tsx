import { useContext, useState } from "react";
import { PostListContext } from "../../../contexts/PostListContext";
import { editUser } from "../../../api/User";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAuthStore } from "../../../store/useAuthStore";

export const useEditNameSection = () => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [editingName, setEditingName] = useState("")
    const [isSubmittingName, setIsSubmittingName] = useState(false)
    const { refreshCurrent } = useContext(PostListContext)
    const userInfo = useAuthStore((state) => state.userInfo);
    const saveInfoWithName = useAuthStore((state) => state.saveInfoWithName)

    const MAX_NAME_LENGTH = 20;

    const trimmedName = editingName.trim()

    const canSubmittingName =
        !isSubmittingName &&
        trimmedName.length > 0 &&
        trimmedName.length < MAX_NAME_LENGTH;

    const onClickEdit = () => {
        setIsEditingName((prev) => !prev)
        setEditingName("")
    }
    const onClickSend = async () => {

        if (isSubmittingName) return;

        if (!trimmedName) {
            toast.error("名前を入力して下さい")
        }

        if (trimmedName.length > MAX_NAME_LENGTH) {
            toast.error(`名前は${MAX_NAME_LENGTH}文字以下で入力してください`)
        }

        setIsSubmittingName(true)
        try {
            await editUser(trimmedName)
            setEditingName("")

            await saveInfoWithName()
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

    const displayName = userInfo.name;

    const onChangeEditingName = (newName: string) => {
        setEditingName(newName);
    }

    return {
        isEditingName,
        editingName,
        onChangeEditingName,
        onClickSend,
        displayName,
        onClickEdit,
        canSubmittingName
    };
}