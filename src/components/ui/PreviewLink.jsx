import { useState } from "react"

const PreviewLink = ({ url, name }) => {
  const [showPreview, setShowPreview] = useState(false)

  const handleMouseEnter = () => {
    setShowPreview(true)
  }

  const handleMouseLeave = () => {
    setShowPreview(false)
  }

  return (
    <div className="preview-link-container">
      <a
        href={url}
        className="preview-link text-blue-600 hover:underline font-bold"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {name}
      </a>
      {showPreview && (
        <iframe
          className="preview-frame"
          src={url}
          title="Preview"
          width="500"
          height="300"
          frameBorder="0"
        ></iframe>
      )}
    </div>
  )
}

export default PreviewLink
