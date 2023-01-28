import React from "react";
import FormField from "../components/FormField";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import download from "../assets/download.png";
import preview from "../assets/preview.png";
import FileSaver from "file-saver";

const CreatePost = () => {
  const navigate = useNavigate();
  const [postQuery, setPostQuery] = React.useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [loading, setLoading] = React.useState(false);

  async function handleSubmit() {
    if(!postQuery.name){
      alert("Enter name to share")
      return;
    }

    if(!postQuery.photo){
      alert("Create something to share");
      return;
    }
    
    console.log("to commu...");
    setLoading(true);
    if (postQuery.photo && postQuery.prompt) {
      try {
        const response = await fetch("https://nax-ai-dall-e.onrender.com/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postQuery),
        });
        await response.json();
        navigate("/");
        console.log("sicc")
      } catch (error) {
//         console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleClick() {
    if (!postQuery.prompt) {
      alert("Please enter a prompt");
      return;
    }
    console.log("submitted");
    setLoading(true);

    try {
      const imageResponse = await fetch("https://nax-ai-dall-e.onrender.com/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: postQuery.prompt }),
      });

      const data = await imageResponse.json();

      setPostQuery({
        ...postQuery,
        photo: `data:image/jpeg;base64,${data.photo}`,
      });
//       console.log(postQuery);
    } catch (error) {
//       alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function chng(event) {
    setPostQuery((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    console.log("chng");
  }

  async function downloadImage(prompt, photo) {
    FileSaver.saveAs(photo, `download-${prompt}.jpg`);
  }

  return (
    <div className="create-post-section">
      <div className="heading-section">
        <h1 className="community-heading">Create</h1>
        <p className="info-msg">Generate imaginative images with DALL-E</p>
      </div>

      <div className="form-field">
        <div className="form-input">
          <FormField chng={chng} value={postQuery} />
        </div>
      </div>

      <div className="generated-image">
        {postQuery.photo ? (
          <img
            className="ai-image"
            src={postQuery.photo}
            alt={""}
          />
        ) : (
          <img
            className="ai-image"
            src={preview}
            alt={""}
          />
        )}
        {loading && (
          <ReactLoading
            className="spinner"
            type="spin"
            color="#A9A9A9"
            height={50}
            width={50}
          />
        )}

        {/* <button
          type="button"
          onClick={() => downloadImage(postQuery.prompt, postQuery.photo)}
          className="download-button"
        > */}
          {postQuery.photo && <img src={download} onClick={() => downloadImage(postQuery.prompt, postQuery.photo)} alt="download" className="download-icon" />}
        {/* </button> */}
      </div>
      <button className="create-button" onClick={handleClick}>
          {loading ? "Generating..." : "Generate"}
        </button>
        <br></br>
        <br></br>
        <p className="after-gen">** Once you have created the image you want, you can share it with others in the community **</p>
      <button className="share-button" onClick={handleSubmit}>
        Share to Community
      </button>
    </div>
  );
};

export default CreatePost;
