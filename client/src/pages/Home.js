import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import './Home.css'

const RenderCards=({data,title})=>{
    if(data?.length>0){
        return data.map((post)=>
        <Card key={post._id} {...post} />
        )
    }
    return(
        <h2>{title}</h2>
    )
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  console.log(allPosts)

  useEffect(()=>{
    const fetchPost=async ()=>{
      setLoading(true);
      try {
        const response= await fetch("https://nax-ai-dall-e.onrender.com/api/v1/post",
        {
          method:'GET',
          headers:{
            'Content-Type':'application/json',
          },
        })
        if(response.ok){
          const result=await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false)
      }
    }
    fetchPost()
  },[])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 400),
    );
  };



  return (
    <div className="home-page">
      <div>
        <br></br>
        <h1 className="community-heading">&nbsp;Community Showcase</h1>
        <p className="info-msg">
        Browse through the collection of images created by DALL-E
        </p>
      </div>
      <div className="form-field">
      <input className="input-field" placeholder="Search posts" type="text" name="name" onChange={handleSearchChange}/>
      </div>
      <div className="loader">
        {
        loading ? 
        <>Waiting for connection...</>:
        <>
        {searchText && <p>&nbsp;&nbsp;&nbsp;Showing Results for : <b>{searchText}</b><br></br><br></br></p> }
        <div className="post-section">
          {searchText?
          <RenderCards data={searchedResults} title="No result..."/>:
          <RenderCards data={allPosts} title="No posts found" />}
        </div>
        </>
        }
      </div>
        <br></br>
        <br></br>
    </div>
  );
};

export default Home;
