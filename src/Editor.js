import React, { useState } from 'react';
import ReactMde from 'react-mde';
import Showdown from "showdown"
import "react-mde/lib/styles/css/react-mde-all.css";


function Editor({currentNote, updateNote}) {
    
    const [selectedTab, setSelectedTab] = useState("write")
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
      });
  return  <section className="pane editor">
      <ReactMde selectedTab={selectedTab} value={currentNote.body} onChange={updateNote}  onTabChange={setSelectedTab} generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                    
                }
                minEditorHeight={80}
                heightUnits="vh">

      </ReactMde>
  </section>
}

export default Editor;
