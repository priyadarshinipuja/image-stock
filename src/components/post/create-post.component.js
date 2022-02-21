import React, { useRef, useState } from "react";
import {
  Input,
  Grid,
  Button,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createPostAction } from "../../actions/posts";
import { useNavigate } from "react-router-dom";
import "./post.scss";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const form = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      image: imageUrl,
      author: user.id,
    };
    await dispatch(createPostAction(data));
    navigate("/posts");
  };

  return (
    <Grid container>
      <form
        style={{ paddingLeft: 100 + "px" }}
        onSubmit={handleSave}
        ref={form}
      >
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="title">Post Title</InputLabel>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </FormControl>
        <div className="form-wrapper">
          <img
            src={
              imageUrl
                ? imageUrl
                : "//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            }
            alt="profile-img"
            className="profile-img-card"
            height={100}
          />

          <FormControl
            margin="normal"
            fullWidth
            style={{ marginLeft: 16 + "px" }}
          >
            <InputLabel htmlFor="imageUrl">Image Url</InputLabel>
            <Input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
          </FormControl>
        </div>

        <Grid className="form-group">
          <Button
            color="primary"
            variant="contained"
            primary="true"
            type="submit"
            disabled={loading}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Save</span>
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
