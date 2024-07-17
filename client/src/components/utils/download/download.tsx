// import { useState } from "react";
import styled from "styled-components";
import { baseURL } from "../../../config/api";
import { ThemeProps } from "../../../typo/theme/theme";
import { MdFileDownload } from "react-icons/md";

export const DownloadButton = styled.button<ThemeProps>`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  margin-top: 0.4rem;
  background-color: transparent;
  border: none;
  &:hover {
    background-color: ${({ theme }) => theme.table.tableRowHover};
    color: ${({ theme }) => theme.backgrounds.primary};
  }
`;
interface Props {
  file_url: string;
  file_name: string;
}

const DownloadPDF = ({ file_url, file_name }: Props) => {
  const handleDownload = async () => {
    const response = await fetch(baseURL + file_url);
    if (response) {
      const reader = response.body?.getReader();

      let receivedLength = 0;
      const chunks = [];
      while (reader) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;
      }
      const chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }

      // Create a blob from the chunks
      const blob = new Blob([chunksAll]);
      const download_url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = download_url;
      link.download = file_name + ".pdf";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(download_url);
      document.body.removeChild(link);
    }
  };

  return (
    <DownloadButton onClick={handleDownload}>
      <MdFileDownload />
    </DownloadButton>
  );
};

export default DownloadPDF;
