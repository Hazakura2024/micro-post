import { useState } from "react";
import { editUser } from "../../../api/User";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAuthStore } from "../../../store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useEditNameSection = () => {

    const MAX_NAME_LENGTH = 20;

    // zodでバリデーションも含めた型にの材料を作成
    const editNameSchema = z.object({
        name: z.string()
            .min(1, "名前を入力してください")
            .max(MAX_NAME_LENGTH, "名前は20文字以内にしてください")
    });
    // 実際に型を作成
    type EditNameSchema = z.infer<typeof editNameSchema>;


    const [isEditingName, setIsEditingName] = useState(false);
    const queryClient = useQueryClient();
    const userInfo = useAuthStore((state) => state.userInfo);
    const saveInfoWithName = useAuthStore((state) => state.saveInfoWithName)


    const onClickEdit = () => {
        setIsEditingName((prev) => !prev)
    }

    const editNameMutation = useMutation({

        mutationFn: (trimmedName: string) => editUser(trimmedName),

        onSuccess: async () => {
            await saveInfoWithName()
            toast.success("名前の変更に成功しました！")
            queryClient.invalidateQueries({ queryKey: ["post"] })
            reset()
        },

        onError: (error: unknown) => {
            const msg = extractErrorMessage(error, "名前の変更に失敗しました")
            toast.error(msg)
        },
    })


    // formの準備、zodとの合体
    const {
        register, //inputとの紐づけ用
        handleSubmit, // 送信ボタンが押されたときの処理をまとめる
        formState: { isSubmitting: isFromSubmitting, isValid },
        reset,
    } = useForm<EditNameSchema>({
        resolver: zodResolver(editNameSchema),
        mode: "onChange",
        defaultValues: { name: "" }
    })


    const onSubmit = async (data: EditNameSchema) => {

        // if (editNameMutation.isPending) return;
        // if (!trimmedName) {
        //     toast.error("名前を入力して下さい")
        // }
        // if (trimmedName.length > MAX_NAME_LENGTH) {
        //     toast.error(`名前は${MAX_NAME_LENGTH}文字以下で入力してください`)
        // }

        editNameMutation.mutate(data.name);
    }

    const displayName = userInfo.name;

    return {
        register, //inputとの紐づけ用
        handleSubmit: handleSubmit(onSubmit),
        isEditingName,
        displayName,
        onClickEdit,
        isSubmitting: isFromSubmitting || editNameMutation.isPending,
        isDisabledButton: isFromSubmitting || editNameMutation.isPending || !isValid,
    };
}