import { FC, useMemo } from 'react'
import dynamic from 'next/dynamic'

const AceEditor = dynamic(
  async () => {
    const reactAce = await import('react-ace')
    await import('ace-builds/src-noconflict/ext-language_tools')
    await import('ace-builds/src-noconflict/ext-error_marker')
    await import('ace-builds/src-noconflict/mode-json')
    await import('ace-builds/src-noconflict/theme-monokai')

    const ace = await import('ace-builds/src-noconflict/ace')
    ace.config.set(
      'basePath',
      'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/'
    )
    ace.config.setModuleUrl(
      'ace/mode/json_worker',
      'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-json.js'
    )

    return reactAce
  },
  {
    ssr: false
  }
)

const JsonViewer: FC<{ source: string; record?: any }> = ({
  source,
  record
}) => {
  const parsedValue = useMemo(() => {
    try {
      const parsed = JSON.stringify(JSON.parse(record[source]), null, 2)
      return parsed
    } catch (_) {
      return record[source]
    }
  }, [])

  return (
    <AceEditor
      value={parsedValue}
      mode="json"
      theme="monokai"
      width="100%"
      height="800px"
      fontSize={14}
      setOptions={{
        showLineNumbers: true,
        readOnly: true,
        tabSize: 2
      }}
    />
  )
}

export default JsonViewer
