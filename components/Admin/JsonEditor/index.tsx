import { FC, useMemo } from 'react';
import { useField } from 'react-final-form'
import dynamic from "next/dynamic";
import { IAceEditorProps } from 'react-ace'

const AceEditor = dynamic(
  async () => {
    const reactAce = await import("react-ace");
    await import("ace-builds/src-noconflict/ext-language_tools");
    await import("ace-builds/src-noconflict/ext-error_marker")
    await import("ace-builds/src-noconflict/mode-json");
    await import("ace-builds/src-noconflict/theme-monokai");

    const ace = require("ace-builds/src-noconflict/ace");
    ace.config.set(
      "basePath",
      "https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/"
    );
    ace.config.setModuleUrl(
      "ace/mode/json_worker",
      "https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-json.js"
    );

    return reactAce;
  },
  {
    ssr: false
  }
);

const JsonEditor: FC<{ source: string } & IAceEditorProps> = ({ source, ...props }) => {
  const { input } = useField(source)
  const parsedValue = useMemo(() => {
    try {
      const parsed = JSON.stringify(JSON.parse(input.value), null, 2)
      return parsed
    } catch (_) {
      return input.value
    }
  }, [])

  return (
    <AceEditor
      onChange={input.onChange}
      defaultValue={parsedValue}
      mode="json"
      theme="monokai"
      width="100%"
      height="800px"
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
      {...props}
    />
  )
}

export default JsonEditor