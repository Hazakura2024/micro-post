import { useContext, useEffect, useState } from "react";
import { PostListContext } from "../../../contexts/PostListContext";
import { useSearchParams } from "react-router-dom";



export const usePostList = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const {
        postList,
        getPostList,
        isLoading,
        page,
        setPage,
        searchWord,
        setSearchWord,
        searchName,
        setSearchName,
    } = useContext(PostListContext);

    const [localSearchWord, setLocalSearchWord] = useState("");
    const [localSearchName, setLocalSearchName] = useState("");

    // 初表示時の取得
    useEffect(() => {
        getPostList(0, undefined, searchWord, searchName);
        setPage(1)
    }, []);


    const onClickReload = () => {
        getPostList(0, undefined, searchWord, searchName);
        setPage(1)
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
        page,
        onClickNext,
        postList,
    }

}