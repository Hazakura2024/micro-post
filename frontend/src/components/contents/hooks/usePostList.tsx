import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { PostType } from "../../../types/Post";
import { getList } from "../../../api/Post";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { toast } from "react-toastify";



export const usePostList = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const [postList, setPostList] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getPostList = async (start?: number, record?: number, word?: string, user_name?: string) => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const posts = await getList(start, record, word, user_name);

            if (posts) {
                const formattedPosts = posts.map((p: PostType) => ({
                    id: p.id,
                    user_id: p.user_id,
                    user_name: p.user_name,
                    user_icon: p.user_icon,
                    content: p.content,
                    created_at: new Date(p.created_at),
                }));
                setPostList(formattedPosts);
            }
        } catch (error: unknown) {
            const msg = extractErrorMessage(error, "投稿が取得できません");
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshCurrent = () => {
        const page = Number(searchParams.get("page") ?? "1");
        const searchName = searchParams.get("name") ?? undefined;
        const searchWord = searchParams.get("word") ?? undefined;
        getPostList((page - 1) * 10, undefined, searchWord, searchName)
    }

    useEffect(() => {
        const page = Number(searchParams.get("page") ?? "1");
        const searchName = searchParams.get("name") ?? undefined;
        const searchWord = searchParams.get("word") ?? undefined;
        getPostList((page - 1) * 10, undefined, searchWord, searchName)
    }, [searchParams])

    const [localSearchWord, setLocalSearchWord] = useState("");
    const [localSearchName, setLocalSearchName] = useState("");

    const onClickReload = () => {

    };

    const onClickClear = () => {
        setSearchParams();
        setLocalSearchName("")
        setLocalSearchWord("")
    }

    const onClickNext = () => {
        const currentPage = Number(searchParams.get("page") ?? "1");
        searchParams.set("page", `${currentPage + 1}`);
        setSearchParams(searchParams)
    }

    const onClickBack = () => {
        const currentPage = Number(searchParams.get("page") ?? "1");
        searchParams.set("page", `${currentPage - 1}`);
        setSearchParams(searchParams)
    }

    const onChangeSearchWord = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setLocalSearchWord(e.target.value)

    }
    const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setLocalSearchName(e.target.value)
    }

    const onClickSearch = () => {
        const params: Record<string, string> = {};

        if (localSearchName.trim()) params.name = localSearchName.trim();
        if (localSearchWord.trim()) params.word = localSearchWord.trim();
        setSearchParams(params);

    }

    const isDisableNextButton = false;
    const isDisableBackButton = false;
    return {
        isLoading,
        onClickReload,
        localSearchWord,
        onChangeSearchWord,
        localSearchName,
        onChangeSearchName,
        onClickSearch,
        onClickClear,
        onClickBack,
        isDisableBackButton,
        isDisableNextButton,
        onClickNext,
        postList,
    }

}