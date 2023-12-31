import React, { useState } from "react";
import datas from "../components/datas";

function Edit({ storageData }) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [selectedCartState, setSelectedCartState] = useState("");
  const filteredDatas=datas.filter(data=>data.id<=5);

  
  // 선택한 과목에 따라 옵션을 필터링
  const filteredOptions = storageData.filter((data) => data.subject === selectedSubject);
  // 과목 선택 처리
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedTitle("");
    setSelectedContent("");
    setSelectedUrl("");
  };
  let selectedOption;
  // 옵션 선택 처리
  const handleOptionChange = (e) => {
    selectedOption = filteredOptions.find((data) => data.title === e.target.value);
    console.log(selectedOption)
    if (selectedOption) {
      setSelectedCartState(selectedOption.isCartState);
      setSelectedTitle(selectedOption.title);
      setInputTitle(selectedOption.title)
      setSelectedContent(selectedOption.content);
      setSelectedUrl(selectedOption.url);
    } else {
      setSelectedTitle("");
      setSelectedContent("");
      setSelectedUrl("");
    }
  };

  // 제목 변경 처리
  const handleTitleChange = (e) => {
    setInputTitle(e.target.value);
    console.log(inputTitle)
    console.log(selectedContent)
  };


  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputTitle===''){
      alert('제목을 입력하세요.');
    }else if(selectedContent===''){
        alert('컨텐츠를 입력하세요.')
    }else if(selectedUrl===''){
        alert('url을 입력하세요.')
    }else{
      // 변경된 데이터로 선택한 옵션 업데이트
      const updatedOption = {
        subject: selectedSubject,
        title: inputTitle,
        content: selectedContent,
        url: selectedUrl,
        isCartState: selectedCartState, 
      };
      
      localStorage.removeItem(selectedTitle)
      localStorage.setItem(inputTitle, JSON.stringify(updatedOption));
      alert("데이터가 수정되었습니다.");
      
      //한 번 더 수정시 오류 방지
      setSelectedTitle(inputTitle);
    }
  };

  return (
    <>
      <div className="edit-wrap">
        <form onSubmit={handleSubmit}>
          <article>
            <select value={selectedSubject} onChange={handleSubjectChange}>
              <option className="opt-subject">---------------------- 과목 선택 ----------------------</option>
              {filteredDatas.map((subject) => (
                <option key={subject.id} value={subject.title}>
                  {subject.title}
                </option>
              ))}
            </select>
          </article>
          <article>
            <select value={selectedTitle} onChange={handleOptionChange}>
              <option className="opt-title">---------------------- 과목 선택 ----------------------</option>
              {filteredOptions.map((data) => (
                <option key={data.title} value={data.title}>
                  {data.title}
                </option>
              ))}
            </select>
          </article>
          <article>
            <input
              type="text"
              placeholder="Title"
              value={inputTitle}
              onChange={handleTitleChange}
            />
          </article>
          <article>
            <textarea
              value={selectedContent}
              placeholder="Content"
              onChange={(e) => setSelectedContent(e.target.value)}
            />
          </article>
          <article>
            <input
              type="text"
              placeholder="URL"
              value={selectedUrl}
              onChange={(e) => setSelectedUrl(e.target.value)}
            />
          </article>
          <button type="submit" id="edit-btn">Edit</button>
        </form>
      </div>
    </>
  );
}

export default Edit;