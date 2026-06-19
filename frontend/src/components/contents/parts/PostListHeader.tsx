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
      <SHeadingBlock>
        <SBadge>Timeline</SBadge>
        <SHeading>投稿一覧</SHeading>
      </SHeadingBlock>
      <SActionRow>
        <SReloadButton disabled={isLoading} onClick={onClickReload}>
          更新
        </SReloadButton>
        <SMiniButton onClick={onClickClear}>クリア</SMiniButton>
      </SActionRow>
      <SForm onSubmit={handleSubmit}>
        <SInputSearch type="text" {...register("searchWord")} placeholder="内容を検索" />
        <SInputSearch type="text" {...register("searchName")} placeholder="ユーザーの投稿を検索" />
        <SMiniButton type="submit">検索</SMiniButton>
      </SForm>
    </SHeader>
  )
}

export default PostListHeader

const SHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const SHeadingBlock = styled.div`
  display: grid;
  gap: 6px;
`;

const SBadge = styled.div`
  display: inline-flex;
  width: fit-content;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SHeading = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

const SActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  flex-wrap: wrap;
`;

const SInputSearch = styled.input`
  min-width: 0;
  width: min(100%, 200px);
`

const SReloadButton = styled.button`
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-strong));
  padding: 12px 16px;
  border-radius: 16px;
  color: #fafafa;
  width: auto;
  min-width: 92px;
  font-weight: 700;
  cursor: pointer;
  &:disabled {
    background: #9bb8b5;
    cursor: not-allowed;
  }
`;
const SMiniButton = styled.button`
  background: rgba(23, 106, 99, 0.1);
  border: 1px solid rgba(23, 106, 99, 0.16);
  padding: 12px 16px;
  margin: 0;
  border-radius: 16px;
  color: var(--color-primary-strong);
  width: auto;
  min-width: 84px;
  font-weight: 700;
  cursor: pointer;
  &:disabled {
    background: #c7d6d4;
    cursor: not-allowed;
  }
`;
const SForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`