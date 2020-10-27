import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import  {Image} from "react-bootstrap";
import "./App.css"
import Header from "./Header"
import Swal from "sweetalert2";
import axios from "axios";
import  './styles.css'
class Main extends PureComponent {
 constructor(props){
    super(props);

    this.state={
      selectedFile:null,
      loaded:0,
      
      crop: {
      unit: '%',
      width: 30,
      aspect: 16 / 9,
    },
    }
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
    
    this.onClickHandler();
    
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
    onClickHandler=()=>{
        
      const data= new FormData();
      data.append('file',this.state.selectedFile);
      axios.post("https://8000-d621a1fe-df08-4c64-bc63-8f6326479e66.ws-us02.gitpod.io/upload",data,{
    
      })
    .then(res=>{
        this.setState({loaded:1})
      console.log(res.statusText);
    })
    }
  

  onSelectFile =event=>{

  this.setState({
    selectedFile:event.target.files[0],
    loaded:0,
    filename:event.target.files[0].name,
  })
 console.log(`Selected file - ${event.target.files[0].name}`);
 
}

  
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const { crop, croppedImageUrl, selectedFile } = this.state;

    return (
      <div className="App">
          
        <div className="file">
            <h1 className="myheader">Set Your Profile Picture!</h1><br/>
          <input id="file" className="inputfile" name="file" type="file" accept="image/*" onChange={this.onSelectFile} />
          <label for="file">Choose a file</label><br/>
  <span>{this.state.filename}</span>
  </div>
       
        <div className="  profile">

     
          <img src={process.env.PUBLIC_URL + '/image.jpg'}  />
        <br/>
</div>
        <button className="mybutton" onClick={this.confirm}><b>Upload</b></button>
      </div>
    );
  }
}

export default Main;