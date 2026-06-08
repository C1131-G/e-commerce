import { FileText, Image } from "lucide-react";

function DocumentViewer({ title, documents = [], photos = [] }) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <h2>{title}</h2>
      </div>
      <div className="documentList">
        {documents.map((document) => (
          <span key={document}>
            <FileText size={16} />
            {document}
          </span>
        ))}
        {photos.map((photo) => (
          <span key={photo}>
            <Image size={16} />
            {photo}
          </span>
        ))}
      </div>
    </section>
  );
}

export default DocumentViewer;
