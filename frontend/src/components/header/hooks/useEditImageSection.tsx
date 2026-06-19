import React, { useEffect, useMemo, useState } from 'react'
import { uploadIcon } from '../../../api/User';
import { toast } from 'react-toastify';
import { extractErrorMessage } from '../../../utils/extractErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCurrentUser } from '../../../hooks/useCurrentUser';

export const useEditImageSection = () => {
    const [isEditingImage, setIsEditingImage] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    // 再計算をuseMemoに任せる
    const previewUrl = useMemo(() =>
        selectedFile ?
            URL.createObjectURL(selectedFile) : null,
        [selectedFile]
    )
    useEffect(() => {
        return () => {
            // クロージャ次回更新時にメモリにたまったごみを消す作業が実行される。

            // JavaScriptには、「関数の中で新しく関数を作ると、
            // その内側の関数は、作られた時の周りの変数を一生覚え続ける（クロージャになる）」という絶対的なルールがあります。

            /**
             * Reactは、変数（今回は previewUrl）が変わって useEffect をもう一度実行しなければならない時、
             * 「新しい useEffect を走らせる前に、前回作っておいたお掃除関数を実行する」という
             * 絶対ルールを持っています。これはuseEffectの仕様
             */
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);



    const { userInfo }  = useCurrentUser();
  
    const queryClient = useQueryClient();

    const onClickEditImage = () => {
        setIsEditingImage((prev) => !prev)
        setSelectedFile(null)
    }

    const onChangeInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file!);
    }

    const editImageMutation = useMutation({
        mutationFn: (selectedFile: File) => uploadIcon(selectedFile),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"]})
            toast.success("アイコンの変更に成功しました！")
            queryClient.invalidateQueries({ queryKey: ["post"] })
            setSelectedFile(null)
        },
        onError: (error) => {
            const msg = extractErrorMessage(error, "アイコンの変更に失敗しました")
            toast.error(msg)
        }
    })

    const onClickSubmitImage = async () => {
        if (!selectedFile) return;

        editImageMutation.mutate(selectedFile);
    }

    const isSubmittingImage = editImageMutation.isPending;

    const iconPath = userInfo?.icon_path ?? "";
    const userName = userInfo?.name ?? "";

    const isDisabledButton = !selectedFile;

    return {
        isEditingImage,
        previewUrl,
        onClickSubmitImage,
        isSubmittingImage,
        iconPath,
        userName,
        onClickEditImage,
        onChangeInputImage,
        isDisabledButton
    }

}