"use client";
import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type ClassificationResult = [[string, number]] | null;

export default function ImageClassificationPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<ClassificationResult>(null);
  const localImageSelector = useRef<HTMLInputElement>(null);

  const handleLocalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setResult(null);
    setImageUrl("");
    setImage(e.target.files[0]);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    localImageSelector.current!.value = "";
    setImageUrl(url);
    setResult(null);
    if (url) {
      fetch(url)
        .then((response) => {
          console.log(response);
          if (!response.ok) throw new Error();
          return response.blob();
        })
        .then((blob) => {
          setImage(new File([blob], ""));
        })
        .catch(() => {
          setImage(null);
        });
    } else {
      setImage(null);
    }
  };

  const handleUpload = () => {
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
      {image && (
        <img
          className={styles.imagePreview}
          src={URL.createObjectURL(image)}
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
        ref={localImageSelector}
        id="select-local-image"
        type="file"
        accept="image/*"
        onChange={handleLocalFileChange}
      />
      <TextField
        variant="outlined"
        label="Image URL"
        value={imageUrl}
        onChange={handleUrlChange}
        sx={{ "max-width": "500px" }}
      />
      <Button
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
        disabled={image === null}
        onClick={handleUpload}
        sx={{ "max-width": "120px" }}
      >
        Upload
      </Button>
    </div>
  );
}
