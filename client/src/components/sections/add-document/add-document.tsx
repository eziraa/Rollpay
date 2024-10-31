/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import {
  FormError,
  Input,
  InputContainer,
  Label,
} from "../../utils/form-elements/form.style";
import { Modal } from "../../utils/modal/modal";
import { Title, UploadBtn } from "../add_employee/add-employee.style";
import {
  AddBtn,
  DocumentBody,
  DocumentContainer,
  DocumentForm,
} from "./add-document.style";
import { useAppDispatch } from "../../../utils/custom-hook";

import { ChangeEvent, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { useEmployee } from "../../../hooks/employee-hook";
import {
  closeEmployeeTask,
  resetEmployeeState,
} from "../../../store/employee/employee-slice";
import { FileInput } from "../../utils/profile/employee-profile.style";
import { MdFileUpload } from "react-icons/md";
import AssetAPI from "../../../services/asset-api";
import { addAssetDone } from "../../../store/asset/asset-slice";
export const AddDocument = () => {
  // Calling hooks and getting necessary information
  const dispatcher = useAppDispatch();
  // const { task_error, task_finished } = useDocument();
  const navigate = useNavigate();
  const { asset_id } = useParams();
  const employee = useEmployee();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };

  const uploadFile = (asset_name: string) => {
    if (employee.curr_emp) {
      if (!selectedFile) {
        dispatcher(
          setFlashMessage({
            type: "error",
            title: "Uploading document failed",
            status: true,
            duration: 5,
            desc: "Please upload document",
          })
        );
        return;
      }
      const formData = new FormData();
      formData.append("asset_value", selectedFile);
      formData.append("asset_name", asset_name);

      AssetAPI.addEmpAsset(employee.curr_emp?.id || "", formData)
        .then((res) => {
          dispatcher(
            resetEmployeeState({
              ...employee,
              curr_emp: undefined,
            })
          );
          if ("asset" in res) {
            dispatcher(addAssetDone(res.asset));
          }
          dispatcher(
            setFlashMessage({
              type: "success",
              title: "Document uploadding",
              status: true,
              duration: 5,
              desc: "Document uploaded successfully",
            })
          );
          navigate(-1);
        })
        .catch(() => {
          dispatcher(
            setFlashMessage({
              type: "error",
              title: "Failed to upload document",
              status: true,
              duration: 5,
              desc: "Please try again later",
            })
          );
        });
    }
  };

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      asset_name: "",
    },
    onSubmit(values) {
      dispatcher(
        resetEmployeeState({
          ...employee,
          task_error: undefined,
        })
      );
      if (selectedFile) {
        uploadFile(values.asset_name);
      } else {
        dispatcher(
          setFlashMessage({
            desc: "Please select a file",
            title: "No file uploaded",
            status: true,
            duration: 3,
            type: "error",
          })
        );
      }
    },
  });

  const clearTask = () => {
    dispatcher(closeEmployeeTask());
  };
  return (
    <Modal closeAction={clearTask}>
      <DocumentContainer>
        <DocumentBody>
          <Title>{asset_id ? "Edit" : "Add"} Document</Title>
          <DocumentForm onSubmit={handleSubmit}>
            <InputContainer>
              <Label>Document Name</Label>
              <Input
                type="text"
                onChange={handleChange}
                name="asset_name"
                value={values.asset_name}
              />
              {touched.asset_name && errors.asset_name && (
                <FormError> {errors.asset_name} </FormError>
              )}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="pdf">Upload agreement Doc</Label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  gap: "1rem",
                }}
              >
                <div>
                  <FileInput
                    ref={hiddenFileInput}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                  {previewUrl && (
                    <div>
                      <object
                        data={previewUrl}
                        type="application/pdf"
                        width="100rem"
                        height="60rem"
                        style={{ marginBottom: "1rem", overflow: "hidden" }}
                      >
                        <p>
                          Your browser does not support PDFs
                          <a href={previewUrl}>Download the PDF</a>.
                        </p>
                      </object>
                    </div>
                  )}
                </div>
                <UploadBtn
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}
                >
                  <MdFileUpload /> Upload
                </UploadBtn>
              </div>
            </InputContainer>
            {employee.task_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {employee.task_error}
              </FormError>
            )}
            <AddBtn type="submit">
              {!employee.task_finished && !employee.task_error ? (
                <SmallSpinner />
              ) : asset_id ? (
                "Save"
              ) : (
                "Add"
              )}
            </AddBtn>
          </DocumentForm>
        </DocumentBody>
      </DocumentContainer>
    </Modal>
  );
};
