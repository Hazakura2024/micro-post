import React, { useContext, useEffect, useState } from 'react'
import { uploadIcon } from '../../../api/User';
import { toast } from 'react-toastify';
import { extractErrorMessage } from '../../../utils/extractErrorMessage';
import { PostListContext } from '../../../contexts/PostListContext';
import { useAuthStore } from '../../../store/useAuthStore';

export const useEditImageSection = () => {
    const [isEditingImage, setIsEditingImage] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>()
    const [isSubmittingImage, setIsSubmittingImage] = useState(false)

    const userInfo = useAuthStore((state) => state.userInfo);
    const setUserInfo = useAuthStore((state) => state.setUserInfo);

    const { refreshCurrent } = useContext(PostListContext)


    const onClickEditImage = () => {
        setIsEditingImage((prev) => !prev)
        setSelectedFile(null)
    }

    const onChangeInputImage = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file);
    }

    const onClickSubmitImage = async () => {
        setIsSubmittingImage(true)
        try {
            if (!selectedFile) return;
            const res = await uploadIcon(selectedFile);
            console.log(res)
            setUserInfo({ icon_path: res.icon_path })
            toast.success("アイコンの変更に成功しました！")
            refreshCurrent()
        } catch (error) {
            console.log(error);
            const msg = extractErrorMessage(error, "アイコンの変更に失敗しました")
            toast.error(msg)
        } finally {
            setSelectedFile(null)
            setIsSubmittingImage(false)
            setIsEditingImage(false)
        }
    }

    const [previewUrl, setPreviewUrl] = useState<string | null>();

    useEffect(() => {
        if (!selectedFile) {
            setPreviewUrl(null)
            return;
        }

        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url)

        return () => { URL.revokeObjectURL(url); };

    }, [selectedFile])

    const iconPath = userInfo.icon_path;
    const userName = userInfo.name;

    return {
        isEditingImage,
        previewUrl,
        onClickSubmitImage,
        isSubmittingImage,
        iconPath,
        userName,
        onClickEditImage,
        onChangeInputImage
    }

}