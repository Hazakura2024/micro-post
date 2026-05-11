import type { UseFormRegister } from "react-hook-form";
import styled from "styled-components";

export const PostListHeader = ({
  isLoading,
  onClickReload,
  onClickClear,
  register,
  handleSubmit,
}: {
  isLoading: boolean,
  onClickReload: () => void,
  onClickClear: () => void,
  register: UseFormRegister<{
    searchWord?: string | undefined;
    searchName?: string | undefined;
  }>,
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>,

}) => {

  return (
    <SHeader>
      <div>投稿一覧 </div>
      <SReloadButton disabled={isLoading} onClick={onClickReload}>
        更新
      </SReloadButton>
      <SForm onSubmit={handleSubmit}>
        <SInputSearch type="text" {...register("searchWord")} placeholder="内容を検索" />
        <SInputSearch type="text" {...register("searchName")} placeholder="ユーザーの投稿を検索" />
        <SMiniButton type="submit" >検索</SMiniButton>
      </SForm>
      <SMiniButton onClick={onClickClear}>クリア</SMiniButton>
    </SHeader>
  )
}

export default PostListHeader

const SHeader = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
`;

const SInputSearch = styled.input`
  width: 150px;
  margin: 0px 2px;
`

const SReloadButton = styled.button`
  background-color: #00a3af;
  border-color: #eeeeee;
  padding: 4px;
  margin: 10px;
  border-radius: 8px;
  color: #fafafa;
  width: 96px;
  cursor: pointer;
  &:disabled {
    background-color: #8491c3;
    cursor: not-allowed;
  }
`;
const SMiniButton = styled.button`
  background-color: #00a3af;
  border-color: #eeeeee;
  padding: 4px;
  margin: 0px 3px;
  border-radius: 8px;
  color: #fafafa;
  width: 54px;
  cursor: pointer;
  &:disabled {
    background-color: #8491c3;
    cursor: not-allowed;
  }
`;
const SForm = styled.form`
  display: flex;
  align-items: center;
`