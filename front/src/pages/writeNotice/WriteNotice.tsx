import React from "react";
// Do:
import { Bold } from "@ckeditor/ckeditor5-basic-styles";

function WriteNotice() {

    const Save = () => {};


  return (
    <>
      
      <form action="" method="POST">
        <h1>공지사항</h1>
        <textarea name="text" id="editor"></textarea>
        <p>
          <input 
          type="submit" 
          value="전송" 
          onClick={Save}/>
        </p>
      </form>
    </>
  );
}

export default WriteNotice;
