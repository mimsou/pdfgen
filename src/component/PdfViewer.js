import React, { useState ,useEffect} from 'react';
import { Document, Page } from "react-pdf";
import PdfRender from './PdfRender';
import { BlobProvider,usePDF  } from '@react-pdf/renderer';
import { pdfjs } from 'react-pdf';




const PdfViewer = () => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [instance, updateInstance] = usePDF({ document: PdfRender });
   
    useEffect(() => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    });

  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    if (instance.loading) return <div>Loading ...</div>;

    if (instance.error) return <div>Something went wrong: {"error"}</div>;
   
  return (
    <>
      <Document file={instance.url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </>
  );
};

export default PdfViewer;
