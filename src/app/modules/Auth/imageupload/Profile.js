import React, { Component } from 'react';

import ProfilePicture from "profile-picture"
import "profile-picture/build/ProfilePicture.css"
import axios from "axios";
import "./styles.css";
import Swal from "sweetalert2";
class Profile extends Component {
  constructor(props) {
    super(props)

    this.profilePictureRef = React.createRef();
  }
confirm=()=>{
    Swal.fire({
    title:"Upload Picture?",
    showCancelButton:true,
    confirmButtonColor:"#3085d6",
    cancelButtonColor:"red",
    confirmButtonText:"Yes",
    }).then((result)=>{
     if(result.value){
    
    this.handleUpload();
    
     }
    
    }).then((loaded)=>{
        if(loaded){
        Swal.fire(
        "Picture Uploaded!",
        "Success"
        )
        }
    })
    }

  handleUpload() {
    const PP = this.profilePictureRef.current;
    const imageData = PP.getData();
    const file = imageData.file;
    const imageAsDataURL = PP.getImageAsDataUrl();

    
   console.log(imageData);
      const data= new FormData();
      data.append('file',imageData);
      axios.post("https://8000-d621a1fe-df08-4c64-bc63-8f6326479e66.ws-us02.gitpod.io/upload",data,{
    
      })
    .then(res=>{
        this.setState({loaded:1})
      console.log(res.status);
      console.log(res);
    })
    }
  

  render() {
      
    return<div>
     <ProfilePicture
      ref={this.profilePictureRef}
      useHelper={true}
      debug={true}
    />

   &nbsp;&nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <button className="buttononbottom" onClick={this.confirm}>Upload</button>
    </div>
    
  
  }
}
export default Profile;