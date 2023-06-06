import React, { useState, ChangeEvent } from "react";

import { Button, Text } from "../../../../../../../../Components";
import { Flexer, Item } from "../../../../../../../../Containers";
import { palettes } from "../../../../../../../../../utils";

interface FileTypeProps {
  formData: any;
  fieldName: string;
  verboseName: string;
  handleInputChange: (event: ChangeEvent<any>) => void;
  xsColumnCount: number;
  mdColumnCount: number;
}

const FileType: React.FC<FileTypeProps> = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  xsColumnCount,
  mdColumnCount,
}) => {
  const [fileName, setFileName] = useState<string | null>(
    formData[fieldName] ? formData[fieldName] : null
  );

  const handleSelectFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    fileInput.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setFileName(e.target.files && e.target.files[0]?.name);
  };

  return (
    <Item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 16,
        paddingRight: 8,
        paddingLeft: 8,
      }}
    >
      <Flexer a="c" j="c" mb={16} fd="column">
        <Button
          onClick={handleSelectFile}
          startIcon="attach_file"
          iconSize="18px"
        >
          {formData[fieldName]
            ? `Change ${verboseName} File`
            : `Upload ${verboseName} File`}
        </Button>
        {formData[fieldName] instanceof File ? (
          <a
            href={URL.createObjectURL(formData[fieldName])}
            target="_blank"
            rel="noopener noreferrer"
            className="file-downloadable"
          >
            <Text t="body1" mt={2}>
              {fileName}
            </Text>
          </a>
        ) : (
          <React.Fragment>
            {formData[fieldName] ? (
              <a
                href={formData[fieldName]}
                target="_blank"
                rel="noopener noreferrer"
                className="file-downloadable"
              >
                <Text t="body1" mt={2}>
                  {formData[fieldName]}
                </Text>
              </a>
            ) : (
              <Text t="body1" c={palettes.error.main} a="c" mt={2}>
                No Resume Uploaded
              </Text>
            )}
          </React.Fragment>
        )}
        <input
          type="file"
          id={`file-input`}
          name={fieldName}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Flexer>
    </Item>
  );
};

export default FileType;
