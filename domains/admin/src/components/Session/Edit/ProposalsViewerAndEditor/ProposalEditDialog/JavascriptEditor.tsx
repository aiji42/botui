import { FC, useCallback } from 'react'
import { FieldRenderProps } from 'react-final-form'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/snippets/javascript'
import 'ace-builds/src-noconflict/ext-searchbox'
import { config } from 'ace-builds'
config.set(
  'basePath',
  'https://cdn.jsdelivr.net/npm/ace-builds@latest/src-noconflict/'
)
config.setModuleUrl(
  'ace/mode/javascript_worker',
  'https://cdn.jsdelivr.net/npm/ace-builds@latest/src-noconflict/worker-javascript.js'
)

const JavascriptEditor: FC<FieldRenderProps<string>> = ({ input }) => {
  const handleChange = useCallback(
    (value: string) => {
      input.onChange(value)
    },
    [input]
  )
  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      value={input.value}
      onChange={handleChange}
      highlightActiveLine
      enableBasicAutocompletion
      enableLiveAutocompletion
      tabSize={2}
      width="100%"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableSnippets: true
      }}
    />
  )
}

export default JavascriptEditor
