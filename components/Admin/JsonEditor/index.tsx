import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import { useField } from 'react-final-form'
import { FC } from 'react';

const JsonEditor: FC<{ source: string }> = ({ source }) => {
  const { input } = useField(source)
  return (
    <AceEditor
      {...input}
      mode="json"
      theme="monokai"
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  )
}

export default JsonEditor