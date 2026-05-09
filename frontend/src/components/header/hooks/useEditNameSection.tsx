import { useState } from "react";
import { editUser } from "../../../api/User";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAuthStore } from "../../../store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditNameSection = () => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [editingName, setEditingName] = useState("");
    const queryClient = useQueryClient();
    const userInfo = useAuthStore((state) => state.userInfo);
    const saveInfoWithName = useAuthStore((state) => state.saveInfoWithName)

    const MAX_NAME_LENGTH = 20;

    const trimmedName = editingName.trim()

    const onClickEdit = () => {
        setIsEditingName((prev) => !prev)
        setEditingName("")
    }

    const editNameMutation = useMutation({

        mutationFn: (trimmedName: string) => editUser(trimmedName),

        onSuccess: async () => {
            setEditingName("")
            await saveInfoWithName()
            toast.success("名前の変更に成功しました！")
            queryClient.invalidateQueries({ queryKey: ["post"] })
        },

        onError: (error: unknown) => {
            const msg = extractErrorMessage(error, "名前の変更に失敗しました")
            toast.error(msg)
        },
    })

    const onClickSend = async () => {

        if (editNameMutation.isPending) return;
        if (!trimmedName) {
            toast.error("名前を入力して下さい")
        }
        if (trimmedName.length > MAX_NAME_LENGTH) {
            toast.error(`名前は${MAX_NAME_LENGTH}文字以下で入力してください`)
        }

        editNameMutation.mutate(trimmedName);
    }

    const displayName = userInfo.name;

    const onChangeEditingName = (newName: string) => {
        setEditingName(newName);
    }


    const canSubmittingName =
        !editNameMutation.isPending &&
        trimmedName.length > 0 &&
        trimmedName.length <= MAX_NAME_LENGTH;


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