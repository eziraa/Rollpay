import React, { useState } from "react";
import styled from "styled-components";
import { baseURL } from "../../../config/api";

const DownloadButton = styled.button`
  background-color: #4caf50; // Green background
  color: white; // White text
  padding: 10px 20px; // Padding around the text
  border: none; // No border
  cursor: pointer; // Cursor changes to pointer on hover
  // Add more styles as needed
`;

const DownloadPDF = () => {
  const [buttonText, setButtonText] = useState("Download PDF");
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    const response = await fetch(baseURL + "/media/VS Code Cheatsheet.pdf");
    if (response) {
      const reader = response.body?.getReader();
      const contentLength = +(response.headers?.get("Content-Length") || 0);

      let receivedLength = 0; // received that many bytes at the moment
      const chunks = []; // array of received binary chunks (comprises the body)
      while (reader) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;

        setButtonText(
          `Downloading... ${((receivedLength / contentLength) * 100).toFixed(
            0
          )}%`
        );
      }

      setButtonText("Download PDF");
      setDownloading(false);

      // Concatenate chunks into single Uint8Array
      const chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }

      // Create a blob from the chunks
      const blob = new Blob([chunksAll]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "downloaded_file.pdf";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }
  };

  return (
    <DownloadButton onClick={handleDownload} disabled={downloading}>
      {buttonText}
    </DownloadButton>
  );
};

export default DownloadPDF;
