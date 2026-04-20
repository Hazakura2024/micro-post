import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { PostType } from "../../../types/Post";
import { getList } from "../../../api/Post";
import { useQuery } from "@tanstack/react-query";

export const usePostList = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("page") ?? "1");
    const searchName = searchParams.get("name") ?? "";
    const searchWord = searchParams.get("word") ?? "";

    const [localSearchWord, setLocalSearchWord] = useState(searchWord);
    const [localSearchName, setLocalSearchName] = useState(searchName);

    const {
        data: postList = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["post", { page, searchName, searchWord }],
        queryFn: async () => {
            const posts = await getList((page - 1) * 10, undefined, searchWord, searchName);

            if (!posts) return [];

            return posts.map((p: PostType) => ({
                id: p.id,
                user_id: p.user_id,
                user_name: p.user_name,
                user_icon: p.user_icon,
                content: p.content,
                created_at: new Date(p.created_at),
            }));
        }
    });


    const onClickReload = () => {
        refetch()
    };

    const onClickClear = () => {
        setSearchParams({});
        setLocalSearchName("")
        setLocalSearchWord("")
    }

    const onClickNext = () => {
        if (isLoading || postList.length < 10) return;
        const currentPage = Number(searchParams.get("page") ?? "1");
        const nextParams = new URLSearchParams(searchParams)
        nextParams.set("page", `${currentPage + 1}`);
        setSearchParams(nextParams)
    }

    const onClickBack = () => {
        if (isLoading || page < 2) return;
        const currentPage = Number(searchParams.get("page") ?? "1");
        const nextParams = new URLSearchParams(searchParams)
        nextParams.set("page", `${currentPage - 1}`);
        setSearchParams(nextParams)
    }

    const onChangeSearchWord = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setLocalSearchWord(e.target.value)

    }
    const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setLocalSearchName(e.target.value)
    }

    const onClickSearch = () => {
        const params: Record<string, string> = {};
        params.page = "1";
        if (localSearchName.trim()) params.name = localSearchName.trim();
        if (localSearchWord.trim()) params.word = localSearchWord.trim();
        setSearchParams(params);

    }

    const isDisableNextButton = isLoading || postList.length < 10;
    const isDisableBackButton = isLoading || page < 2;
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