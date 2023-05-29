"use client";
import React from "react";
import styles from "./styles.module.scss";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

type ClassificationResult = [[string, number]] | null;

export default function ImageClassificationPage() {
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [image, setImage] = React.useState<File | null>(null);
  const [result, setResult] = React.useState<ClassificationResult>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setResult(null);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    } else {
      setImagePreview(null);
      setImage(null);
    }
  };

  const uploadImage = () => {
    if (!image) return;

    const data = new FormData();
    data.append("file", image);

    fetch("/api/test", { method: "POST", body: data })
      .then(async (response) => {
        const imageResponse = await response.json();
        console.log(imageResponse);
        setResult(imageResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.pageLayout}>
      {imagePreview && (
        <img
          className={styles.imagePreview}
          src={imagePreview}
          alt="image-preview"
        />
      )}
      {result && (
        <p>
          {`Result: ${result[0][0]}`}
          <br />
          {`Confidence: ${Math.round(result[0][1])}%`}
        </p>
      )}
      <input
        id="select-image"
        type="file"
        accept="image/*"
        onChange={onChangeHandler}
      />
      <Button
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
        onClick={uploadImage}
      >
        Upload
      </Button>
    </div>
  );
}
