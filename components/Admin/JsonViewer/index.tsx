import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import { FC } from 'react';

const JsonViewer: FC<{ source: string, record?: any }> = ({ source, record }) => {
  return (
    <AceEditor
      value={JSON.stringify(JSON.parse(record[source]), null, 2)}
      mode="json"
      theme="monokai"
      fontSize={14}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        readOnly: true,
        tabSize: 2,
      }}
    />
  )
}

export default JsonViewer