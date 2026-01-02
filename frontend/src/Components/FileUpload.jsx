import { useState } from 'react'

function FileUpload({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fileName, setFileName] = useState('')

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file')
      return
    }

    setFileName(file.name)
    setError(null)
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Upload success:', data)
      onSuccess(data)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to upload file. Is the backend running?')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="glass-card-dark rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-dark-100 mb-2 text-center">
          📊 Upload Account Data
        </h2>
        <p className="text-dark-400 text-center mb-6">
          Upload your CSV file to analyze recovery probability
        </p>

        {/* File Input */}
        <label className="block">
          <div className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-300
            ${isLoading
              ? 'border-dark-600 bg-dark-800/50'
              : 'border-primary-500/50 hover:border-primary-400 hover:bg-primary-500/10 hover:shadow-glow-primary'}
          `}>
            {isLoading ? (
              <div className="flex flex-col items-center">
                {/* Loading Spinner */}
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
                <p className="text-primary-400 font-medium">Analyzing {fileName}...</p>
                <p className="text-sm text-dark-400 mt-1">AI is processing your data</p>
              </div>
            ) : (
              <>
                <div className="text-4xl mb-4">📁</div>
                <p className="text-lg font-medium text-dark-200">
                  Click to select CSV file
                </p>
                <p className="text-sm text-dark-500 mt-2">
                  or drag and drop here
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={isLoading}
            className="hidden"
          />
        </label>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm flex items-center">
              <span className="mr-2">❌</span>
              {error}
            </p>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-6 p-4 bg-dark-800/50 border border-dark-700 rounded-lg">
          <p className="text-sm text-dark-300">
            <strong className="text-primary-400">💡 Tip:</strong> Use the demo CSV from your project's data folder
          </p>
        </div>
      </div>
    </div>
  )
}

export default FileUpload