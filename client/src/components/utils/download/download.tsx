// import { useState } from "react";
import styled from "styled-components";
import { baseURL } from "../../../config/api";
import { addOpacityToColor } from "../convertor/add-opacity-color";
import { ThemeProps } from "../../../typo/theme/theme";
import { MdFileDownload } from "react-icons/md";

export const DownloadButton = styled.button<ThemeProps>`
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  padding: 0rem 0.5rem;
  width: max-content;
  margin: 0.5rem;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.buttons.primary};
  border: none;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.buttons.primary)};
  }
`;

const DownloadPDF = ({ url }: { url: string }) => {
  // const [buttonText, setButtonText] = useState("Download");
  // const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    // setDownloading(true);
    const response = await fetch(baseURL + url);
    if (response) {
      const reader = response.body?.getReader();
      // const contentLength = +(response.headers?.get("Content-Length") || 0);

      let receivedLength = 0; // received that many bytes at the moment
      const chunks = []; // array of received binary chunks (comprises the body)
      while (reader) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;

        // setButtonText(
        //   `Downloading... ${((receivedLength / contentLength) * 100).toFixed(
        //     0
        //   )}%`
        // );
      }

      // setButtonText("Download");
      // setDownloading(false);

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
    <DownloadButton
      onClick={handleDownload}
      // disabled={downloading}
    >
      <MdFileDownload />
      {/* {buttonText} */}
    </DownloadButton>
  );
};

export default DownloadPDF;
