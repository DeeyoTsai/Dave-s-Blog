import React from "react";

interface SearchInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = React.memo(({value, onChange}: SearchInputProps) => {
    console.log("SearchInput渲染了！");
    return (
        <input type="text" value={value} onChange={onChange} placeholder="搜尋文章..." />
    )
})

export default SearchInput;